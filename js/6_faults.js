// ========================================== //
// === 7. VIKATILOJEN JA KARTAN PÄIVITYS ==== //
// ========================================== //

function paivitaPeruskunnostetutKartalle() {
    const filtteriElem = document.getElementById("peruskunnostusFiltteri");
    const valittuFiltteri = filtteriElem ? filtteriElem.value : "Kaikki";
    const vuosiElem = document.getElementById("pk-vuosi-asetus");
    const valittuVuosi = vuosiElem ? vuosiElem.value : "Kaikki";

    document.querySelectorAll(".rata-osa").forEach(osa => {
        if (!peruskunnostusNakymaPaalla) { osa.classList.remove("peruskunnostettu"); return; }
        
        const onclickAttr = osa.getAttribute("onclick"); if (!onclickAttr) return;
        const match = onclickAttr.match(/'(.*?)'/); if (!match) return;
        const id = match[1];
        
        const historia = huoltoHistoria[id];
        const onKunnostettu = historia && historia.some(t => {
            if ((t.tyoTyyppi === "Peruskunnostus" || t.tyoTyyppi === "Kuntokartoituksen perusteella") && 
                (!t.status || t.status.toLowerCase() === "completed")) {
                
                if (valittuVuosi !== "Kaikki") {
                    let pvmVuosi = 0;
                    if (t.pvm && t.pvm.includes('.')) {
                        pvmVuosi = parseInt(t.pvm.split('.')[2], 10);
                    } else if (t.pvm && t.pvm.includes('-')) {
                        pvmVuosi = parseInt(t.pvm.split('-')[0], 10);
                    }
                    const rajaVuosi = parseInt(valittuVuosi, 10);
                    if (pvmVuosi < rajaVuosi) return false;
                }
                return true;
            }
            return false;
        });

        const matsaaFiltteriin = valittuFiltteri === "Kaikki" || id.includes(valittuFiltteri);
        if (onKunnostettu && matsaaFiltteriin) { osa.classList.add("peruskunnostettu"); } 
        else { osa.classList.remove("peruskunnostettu"); }
    });
}

async function synkronoiLaitteenVikatila(id) {
    if (!huoltoHistoria[id]) {
        try {
            await supabaseclient.from('aktiiviset_viat').delete().eq('laite_id', id);
        } catch(e){}
        delete aktiivisetViat[id];
        return;
    }
    const ekaUusi = huoltoHistoria[id].find(t => t.status && t.status.toLowerCase() === "new");
    if (ekaUusi) {
        const vikaObj = {
            laite_id: id, prio: "keski", otsikko: ekaUusi.otsikko || "Määrittelemätön vika",
            sijainti: ekaUusi.sijainti || "-", kommentti: ekaUusi.osat || "-",
            tyo_numero: ekaUusi.tyoNumero || "-", tyo_tyyppi: ekaUusi.tyoTyyppi || "Vika"
        };
        await supabaseclient.from('aktiiviset_viat').upsert(vikaObj);
        aktiivisetViat[id] = {
            prio: vikaObj.prio, otsikko: vikaObj.otsikko, sijainti: vikaObj.sijainti,
            kommentti: vikaObj.kommentti, tyoNumero: vikaObj.tyo_numero, tyoTyyppi: vikaObj.tyo_tyyppi
        };
    } else {
        await supabaseclient.from('aktiiviset_viat').delete().eq('laite_id', id);
        delete aktiivisetViat[id];
    }
}

function paivitaVikaKartta() {
    document.querySelectorAll(".vika-pallo").forEach(pallo => pallo.remove());
    document.querySelectorAll(".lista-positio-nappi").forEach(btn => {
        btn.style.backgroundColor = ""; btn.style.color = ""; btn.style.borderColor = "";
    });

    for (const [id, tila] of Object.entries(aktiivisetViat)) {
        if (tila) {
            const prio = (tila === true) ? "korkea" : (typeof tila === "string" ? tila : tila.prio);
            let vari = "#f1c40f"; if (prio === "korkea") vari = "#e74c3c"; else if (prio === "keski") vari = "#e67e22"; 

            const elem = document.querySelector(`.rata-osa[onclick="avaaTiedot('${id}')"]`);
            if (elem) {
                try {
                    let centerX = 0; let centerY = 0;
                    if (elem.tagName === "line") {
                        const x1 = parseFloat(elem.getAttribute("x1")); const y1 = parseFloat(elem.getAttribute("y1"));
                        const x2 = parseFloat(elem.getAttribute("x2")); const y2 = parseFloat(elem.getAttribute("y2"));
                        centerX = (x1 + x2) / 2; centerY = (y1 + y2) / 2;
                    } else {
                        const bbox = elem.getBBox();
                        centerX = bbox.x + (bbox.width / 2); centerY = bbox.y + (bbox.height / 2);
                    }
                    if (centerX === 0 && centerY === 0) continue; 

                    const pallo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    pallo.setAttribute("cx", centerX); pallo.setAttribute("cy", centerY);
                    pallo.setAttribute("r", "9"); pallo.setAttribute("fill", vari);
                    pallo.setAttribute("class", "vika-pallo"); pallo.setAttribute("stroke", "#ffffff"); 
                    pallo.setAttribute("stroke-width", "2.5"); pallo.setAttribute("onclick", `avaaTiedot('${id}')`);
                    elem.parentNode.appendChild(pallo);
                } catch (error) { console.log(`Palloa ei voitu piirtää kohteelle: ${id}`, error); }
            }
            
            const listaNappi = document.querySelector(`.lista-positio-nappi[data-tiedot-id="${id}"]`);
            if (listaNappi) {
                listaNappi.style.backgroundColor = vari; listaNappi.style.color = "white"; listaNappi.style.borderColor = vari;
            }
        }
    }
}

async function vaihdaVikaTilaa() {
    if (aktiivisetViat[valittuKuljetinID]) {
        // --- VIAN KUITTAUS (Muokkaustila) ---
        const vanhaTila = aktiivisetViat[valittuKuljetinID];
        let otsikko = typeof vanhaTila === "object" ? (vanhaTila.otsikko || "Vian korjaus") : "Vian korjaus";
        let sijainti = typeof vanhaTila === "object" ? (vanhaTila.sijainti || "Määrittelemätön") : "Määrittelemätön";
        let kommentti = typeof vanhaTila === "object" ? (vanhaTila.kommentti || "") : "";

        // 1. EI POISTETA VIELÄ TIETOKANNASTA, avataan vain lomake
        naytaLisaysLomake();
        
        // 2. Täytetään lomake tiedoilla (olettaen että sinulla on muuttuja, joka tietää mikä rivi on auki)
        document.getElementById("uusiOtsikko").value = otsikko.replace(/\s*\([^)]*\)\s*$/, ''); 
        document.getElementById("uusiSijainti").value = sijainti; 
        if(document.getElementById("uusiOsat")) document.getElementById("uusiOsat").value = kommentti.replace(/\s*\(Työ:\s*[^)]*\)\s*$/, '');
        if(document.getElementById("uusiStatus")) document.getElementById("uusiStatus").value = "Completed";
        
        // 3. TÄRKEÄÄ: Asetetaan jokin lippu, että tiedämme tämän olevan kuittaus
        // esim. muokattavaIndeksi = etsiOikeaRivi(valittuKuljetinID);
    } else {
        // --- UUDEN VIAN ILMOITTAMINEN (tämä puoli on OK) ---
        const uusiVika = {
            laite_id: valittuKuljetinID, 
            prio: document.getElementById("vikaPrioriteetti").value,
            otsikko: document.getElementById("vikaOtsikko").value || "Määrittelemätön vika",
            sijainti: document.getElementById("vikaSijainti").value,
            kommentti: document.getElementById("vikaKommentti").value || "-",
            tyo_numero: "-", 
            tyo_tyyppi: "Vika"
        };
        await supabaseclient.from('aktiiviset_viat').upsert(uusiVika);
        aktiivisetViat[valittuKuljetinID] = uusiVika;
        paivitaVikaKartta(); 
        paivitaModalinVikaTila(); 
        paivitaVikaLista();
    }
}
async function paivitaAktiivisenVianPrio(uusiPrio) {
    if (!valittuKuljetinID || !aktiivisetViat[valittuKuljetinID]) return;

    try {
        // 1. Päivitetään uusi prioriteetti Supabase-tietokantaan
        const { error } = await supabaseclient
            .from('aktiiviset_viat')
            .update({ prio: uusiPrio })
            .eq('laite_id', valittuKuljetinID);

        if (error) throw error;

        // 2. Päivitetään paikallinen muuttuja
        if (typeof aktiivisetViat[valittuKuljetinID] === "object") {
            aktiivisetViat[valittuKuljetinID].prio = uusiPrio;
        } else {
            aktiivisetViat[valittuKuljetinID] = { prio: uusiPrio, otsikko: "Vika" };
        }

        // 3. Päivitetään näkymät välittömästi uusiin väreihin
        paivitaModalinVikaTila();
        paivitaVikaKartta();
        paivitaVikaLista();
        
    } catch (err) {
        console.error("Virhe prioriteetin päivityksessä:", err);
        alert("⚠️ Virhe päivitettäessä prioriteettia tietokantaan.");
    }
}
function kuittaaAktiivinenVika() {
    if (!valittuKuljetinID || !huoltoHistoria[valittuKuljetinID]) return;
    
    // Etsitään kyseisen laitteen historia ja sieltä vika, jonka status on "New"
    const vikaIndeksi = huoltoHistoria[valittuKuljetinID].findIndex(t => t.status && t.status.toLowerCase() === "new");
    
    if (vikaIndeksi !== -1) {
        // Avataan vanha CSV-työ MUOKKAUSTILASSA (tämä estää kloonautumisen!)
        muokkaaMerkintaa(vikaIndeksi);
        
        // Vaihdetaan status lomakkeessa heti valmiiksi, jotta käyttäjän ei tarvitse
        const statusElem = document.getElementById("uusiStatus");
        if (statusElem) statusElem.value = "Completed";
        
        // Rullataan ruutu nätisti lomakkeen kohdalle
        document.getElementById("lisaysLomake").scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Ei aktiivista vikaa kuitattavaksi.");
    }
}
function paivitaModalinVikaTila() {
    const btn = document.getElementById("btnVikaToggle");
    const teksti = document.getElementById("vikaTilaTeksti");
    const paneeli = document.getElementById("vikaPaneeli");
    const valinnat = document.getElementById("vikaValinnat");
    
    let tila = aktiivisetViat[valittuKuljetinID];
    
    if (tila) {
        let prio = (tila === true) ? "korkea" : (typeof tila === "string" ? tila : tila.prio);
        let otsikko = (typeof tila === "object" && tila.otsikko) ? tila.otsikko : "";
        let väri = prio === "korkea" ? "#e74c3c" : (prio === "keski" ? "#e67e22" : "#f1c40f");
        let tausta = prio === "korkea" ? "#fdedec" : (prio === "keski" ? "#fdf2e9" : "#fef9e7");

        // Luodaan dynaaminen alasvetovalikko prioriteetin vaihtamista varten
        let prioSelectHTML = `
            <select onchange="paivitaAktiivisenVianPrio(this.value)" style="margin-left: 10px; font-size: 13px; padding: 3px 8px; font-weight: bold; border-radius: 4px; border: 2px solid ${väri}; color: ${väri}; background: #ffffff; cursor: pointer; outline: none;">
                <option value="korkea" ${prio === 'korkea' ? 'selected' : ''}>🔴 KORKEA</option>
                <option value="keski" ${prio === 'keski' ? 'selected' : ''}>🟠 KESKI</option>
                <option value="matala" ${prio === 'matala' ? 'selected' : ''}>🟡 MATALA</option>
            </select>
        `;

        // Laitetaan valikko otsikon perään ja vian kuvaus omalle rivilleen
        teksti.innerHTML = `AKTIIVINEN VIKA PÄÄLLÄ ${prioSelectHTML} <br><span style="color: #2c3e50; font-size: 14px; font-weight: normal;">${otsikko.replace(' - ', '')}</span>`;
        teksti.style.color = väri;
        
        paneeli.style.borderLeftColor = väri; 
        paneeli.style.backgroundColor = tausta; 
        valinnat.style.display = "none"; 
        
        btn.innerText = "✅ Kuittaa vika korjatuksi"; 
        btn.style.backgroundColor = "#27ae60"; 
    } else {
        teksti.innerText = "Kunnossa"; 
        teksti.style.color = "#27ae60";
        
        paneeli.style.borderLeftColor = "#bdc3c7"; 
        paneeli.style.backgroundColor = "#f8f9f9"; 
        valinnat.style.display = "block"; 
        
        btn.innerText = "🚨 Ilmoita aktiivinen vika"; 
        btn.style.backgroundColor = "#e74c3c"; 
        
        // Tyhjennetään uuden vian lomake
        if(document.getElementById("vikaOtsikko")) document.getElementById("vikaOtsikko").value = "";
        if(document.getElementById("vikaSijainti")) document.getElementById("vikaSijainti").value = "Määrittelemätön";
        if(document.getElementById("vikaKommentti")) document.getElementById("vikaKommentti").value = "";
    }
}

function muutaVikaSorttausta() {
    const valinta = document.getElementById("vikaSorttausAsetus");
    if(valinta) vikaSorttaus = valinta.value;
    paivitaVikaLista();
}

function muutaVikaFiltteria() {
    const valinta = document.getElementById("vikaFiltteriAsetus");
    if(valinta) vikaFiltteri = valinta.value;
    paivitaVikaLista();
}

function muutaVikaHakua() {
    const valinta = document.getElementById("vikaHakuAsetus");
    if(valinta) vikaHakuTeksti = valinta.value.toLowerCase();
    paivitaVikaLista();
}

function paivitaVikaLista() {
    const viatAlue = document.getElementById("viat-alue");
    if(!viatAlue) return;
    let viatControls = document.getElementById("viat-controls");
    let viatTauluAlue = document.getElementById("viat-taulu-alue");

    if (!viatControls) {
        viatAlue.innerHTML = `
            <h2 style='color: #c0392b; margin-top: 0;'>Aktiiviset viat ja häiriöt laitteistossa 🚨 <span id="aktiiviset-lkm" style="font-size: 18px; color: #7f8c8d; font-weight: normal;"></span></h2>
            <div id="viat-controls" style="background: #f8f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #bdc3c7; display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                <strong style="color: #2c3e50;">Etsi ja järjestä:</strong>
                <input type="text" id="vikaHakuAsetus" placeholder="🔍 Hae vikaa, osaa, työtä..." oninput="muutaVikaHakua()" style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; outline: none; flex: 1; min-width: 200px;">
                <select id="vikaFiltteriAsetus" onchange="muutaVikaFiltteria()" style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer; outline: none;">
                    <option value="Kaikki">Kaikki laitetyypit</option>
                    <option value="BC">BC (Hihnakuljettimet)</option>
                    <option value="BV">BV</option>
                    <option value="CC">CC</option>
                </select>
                <select id="vikaSorttausAsetus" onchange="muutaVikaSorttausta()" style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer; outline: none;">
                    <option value="kl_asc">Ryhmä nouseva (KL1 ➔ KL7)</option>
                    <option value="kl_desc">Ryhmä laskeva (KL7 ➔ KL1)</option>
                    <option value="prio">⚠️ Prioriteetti ensin</option>
                    <option value="az">A-Ö Laitteen nimi</option>
                </select>
                <button onclick="lataaAktiivisetViatExcel()" style="margin-left: auto; padding: 8px 16px; background-color: #27ae60; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    📥 Lataa Exceliin
                </button>
            </div>
            <div id="viat-taulu-alue"></div>
        `;
        viatControls = document.getElementById("viat-controls");
        viatTauluAlue = document.getElementById("viat-taulu-alue");
    }
    
    if(document.getElementById("vikaHakuAsetus")) document.getElementById("vikaHakuAsetus").value = vikaHakuTeksti;
    if(document.getElementById("vikaFiltteriAsetus")) document.getElementById("vikaFiltteriAsetus").value = vikaFiltteri;
    if(document.getElementById("vikaSorttausAsetus")) document.getElementById("vikaSorttausAsetus").value = vikaSorttaus;

    const prioArvot = { "korkea": 3, "keski": 2, "matala": 1 };
    
    // 1. Suodatetaan datat normaalisti
    let viatArray = Object.entries(aktiivisetViat)
        .filter(([id, tila]) => tila)
        .filter(([id, tila]) => vikaFiltteri === "Kaikki" || id.includes(vikaFiltteri))
        .map(([id, tila]) => {
            let prio = (tila === true) ? "korkea" : (typeof tila === "string" ? tila : tila.prio);
            let otsikko = (typeof tila === "object" && tila.otsikko) ? tila.otsikko : "Vika kuljettimessa";
            let sijainti = (typeof tila === "object" && tila.sijainti) ? tila.sijainti : "Koko laite";
            let kommentti = (typeof tila === "object" && tila.kommentti) ? tila.kommentti : "-";
            let tyoNumero = (typeof tila === "object" && tila.tyoNumero) ? tila.tyoNumero : "-"; 
            let tyoTyyppi = (typeof tila === "object" && tila.tyoTyyppi) ? tila.tyoTyyppi : "Vika";
            otsikko = otsikko.replace(/\s*\([^)]*\)\s*$/, '');
            kommentti = kommentti.replace(/\s*\(Työ:\s*[^)]*\)\s*$/, '');
            return { id, prio, otsikko, sijainti, kommentti, tyoNumero, tyoTyyppi };
        })
        .filter(item => {
            if (!vikaHakuTeksti) return true;
            const haku = vikaHakuTeksti;
            return item.id.toLowerCase().includes(haku) || 
                   item.otsikko.toLowerCase().includes(haku) || 
                   item.prio.toLowerCase().includes(haku) ||
                   item.kommentti.toLowerCase().includes(haku) || 
                   item.sijainti.toLowerCase().includes(haku) ||
                   item.tyoNumero.toLowerCase().includes(haku) || 
                   item.tyoTyyppi.toLowerCase().includes(haku);
        });

    const lkmSpan = document.getElementById("aktiiviset-lkm");
    if (lkmSpan) lkmSpan.innerText = `(${viatArray.length} kpl)`;

    // 2. Ryhmitellään viat linjan/ryhmän mukaan
    const ryhmitelty = {};
    viatArray.forEach(item => {
        const tiedot = erotteleLaiteTiedot(item.id);
        const ryhmaNimi = tiedot.ryhma || "Muut laitteet / Määrittelemätön";
        if (!ryhmitelty[ryhmaNimi]) ryhmitelty[ryhmaNimi] = [];
        ryhmitelty[ryhmaNimi].push(item);
    });

    // 3. Järjestetään otsikot (Ryhmät) valinnan mukaan
    let ryhmaAvaimet = Object.keys(ryhmitelty);
    if (vikaSorttaus === "kl_desc") {
        ryhmaAvaimet.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
    } else {
        ryhmaAvaimet.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }

    // 4. Järjestetään rivit ryhmien sisällä
    ryhmaAvaimet.forEach(ryhma => {
        ryhmitelty[ryhma].sort((a, b) => {
            const tiedotA = erotteleLaiteTiedot(a.id);
            const tiedotB = erotteleLaiteTiedot(b.id);
            
            if (vikaSorttaus === "prio") {
                if (prioArvot[b.prio] !== prioArvot[a.prio]) return prioArvot[b.prio] - prioArvot[a.prio];
                return tiedotA.nimi.localeCompare(tiedotB.nimi, undefined, { numeric: true, sensitivity: 'base' });
            } else {
                return tiedotA.nimi.localeCompare(tiedotB.nimi, undefined, { numeric: true, sensitivity: 'base' });
            }
        });
    });

    // 5. Luodaan YKSI yhteinen HTML-taulukko
    let html = "";
    if (ryhmaAvaimet.length === 0) {
        html += `<div style="background-color: #e8f8f5; border-left: 6px solid #2ecc71; padding: 20px; border-radius: 4px;">
                    <h3 style="color: #27ae60; margin: 0;">✅ Lista on tyhjä!</h3>
                    <p style="color: #27ae60; margin: 5px 0 0 0; font-weight: bold;">Järjestelmässä ei ole näillä hakuehdoilla aktiivisia vikoja.</p>
                </div>`;
    } else {
        html += `<table class="vikatilasto-taulu" style="width: 100%;">
                    <thead>
                        <tr>
                            <th>Laite / Tunnus</th><th>Prioriteetti</th><th>Työnumero</th><th>Tyyppi</th>
                            <th>Vian kuvaus</th><th>Sijainti laitteessa</th><th>Lisätiedot / Tarvittavat osat</th><th>Toiminnot</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        ryhmaAvaimet.forEach(ryhma => {
            // Lisätään ryhmälle selkeä väliotsikkorivi, joka yhdistää kaikki 8 saraketta (colspan="8")
            html += `<tr>
                        <td colspan="8" style="background-color: #ecf0f1; color: #2c3e50; padding: 12px 15px; border-bottom: 2px solid #bdc3c7;">
                            <h3 style="margin: 0; font-size: 16px;">📍 Linja / Ryhmä: ${ryhma}</h3>
                        </td>
                     </tr>`;
            
            ryhmitelty[ryhma].forEach(item => {
                let prioTeksti = item.prio === "korkea" ? "🔴 KORKEA" : (item.prio === "keski" ? "🟠 KESKI" : "🟡 MATALA");
                let riviTausta = item.prio === "korkea" ? "#fdedec" : (item.prio === "keski" ? "#fdf2e9" : "#fef9e7");
                let tyyppiTyyli = (item.tyoTyyppi === "Vika") ? "color: #c0392b; font-weight: bold;" : ((item.tyoTyyppi === "Peruskunnostus") ? "color: #27ae60; font-weight: bold;" : "");
                
                const tiedot = erotteleLaiteTiedot(item.id);
                const idTeksti = tiedot.nimi;

                html += `<tr style="background-color: ${riviTausta}; font-weight: bold;">
                            <td style="color: #2c3e50; font-size: 15px;">${idTeksti}</td><td>${prioTeksti}</td>
                            <td>${item.tyoNumero}</td><td style="${tyyppiTyyli}">${item.tyoTyyppi}</td>
                            <td style="color: #c0392b;">${item.otsikko}</td>
                            <td>${item.sijainti}</td><td style="font-weight: normal; font-style: italic;">${item.kommentti}</td>
                            <td><button onclick="avaaTiedot('${item.id}')" style="padding: 6px 12px; background-color: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">✏️ Avaa & Kuittaa</button></td>
                        </tr>`;
            });
        });
        
        html += `</tbody></table>`;
    }
    viatTauluAlue.innerHTML = html;
}