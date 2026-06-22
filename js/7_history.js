// ========================================== //
// === 8. HUOLTOHISTORIAN HALLINTA ========== //
// ========================================== //

function muutaHistoriaHakua() {
    const valinta = document.getElementById("historiaHakuAsetus");
    if(valinta) historiaHakuTeksti = valinta.value.toLowerCase();
    paivitaKokoHistoriaNakyma();
}

function paivitaKokoHistoriaNakyma() {
    const historiaAlue = document.getElementById("historia-alue");
    if (!historiaAlue) return;

    let historiaControls = document.getElementById("historia-controls");
    let historiaTauluAlue = document.getElementById("historia-taulu-alue");

    if (!historiaControls) {
        historiaAlue.innerHTML = `
            <h2 style='color: #3498db; margin-top: 0;'>Koko laitteiston huolto- ja vikahistoria 📖 <span id="historia-lkm" style="font-size: 18px; color: #7f8c8d; font-weight: normal;"></span></h2>
            <div id="historia-controls" style="background: #f8f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #bdc3c7; display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                <strong style="color: #2c3e50;">Etsi historiasta:</strong>
                <input type="text" id="historiaHakuAsetus" placeholder="🔍 Hae laitetta, vikaa, työnumeroa tai tekijää..." oninput="muutaHistoriaHakua()" style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; outline: none; flex: 1; min-width: 250px;">
                <button onclick="lataaExcel(true)" style="margin-left: auto; padding: 8px 16px; background-color: #27ae60; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    📥 Lataa Exceliin
                </button>
            </div>
            <div id="historia-taulu-alue"></div>
        `;
        historiaControls = document.getElementById("historia-controls");
        historiaTauluAlue = document.getElementById("historia-taulu-alue");
    }
    if(document.getElementById("historiaHakuAsetus")) document.getElementById("historiaHakuAsetus").value = historiaHakuTeksti;
    
    let kaikkiTapahtumat = [];
    for (const [laiteId, tapahtumat] of Object.entries(huoltoHistoria)) {
        tapahtumat.forEach((tapahtuma) => { 
            kaikkiTapahtumat.push({ laiteId: laiteId, ...tapahtuma }); 
        });
    }

    if (historiaHakuTeksti) {
        const haku = historiaHakuTeksti;
        kaikkiTapahtumat = kaikkiTapahtumat.filter(item => {
            return (item.laiteId && item.laiteId.toLowerCase().includes(haku)) ||
                   (item.otsikko && item.otsikko.toLowerCase().includes(haku)) ||
                   (item.osat && item.osat.toLowerCase().includes(haku)) ||
                   (item.tyoNumero && item.tyoNumero.toLowerCase().includes(haku)) ||
                   (item.tekija && item.tekija.toLowerCase().includes(haku)) ||
                   (item.pvm && item.pvm.toLowerCase().includes(haku)) ||
                   (item.tyoTyyppi && item.tyoTyyppi.toLowerCase().includes(haku));
        });
    }

    kaikkiTapahtumat.sort((a, b) => {
        const pvmA = a.pvm.includes('.') ? a.pvm.split('.').reverse().join('') : a.pvm;
        const pvmB = b.pvm.includes('.') ? b.pvm.split('.').reverse().join('') : b.pvm;
        return pvmB.localeCompare(pvmA);
    });

    const lkmSpan = document.getElementById("historia-lkm");
    if (lkmSpan) lkmSpan.innerText = `(${kaikkiTapahtumat.length} kpl)`;

    let html = "";
    if (kaikkiTapahtumat.length === 0) {
        html += `<div style="background-color: #fdfefe; border-left: 6px solid #bdc3c7; padding: 20px; border-radius: 4px; margin-top: 20px;">
                    <p style="color: #7f8c8d; margin: 0; font-weight: bold;">Ei hakutuloksia tai järjestelmässä ei ole vielä kirjattua huoltohistoriaa.</p>
                 </div>`;
    } else {
        html += `<table class="vikatilasto-taulu"><thead><tr><th>Status</th><th>Päivämäärä</th><th>Laite / Tunnus</th><th>Työnumero</th><th>Tyyppi</th><th>Otsikko / Vika</th><th>Vaihdetut osat / Kuvaus</th><th>Tekijä</th><th>Toiminnot</th></tr></thead><tbody>`;
        kaikkiTapahtumat.forEach(item => {
            let tyyppiTeksti = item.tyoTyyppi ? item.tyoTyyppi : "-";
            let tyyppiTyyli = (tyyppiTeksti === "Vika") ? "color: #c0392b; font-weight: bold;" : ((tyyppiTeksti === "Peruskunnostus") ? "color: #27ae60; font-weight: bold;" : "");
            let statusTeksti = item.status === "New" ? "⏳ Odottaa" : (item.status === "Completed" ? "✅ Valmis" : (item.status || "-"));
            let statusTyyli = item.status === "New" ? "color: #e67e22; font-weight: bold;" : "color: #27ae60;";
            const tiedot = erotteleLaiteTiedot(item.laiteId);
            const idTeksti = tiedot.ryhma ? `${tiedot.nimi} <span style="font-size: 11px; color: #7f8c8d;">(${tiedot.ryhma})</span>` : tiedot.nimi;

            html += `<tr><td style="${statusTyyli}">${statusTeksti}</td><td style="white-space: nowrap;"><strong>${item.pvm}</strong></td>
                    <td style="color: #2c3e50; font-weight: bold;">${idTeksti}</td><td>${item.tyoNumero || "-"}</td>
                    <td style="${tyyppiTyyli}">${tyyppiTeksti}</td><td>${item.otsikko || "-"}</td>
                    <td style="font-style: italic;">${item.osat !== "-" ? item.osat : ""}</td><td>${item.tekija || "-"}</td>
                    <td><button onclick="avaaTiedot('${item.laiteId}')" style="padding: 6px 12px; background-color: #34495e; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 13px;">🔍 Avaa</button></td></tr>`;
        });
        html += `</tbody></table>`;
    }
    historiaTauluAlue.innerHTML = html;
}

function avaaTiedot(id) {
    valittuKuljetinID = id; 
    piilotaLisaysLomake(); 
    paivitaModalinVikaTila(); 
    
    const tiedot = erotteleLaiteTiedot(id);
    let otsikkoHTML = tiedot.nimi;
    if (tiedot.ryhma) {
        otsikkoHTML += ` <span style="font-size: 14px; background: #ecf0f1; color: #7f8c8d; padding: 4px 10px; border-radius: 12px; margin-left: 10px; vertical-align: middle; font-weight: normal;">Ryhmä: ${tiedot.ryhma}</span>`;
    }
    document.getElementById("kuljettimenNimi").innerHTML = otsikkoHTML;

    const varaosaLisaaBtn = document.querySelector(".nappi-lisaa[onclick='lisaaUusiVaraosa()']");
    if(varaosaLisaaBtn) {
        varaosaLisaaBtn.style.display = onkoAdmin ? "inline-block" : "none";
    }

    const historiaDiv = document.getElementById("historiaSisalto");
    const historia = huoltoHistoria[id];

    if (historia && historia.length > 0) {
        let tauluHTML = `<table class="historia-taulu"><thead><tr><th>Status</th><th>Pvm</th><th>Työnumero</th><th>Tyyppi</th><th>Sijainti</th><th>Otsikko</th><th>Kuvaus / Osat</th><th>Tekijä</th><th>Toiminnot</th></tr></thead><tbody>`;
        historia.forEach((tapahtuma, index) => {
            let statusTeksti = tapahtuma.status === "New" ? "⏳ Odottaa" : (tapahtuma.status === "Completed" ? "✅ Valmis" : (tapahtuma.status || "-"));
            let statusTyyli = tapahtuma.status === "New" ? "color: #e67e22; font-weight: bold;" : "color: #27ae60;";
            
            let toiminnot = onkoAdmin ? 
                `<button onclick="muokkaaMerkintaa(${index})" style="padding: 4px 8px; cursor: pointer; background: #f39c12; color: white; border: none; border-radius: 3px; font-weight: bold; font-size: 12px;">✏️ Muokkaa</button>` : 
                `<span style="color: #bdc3c7; font-size: 12px;">Vain luku</span>`;

            tauluHTML += `<tr><td style="${statusTyyli}">${statusTeksti}</td><td>${tapahtuma.pvm}</td><td>${tapahtuma.tyoNumero}</td><td>${tapahtuma.tyoTyyppi || "-"}</td><td><strong>${tapahtuma.sijainti || "-"}</strong></td><td>${tapahtuma.otsikko}</td><td>${tapahtuma.osat}</td><td>${tapahtuma.tekija}</td><td>${toiminnot}</td></tr>`;
        });
        tauluHTML += `</tbody></table>`;
        historiaDiv.innerHTML = tauluHTML;
    } else {
        historiaDiv.innerHTML = "<p><em>Ei kirjattua huoltohistoriaa tälle kuljettimelle. Voit kirjata ensimmäisen merkinnän yläpuolelta.</em></p>";
    }

    paivitaVaraosatTaulukko(id);

    const tablinks = document.getElementsByClassName("tab-btn");
    if(tablinks.length > 0) {
        vaihdaValilehti({currentTarget: tablinks[0]}, 'perustiedot-tab');
    }
    document.getElementById("tiedotIkkuna").style.display = "block";
}

function suljeTiedot() { document.getElementById("tiedotIkkuna").style.display = "none"; }

function naytaLisaysLomake() {
    document.getElementById("lisaysLomake").style.display = "block";
    document.getElementById("btnNaytaLisays").style.display = "none";
    const laiteKentta = document.getElementById("uusiLaiteID"); if (laiteKentta) laiteKentta.value = valittuKuljetinID;

    const poistaBtn = document.getElementById("btnPoistaTyö");
    if (poistaBtn) {
        poistaBtn.style.display = (onkoAdmin && muokattavaIndeksi !== -1) ? "inline-block" : "none";
    }

    if (muokattavaIndeksi === -1) {
        document.getElementById("uusiPvm").valueAsDate = new Date();
        document.getElementById("uusiSijainti").value = "Määrittelemätön";

        const tekijaKentta = document.getElementById("uusiTekija");
        if (tekijaKentta) { tekijaKentta.value = kirjautunutKayttaja; }
    }
}

function piilotaLisaysLomake() {
    document.getElementById("lisaysLomake").style.display = "none";
    document.getElementById("btnNaytaLisays").style.display = "inline-block";
    document.getElementById("huoltoForm").reset(); muokattavaIndeksi = -1; 
    const poistaBtn = document.getElementById("btnPoistaTyö"); if (poistaBtn) poistaBtn.style.display = "none";
}

function muokkaaMerkintaa(indeksi) {
    muokattavaIndeksi = indeksi; 
    const merkinta = huoltoHistoria[valittuKuljetinID][indeksi];
    let isoDate = "";
    if (merkinta.pvm && merkinta.pvm.includes(".")) {
        const osat = merkinta.pvm.split("."); if (osat.length === 3) isoDate = `${osat[2]}-${osat[1]}-${osat[0]}`;
    } else if (merkinta.pvm) { isoDate = merkinta.pvm; }

    try { document.getElementById("uusiPvm").value = isoDate; } catch(e) {}

    const laiteKentta = document.getElementById("uusiLaiteID"); if (laiteKentta) laiteKentta.value = valittuKuljetinID;
    document.getElementById("uusiTyoNumero").value = merkinta.tyoNumero || "";
    const tyoTyyppiElem = document.getElementById("uusiTyoTyyppi"); if (tyoTyyppiElem) { tyoTyyppiElem.value = merkinta.tyoTyyppi || "Vika"; }
    const statusElem = document.getElementById("uusiStatus"); if (statusElem) { statusElem.value = merkinta.status || "-"; }
    document.getElementById("uusiSijainti").value = merkinta.sijainti || "Määrittelemätön"; 
    document.getElementById("uusiOtsikko").value = merkinta.otsikko || "";
    document.getElementById("uusiOsat").value = (merkinta.osat && merkinta.osat !== "-") ? merkinta.osat : "";
    document.getElementById("uusiTekija").value = merkinta.tekija || "";
    naytaLisaysLomake(); 
}

async function tallennaUusiMerkinta(event) {
    if (event) event.preventDefault(); 
    
    const laiteKentta = document.getElementById("uusiLaiteID");
    const kohdeLaiteID = laiteKentta ? laiteKentta.value.trim() : valittuKuljetinID;
    if (!kohdeLaiteID) { alert("Laite-ID ei voi olla tyhjä!"); return; }

    const pvmInput = document.getElementById("uusiPvm").value;
    const tyoNumero = document.getElementById("uusiTyoNumero").value;
    const tyoTyyppiElem = document.getElementById("uusiTyoTyyppi"); const tyoTyyppi = tyoTyyppiElem ? tyoTyyppiElem.value : "Vika";
    const statusElem = document.getElementById("uusiStatus"); const status = statusElem ? statusElem.value : "-";
    const sijainti = document.getElementById("uusiSijainti").value; 
    const otsikko = document.getElementById("uusiOtsikko").value;
    const osat = document.getElementById("uusiOsat").value || "-";
    const tekija = document.getElementById("uusiTekija").value;

    let pvmMuotoiltu = pvmInput;
    if (pvmInput && pvmInput.includes("-")) {
        const dateObj = new Date(pvmInput); pvmMuotoiltu = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`;
    }

    // 1. TÄMÄ MENEE TIETOKANTAAN (käyttää alaviivoja eli snake_case)
    const dbObj = {
        laite_id: kohdeLaiteID, pvm: pvmMuotoiltu, tyo_numero: tyoNumero, tyo_tyyppi: tyoTyyppi,
        sijainti, otsikko, osat, tekija, status
    };

    const siirretaanToiselle = (muokattavaIndeksi !== -1 && kohdeLaiteID !== valittuKuljetinID);

    try {
        if (muokattavaIndeksi !== -1) {
            if(!onkoAdmin) { alert("Ei oikeuksia muokata vanhaa työtä!"); return; } 

            const vanhaMerkinta = huoltoHistoria[valittuKuljetinID][muokattavaIndeksi];
            if (siirretaanToiselle) {
                await supabaseclient.from('huoltohistoria').delete().eq('id', vanhaMerkinta.id);
                huoltoHistoria[valittuKuljetinID].splice(muokattavaIndeksi, 1);
                const { data } = await supabaseclient.from('huoltohistoria').insert(dbObj).select();
                if(data && data[0]) dbObj.id = data[0].id;
            } else {
                await supabaseclient.from('huoltohistoria').update(dbObj).eq('id', vanhaMerkinta.id);
                dbObj.id = vanhaMerkinta.id;
            }
        } else {
            const { data } = await supabaseclient.from('huoltohistoria').insert(dbObj).select();
            if(data && data[0]) dbObj.id = data[0].id;
            
            if (dbObj.status === "Completed" && huoltoHistoria[kohdeLaiteID]) {
                const vanhatKeskeneraiset = huoltoHistoria[kohdeLaiteID].filter(t => t.status && t.status.toLowerCase() === "new");
                for (let vanha of vanhatKeskeneraiset) {
                    const { error } = await supabaseclient.from('huoltohistoria').update({ status: 'Completed' }).eq('id', vanha.id);
                    if (error) {
                        console.error("Tietokantavirhe (RLS estää):", error);
                        alert("HUOMIO: Tietokanta esti vanhan vian kuittauksen! Tämä johtuu Supabasen RLS-oikeuksista.");
                    } else {
                        vanha.status = "Completed"; 
                    }
                }
            }
        }

        // 2. TÄMÄ TALLENTUU SELAIMEN MUISTIIN (käyttää isoa kirjainta eli camelCase)
        // Näin varmistetaan, että selain löytää "tyoNumero" ja "tyoTyyppi" heti ilman päivitystä.
        const uiObj = {
            id: dbObj.id, pvm: dbObj.pvm, tyoNumero: dbObj.tyo_numero, tyoTyyppi: dbObj.tyo_tyyppi,
            sijainti: dbObj.sijainti, otsikko: dbObj.otsikko, osat: dbObj.osat, tekija: dbObj.tekija, status: dbObj.status
        };

        // Päivitetään paikallinen taulukko UI-objektilla
        if (siirretaanToiselle) {
            if (huoltoHistoria[valittuKuljetinID].length === 0) delete huoltoHistoria[valittuKuljetinID];
            await synkronoiLaitteenVikatila(valittuKuljetinID);
            if (!huoltoHistoria[kohdeLaiteID]) huoltoHistoria[kohdeLaiteID] = [];
            huoltoHistoria[kohdeLaiteID].unshift(uiObj);
        } else {
            if (!huoltoHistoria[kohdeLaiteID]) huoltoHistoria[kohdeLaiteID] = [];
            if (muokattavaIndeksi === -1) { huoltoHistoria[kohdeLaiteID].unshift(uiObj); } 
            else { huoltoHistoria[kohdeLaiteID][muokattavaIndeksi] = uiObj; }
        }

        await synkronoiLaitteenVikatila(kohdeLaiteID);
        
        piilotaLisaysLomake(); avaaTiedot(valittuKuljetinID); 
        paivitaVikaKartta(); paivitaVikaLista(); paivitaKokoHistoriaNakyma();
        paivitaPeruskunnostetutKartalle();
    } catch (err) {
        alert("Virhe tallennettaessa: " + err.message);
    }
}

        await synkronoiLaitteenVikatila(kohdeLaiteID);
        
        piilotaLisaysLomake(); avaaTiedot(valittuKuljetinID); 
        paivitaVikaKartta(); paivitaVikaLista(); paivitaKokoHistoriaNakyma();
        paivitaPeruskunnostetutKartalle();
    } catch (err) {
        alert("Virhe tallennettaessa: " + err.message);
    }
}

async function poistaValittuTyo() {
    if (!onkoAdmin) { alert("Sinulla ei ole oikeuksia poistaa tätä riviä!"); return; }
    if (muokattavaIndeksi === -1 || !valittuKuljetinID) return;
    
    if (confirm("Haluatko varmasti poistaa tämän työn lopullisesti järjestelmästä?")) {
        const merkinta = huoltoHistoria[valittuKuljetinID][muokattavaIndeksi];
        
        try {
            if (merkinta.id) {
                const { error } = await supabaseclient.from('huoltohistoria').delete().eq('id', merkinta.id);
                if (error) throw error; 
            }
            huoltoHistoria[valittuKuljetinID].splice(muokattavaIndeksi, 1);
            if (huoltoHistoria[valittuKuljetinID].length === 0) { delete huoltoHistoria[valittuKuljetinID]; }
            
            await synkronoiLaitteenVikatila(valittuKuljetinID);

            piilotaLisaysLomake(); avaaTiedot(valittuKuljetinID); 
            paivitaVikaKartta(); paivitaVikaLista(); paivitaKokoHistoriaNakyma();
            paivitaPeruskunnostetutKartalle();
        } catch(err) {
            alert("Tietokantavirhe poistossa: " + err.message);
        }
    }
}
