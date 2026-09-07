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

    if(karttaAlue) karttaAlue.style.display = "none"; 
    if(listaAlue) listaAlue.style.display = "none";
    if(viatAlue) viatAlue.style.display = "none"; 
    if (historiaAlue) historiaAlue.style.display = "none";
    if (varaosatAlue) varaosatAlue.style.display = "none";
    if(kaapitAlue) kaapitAlue.style.display = "none";

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
            if (!nimi || String(nimi).toLowerCase().includes("hukkaluisukuljetin")) return; 

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
        
        // LISÄTTY: u.includes("DI01") tunnistaa OU01.DI011 ja DI012 kaapit sähkölistalle!
        const onSahkokaappi = (l) => {
            const u = l.id.toUpperCase();
            return u.includes("SD0") || u.includes("PT0") || u.includes(".CC0") || u.includes("ED0") || u.includes("AD0") || u.includes("A011") || u.includes("A012") || u.includes("DI01");
        };

        function poimiNumero(str) {
            if (!str) return null;
            const matches = String(str).match(/\d+/g);
            return matches ? parseInt(matches[matches.length - 1], 10) : null;
        }

        let html = "<h2 style='margin-top: 0; color: #2c3e50; border-bottom: 2px solid #bdc3c7; padding-bottom: 10px;'>Kaikki laitteet ja linjastot luettelona 📋</h2>";
        
        // ========================================== //
        // 1. LINJAT JA LUISUT
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
                    if (onVetoasema(laite) || onKaarre(laite) || onSahkokaappi(laite)) return false;
                    
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
        // 2. KL-KULJETTIMET
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
            if (!sijoitetutAvaimet.has(laite.id) && !onVetoasema(laite) && !onKaarre(laite) && !onSahkokaappi(laite)) {
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
        // 5. SÄHKÖKAAPIT JA KESKUKSET (UUSI JAOTTELU)
        // ========================================== //
        html += "<h3 style='color: #d35400; margin-top: 35px; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;'>Sähkökaapit ja -keskukset ⚡</h3>";
        
        let kaapit = kaikkiLaitteet.filter(l => onSahkokaappi(l) && !sijoitetutAvaimet.has(l.id));
        kaapit.forEach(l => sijoitetutAvaimet.add(l.id));
        
        // Määritellään uudet ryhmät
        const kaappiRyhmat = { 
            "SO01.PT001 Pääkeskus": [], 
            "SO01 Pääkeskus (CC001)": [], 
            "SO02 Pääkeskus (CC001)": [], 
            "OU01 Alakeskus (CC001)": [], 
            "Muut sähkökomponentit": [] 
        };
        
        kaapit.forEach(k => {
            const u = k.id.toUpperCase();
            
            // Järjestys on tärkeä! Ensin napataan PT001 erilleen, jottei se mene pelkkään "SO01"-ryhmään.
            if (u.includes("PT001")) {
                kaappiRyhmat["SO01.PT001 Pääkeskus"].push(k);
            } else if (u.includes("SO01")) {
                kaappiRyhmat["SO01 Pääkeskus (CC001)"].push(k);
            } else if (u.includes("SO02")) {
                kaappiRyhmat["SO02 Pääkeskus (CC001)"].push(k);
            } else if (u.includes("OU01")) {
                kaappiRyhmat["OU01 Alakeskus (CC001)"].push(k); // OU01:n alle menee nyt myös DI011 ja DI012
            } else {
                kaappiRyhmat["Muut sähkökomponentit"].push(k);
            }
        });

			html += "<div style='display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; margin-bottom: 25px;'>";
			Object.keys(kaappiRyhmat).forEach(ryhma => {
            if (kaappiRyhmat[ryhma].length === 0) return;
            
            // JÄRJESTETÄÄN TAI NOSTETAAN PÄÄKESKUS ENSIMMÄISEKSI
            kaappiRyhmat[ryhma].sort((a, b) => {
                const idA = a.id.toUpperCase();
                const idB = b.id.toUpperCase();

                // Määritellään mikä on kyseisen ryhmän "pääkeskus", joka halutaan kärkeen
                let paaKeskusTunniste = "";
                if (ryhma.includes("SO01 Pääkeskus (CC001)")) paaKeskusTunniste = "SO01.CC001";
                else if (ryhma.includes("SO02 Pääkeskus (CC001)")) paaKeskusTunniste = "SO02.CC001";
                else if (ryhma.includes("OU01 Alakeskus (CC001)")) paaKeskusTunniste = "OU01.CC001";

                // Jos A on pääkeskus, se siirretään aina ensimmäiseksi (-1)
                if (paaKeskusTunniste && idA.includes(paaKeskusTunniste)) return -1;
                // Jos B on pääkeskus, A tulee sen jälkeen (1)
                if (paaKeskusTunniste && idB.includes(paaKeskusTunniste)) return 1;

                // Muut järjestetään normaalisti aakkosnumeerisesti
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
        // 6. MUUT JÄRJESTELMÄN OSAT
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
