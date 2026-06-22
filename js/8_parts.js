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

    // Päivitetään kentän arvo vain tarvittaessa (esim. välilehteä vaihtaessa)
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
                    numero: nro, nimi: osa.nimi, hylly: osa.hylly, toimittaja: osa.toimittaja,
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
        return o.numero.toLowerCase().includes(termi) || 
               o.nimi.toLowerCase().includes(termi) || 
               o.hylly.toLowerCase().includes(termi);
    });

    osatArray.sort((a, b) => a.numero.localeCompare(b.numero, undefined, {numeric: true}));

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
            const turvallinenId = osa.numero.replace(/[^a-zA-Z0-9_-]/g, '_');
            
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
    tauluAlue.innerHTML = html;
}