// ========================================== //
// === 10. VARAOSIEN HALLINTA (Välilehti) === //
// ========================================== //

function paivitaVaraosatTaulukko(laiteId) {
    const tbody = document.getElementById("varaosatRivit");
    if (!tbody) return;
    tbody.innerHTML = "";

    const laitteenOsat = varaosatData[laiteId] || [];
    if (laitteenOsat.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center; padding: 15px; color: #7f8c8d; font-style: italic;'>Ei määritettyjä varaosia tälle laitteelle.</td></tr>";
        return;
    }

    laitteenOsat.forEach((osa, index) => {
        const tr = document.createElement("tr");
        tr.id = `varaosa-rivi-${index}`;
        tr.style.borderBottom = "1px solid #ddd";
        
        const toiminnot = onkoAdmin ? 
            `<button onclick="muokkaaVaraosa('${laiteId}', ${index})" style="padding: 4px 8px; cursor: pointer; background: #f39c12; color: white; border: none; border-radius: 3px; font-size: 12px; margin-right: 4px;">✏️ Muokkaa</button>
             <button onclick="poistaVaraosa('${laiteId}', ${index})" style="padding: 4px 8px; cursor: pointer; background: #c0392b; color: white; border: none; border-radius: 3px; font-size: 12px;">🗑️</button>` : 
            `<span style="color: #bdc3c7; font-size: 12px;">Vain luku</span>`;

        tr.innerHTML = `
            <td style="border: 1px solid #ccc; padding: 8px;">${osa.numero || "-"}</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${osa.maara || "-"}</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${osa.nimi || "-"}</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${osa.hylly || "-"}</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${osa.toimittaja || "-"}</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${toiminnot}</td>
        `;
        tbody.appendChild(tr);
    });
}

function muokkaaVaraosa(laiteId, index) {
    if(!onkoAdmin) return;
    const osa = varaosatData[laiteId][index];
    const tr = document.getElementById(`varaosa-rivi-${index}`);
    if(!tr) return;

    tr.innerHTML = `
        <td style="border: 1px solid #ccc; padding: 4px;"><input type="text" id="edit-vo-numero-${index}" value="${osa.numero === '-' ? '' : osa.numero}" style="width: 100%; box-sizing: border-box; padding: 4px;"></td>
        <td style="border: 1px solid #ccc; padding: 4px;"><input type="text" id="edit-vo-maara-${index}" value="${osa.maara === '-' ? '' : osa.maara}" style="width: 100%; box-sizing: border-box; padding: 4px;"></td>
        <td style="border: 1px solid #ccc; padding: 4px;"><input type="text" id="edit-vo-nimi-${index}" value="${osa.nimi === '-' ? '' : osa.nimi}" style="width: 100%; box-sizing: border-box; padding: 4px;"></td>
        <td style="border: 1px solid #ccc; padding: 4px;"><input type="text" id="edit-vo-hylly-${index}" value="${osa.hylly === '-' ? '' : osa.hylly}" style="width: 100%; box-sizing: border-box; padding: 4px;"></td>
        <td style="border: 1px solid #ccc; padding: 4px;"><input type="text" id="edit-vo-toimittaja-${index}" value="${osa.toimittaja === '-' ? '' : osa.toimittaja}" style="width: 100%; box-sizing: border-box; padding: 4px;"></td>
        <td style="border: 1px solid #ccc; padding: 4px;">
            <button onclick="tallennaVaraosa('${laiteId}', ${index})" style="padding: 4px 8px; cursor: pointer; background: #27ae60; color: white; border: none; border-radius: 3px; font-size: 12px; margin-right: 4px;">💾</button>
            <button onclick="paivitaVaraosatTaulukko('${laiteId}')" style="padding: 4px 8px; cursor: pointer; background: #7f8c8d; color: white; border: none; border-radius: 3px; font-size: 12px;">❌</button>
        </td>
    `;
}

async function tallennaVaraosa(laiteId, index) {
    if(!onkoAdmin) return;
    const osa = varaosatData[laiteId][index];
    const uusiOsa = {
        laite_id: laiteId,
        numero: document.getElementById(`edit-vo-numero-${index}`).value || "-",
        maara: document.getElementById(`edit-vo-maara-${index}`).value || "0",
        nimi: document.getElementById(`edit-vo-nimi-${index}`).value || "-",
        hylly: document.getElementById(`edit-vo-hylly-${index}`).value || "-",
        toimittaja: document.getElementById(`edit-vo-toimittaja-${index}`).value || "-"
    };

    try {
        if (osa.id) {
            await supabaseclient.from('varaosat').update(uusiOsa).eq('id', osa.id);
        } else {
            const { data, error } = await supabaseclient.from('varaosat').insert(uusiOsa).select();
            if(error) throw error;
            if(data && data[0]) uusiOsa.id = data[0].id;
        }
        varaosatData[laiteId][index] = uusiOsa;
        paivitaVaraosatTaulukko(laiteId);
    } catch(err) { alert("Virhe tallennuksessa: " + err.message); }
}

async function poistaVaraosa(laiteId, index) {
    if(!onkoAdmin) return;
    if(confirm("Haluatko varmasti poistaa tämän varaosan laitteen listalta?")) {
        const osa = varaosatData[laiteId][index];
        try {
            if (osa.id) {
                const {error} = await supabaseclient.from('varaosat').delete().eq('id', osa.id);
                if(error) throw error;
            }
            varaosatData[laiteId].splice(index, 1);
            paivitaVaraosatTaulukko(laiteId);
        } catch(err) { alert("Virhe poistossa: " + err.message); }
    }
}

function lisaaUusiVaraosa() {
    if(!onkoAdmin) { alert("Ei oikeuksia lisätä osia!"); return; }
    const laiteId = valittuKuljetinID;
    if (!varaosatData[laiteId]) varaosatData[laiteId] = [];
    varaosatData[laiteId].push({ numero: "", maara: "1", nimi: "Uusi osa", hylly: "", toimittaja: "" });
    const uusiIndex = varaosatData[laiteId].length - 1;
    paivitaVaraosatTaulukko(laiteId);
    muokkaaVaraosa(laiteId, uusiIndex);
}

// ========================================== //
// === 11. KESKITETTY VARAOSIEN HALLINTA ==== //
// ========================================== //

function generoiKaikkiVaraosatNakyma() {
    const alue = document.getElementById("varaosat-alue");
    if (!alue) return;

    // 1. Luodaan hakukenttä vain kerran (jos sitä ei vielä ole)
    let controls = document.getElementById("master-varaosat-controls");
    let tauluAlue = document.getElementById("master-varaosat-taulu");

    if (!controls) {
        alue.innerHTML = `
            <h2 style='color: #2c3e50; margin-top: 0;'>Kaikki järjestelmän varaosat ⚙️ <span id="master-lkm" style="font-size: 18px; color: #7f8c8d; font-weight: normal;"></span></h2>
            <div id="master-varaosat-controls" style="background: #f8f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #bdc3c7; display: flex; gap: 15px; align-items: center;">
                <strong style="color: #2c3e50;">Etsi osaa:</strong>
                <input type="text" id="hakuMasterVaraosat" placeholder="🔍 Hae numerolla, nimellä tai hyllypaikalla..." 
                       oninput="keskitettyVaraosaHaku = this.value; generoiKaikkiVaraosatNakyma()" 
                       style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; flex: 1; outline: none; max-width: 400px;">
                <span style="color: #7f8c8d; font-size: 13px; margin-left: auto;">💡 Muokkaukset täällä päivittyvät automaattisesti kaikkiin laitteisiin.</span>
            </div>
            <div id="master-varaosat-taulu"></div>
        `;
        controls = document.getElementById("master-varaosat-controls");
        tauluAlue = document.getElementById("master-varaosat-taulu");
    }

    // Päivitetään kentän arvo vain tarvittaessa
    const hakuInput = document.getElementById("hakuMasterVaraosat");
    if (hakuInput && hakuInput.value !== keskitettyVaraosaHaku) {
        hakuInput.value = keskitettyVaraosaHaku;
    }

    // 2. Datan käsittely
    let uniikitOsat = {};
    for (const [laiteId, osat] of Object.entries(varaosatData)) {
        osat.forEach(osa => {
            const nro = osa.numero || "-";
            if (nro === "-" || nro === "") return;
            
            if (!uniikitOsat[nro]) {
                uniikitOsat[nro] = {
                    numero: nro, nimi: osa.nimi || "-", hylly: osa.hylly || "-", toimittaja: osa.toimittaja || "-",
                    kokonaismaara: 0, kayttoKohteet: new Set()
                };
            }
            uniikitOsat[nro].kokonaismaara += parseInt(osa.maara) || 0;
            uniikitOsat[nro].kayttoKohteet.add(laiteId);
        });
    }

    let osatArray = Object.values(uniikitOsat).filter(o => {
        if (!keskitettyVaraosaHaku) return true;
        const termi = keskitettyVaraosaHaku.toLowerCase();
        // Varmistetaan, ettei null kaada toLowerCase-funktiota
        return (o.numero || "").toLowerCase().includes(termi) || 
               (o.nimi || "").toLowerCase().includes(termi) || 
               (o.hylly || "").toLowerCase().includes(termi);
    });

    osatArray.sort((a, b) => (a.numero || "").localeCompare(b.numero || "", undefined, {numeric: true}));

    // Päivitetään otsikon lukumäärä lennosta
    const lkmSpan = document.getElementById("master-lkm");
    if (lkmSpan) lkmSpan.innerText = `(${osatArray.length} erilaista)`;

    // 3. Generoidaan pelkkä taulukko-osuus
    let html = "";
    if (osatArray.length === 0) {
        html += `<p style="color: #7f8c8d; font-style: italic;">Ei varaosia näytettäväksi.</p>`;
    } else {
        html += `<table class="vikatilasto-taulu" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>Varaosanumero</th><th>Nimi</th><th>Hyllypaikka</th><th>Toimittajan nro</th>
                            <th>Kokonais-<br>määrä</th><th>Käyttökohteet (Lkm)</th><th style="width: 120px;">Toiminnot</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        osatArray.forEach(osa => {
            const turvallinenId = (osa.numero || "id").replace(/[^a-zA-Z0-9_-]/g, '_');
            
            const toiminnot = onkoAdmin ? 
                `<button onclick="muokkaaMasterVaraosa('${osa.numero}', '${turvallinenId}')" style="padding: 6px 10px; cursor: pointer; background: #f39c12; color: white; border: none; border-radius: 3px; font-weight: bold; width: 100%;">✏️ Muokkaa</button>` : 
                `<span style="color: #bdc3c7; font-size: 12px;">Vain luku</span>`;

            html += `<tr id="master-rivi-${turvallinenId}">
                        <td style="font-weight: bold;">${osa.numero}</td>
                        <td>${osa.nimi}</td><td><strong>${osa.hylly}</strong></td><td>${osa.toimittaja}</td>
                        <td style="text-align: center; font-weight: bold; color: #2980b9;">${osa.kokonaismaara} kpl</td>
                        <td style="font-size: 12px; color: #7f8c8d;">${osa.kayttoKohteet.size} eri laitteessa</td>
                        <td>${toiminnot}</td>
                     </tr>`;
        });
        html += `</tbody></table>`;
    }
    
    // Piirretään vain taulukko uusiksi, hakukenttä jätetään rauhaan!
    if (tauluAlue) tauluAlue.innerHTML = html;
}

function muokkaaMasterVaraosa(oikeaNumero, turvallinenId) {
    if(!onkoAdmin) return;
    const tr = document.getElementById(`master-rivi-${turvallinenId}`);
    if (!tr) return;

    const tdElementit = tr.getElementsByTagName("td");
    const nykyinenNimi = tdElementit[1].innerText;
    const nykyinenHylly = tdElementit[2].innerText;
    const nykyinenToim = tdElementit[3].innerText;
    const kokMaara = tdElementit[4].innerText;
    const kaytto = tdElementit[5].innerText;

    tr.innerHTML = `
        <td style="font-weight: bold;">${oikeaNumero}</td>
        <td><input type="text" id="master-nimi-${turvallinenId}" value="${nykyinenNimi}" style="width: 100%; padding: 4px; box-sizing: border-box;"></td>
        <td><input type="text" id="master-hylly-${turvallinenId}" value="${nykyinenHylly}" style="width: 100%; padding: 4px; box-sizing: border-box; border: 2px solid #3498db;"></td>
        <td><input type="text" id="master-toim-${turvallinenId}" value="${nykyinenToim}" style="width: 100%; padding: 4px; box-sizing: border-box;"></td>
        <td style="text-align: center; font-weight: bold; color: #2980b9;">${kokMaara}</td>
        <td style="font-size: 12px; color: #7f8c8d;">${kaytto}</td>
        <td>
            <button onclick="tallennaMasterVaraosa('${oikeaNumero}', '${turvallinenId}')" style="padding: 6px; cursor: pointer; background: #27ae60; color: white; border: none; border-radius: 3px; font-weight: bold; margin-bottom: 4px; width: 100%;">💾 Tallenna</button>
            <button onclick="generoiKaikkiVaraosatNakyma()" style="padding: 6px; cursor: pointer; background: #7f8c8d; color: white; border: none; border-radius: 3px; font-weight: bold; width: 100%;">❌ Peru</button>
        </td>
    `;
}

async function tallennaMasterVaraosa(oikeaNumero, turvallinenId) {
    if(!onkoAdmin) return;
    const uusiNimi = document.getElementById(`master-nimi-${turvallinenId}`).value.trim() || "-";
    const uusiHylly = document.getElementById(`master-hylly-${turvallinenId}`).value.trim() || "-";
    const uusiToim = document.getElementById(`master-toim-${turvallinenId}`).value.trim() || "-";

    const updateObj = { nimi: uusiNimi, hylly: uusiHylly, toimittaja: uusiToim };

    try {
        const { error } = await supabaseclient.from('varaosat').update(updateObj).eq('numero', oikeaNumero);
        if (error) throw error;
        
        for (let laiteId in varaosatData) {
            varaosatData[laiteId].forEach(osa => {
                if (osa.numero === oikeaNumero) {
                    osa.nimi = uusiNimi; osa.hylly = uusiHylly; osa.toimittaja = uusiToim;
                }
            });
        }
        generoiKaikkiVaraosatNakyma();
        alert(`✅ Tallennettu ja synkronoitu pilvitietokantaan osanumero: ${oikeaNumero}`);
    } catch(err) { alert("Virhe tallennuksessa: " + err.message); }
}