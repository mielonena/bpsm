// ========================================== //
// === 6. KÄYTTÖLIITTYMÄ JA NAVIGOINTI ====== //
// ========================================== //

function erotteleLaiteTiedot(id) {
    if (id && id.includes(" - ")) {
        const index = id.indexOf(" - ");
        const ryhma = id.substring(0, index).trim();
        const nimi = id.substring(index + 3).trim();
        return { ryhma: ryhma, nimi: nimi };
    }
    return { ryhma: "", nimi: id };
}

function vaihdaTaso(taso) {
    document.querySelectorAll(".taso-nappi").forEach(btn => btn.classList.remove("aktiivinen"));
    
    const ylaNakyma = document.getElementById("nakyma-yla"); 
    const alaNakyma = document.getElementById("nakyma-ala");
    const ylaRata = document.getElementById("taso-yla"); 
    const alaRata = document.getElementById("taso-ala");
    const karttaAlue = document.querySelector(".kartta-alue"); 
    const listaAlue = document.getElementById("lista-alue");
    const viatAlue = document.getElementById("viat-alue"); 
    const historiaAlue = document.getElementById("historia-alue");
    const varaosatAlue = document.getElementById("varaosat-alue");
    const kaapitAlue = document.getElementById("kaapit-alue");
    const suunnitteluAlue = document.getElementById("suunnittelu-alue");

    if(karttaAlue) karttaAlue.style.display = "none"; 
    if(listaAlue) listaAlue.style.display = "none";
    if(viatAlue) viatAlue.style.display = "none"; 
    if (historiaAlue) historiaAlue.style.display = "none";
    if (varaosatAlue) varaosatAlue.style.display = "none";
    if(kaapitAlue) kaapitAlue.style.display = "none";
    if(suunnitteluAlue) suunnitteluAlue.style.display = "none";

    if (taso === 'lista') {
        document.getElementById("btnLista").classList.add("aktiivinen");
        if(listaAlue) listaAlue.style.display = "block";
    } else if (taso === 'viat') {
        document.getElementById("btnViat").classList.add("aktiivinen");
        if(viatAlue) viatAlue.style.display = "block"; 
        paivitaVikaLista(); 
    } else if (taso === 'historia') {
        const btnHist = document.getElementById("btnKokoHistoria");
        if (btnHist) btnHist.classList.add("aktiivinen");
        if (historiaAlue) historiaAlue.style.display = "block";
        paivitaKokoHistoriaNakyma(); 
    } else if (taso === 'varaosat') {
        const btnVar = document.getElementById("btnVaraosat");
        if (btnVar) btnVar.classList.add("aktiivinen");
        if (varaosatAlue) varaosatAlue.style.display = "block";
        generoiKaikkiVaraosatNakyma(); 
    } else if (taso === 'kaapit') {
        const btnKaapit = document.getElementById("btnKaapit");
        if (btnKaapit) btnKaapit.classList.add("aktiivinen");
        if (kaapitAlue) kaapitAlue.style.display = "block";
    } else if (taso === 'suunnittelu') {
        const btnSuunnittelu = document.getElementById("btnSuunnittelu");
        if (btnSuunnittelu) btnSuunnittelu.classList.add("aktiivinen");
        if (suunnitteluAlue) suunnitteluAlue.style.display = "block";
        generoiSuunnitteluNakyma();
    } else {
        if(karttaAlue) karttaAlue.style.display = "block";
        if (taso === 'yla') {
            document.getElementById("btnYla").classList.add("aktiivinen");
            if(ylaNakyma) ylaNakyma.style.display = "block"; 
            if(alaNakyma) alaNakyma.style.display = "none";
            if (ylaRata) ylaRata.style.display = "block"; 
            if (alaRata) alaRata.style.display = "none";
        } else if (taso === 'ala') {
            document.getElementById("btnAla").classList.add("aktiivinen");
            if(ylaNakyma) ylaNakyma.style.display = "none"; 
            if(alaNakyma) alaNakyma.style.display = "block";
            if (ylaRata) ylaRata.style.display = "none"; 
            if (alaRata) alaRata.style.display = "block";
        } else if (taso === 'kaikki') {
            document.getElementById("btnKaikki").classList.add("aktiivinen");
            if(ylaNakyma) ylaNakyma.style.display = "block"; 
            if(alaNakyma) alaNakyma.style.display = "block";
            if (ylaRata) ylaRata.style.display = "block"; 
            if (alaRata) alaRata.style.display = "block";
        }
    }
}

function vaihdaPeruskunnostusNakyma() {
    const nappi = document.getElementById("btnPeruskunnostetut");
    const filtteriValikko = document.getElementById("peruskunnostusFiltteri");
    const vuosiValikko = document.getElementById("pk-vuosi-asetus");

    peruskunnostusNakymaPaalla = !peruskunnostusNakymaPaalla;
    
    if (peruskunnostusNakymaPaalla) {
        nappi.classList.add("aktiivinen"); 
        nappi.style.backgroundColor = "#2ecc71"; 
        nappi.style.color = "white";
        if (filtteriValikko) filtteriValikko.style.display = "inline-block";
        if (vuosiValikko) vuosiValikko.style.display = "inline-block";
    } else {
        nappi.classList.remove("aktiivinen"); 
        nappi.style.backgroundColor = ""; 
        nappi.style.color = "";
        if (filtteriValikko) { 
            filtteriValikko.style.display = "none"; 
            filtteriValikko.value = "Kaikki"; 
        }
        if (vuosiValikko) { 
            vuosiValikko.style.display = "none";
        }
    }
    paivitaPeruskunnostetutKartalle();
}

function vaihdaValilehti(evt, tabId) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        tablinks[i].style.backgroundColor = "#f1f1f1";
        tablinks[i].style.color = "#333";
        tablinks[i].style.fontWeight = "normal";
    }
    if(document.getElementById(tabId)) document.getElementById(tabId).style.display = "block";
    if (evt && evt.currentTarget) {
        evt.currentTarget.className += " active";
        evt.currentTarget.style.backgroundColor = "#007bff";
        evt.currentTarget.style.color = "white";
        evt.currentTarget.style.fontWeight = "bold";
    }
}

function generoiListanakyma() {
    const listaAlue = document.getElementById("lista-alue");
    if (!listaAlue) return;

    try {
        const laitteetMap = new Map();
        document.querySelectorAll(".rata-osa").forEach(osa => {
            const nimi = osa.getAttribute("data-nimi");
            if (!nimi) return; 

            const onclickAttr = osa.getAttribute("onclick"); 
            let id = "";
            if (onclickAttr) { 
                const match = String(onclickAttr).match(/'(.*?)'/); 
                if (match) id = match[1]; 
            }
            const parentG = osa.closest("g");
            const parentId = parentG ? parentG.id || "" : "";
            
            if (id) {
                laitteetMap.set(id, { 
                    nimi: String(nimi), 
                    id: String(id), 
                    onclickAttr: String(onclickAttr), 
                    parentId: String(parentId) 
                });
            }
        });

        const kaikkiLaitteet = Array.from(laitteetMap.values());
        const sijoitetutAvaimet = new Set();

        // TUNNISTUSFUNKTIOT
        const onVetoasema = (l) => l.id.toLowerCase().includes("vetoasema") || l.nimi.toLowerCase().includes("vetoasema") || l.parentId.toLowerCase().includes("vetoasema");
        const onKaarre = (l) => l.id.toLowerCase().includes("kaarre") || l.nimi.toLowerCase().includes("kaarre") || l.parentId.toLowerCase().includes("kaarre");
        const onYla = (l) => l.id.toLowerCase().includes("ylä") || l.nimi.toLowerCase().includes("ylä") || l.parentId.toLowerCase().includes("yla") || l.id.toUpperCase().includes("SO01") || l.nimi.toUpperCase().includes("SO01");
        const onKamera = (l) => l.id.toLowerCase().includes("kameratunneli") || l.nimi.toLowerCase().includes("kameratunneli") || l.parentId.toLowerCase().includes("kameratunneli");
        const onHukkaluisu = (l) => {
            const u = l.id.toUpperCase();
            const n = l.nimi.toUpperCase();
            return u.includes("HUKKALUISUKULJETIN") || n.includes("HUKKALUISUKULJETIN") || (n >= "30101" && n <= "30105");
        };
        const onSahkokaappi = (l) => {
            const u = l.id.toUpperCase();
            return u.includes("SD0") || u.includes("PT0") || u.includes(".CC0") || u.includes("ED0") || u.includes("AD0") || u.includes("A011") || u.includes("A012") || u.includes("DI01");
        };

        function poimiNumero(str) {
            if (!str) return null;
            const matches = String(str).match(/\d+/g);
            return matches ? parseInt(matches[matches.length - 1], 10) : null;
        }

        let html = "<h2 style='margin-top: 0; color: #2c3e50; border-bottom: 2px solid #bdc3c7; padding-bottom: 10px;'>Kaikki laitteet luettelona</h2>";

        // ========================================== //
        // 1. KL-KULJETTIMET
        // ========================================== //
        html += "<h3 style='color: #2c3e50; margin-top: 35px; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;'>KL-Kuljettimet ryhmittäin</h3>";
        const klRyhmat = { "KL1": [], "KL2": [], "KL3": [], "KL4": [], "KL5": [], "KL6": [], "KL7": [] };

        function haeKLRyhma(laite) {
            const hakuTeksti = `${laite.id} ${laite.nimi} ${laite.parentId}`.toUpperCase();
            let match = hakuTeksti.match(/(KL[1-7])/);
            if (match) return match[1];
            match = hakuTeksti.match(/KAATOLAITE\s*([12367])/);
            if (match) return `KL${match[1]}`;
            match = hakuTeksti.match(/RULLAKKOKAATOLAITE\s*([45])/);
            if (match) return `KL${match[1]}`;
            match = hakuTeksti.match(/PATJAKULJETIN\s*([1-7])/);
            if (match) return `KL${match[1]}`;
            if (hakuTeksti.includes("VIHREÄ HIHNA VASEN")) return "KL4";
            if (hakuTeksti.includes("VIHREÄ HIHNA OIKEA")) return "KL5";
            return null;
        }
        
        kaikkiLaitteet.forEach(laite => {
            if (!sijoitetutAvaimet.has(laite.id) && !onVetoasema(laite) && !onKaarre(laite) && !onSahkokaappi(laite) && !onHukkaluisu(laite)) {
                const klTunnus = haeKLRyhma(laite);
                if (klTunnus && klRyhmat[klTunnus]) {
                    klRyhmat[klTunnus].push(laite);
                    sijoitetutAvaimet.add(laite.id);
                }
            }
        });

        html += "<div style='display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-bottom: 25px;'>";
        Object.keys(klRyhmat).forEach(ryhma => {
            let ryhmanLaitteet = klRyhmat[ryhma];
            ryhmanLaitteet.sort((a, b) => {
                function haePaino(nimi) {
                    const upper = String(nimi).toUpperCase();
                    if (upper.includes("KAATOLAITE") && !upper.includes("RULLAKKO")) return 1;
                    if (upper.includes("RULLAKKOKAATOLAITE")) return 2;
                    if (upper.includes("VIHREÄ HIHNA")) return 3;
                    if (upper.includes("PATJAKULJETIN")) return 4;
                    return 5;
                }
                const painoA = haePaino(a.nimi); const painoB = haePaino(b.nimi);
                if (painoA !== painoB) return painoA - painoB;
                return a.nimi.localeCompare(b.nimi, undefined, { numeric: true, sensitivity: 'base' });
            });

            html += `
            <div style='background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; border-top: 4px solid #2980b9; box-shadow: 0 1px 3px rgba(0,0,0,0.02);'>
                <strong style="color: #2c3e50; font-size: 14px; display: block; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Ryhmä ${ryhma}</strong>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
            `;
            if (ryhmanLaitteet.length === 0) html += `<span style="font-size: 11px; color: #bdc3c7; font-style: italic;">Ei muita hihnoja</span>`;
            else ryhmanLaitteet.forEach(item => html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}">${item.nimi}</button>`);
            html += `</div></div>`;
        });
        html += "</div>";

        // ========================================== //
        // 2. LINJAT JA LUISUT
        // ========================================== //
        html += "<h3 style='color: #2c3e50; margin-top: 25px; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;'>Linjat ja luisut (Kulku H ➔ A)</h3>";

        const riviMaarittelyt = [
            { riviNimi: "Linja H", sarjat: [{ tag: "H1", info: "951 - 960", kuuluu: (n) => n >= 951 && n <= 960, suunta: "asc" }, { tag: "H2", info: "971", kuuluu: (n) => n === 971, suunta: "asc" }] },
            { riviNimi: "Linja G", sarjat: [{ tag: "G1", info: "901 - 910", kuuluu: (n) => n >= 901 && n <= 910, suunta: "asc" }] },
            { riviNimi: "Linja F", sarjat: [{ tag: "F1", info: "829 - 821", kuuluu: (n) => n >= 821 && n <= 829, suunta: "desc" }, { tag: "F2", info: "805 - 801", kuuluu: (n) => n >= 801 && n <= 805, suunta: "desc" }] },
            { riviNimi: "Linja E", sarjat: [{ tag: "E1", info: "879 - 871", kuuluu: (n) => n >= 871 && n <= 879, suunta: "desc" }, { tag: "E2", info: "855 - 851", kuuluu: (n) => n >= 851 && n <= 855, suunta: "desc" }] },
            { riviNimi: "Linja D", sarjat: [{ tag: "D1", info: "751 - 777", kuuluu: (n) => n >= 751 && n <= 777, suunta: "asc" }] },
            { riviNimi: "Linja C", sarjat: [{ tag: "C1", info: "701 - 728", kuuluu: (n) => n >= 701 && n <= 728, suunta: "asc" }] },
            { riviNimi: "Linja B", sarjat: [{ tag: "B1", info: "642 - 621 + 611", kuuluu: (n) => (n >= 621 && n <= 642) || n === 611, suunta: "custom_b1" }, { tag: "B2", info: "606 - 601", kuuluu: (n) => n >= 601 && n <= 606, suunta: "desc" }] },
            { riviNimi: "Linja A", sarjat: [{ tag: "A1", info: "692 - 671 + 661", kuuluu: (n) => (n >= 671 && n <= 692) || n === 661, suunta: "custom_a1" }, { tag: "A2", info: "656 - 651", kuuluu: (n) => n >= 651 && n <= 656, suunta: "desc" }] }
        ];

        riviMaarittelyt.forEach(rivi => {
            html += `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid #34495e; padding: 15px; border-radius: 6px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 15px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${rivi.riviNimi}</h3>
                <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
            `;
            rivi.sarjat.forEach((sarja, sIndex) => {
                if (sIndex > 0) html += `<div style="width: 1px; background: #cbd5e1; align-self: stretch; margin: 0 5px; min-height: 40px;"></div>`;
                
                let sarjanLaitteet = kaikkiLaitteet.filter(laite => {
                    if (sijoitetutAvaimet.has(laite.id)) return false; 
                    if (onVetoasema(laite) || onKaarre(laite) || onSahkokaappi(laite) || onHukkaluisu(laite)) return false;
                    
                    const n = poimiNumero(laite.nimi);
                    const parentN = poimiNumero(laite.parentId);
                    return (n !== null && sarja.kuuluu(n)) || (parentN !== null && sarja.kuuluu(parentN));
                });

                if (sarja.suunta === "asc") sarjanLaitteet.sort((a, b) => (poimiNumero(a.nimi) || 0) - (poimiNumero(b.nimi) || 0));
                else if (sarja.suunta === "desc") sarjanLaitteet.sort((a, b) => (poimiNumero(b.nimi) || 0) - (poimiNumero(a.nimi) || 0));
                else if (sarja.suunta === "custom_b1") sarjanLaitteet.sort((a, b) => { const nA = poimiNumero(a.nimi) || 0, nB = poimiNumero(b.nimi) || 0; if (nA === 611) return 1; if (nB === 611) return -1; return nB - nA; });
                else if (sarja.suunta === "custom_a1") sarjanLaitteet.sort((a, b) => { const nA = poimiNumero(a.nimi) || 0, nB = poimiNumero(b.nimi) || 0; if (nA === 661) return 1; if (nB === 661) return -1; return nB - nA; });

                sarjanLaitteet.forEach(l => sijoitetutAvaimet.add(l.id));

                html += `
                <div style="flex: 1; min-width: 240px;">
                    <div style="margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                        <span style="background: #34495e; color: #ffffff; font-size: 11px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">${sarja.tag}</span>
                        <span style="font-size: 12px; color: #7f8c8d; font-style: italic;">(${sarja.info})</span>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                `;
                if (sarjanLaitteet.length === 0) html += `<span style="font-size: 12px; color: #cbd5e1; font-style: italic;">Ei laitteita linjalla</span>`;
                else sarjanLaitteet.forEach(pos => html += `<button class="lista-positio-nappi" data-tiedot-id="${pos.id}" onclick="${pos.onclickAttr}" style="padding: 6px 12px; font-size: 13px; font-weight: bold; border-radius: 4px; cursor: pointer;">${pos.nimi}</button>`);
                html += `</div></div>`;
            });
            html += `</div></div>`;
        });
        // ========================================== //
        // 5.5. HUKKALUISUKULJETIN JA SEURAAVAT (30101-30105)
        // ========================================== //
        let hukkaluisuLaitteet = kaikkiLaitteet.filter(l => onHukkaluisu(l) && !sijoitetutAvaimet.has(l.id));
        hukkaluisuLaitteet.forEach(l => sijoitetutAvaimet.add(l.id));
        hukkaluisuLaitteet.sort((a, b) => a.nimi.localeCompare(b.nimi, undefined, { numeric: true }));

        if (hukkaluisuLaitteet.length > 0) {
            html += `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid #e67e22; padding: 15px; border-radius: 6px; margin-bottom: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 12px 0; color: #d35400; font-size: 15px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Hukkaluisukuljetin ja seuranta (30101 - 30105)</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            `;
            hukkaluisuLaitteet.forEach(item => html += `<button class="lista-positio-nappi" data-tiedot-id="${item.id}" onclick="${item.onclickAttr}" style="padding: 6px 12px; font-size: 13px; font-weight: bold; border-radius: 4px; cursor: pointer;">${item.nimi}</button>`);
            html += `</div></div>`;
        }
        // ========================================== //
        // 3. VETOASEMAT
        // ========================================== //
        html += "<h3 style='color: #2c3e50; margin-top: 35px; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;'>Vetoasemat</h3>";
        let vetoYla = kaikkiLaitteet.filter(l => onVetoasema(l) && onYla(l) && !sijoitetutAvaimet.has(l.id));
        let vetoAla = kaikkiLaitteet.filter(l => onVetoasema(l) && !onYla(l) && !sijoitetutAvaimet.has(l.id));
        vetoYla.forEach(l => sijoitetutAvaimet.add(l.id)); vetoAla.forEach(l => sijoitetutAvaimet.add(l.id));
        vetoYla.sort((a, b) => a.nimi.localeCompare(b.nimi, undefined, { numeric: true }));
        vetoAla.sort((a, b) => a.nimi.localeCompare(b.nimi, undefined, { numeric: true }));

        html += `
        <div style='display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;'>
            <div style='flex: 1; min-width: 280px; background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #2ecc71;'>
                <h4 style="margin: 0 0 10px 0; color: #27ae60; font-size: 14px; font-weight: bold;">🔼 Yläkoneen vetoasemat</h4>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
        `;
        if(vetoYla.length === 0) html += `<span style="font-size: 12px; color: #cbd5e1; font-style: italic;">Ei vetoasemia</span>`;
        else vetoYla.forEach(item => html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}">${item.nimi}</button>`);
        html += `</div></div>`;

        html += `
            <div style='flex: 1; min-width: 280px; background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #3498db;'>
                <h4 style="margin: 0 0 10px 0; color: #2980b9; font-size: 14px; font-weight: bold;">🔽 Alakoneen vetoasemat</h4>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
        `;
        if(vetoAla.length === 0) html += `<span style="font-size: 12px; color: #cbd5e1; font-style: italic;">Ei vetoasemia</span>`;
        else vetoAla.forEach(item => html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}">${item.nimi}</button>`);
        html += `</div></div></div>`;

        // ========================================== //
        // 4. KAARTEET
        // ========================================== //
        html += "<h3 style='color: #2c3e50; margin-top: 35px; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;'>Kaarteet</h3>";
        let kaarreYla = kaikkiLaitteet.filter(l => onKaarre(l) && onYla(l) && !sijoitetutAvaimet.has(l.id));
        let kaarreAla = kaikkiLaitteet.filter(l => onKaarre(l) && !onYla(l) && !sijoitetutAvaimet.has(l.id));
        kaarreYla.forEach(l => sijoitetutAvaimet.add(l.id)); kaarreAla.forEach(l => sijoitetutAvaimet.add(l.id));
        kaarreYla.sort((a, b) => a.nimi.localeCompare(b.nimi, undefined, { numeric: true }));
        kaarreAla.sort((a, b) => a.nimi.localeCompare(b.nimi, undefined, { numeric: true }));

        html += `
        <div style='display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;'>
            <div style='flex: 1; min-width: 280px; background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #2ecc71;'>
                <h4 style="margin: 0 0 10px 0; color: #27ae60; font-size: 14px; font-weight: bold;">🔼 Yläkoneen kaarteet</h4>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
        `;
        if(kaarreYla.length === 0) html += `<span style="font-size: 12px; color: #cbd5e1; font-style: italic;">Ei kaarrekappaleita</span>`;
        else kaarreYla.forEach(item => html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}">${item.nimi}</button>`);
        html += `</div></div>`;

        html += `
            <div style='flex: 1; min-width: 280px; background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #3498db;'>
                <h4 style="margin: 0 0 10px 0; color: #2980b9; font-size: 14px; font-weight: bold;">🔽 Alakoneen kaarteet</h4>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
        `;
        if(kaarreAla.length === 0) html += `<span style="font-size: 12px; color: #cbd5e1; font-style: italic;">Ei kaarrekappaleita</span>`;
        else kaarreAla.forEach(item => html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}">${item.nimi}</button>`);
        html += `</div></div></div>`;

        // ========================================== //
        // 5. KAMERATUNNELIT
        // ========================================== //
        html += "<h3 style='color: #2c3e50; margin-top: 35px; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;'>Kameratunnelit</h3>";
        let kameraYla = kaikkiLaitteet.filter(l => onKamera(l) && onYla(l) && !sijoitetutAvaimet.has(l.id));
        let kameraAla = kaikkiLaitteet.filter(l => onKamera(l) && !onYla(l) && !sijoitetutAvaimet.has(l.id));
        kameraYla.forEach(l => sijoitetutAvaimet.add(l.id)); kameraAla.forEach(l => sijoitetutAvaimet.add(l.id));
        kameraYla.sort((a, b) => a.nimi.localeCompare(b.nimi, undefined, { numeric: true }));
        kameraAla.sort((a, b) => a.nimi.localeCompare(b.nimi, undefined, { numeric: true }));

        html += `
        <div style='display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;'>
            <div style='flex: 1; min-width: 280px; background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #2ecc71;'>
                <h4 style="margin: 0 0 10px 0; color: #27ae60; font-size: 14px; font-weight: bold;">🔼 Yläkoneen kameratunnelit</h4>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
        `;
        if(kameraYla.length === 0) html += `<span style="font-size: 12px; color: #cbd5e1; font-style: italic;">Ei kameratunneleita</span>`;
        else kameraYla.forEach(item => html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}">${item.nimi}</button>`);
        html += `</div></div>`;

        html += `
            <div style='flex: 1; min-width: 280px; background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; border-left: 4px solid #3498db;'>
                <h4 style="margin: 0 0 10px 0; color: #2980b9; font-size: 14px; font-weight: bold;">🔽 Alakoneen kameratunnelit</h4>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
        `;
        if(kameraAla.length === 0) html += `<span style="font-size: 12px; color: #cbd5e1; font-style: italic;">Ei kameratunneleita</span>`;
        else kameraAla.forEach(item => html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}">${item.nimi}</button>`);
        html += `</div></div></div>`;



        // ========================================== //
        // 6. SÄHKÖKAAPIT JA KESKUKSET
        // ========================================== //
        html += "<h3 style='color: #d35400; margin-top: 35px; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;'>Sähkökaapit ja -keskukset ⚡</h3>";
        
        let kaapit = kaikkiLaitteet.filter(l => onSahkokaappi(l) && !sijoitetutAvaimet.has(l.id));
        kaapit.forEach(l => sijoitetutAvaimet.add(l.id));
        
        const kaappiRyhmat = { 
            "SO01.PT001 Pääkeskus": [], 
            "SO01 Pääkeskus (CC001)": [], 
            "SO02 Pääkeskus (CC001)": [], 
            "OU01 Alakeskus (CC001)": [], 
            "Muut sähkökomponentit": [] 
        };
        
        kaapit.forEach(k => {
            const u = k.id.toUpperCase();
            if (u.includes("PT001")) {
                kaappiRyhmat["SO01.PT001 Pääkeskus"].push(k);
            } else if (u.includes("SO01")) {
                kaappiRyhmat["SO01 Pääkeskus (CC001)"].push(k);
            } else if (u.includes("SO02")) {
                kaappiRyhmat["SO02 Pääkeskus (CC001)"].push(k);
            } else if (u.includes("OU01")) {
                kaappiRyhmat["OU01 Alakeskus (CC001)"].push(k);
            } else {
                kaappiRyhmat["Muut sähkökomponentit"].push(k);
            }
        });

        html += "<div style='display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; margin-bottom: 25px;'>";
        Object.keys(kaappiRyhmat).forEach(ryhma => {
            if (kaappiRyhmat[ryhma].length === 0) return;
            
            kaappiRyhmat[ryhma].sort((a, b) => {
                const idA = a.id.toUpperCase();
                const idB = b.id.toUpperCase();
                let paaKeskusTunniste = "";
                if (ryhma.includes("SO01 Pääkeskus (CC001)")) paaKeskusTunniste = "SO01.CC001";
                else if (ryhma.includes("SO02 Pääkeskus (CC001)")) paaKeskusTunniste = "SO02.CC001";
                else if (ryhma.includes("OU01 Alakeskus (CC001)")) paaKeskusTunniste = "OU01.CC001";

                if (paaKeskusTunniste && idA.includes(paaKeskusTunniste)) return -1;
                if (paaKeskusTunniste && idB.includes(paaKeskusTunniste)) return 1;
                return a.nimi.localeCompare(b.nimi, undefined, { numeric: true });
            });
            
            html += `
            <div style='background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; border-top: 4px solid #f39c12; box-shadow: 0 1px 3px rgba(0,0,0,0.02);'>
                <h4 style="margin: 0 0 10px 0; color: #d35400; font-size: 14px; font-weight: bold; text-transform: uppercase;">⚡ ${ryhma}</h4>
                <div style='display: flex; flex-wrap: wrap; gap: 6px;'>
            `;
            kaappiRyhmat[ryhma].forEach(item => {
                html += `<button class='lista-positio-nappi' data-tiedot-id="${item.id}" onclick="${item.onclickAttr}" >${item.nimi}</button>`;
            });
            html += `</div></div>`;
        });
        html += "</div>";

        // ========================================== //
        // 7. MUUT JÄRJESTELMÄN OSAT
        // ========================================== //
        const todellisetMuut = kaikkiLaitteet.filter(l => !sijoitetutAvaimet.has(l.id));
        if (todellisetMuut.length > 0) {
            html += `
            <div style="background: #f8f9f9; border: 1px dashed #bdc3c7; padding: 15px; border-radius: 6px; margin-top: 25px;">
                <h3 style="margin: 0 0 10px 0; color: #7f8c8d; font-size: 14px;">Muut järjestelmän osat</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            `;
            todellisetMuut.forEach(pos => html += `<button class="lista-positio-nappi" data-tiedot-id="${pos.id}" onclick="${pos.onclickAttr}">${pos.nimi}</button>`);
            html += `</div></div>`;
        }
        
        listaAlue.innerHTML = html;

    } catch (error) {
        console.error("Virhe generoiListanakyma -funktiossa:", error);
        listaAlue.innerHTML = `<div style="padding: 20px; background: #fdeaea; border-left: 5px solid #e74c3c; color: #c0392b;">
            <h3>⚠️ Virhe listan luonnissa</h3>
            <p>Jokin laitteen tunnus tai nimi aiheutti virheen. Katso tarkemmat tiedot selaimen Konsolista (F12).</p>
            <p style="font-family: monospace; font-size: 12px;">Virheviesti: ${error.message}</p>
        </div>`;
    }
}
// ========================================== //
// === 13. SUUNNITTELU JA AIKAJANA ========== //
// ========================================== //

let suunnitteluNykyinenPvm = new Date(); 
let suunnitteluNakymaTyyppi = 'kalenteri'; // 'kalenteri' tai 'vuosi'
let suunnitteluHakuTeksti = ""; // UUSI: Tallentaa hakukentän arvon

function vaihdaSuunnitteluKuukausi(suunta) {
    suunnitteluNykyinenPvm.setMonth(suunnitteluNykyinenPvm.getMonth() + suunta);
    generoiSuunnitteluNakyma();
}

function vaihdaSuunnitteluVuosi(suunta) {
    suunnitteluNykyinenPvm.setFullYear(suunnitteluNykyinenPvm.getFullYear() + suunta);
    generoiSuunnitteluNakyma();
}

function vaihdaSuunnitteluNakymaa(tyyppi) {
    suunnitteluNakymaTyyppi = tyyppi;
    generoiSuunnitteluNakyma();
}

// UUSI: Funktio joka suodattaa kortit reaaliajassa (ilman koko näkymän latausta)
function suodataOdottavat(hakusana) {
    suunnitteluHakuTeksti = hakusana;
    const haku = hakusana.toLowerCase();
    const kortit = document.querySelectorAll('.odottava-kortti');
    let nakyvat = 0;
    
    kortit.forEach(kortti => {
        const teksti = kortti.getAttribute('data-haku').toLowerCase();
        if (teksti.includes(haku)) {
            kortti.style.display = "block";
            nakyvat++;
        } else {
            kortti.style.display = "none";
        }
    });
    
    // Päivitetään myös otsikon lukumäärä
    const otsikko = document.getElementById("odottavat-otsikko-lkm");
    if(otsikko) {
        otsikko.innerText = haku ? `(${nakyvat} / ${kortit.length})` : `(${kortit.length})`;
    }
}

// Apufunktio viikkonumeron laskemiseen (ISO 8601)
function haeViikkonumero(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function muotoileTietokantaPvm(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function laskeKestoTunteina(arvioStr) {
    if (!arvioStr) return 0;
    const str = String(arvioStr).toLowerCase().replace(',', '.');
    const num = parseFloat(str);
    if (isNaN(num)) return 0;
    if (str.includes('min')) return num / 60;
    return num; 
}

// Drag & Drop -funktiot
function raahausAlkoi(event, id) {
    if (kayttajaRooli === 'katsoja') return;
    event.dataTransfer.setData("text/plain", id);
    event.target.style.opacity = "0.5"; 
}

function raahausPaattyi(event) {
    event.target.style.opacity = "1";
}

function salliPudotus(event) {
    if (kayttajaRooli === 'katsoja') return;
    event.preventDefault(); 
    event.dataTransfer.dropEffect = "move";
}

function korostaPudotusAlue(event, aktiivinen) {
    if (kayttajaRooli === 'katsoja') return;
    const element = event.currentTarget;
    if (aktiivinen) {
        element.style.backgroundColor = "#e8f8f5";
        element.style.borderColor = "#2ecc71";
    } else {
        element.style.backgroundColor = element.getAttribute("data-default-bg") || "#ffffff";
        element.style.borderColor = element.getAttribute("data-default-border") || "#bdc3c7";
    }
}

async function pudotaKalenteriin(event, pvmStr) {
    if (kayttajaRooli === 'katsoja') return;
    event.preventDefault();
    korostaPudotusAlue(event, false);
    
    const laiteId = event.dataTransfer.getData("text/plain");
    if (laiteId) await tallennaSuunniteltuAika(laiteId, pvmStr);
}

async function pudotaBacklogiin(event) {
    if (kayttajaRooli === 'katsoja') return;
    event.preventDefault();
    korostaPudotusAlue(event, false);
    
    const laiteId = event.dataTransfer.getData("text/plain");
    if (laiteId) await poistaSuunniteltuAika(laiteId);
}

function laskeVaraosaYhteenveto(suunnittelemattomat, aikataulutetutTalleKuulle) {
    const osatYhteensa = {};
    const kasitteleTyot = (tyot) => {
        tyot.forEach(v => {
            if (v.varaosatarpeet) {
                const palaset = v.varaosatarpeet.split(',');
                palaset.forEach(p => {
                    let [nimi, maaraStr] = p.split(':');
                    nimi = nimi ? nimi.trim().toUpperCase() : "";
                    if (!nimi) return;
                    let maara = maaraStr ? parseInt(maaraStr.trim()) : 1;
                    if (isNaN(maara)) maara = 1;
                    osatYhteensa[nimi] = (osatYhteensa[nimi] || 0) + maara;
                });
            }
        });
    };
    kasitteleTyot(suunnittelemattomat);
    kasitteleTyot(aikataulutetutTalleKuulle);
    return osatYhteensa;
}

function getVikaTyyli(vika) {
    let bg = "#fdf2e9", border = "#e67e22"; 
    const tyyppi = vika.tyoTyyppi ? vika.tyoTyyppi.toLowerCase() : "";
    
    if (tyyppi === "peruskunnostus") { bg = "#ffffff"; border = "#2ec700"; } 
    else if (tyyppi === "vika") { bg = "#ffffff"; border = "#ff0000"; } 
    else { bg = "#ebf5fb"; border = "#3498db"; } 
    
    let prioIcon = "🟠"; 
    if (vika.prio === "korkea") prioIcon = "🔴️"; 
    if (vika.prio === "matala") prioIcon = "🟡"; 

    return { bg, border, prioIcon };
}

// Pääfunktio näkymän generointiin
function generoiSuunnitteluNakyma() {
    const alue = document.getElementById("suunnittelu-alue");
    if (!alue) return;

    let suunnittelemattomat = [];
    let aikataulutetut = {};

    Object.entries(aktiivisetViat).forEach(([laiteId, vika]) => {
        if (!vika) return;
        const vikaData = {
            id: laiteId,
            otsikko: (typeof vika === "object" && vika.otsikko) ? vika.otsikko : "Vika",
            prio: (typeof vika === "object" && vika.prio) ? vika.prio : "matala",
            tyoTyyppi: (typeof vika === "object" && vika.tyoTyyppi) ? vika.tyoTyyppi : "Vika",
            suunniteltu_pvm: (typeof vika === "object" && vika.suunniteltu_pvm) ? vika.suunniteltu_pvm : null,
            kestoarvio: (typeof vika === "object" && vika.kestoarvio) ? vika.kestoarvio : "",
            varaosatarpeet: (typeof vika === "object" && vika.varaosatarpeet) ? vika.varaosatarpeet : ""
        };

        if (vikaData.suunniteltu_pvm) {
            if (!aikataulutetut[vikaData.suunniteltu_pvm]) aikataulutetut[vikaData.suunniteltu_pvm] = [];
            aikataulutetut[vikaData.suunniteltu_pvm].push(vikaData);
        } else {
            suunnittelemattomat.push(vikaData);
        }
    });

    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h2 style='color: #2980b9; margin: 0;'>Huoltojen suunnittelu ️</h2>
            <div style="display: flex; gap: 10px; background: #ecf0f1; padding: 5px; border-radius: 6px;">
                <button onclick="vaihdaSuunnitteluNakymaa('kalenteri')" style="padding: 8px 16px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s; ${suunnitteluNakymaTyyppi === 'kalenteri' ? 'background: #3498db; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);' : 'background: transparent; color: #7f8c8d;'}">Kuukausinäkymä</button>
                <button onclick="vaihdaSuunnitteluNakymaa('vuosi')" style="padding: 8px 16px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s; ${suunnitteluNakymaTyyppi === 'vuosi' ? 'background: #3498db; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);' : 'background: transparent; color: #7f8c8d;'}">Vuosinäkymä</button>
            </div>
        </div>
        
        <div style="display: flex; gap: 15px; align-items: flex-start; flex-wrap: wrap;">
    `;

    if (suunnitteluNakymaTyyppi === 'kalenteri') {
        const vuosi = suunnitteluNykyinenPvm.getFullYear();
        const kuukausi = suunnitteluNykyinenPvm.getMonth(); 
        const ekaPaiva = new Date(vuosi, kuukausi, 1);
        const vikaPaiva = new Date(vuosi, kuukausi + 1, 0);
        const paiviaYhteensa = vikaPaiva.getDate();
        
        let aloituksenViikonpaiva = ekaPaiva.getDay(); 
        aloituksenViikonpaiva = aloituksenViikonpaiva === 0 ? 7 : aloituksenViikonpaiva; 

        let tamanKuunTyot = [];
        for (let p = 1; p <= paiviaYhteensa; p++) {
            const tkPvm = `${vuosi}-${String(kuukausi + 1).padStart(2, '0')}-${String(p).padStart(2, '0')}`;
            if (aikataulutetut[tkPvm]) tamanKuunTyot.push(...aikataulutetut[tkPvm]);
        }
        const yhteenvetoOsat = laskeVaraosaYhteenveto(suunnittelemattomat, tamanKuunTyot);
        const yhteenvetoAvaimet = Object.keys(yhteenvetoOsat).sort();
        const kkNimet = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"];

        // Lasketaan montako työtä osuu nykyiseen hakuun (otsikkoa varten)
        const osumat = suunnitteluHakuTeksti ? suunnittelemattomat.filter(v => (v.id + " " + v.otsikko).toLowerCase().includes(suunnitteluHakuTeksti)).length : suunnittelemattomat.length;
        const otsikkoLkm = suunnitteluHakuTeksti ? `(${osumat} / ${suunnittelemattomat.length})` : `(${suunnittelemattomat.length})`;

        // ============================
        // VASEN: ODOTTAVAT TYÖT & HAKU
        // ============================
        html += `
            <div style="flex: 1; min-width: 250px; max-width: 320px; background: #ecf0f1; padding: 15px; border-radius: 8px; border-top: 5px solid #e74c3c; height: 75vh; display: flex; flex-direction: column;">
                
                <!-- Otsikko -->
                <h3 style="margin-top: 0; color: #2c3e50; margin-bottom: 10px; font-size: 16px;">
                    Odottavat <span id="odottavat-otsikko-lkm" style="color: #7f8c8d;">${otsikkoLkm}</span>
                </h3>
                
                <!-- Hakukenttä -->
                <input type="text" id="suunnitteluHakuInput" placeholder="🔍 Hae (esim. KL1, laakeri)..." 
                       value="${suunnitteluHakuTeksti}" 
                       oninput="suodataOdottavat(this.value)" 
                       style="width: 100%; padding: 8px; border: 1px solid #bdc3c7; border-radius: 4px; margin-bottom: 10px; box-sizing: border-box; outline: none; font-size: 13px;">
                
                <!-- Drag&Drop alue -->
                <div style="flex: 1; overflow-y: auto; padding-right: 5px; border: 2px dashed transparent; border-radius: 6px; transition: 0.2s;" ondragover="salliPudotus(event)" ondrop="pudotaBacklogiin(event)" ondragenter="korostaPudotusAlue(event, true)" ondragleave="korostaPudotusAlue(event, false)" data-default-bg="transparent" data-default-border="transparent">
        `;
        
        if (suunnittelemattomat.length === 0) {
            html += `<div style="color: #7f8c8d; font-style: italic; padding: 20px; text-align: center;">Kaikki työt aikataulutettu!</div>`;
        } else {
            suunnittelemattomat.forEach(vika => {
                // Määritetään näytetäänkö kortti heti sivun latauksessa jos hakusana on muistissa
                const isMatch = !suunnitteluHakuTeksti || (vika.id + " " + vika.otsikko).toLowerCase().includes(suunnitteluHakuTeksti.toLowerCase());
                html += luoDraggableVikaKortti(vika, isMatch ? "block" : "none");
            });
        }
        html += `</div>`; // Drag alue kiinni
        
        // Varaosayhteenveto
        html += `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #bdc3c7;">
                    <h4 style="margin: 0 0 10px 0; color: #d35400; font-size: 14px;">Varaosatarpeet (Odottavat + Tämä kk)</h4>
                    <div style="background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #bdc3c7; max-height: 150px; overflow-y: auto; font-size: 12px; color: #2c3e50;">
        `;
        if (yhteenvetoAvaimet.length === 0) html += `<em style="color: #7f8c8d;">Ei varaosatarpeita kirjattu.</em>`;
        else {
            html += `<ul style="margin: 0; padding-left: 20px;">`;
            yhteenvetoAvaimet.forEach(osa => html += `<li>${osa}: <strong style="color: #27ae60;">${yhteenvetoOsat[osa]} kpl</strong></li>`);
            html += `</ul>`;
        }
        html += `</div></div></div>`; 

        // ============================
        // OIKEA: KALENTERI
        // ============================
        html += `
            <div style="flex: 3; min-width: 500px; background: #f8f9f9; padding: 15px; border-radius: 8px; border-top: 5px solid #27ae60;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #bdc3c7; padding-bottom: 10px;">
                    <button onclick="vaihdaSuunnitteluKuukausi(-1)" style="padding: 8px 15px; background: #34495e; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">◀ Edellinen kk</button>
                    <h3 style="margin: 0; color: #2c3e50; font-size: 20px;">${kkNimet[kuukausi]} ${vuosi}</h3>
                    <button onclick="vaihdaSuunnitteluKuukausi(1)" style="padding: 8px 15px; background: #34495e; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Seuraava kk ▶</button>
                </div>

                <div style="display: grid; grid-template-columns: 35px repeat(7, 1fr); gap: 6px;">
                    <div></div>
                    <div style="text-align: center; font-weight: bold; color: #7f8c8d; padding: 5px;">Ma</div>
                    <div style="text-align: center; font-weight: bold; color: #7f8c8d; padding: 5px;">Ti</div>
                    <div style="text-align: center; font-weight: bold; color: #7f8c8d; padding: 5px;">Ke</div>
                    <div style="text-align: center; font-weight: bold; color: #7f8c8d; padding: 5px;">To</div>
                    <div style="text-align: center; font-weight: bold; color: #7f8c8d; padding: 5px;">Pe</div>
                    <div style="text-align: center; font-weight: bold; color: #e74c3c; padding: 5px;">La</div>
                    <div style="text-align: center; font-weight: bold; color: #e74c3c; padding: 5px;">Su</div>
        `;

        html += `<div style="display: flex; align-items: center; justify-content: center; font-weight: bold; color: #95a5a6; font-size: 11px; background: #ecf0f1; border-radius: 4px; writing-mode: vertical-rl; transform: rotate(180deg);">Vko ${haeViikkonumero(ekaPaiva)}</div>`;
        for (let i = 1; i < aloituksenViikonpaiva; i++) {
            html += `<div style="background: #e5e8e8; border-radius: 4px; opacity: 0.5;"></div>`;
        }

        const tanaan = new Date();
        const onkoNykyinenKk = (tanaan.getFullYear() === vuosi && tanaan.getMonth() === kuukausi);

        for (let paiva = 1; paiva <= paiviaYhteensa; paiva++) {
            const nykyD = new Date(vuosi, kuukausi, paiva);
            const vkp = nykyD.getDay() || 7; 
            if (paiva > 1 && vkp === 1) {
                html += `<div style="display: flex; align-items: center; justify-content: center; font-weight: bold; color: #95a5a6; font-size: 11px; background: #ecf0f1; border-radius: 4px; writing-mode: vertical-rl; transform: rotate(180deg);">Vko ${haeViikkonumero(nykyD)}</div>`;
            }

            const tietokantaPvm = muotoileTietokantaPvm(nykyD);
            const onTanaan = (onkoNykyinenKk && paiva === tanaan.getDate());
            const solunTausta = onTanaan ? "#ffffff" : "#ffffff";
            const solunReuna = onTanaan ? "#ff0000" : "#bdc3c7";
            const nroVari = onTanaan ? "#ff0000" : "#34495e";
            const paivanTyot = aikataulutetut[tietokantaPvm] || [];

            html += `
                <div style="background: ${solunTausta}; border: 2px solid ${solunReuna}; border-radius: 4px; min-height: 110px; display: flex; flex-direction: column; transition: 0.2s;" ondragover="salliPudotus(event)" ondrop="pudotaKalenteriin(event, '${tietokantaPvm}')" ondragenter="korostaPudotusAlue(event, true)" ondragleave="korostaPudotusAlue(event, false)" data-default-bg="${solunTausta}" data-default-border="${solunReuna}">
                    <div style="text-align: right; padding: 4px 8px; font-weight: bold; border-bottom: 1px solid #ecf0f1; font-size: 14px;">${paiva}.</div>
                    <div style="flex: 1; padding: 4px; display: flex; flex-direction: column; gap: 4px; overflow-y: auto; max-height: 150px;">
            `;
            paivanTyot.forEach(vika => html += luoPieniDraggableVikaKortti(vika));
            html += `</div></div>`;
        }
        html += `</div></div>`; 

    } else {
        // ================================================================= //
        // === NÄKYMÄ 2: VUOSIKATSAUS (Koko ruutu) === //
        // ================================================================= //
        const vuosi = suunnitteluNykyinenPvm.getFullYear();
        
        html += `
            <div style="width: 100%; background: #f8f9f9; padding: 15px; border-radius: 8px; border-top: 5px solid #27ae60; display: flex; flex-direction: column; height: 80vh;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #bdc3c7; padding-bottom: 10px;">
                    <button onclick="vaihdaSuunnitteluVuosi(-1)" style="padding: 8px 15px; background: #8e44ad; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">◀ Edellinen vuosi</button>
                    <div style="text-align: center;">
                        <h3 style="margin: 0; color: #2c3e50; font-size: 22px;">Vuoden ${vuosi} aikataulu</h3>

                    </div>
                    <button onclick="vaihdaSuunnitteluVuosi(1)" style="padding: 8px 15px; background: #8e44ad; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Seuraava vuosi ▶</button>
                </div>

                <div style="display: flex; gap: 6px; flex: 1; overflow-x: auto; padding-bottom: 10px;">
        `;

        const kkNimetLyhyt = ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"];

        for(let kk = 0; kk < 12; kk++) {
            let kkTyot = [];
            let kuukaudenTunnitYhteensa = 0;

            const vikaPaiva = new Date(vuosi, kk + 1, 0).getDate();
            for(let p = 1; p <= vikaPaiva; p++) {
                const tkPvm = `${vuosi}-${String(kk + 1).padStart(2, '0')}-${String(p).padStart(2, '0')}`;
                if(aikataulutetut[tkPvm]) {
                    const tyotPvmOliolla = aikataulutetut[tkPvm].map(t => ({...t, pvmObject: new Date(vuosi, kk, p)}));
                    kkTyot.push(...tyotPvmOliolla);
                }
            }

            html += `
                <div style="flex: 1; min-width: 140px; background: #ffffff; border: 1px solid #bdc3c7; border-radius: 4px; display: flex; flex-direction: column; overflow: hidden;">
                    <div style="background: #ecf0f1; text-align: center; font-weight: bold; padding: 6px; font-size: 14px; border-bottom: 1px solid #bdc3c7; color: #34495e;">
                        ${kkNimetLyhyt[kk]}
                    </div>
                    <div style="padding: 6px; display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1;">
            `;

            if (kkTyot.length === 0) {
                html += `<div style="text-align: center; color: #bdc3c7; font-size: 11px; margin-top: 10px; font-style: italic;">Ei suunniteltuja töitä</div>`;
            } else {
                kkTyot.forEach(vika => {
                    kuukaudenTunnitYhteensa += laskeKestoTunteina(vika.kestoarvio);

                    const tyyli = getVikaTyyli(vika);
                    const pvmStr = `${vika.pvmObject.getDate()}.${vika.pvmObject.getMonth()+1}.`;
                    const vko = haeViikkonumero(vika.pvmObject);
                    const tiedot = erotteleLaiteTiedot(vika.id);
                    const kestoTieto = vika.kestoarvio ? ` | ⏱️ ${vika.kestoarvio} h` : "";

                    html += `
                        <div onclick="avaaTiedot('${vika.id}')" style="background: ${tyyli.bg}; border-left: 4px solid ${tyyli.border}; padding: 6px; border-radius: 4px; font-size: 11px; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.1); transition: 0.1s;" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'" title="${vika.otsikko}\nTyö: ${tiedot.nimi}\nKesto: ${vika.kestoarvio || '-'}">
                            <div style="color: #7f8c8d; font-weight: bold; margin-bottom: 3px; font-size: 10px;">
                                Vko ${vko} &nbsp;|&nbsp; ${pvmStr} ${kestoTieto}
                            </div>
                            <div style="font-weight: bold; color: #2c3e50; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 1px;">
                                ${tiedot.nimi}
                            </div>
                            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #34495e;">
                                ${tyyli.prioIcon} ${vika.otsikko}
                            </div>
                        </div>
                    `;
                });
            }
            html += `</div>`; 
            
            if (kuukaudenTunnitYhteensa > 0) {
                const pyoristettySumma = Math.round(kuukaudenTunnitYhteensa * 10) / 10;
                html += `
                    <div style="background: #fdf2e9; border-top: 1px solid #e67e22; padding: 6px; text-align: center; font-size: 12px; font-weight: bold; color: #d35400;">
                         Yht: ${pyoristettySumma} h
                    </div>
                `;
            }
            
            html += `</div>`; 
        }
        
        html += `</div></div>`; 
    }

    html += `</div>`; 
    alue.innerHTML = html;
}

// UUSI PARAMETRI: displayStyle ohjaa näytetäänkö kortti sivun renderöinnissä
function luoDraggableVikaKortti(vika, displayStyle = "block") {
    const tiedot = erotteleLaiteTiedot(vika.id);
    const tyyli = getVikaTyyli(vika);
    const raahausAttr = kayttajaRooli !== 'katsoja' ? `draggable="true" ondragstart="raahausAlkoi(event, '${vika.id}')" ondragend="raahausPaattyi(event)" style="cursor: grab;"` : '';
    
    // Suodattamista varten kerätään kaikki tekstidata kortin attribuuttiin
    const hakuData = `${vika.id} ${vika.otsikko}`.replace(/"/g, '&quot;');
    
    return `
        <div class="odottava-kortti" data-haku="${hakuData}" style="display: ${displayStyle}; background: ${tyyli.bg}; border-left: 5px solid ${tyyli.border}; padding: 10px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 8px;" ${raahausAttr}>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <strong style="color: #2c3e50; font-size: 14px; line-height: 1.2;">
                    ${vika.otsikko}
                </strong>
                <button onclick="avaaTiedot('${vika.id}')" style="background: none; border: none; cursor: pointer; font-size: 14px;" title="Avaa laitteen tiedot">🔍</button>
            </div>
            
            <div style="font-size: 12px; color: #7f8c8d; line-height: 1.2; margin-bottom: 8px; font-weight: bold;">
                ${tiedot.nimi} <span title="Prioriteetti: ${vika.prio}">${tyyli.prioIcon}</span> 
            </div>
            
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;" onmousedown="event.stopPropagation();">
                <span style="font-size: 11px; color: #7f8c8d; font-weight: bold; width: 35px;">Kesto:</span>
                <input type="text" value="${vika.kestoarvio || ''}" placeholder="0" onchange="tallennaSuunnitteluKentta('${vika.id}', 'kestoarvio', this.value)" style="width: 15px; padding: 2px 4px; font-size: 11px; border: 1px solid #ccc; border-radius: 3px;" ${kayttajaRooli === 'katsoja' ? 'disabled' : ''}><span style="font-size: 11px; color: #7f8c8d; font-weight: bold; width: 35px;">tuntia</span>
            </div>

            <div style="display: flex; align-items: center; gap: 6px;" onmousedown="event.stopPropagation();">
                <span style="font-size: 11px; color: #7f8c8d; font-weight: bold; width: 35px;">Osat:</span>
                <input type="text" value="${vika.varaosatarpeet || ''}" placeholder="BPM..." onchange="tallennaSuunnitteluKentta('${vika.id}', 'varaosatarpeet', this.value)" style="flex: 1; padding: 2px 4px; font-size: 11px; border: 1px solid #ccc; border-radius: 3px;" ${kayttajaRooli === 'katsoja' ? 'disabled' : ''}>
            </div>
        </div>
    `;
}

// Apufunktio: Pieni kortti kalenteriin
function luoPieniDraggableVikaKortti(vika) {
    const tiedot = erotteleLaiteTiedot(vika.id);
    const tyyli = getVikaTyyli(vika);
    const raahausAttr = kayttajaRooli !== 'katsoja' ? `draggable="true" ondragstart="raahausAlkoi(event, '${vika.id}')" ondragend="raahausPaattyi(event)" style="cursor: grab;"` : '';
    
    return `
        <div style="background: ${tyyli.bg}; border-left: 4px solid ${tyyli.border}; padding: 6px; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); font-size: 11px; margin-bottom: 2px;" ${raahausAttr}>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #2c3e50; line-height: 1.2;" title="${tiedot.nimi} - ${vika.otsikko}">
                     ${vika.otsikko}
                </span>
                <button onclick="avaaTiedot('${vika.id}')" style="background: none; border: none; cursor: pointer; font-size: 12px; padding: 0; margin-left: 5px;">🔍</button>
            </div>
            
            <div style="font-size: 10px; color: #7f8c8d; margin-bottom: 4px; font-weight: bold;">${tiedot.nimi} <span title="Prioriteetti: ${vika.prio}">${tyyli.prioIcon}</span></div>

            <div style="display: flex; gap: 4px;" onmousedown="event.stopPropagation();">
                <input type="text" value="${vika.kestoarvio || ''}" 
                       placeholder="2h"
                       title="Kestoarvio"
                       onchange="tallennaSuunnitteluKentta('${vika.id}', 'kestoarvio', this.value)"
                       style="width: 15px; padding: 2px; font-size: 9px; border: 1px solid #ccc; border-radius: 2px; background: rgba(255,255,255,0.8);"
                       ${kayttajaRooli === 'katsoja' ? 'disabled' : ''}>
                       
                <input type="text" value="${vika.varaosatarpeet || ''}" 
                       placeholder="Osat (Nimi:Määrä)"
                       title="Varaosatarpeet"
                       onchange="tallennaSuunnitteluKentta('${vika.id}', 'varaosatarpeet', this.value)"
                       style="flex: 1; padding: 2px; font-size: 9px; border: 1px solid #ccc; border-radius: 2px; background: rgba(255,255,255,0.8);"
                       ${kayttajaRooli === 'katsoja' ? 'disabled' : ''}>
            </div>
        </div>
    `;
}

// Tietokantaan tallentamisen funktiot
async function tallennaSuunnitteluKentta(laiteId, kentta, uusiArvo) {
    if (kayttajaRooli === 'katsoja') return;
    try {
        const updateObj = {}; updateObj[kentta] = uusiArvo;
        const { error } = await supabaseclient.from('aktiiviset_viat').update(updateObj).eq('laite_id', laiteId);
        if (error) throw error;
        if (typeof aktiivisetViat[laiteId] === 'object') aktiivisetViat[laiteId][kentta] = uusiArvo;
        generoiSuunnitteluNakyma();
    } catch (err) { console.error(`Virhe tallennettaessa kenttää ${kentta}:`, err); }
}

async function tallennaSuunniteltuAika(laiteId, uusiPvm) {
    if (kayttajaRooli === 'katsoja') return;
    try {
        const { error } = await supabaseclient.from('aktiiviset_viat').update({ suunniteltu_pvm: uusiPvm }).eq('laite_id', laiteId);
        if (error) throw error;
        if (typeof aktiivisetViat[laiteId] === 'object') aktiivisetViat[laiteId].suunniteltu_pvm = uusiPvm;
        generoiSuunnitteluNakyma();
    } catch (err) { alert("Tallennus epäonnistui: " + err.message); }
}

async function poistaSuunniteltuAika(laiteId) {
    if (kayttajaRooli === 'katsoja') return;
    try {
        const { error } = await supabaseclient.from('aktiiviset_viat').update({ suunniteltu_pvm: null }).eq('laite_id', laiteId);
        if (error) throw error;
        if (typeof aktiivisetViat[laiteId] === 'object') aktiivisetViat[laiteId].suunniteltu_pvm = null;
        generoiSuunnitteluNakyma();
    } catch (err) { alert("Poisto epäonnistui: " + err.message); }
}