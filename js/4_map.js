// ========================================== //
// === 5. KARTAN GENERONTI JA PIIRTÄMINEN === //
// ========================================== //

function generoi700Sarja() {
    const ryhma = document.getElementById("linja-700-sarja");
    if (!ryhma) return;
    const alkuX = -120; const loppuX = 400; const y1 = 710; const y2 = 750; const maara = 28;
    const vali = (loppuX - alkuX) / (maara - 1);
    let html = "";
    for (let i = 0; i < maara; i++) {
        const numero = 701 + i;
        const x = alkuX + (i * vali);
        html += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="rata-osa kl1-osa" style="stroke-width: 10;" data-nimi="${numero}" onclick="avaaTiedot('${numero}')" />`;
    }
    ryhma.innerHTML = html;
}

function generoi750Sarja() {
    const ryhma = document.getElementById("linja-750-sarja");
    if (!ryhma) return;
    const poistettavat = [760, 761, 762, 763]; 
    const alkuX = -120; const loppuX = 400; const y1 = 690; const y2 = 650; const maara = 27;
    const vali = (loppuX - alkuX) / (maara);
    let html = "";
    for (let i = 0; i < maara; i++) {
        const numero = 751 + i;
        if (poistettavat.includes(numero)) continue;
        const x = alkuX + (i * vali);
        html += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="rata-osa kl1-osa" style="stroke-width: 10;" data-nimi="${numero}" onclick="avaaTiedot('${numero}')" />`;
    }
    ryhma.innerHTML = html;
}

function generoi630Sarja() {
    const ryhma = document.getElementById("linja-630-sarja");
    if (!ryhma) return;
    const alkuX = 40; const loppuX = 380; const y1 = 1000; const y2 = 1040; const maara = 18; 
    const vali = (loppuX - alkuX) / (maara - 1);
    let html = "";
    for (let i = 0; i < maara; i++) {
        const numero = 638 - i; 
        const x = alkuX + (i * vali);
        html += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="rata-osa kl1-osa" style="stroke-width: 10;" data-nimi="${numero}" onclick="avaaTiedot('${numero}')" />`;
    }
    ryhma.innerHTML = html;
}

function generoi680Sarja() {
    const ryhma = document.getElementById("linja-680-sarja");
    if (!ryhma) return;
    const poistettavat = [683,684,685]; 
    const alkuX = 40; const loppuX = 380; const y1 = 1060; const y2 = 1100; const maara = 18;
    const vali = (loppuX - alkuX) / (maara - 1);
    let html = "";
    for (let i = 0; i < maara; i++) {
        const numero = 688 - i; 
        if (poistettavat.includes(numero)) continue;
        const x = alkuX + (i * vali);
        html += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="rata-osa kl1-osa" style="stroke-width: 10;" data-nimi="${numero}" onclick="avaaTiedot('${numero}')" />`;
    }
    ryhma.innerHTML = html;
}

function luoLuisut() {
    const luisutRyhma = document.getElementById('Luisut');
    if (!luisutRyhma) return;

    function luoLine(x1, y1, x2, y2, nimi, clickNimi = nimi, width = 20) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
        el.setAttribute("x1", x1); el.setAttribute("y1", y1);
        el.setAttribute("x2", x2); el.setAttribute("y2", y2);
        el.setAttribute("class", "rata-osa kl1-osa");
        el.setAttribute("style", `stroke-width: ${width};`);
        el.setAttribute("data-nimi", nimi);
        el.setAttribute("onclick", `avaaTiedot('${clickNimi}')`);
        luisutRyhma.appendChild(el);
    }

    function luoPath(d, nimi, clickNimi = nimi) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
        el.setAttribute("d", d);
        el.setAttribute("class", "rata-osa kl1-osa");
        el.setAttribute("data-nimi", nimi);
        el.setAttribute("onclick", `avaaTiedot('${clickNimi}')`);
        luisutRyhma.appendChild(el);
    }

    for(let i = 0; i < 10; i++) {
        let x = -100 + (i * 50);
        luoLine(x, 90, x, 50, String(951 + i));
        luoLine(x, 110, x, 150, String(901 + i));
    }
    for(let i = 0; i < 9; i++) {
        let x = -50 + (i * 50);
        luoLine(x, 440, x, 400, String(829 - i));
        luoLine(x, 460, x, 500, String(879 - i));
    }
    for(let i = 0; i < 5; i++) {
        let x = 650 + (i * 50);
        luoLine(x, 440, x, 400, String(805 - i));
        luoLine(x, 460, x, 500, String(855 - i));
    }
    
    luoLine(-120, 710, -120, 740, "701", "701", 10);
    luoLine(400, 710, 400, 740, "728", "728", 10);

    for(let i = 0; i < 4; i++) {
        let x = -75 + (i * 30);
        let kokoNimi = `${642 - i}`; 
        luoLine(x, 1040, x, 1000, kokoNimi, kokoNimi, 12);
    }
    luoLine(410, 1040, 410, 1000, "611"); luoLine(600, 1040, 600, 1000, "606");
    luoLine(650, 1040, 650, 1000, "605"); luoLine(700, 1040, 700, 1000, "604");
    luoLine(850, 1040, 850, 1000, "601");

    for(let i = 0; i < 4; i++) {
        let x = -75 + (i * 30);
        let kokoNimi = `${692 - i}`; 
        luoLine(x, 1060, x, 1100, kokoNimi, kokoNimi, 12);
    }
    luoLine(410, 1060, 410, 1100, "661");
    for(let i = 0; i < 6; i++) { luoLine(600 + (i * 50), 1060, 600 + (i * 50), 1100, String(656 - i)); }

    luoLine(850, 1100, 850, 1150, "Hukkaluisukuljetin 1");
    luoPath("M 880 1180 A 30 30 0 0 1 850 1150", "Hukkaluisukuljetin kaarre 1", "Hukkaluisukuljetin kaarre 1");
    luoLine(880, 1180, 1150, 1180, "Hukkaluisukuljetin 2"); 
    luoPath("M 1180 1150 A 30 30 0 0 1 1150 1180", "Hukkaluisukuljetin kaarre 2", "Hukkaluisukuljetin kaarre 2");
    luoLine(1180, 1030, 1180, 1150, "Hukkaluisukuljetin 3");
}

function luoRuudukonNumerot() {
    const ryhma = document.getElementById("ruudukkoNumerot");
    if(!ryhma) return;
    let html = "";
    for (let x = 0; x <= 1850; x += 50) {
        const isMajor = (x % 250 === 0);
        html += `<text x="${x}" y="${isMajor ? -175 : -185}" fill="${isMajor ? '#e74c3c' : '#7f8c8d'}" font-size="${isMajor ? '16px' : '10px'}" font-weight="${isMajor ? 'bold' : 'normal'}" text-anchor="middle">${x}</text>`;
    }
    for (let y = -200; y <= 1400; y += 50) {
        const isMajor = (y % 250 === 0);
        html += `<text x="${isMajor ? 25 : 5}" y="${y + 4}" fill="${isMajor ? '#e74c3c' : '#7f8c8d'}" font-size="${isMajor ? '16px' : '10px'}" font-weight="${isMajor ? 'bold' : 'normal'}" text-anchor="start">${y}</text>`;
    }
    ryhma.innerHTML = html;
}
function generoiSahkokeskukset() {
    const ryhma = document.getElementById("sahkokeskukset-svg");
    if (!ryhma) return;

    let html = "";

function luoKaappi(x, y, w, h, nimi, otsikko = nimi, tyyppi = "normaali") {
    let fill = "#34495e";
    let textColor = "#ffffff";
    
    if (tyyppi === "iso") fill = "#2c3e50";
    if (tyyppi === "matala") fill = "#7f8c8d";
    if (tyyppi === "pieni") fill = "#95a5a6";
    if (tyyppi === "sisamoduli") { fill = "#ecf0f1"; textColor = "#2c3e50"; }

    // Pakotetaan kaapin oma uniikki fill ja stroke suoraan inline-styleen,
    // jotta mikään ulkopuolinen CSS-tyyli ei pääse yliajamaa niitä.
    html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" 
             class="rata-osa" 
             data-nimi="${nimi}" 
             onclick="avaaTiedot('${nimi}')" 
             style="cursor: pointer; 
                    fill: ${fill} !important; 
                    stroke: #2c3e50 !important; 
                    stroke-width: 1px !important; 
                    vector-effect: non-scaling-stroke; 
                    transition: background-color 0.2s, fill 0.2s;" 
             onmouseover="this.style.setProperty('fill', '#3498db', 'important')" 
             onmouseout="this.style.setProperty('fill', '${fill}', 'important')" />`;

    let fSize = tyyppi === "sisamoduli" ? 12 : 14;
    let displayNimi = otsikko;
    
    if (tyyppi !== "iso" && otsikko.includes(".")) {
        displayNimi = otsikko.split(".")[1];
    }
    
    html += `<text x="${x + w/2}" y="${y + h/2}" fill="${textColor}" font-size="${fSize}px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="middle" pointer-events="none">${displayNimi}</text>`;
    
    if (tyyppi === "matala" || tyyppi === "pieni") {
        let prefix = otsikko.split(".")[0];
        html += `<text x="${x + w/2}" y="${y - 10}" fill="#34495e" font-size="12px" font-weight="bold" font-family="Arial" text-anchor="middle" pointer-events="none">${prefix}</text>`;
    }
}
    // --- RIVI 1: SO01 (Y = 50) ---
    luoKaappi(50, 50, 120, 200, "SO01.PT001", "SO01.PT001", "iso");
    luoKaappi(190, 50, 120, 200, "SO01.CC001", "SO01.CC001", "iso");
    
    let sdX = 330;
    for (let i = 1; i <= 4; i++) {
        let id = `SO01.SD00${i}`;
        luoKaappi(sdX, 150, 120, 100, id, id, "matala");
        // Sisäkaapit A011 & A012 (keskitetty SD-kaapin sisään yläreunaan)
        luoKaappi(sdX + 10, 160, 45, 20, `${id}.A011`, "A011", "sisamoduli");
        luoKaappi(sdX + 65, 160, 45, 20, `${id}.A012`, "A012", "sisamoduli");
        sdX += 140;
    }

    let adX = 890;
    const so01_ads = ["003", "007", "008", "012", "013", "016", "017"];
    so01_ads.forEach(ad => {
        let id = `SO01.AD${ad}-A011`;
        luoKaappi(adX, 170, 90, 80, id, `AD${ad}`, "pieni");
        adX += 110;
    });

    // --- RIVI 2: SO02 (Y = 350) ---
    luoKaappi(50, 350, 120, 200, "SO02.CC001", "SO02.CC001", "iso");
    
    sdX = 190;
    for (let i = 1; i <= 4; i++) {
        let id = `SO02.SD00${i}`;
        luoKaappi(sdX, 450, 120, 100, id, id, "matala");
        luoKaappi(sdX + 10, 460, 45, 20, `${id}.A011`, "A011", "sisamoduli");
        luoKaappi(sdX + 65, 460, 45, 20, `${id}.A012`, "A012", "sisamoduli");
        sdX += 140;
    }

    adX = 750;
    so01_ads.forEach(ad => {
        let id = `SO02.AD${ad}-A011`;
        luoKaappi(adX, 470, 90, 80, id, `AD${ad}`, "pieni");
        adX += 110;
    });

    // --- RIVI 3: OU01 (Y = 650) ---
    luoKaappi(50, 650, 120, 200, "OU01.CC001", "OU01.CC001", "iso");
    
    luoKaappi(190, 750, 120, 100, "OU01.ED001", "OU01.ED001", "matala");
    luoKaappi(330, 750, 120, 100, "OU01.ED002", "OU01.ED002", "matala");

    adX = 470;
    const ou01_smalls = ["DI011", "DI012", "AD001-A011", "AD002-A011", "AD003-A011", "AD004-A011"];
    ou01_smalls.forEach(sm => {
        let id = `OU01.${sm}`;
        let otsikko = sm.replace("-A011", ""); // Lyhennetty näkymä
        luoKaappi(adX, 770, 90, 80, id, otsikko, "pieni");
        adX += 110;
    });

    ryhma.innerHTML = html;
}
function generoiSDKaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero, koko="16px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x + w/2} ${y + h/2})"` : "";
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="${koko}" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none" ${transform}>${numero}</text>
        </g>`;
    }

    function luoRakenne(x, y, w, h, teksti = "") {
        if (w > 0 && h > 0) {
            html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#95a5a6" stroke-width="1" />`;
        }
        if (teksti) {
            html += `<text x="${x + w/2}" y="${y + h/2}" fill="#7f8c8d" font-size="14px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${teksti}</text>`;
        }
    }

    function luoTeksti(x, y, teksti, koko="14px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x} ${y})"` : "";
        html += `<text x="${x}" y="${y}" fill="#34495e" font-size="${koko}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="central" ${transform} pointer-events="none">${teksti}</text>`;
    }

    // --- Taustat ja rakenteet ---
    html += `<rect x="10" y="10" width="780" height="930" fill="none" stroke="#2c3e50" stroke-width="2" />`;
    html += `<rect x="30" y="30" width="740" height="890" fill="none" stroke="#bdc3c7" stroke-width="1" stroke-dasharray="5,5" />`;

    // --- Osat ---
    luoOsa(250, 15, 300, 30, "8");
    luoOsa(700, 15, 40, 30, "9");

    luoOsa(50, 110, 30, 30, "7");
    luoOsa(100, 80, 220, 100, "11");
    luoOsa(350, 80, 60, 100, "12");
    luoOsa(410, 80, 60, 100, "13");
    luoOsa(470, 80, 80, 100, "14");
    luoOsa(550, 80, 80, 100, "15");
    luoOsa(650, 100, 40, 60, "10");

    luoRakenne(30, 200, 740, 30, "LKG 75037");

    luoTeksti(80, 290, "M BUSBAR", "14px", -90);
    html += `<line x1="90" y1="240" x2="90" y2="340" stroke="#7f8c8d" stroke-width="4" />`;
    luoOsa(120, 250, 30, 90, "16"); luoOsa(150, 250, 30, 90, "17");
    luoOsa(180, 250, 30, 90, "18"); luoOsa(210, 250, 30, 90, "19");
    luoOsa(320, 260, 60, 70, "20");
    
    // Kapeat moduulit (21) käännettynä (-90 astetta)
    luoOsa(500.0, 240, 19.17, 100, "21", "12px", -90);
    luoOsa(519.17, 240, 19.17, 100, "21.1", "12px", -90);
    luoOsa(538.33, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(557.50, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(576.67, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(595.83, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(615.00, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(634.17, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(653.33, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(672.50, 240, 19.17, 100, "21.1", "12px", -90);
    luoOsa(691.67, 240, 19.17, 100, "21.3", "12px", -90);
    luoOsa(710.83, 240, 19.17, 100, "21.3", "12px", -90);

    luoRakenne(30, 360, 740, 30, "LKG 75050");

    luoOsa(50, 410, 30, 80, "22"); luoOsa(80, 410, 30, 80, "23");
    luoOsa(110, 410, 30, 80, "24"); luoOsa(140, 410, 30, 80, "25");
    luoOsa(170, 410, 30, 80, "26"); luoOsa(200, 410, 30, 80, "27");
    luoRakenne(30, 510, 200, 30, "LKG 75050");

    luoOsa(280, 430, 200, 120, "28");

    luoRakenne(520, 390, 30, 220, "");
    luoTeksti(535, 520, "LKG 75050", "14px", -90);

    luoOsa(600, 410, 30, 70, "29");
    luoRakenne(550, 500, 220, 30, "LKG 75050");
    luoOsa(600, 540, 40, 60, "31"); luoOsa(640, 540, 40, 60, "32");
    
    luoOsa(700, 550, 40, 40, "33");

    luoOsa(70, 570, 45, 160, "34"); luoOsa(115, 570, 45, 160, "35");
    luoOsa(160, 570, 45, 160, "36"); luoOsa(205, 570, 45, 160, "37");

    luoRakenne(420, 610, 350, 30, "LKG 75050");

    luoTeksti(290, 660, "AC 400/230V", "12px");
    luoOsa(260, 680, 60, 60, "38");
    luoOsa(420, 680, 30, 60, "39"); luoOsa(450, 680, 30, 60, "40");

    luoTeksti(540, 660, "DC 24V");
    luoOsa(510, 680, 50, 60, "41"); luoOsa(560, 680, 50, 60, "42");
    luoOsa(610, 680, 90, 60, "43"); luoOsa(700, 680, 50, 60, "44");

    luoRakenne(30, 770, 740, 50, "LKG 75075");
    luoRakenne(40, 850, 720, 30, "C-PROFIL");

    luoRakenne(10, 30, 20, 890, "");
    luoTeksti(20, 500, "LKG 75050", "14px", -90);

    luoRakenne(770, 30, 20, 890, "");
    luoTeksti(780, 600, "LKG 75037", "14px", -90);
    luoTeksti(780, 300, "FOR BUS-CABLES ONLY!", "14px", -90);

    // ========================================== //
    // === OVI JA SEN KOMPONENTIT (Oikea reuna) === //
    // ========================================== //
    
    html += `<rect x="820" y="30" width="160" height="200" fill="#f8f9f9" stroke="#bdc3c7" stroke-width="2" rx="5" />`;
    luoTeksti(900, 60, "OVI", "16px");

    function luoPyoreaOsa(cx, cy, r, vari, numero) {
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('circle').setAttribute('stroke', '#3498db'); this.querySelector('circle').setAttribute('stroke-width', '4');" 
                    onmouseout="this.querySelector('circle').setAttribute('stroke', '#2c3e50'); this.querySelector('circle').setAttribute('stroke-width', '1.5');">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${vari}" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${cx}" y="${cy + r + 15}" fill="#2c3e50" font-size="12px" font-weight="bold" font-family="Arial" text-anchor="middle" pointer-events="none">${numero}</text>
        </g>`;
    }
    luoRakenne(830, 105, 30, 45,"");
    luoPyoreaOsa(845, 120, 12, "#e74c3c", "45"); // Punainen
    luoPyoreaOsa(882, 120, 12, "#fcf751", "46"); // Keltainen
    luoPyoreaOsa(918, 120, 12, "#2ecc71", "47"); // Vihreä
    luoPyoreaOsa(955, 120, 12, "#3498db", "48"); // Sininen
    luoPyoreaOsa(900, 180, 12, "#f1c40f", "49"); // Keltainen

    // --- TULOSTUS HTML:ÄÄN ---
    svgAlue.innerHTML = html;
}
// YHTEINEN PIIRUSTUS A011 ja A012 SISÄKAAPEILLE
function generoiA011_A012KaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero) {
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="16px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${numero}</text>
        </g>`;
    }

    // A011/A012-kaapin omat ulkoreunat ja tausta
    html += `<rect x="10" y="10" width="500" height="600" fill="#fcfcfc" stroke="#2c3e50" stroke-width="2" />`;
    
    // Tähän A011/A012 kaapin omat komponentit (voit muokata mitat oikeiksi):
    luoOsa(50, 50, 100, 80, "1");
    luoOsa(180, 50, 100, 80, "2");
    luoOsa(50, 180, 230, 60, "3");

    svgAlue.innerHTML = html;
}
function generoiSDKaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero, koko="16px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x + w/2} ${y + h/2})"` : "";
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="${koko}" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none" ${transform}>${numero}</text>
        </g>`;
    }

    function luoRakenne(x, y, w, h, teksti = "") {
        if (w > 0 && h > 0) {
            html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#95a5a6" stroke-width="1" />`;
        }
        if (teksti) {
            html += `<text x="${x + w/2}" y="${y + h/2}" fill="#7f8c8d" font-size="14px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${teksti}</text>`;
        }
    }

    function luoTeksti(x, y, teksti, koko="14px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x} ${y})"` : "";
        html += `<text x="${x}" y="${y}" fill="#34495e" font-size="${koko}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="central" ${transform} pointer-events="none">${teksti}</text>`;
    }

    // --- Taustat ja rakenteet ---
    html += `<rect x="10" y="10" width="780" height="930" fill="none" stroke="#2c3e50" stroke-width="2" />`;
    html += `<rect x="30" y="30" width="740" height="890" fill="none" stroke="#bdc3c7" stroke-width="1" stroke-dasharray="5,5" />`;

    // --- Osat ---
    luoOsa(250, 15, 300, 30, "8");
    luoOsa(700, 15, 40, 30, "9");

    luoOsa(50, 110, 30, 30, "7");
    luoOsa(100, 80, 220, 100, "11");
    luoOsa(350, 80, 60, 100, "12");
    luoOsa(410, 80, 60, 100, "13");
    luoOsa(470, 80, 80, 100, "14");
    luoOsa(550, 80, 80, 100, "15");
    luoOsa(650, 100, 40, 60, "10");

    luoRakenne(30, 200, 740, 30, "LKG 75037");

    luoTeksti(80, 290, "M BUSBAR", "14px", -90);
    html += `<line x1="90" y1="240" x2="90" y2="340" stroke="#7f8c8d" stroke-width="4" />`;
    luoOsa(120, 250, 30, 90, "16"); luoOsa(150, 250, 30, 90, "17");
    luoOsa(180, 250, 30, 90, "18"); luoOsa(210, 250, 30, 90, "19");
    luoOsa(320, 260, 60, 70, "20");
    
    // Kapeat moduulit (21) käännettynä (-90 astetta)
    luoOsa(500.0, 240, 19.17, 100, "21", "12px", -90);
    luoOsa(519.17, 240, 19.17, 100, "21.1", "12px", -90);
    luoOsa(538.33, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(557.50, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(576.67, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(595.83, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(615.00, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(634.17, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(653.33, 240, 19.17, 100, "21.2", "12px", -90);
    luoOsa(672.50, 240, 19.17, 100, "21.1", "12px", -90);
    luoOsa(691.67, 240, 19.17, 100, "21.3", "12px", -90);
    luoOsa(710.83, 240, 19.17, 100, "21.3", "12px", -90);

    luoRakenne(30, 360, 740, 30, "LKG 75050");

    luoOsa(50, 410, 30, 80, "22"); luoOsa(80, 410, 30, 80, "23");
    luoOsa(110, 410, 30, 80, "24"); luoOsa(140, 410, 30, 80, "25");
    luoOsa(170, 410, 30, 80, "26"); luoOsa(200, 410, 30, 80, "27");
    luoRakenne(30, 510, 200, 30, "LKG 75050");

    luoOsa(280, 430, 200, 120, "28");

    luoRakenne(520, 390, 30, 220, "");
    luoTeksti(535, 520, "LKG 75050", "14px", -90);

    luoOsa(600, 410, 30, 70, "29");
    luoRakenne(550, 500, 220, 30, "LKG 75050");
    luoOsa(600, 540, 40, 60, "31"); luoOsa(640, 540, 40, 60, "32");
    
    luoOsa(700, 550, 40, 40, "33");

    luoOsa(70, 570, 45, 160, "34"); luoOsa(115, 570, 45, 160, "35");
    luoOsa(160, 570, 45, 160, "36"); luoOsa(205, 570, 45, 160, "37");

    luoRakenne(420, 610, 350, 30, "LKG 75050");

    luoTeksti(290, 660, "AC 400/230V", "12px");
    luoOsa(260, 680, 60, 60, "38");
    luoOsa(420, 680, 30, 60, "39"); luoOsa(450, 680, 30, 60, "40");

    luoTeksti(540, 660, "DC 24V");
    luoOsa(510, 680, 50, 60, "41"); luoOsa(560, 680, 50, 60, "42");
    luoOsa(610, 680, 90, 60, "43"); luoOsa(700, 680, 50, 60, "44");

    luoRakenne(30, 770, 740, 50, "LKG 75075");
    luoRakenne(40, 850, 720, 30, "C-PROFIL");

    luoRakenne(10, 30, 20, 890, "");
    luoTeksti(20, 500, "LKG 75050", "14px", -90);

    luoRakenne(770, 30, 20, 890, "");
    luoTeksti(780, 600, "LKG 75037", "14px", -90);
    luoTeksti(780, 300, "FOR BUS-CABLES ONLY!", "14px", -90);

    // ========================================== //
    // === OVI JA SEN KOMPONENTIT (Oikea reuna) === //
    // ========================================== //
    
    html += `<rect x="820" y="30" width="160" height="200" fill="#f8f9f9" stroke="#bdc3c7" stroke-width="2" rx="5" />`;
    luoTeksti(900, 60, "OVI", "16px");

    function luoPyoreaOsa(cx, cy, r, vari, numero) {
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('circle').setAttribute('stroke', '#3498db'); this.querySelector('circle').setAttribute('stroke-width', '4');" 
                    onmouseout="this.querySelector('circle').setAttribute('stroke', '#2c3e50'); this.querySelector('circle').setAttribute('stroke-width', '1.5');">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${vari}" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${cx}" y="${cy + r + 15}" fill="#2c3e50" font-size="12px" font-weight="bold" font-family="Arial" text-anchor="middle" pointer-events="none">${numero}</text>
        </g>`;
    }
    luoRakenne(830, 105, 30, 45,"");
    luoPyoreaOsa(845, 120, 12, "#e74c3c", "45"); // Punainen
    luoPyoreaOsa(882, 120, 12, "#fcf751", "46"); // Keltainen
    luoPyoreaOsa(918, 120, 12, "#2ecc71", "47"); // Vihreä
    luoPyoreaOsa(955, 120, 12, "#3498db", "48"); // Sininen
    luoPyoreaOsa(900, 180, 12, "#f1c40f", "49"); // Keltainen

    // --- TULOSTUS HTML:ÄÄN ---
    svgAlue.innerHTML = html;
}

// YHTEINEN PIIRUSTUS A011 ja A012 SISÄKAAPEILLE
function generoiA011_A012KaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero) {
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="16px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${numero}</text>
        </g>`;
    }

    // A011/A012-kaapin omat ulkoreunat ja tausta
    html += `<rect x="10" y="10" width="500" height="600" fill="#fcfcfc" stroke="#2c3e50" stroke-width="2" />`;
    
    // Tähän A011/A012 kaapin omat komponentit (voit muokata mitat oikeiksi):
    luoOsa(50, 50, 100, 80, "1");
    luoOsa(180, 50, 100, 80, "2");
    luoOsa(50, 180, 230, 60, "3");

    svgAlue.innerHTML = html;
}

// ========================================== //
// === OU01.CC001      === //
// ========================================== //

function generoiOU01KaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero, koko="16px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x + w/2} ${y + h/2})"` : "";
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="${koko}" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none" ${transform}>${numero}</text>
        </g>`;
    }

    function luoRakenne(x, y, w, h, teksti = "") {
        if (w > 0 && h > 0) {
            html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#95a5a6" stroke-width="1" />`;
        }
        if (teksti) {
            html += `<text x="${x + w/2}" y="${y + h/2}" fill="#7f8c8d" font-size="14px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${teksti}</text>`;
        }
    }

    function luoTeksti(x, y, teksti, koko="14px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x} ${y})"` : "";
        html += `<text x="${x}" y="${y}" fill="#34495e" font-size="${koko}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="central" ${transform} pointer-events="none">${teksti}</text>`;
    }

    // ========================================== //
    // === TAUSTA JA ULKOREUNAT               === //
    // ========================================== //
    html += `<rect x="10" y="10" width="780" height="920" fill="#ffffff" stroke="#2c3e50" stroke-width="2" />`;
    
    // Yläpalkki (Osat 8 ja 9)
    luoRakenne(100, 10, 600, 20);
    luoOsa(350, 10, 100, 20, "8", "12px");
    luoOsa(450, 10, 30, 20, "9", "12px");

    // "SPARE SLOT"
    luoTeksti(400, 100, "SPARE SLOT", "26px");

    // Vaakajakajat (Ylhäältä alas)
    luoRakenne(30, 180, 740, 20, "LKG 75050");
    luoRakenne(10, 510, 780, 20, "LKG 75050");
    
    // Pystyjakajat (Keskellä LKG 75075)
    luoRakenne(30, 200, 20, 310);
    luoTeksti(40, 350, "LKG 75075", "12px", -90);
    
    luoRakenne(380, 200, 30, 310);
    luoTeksti(395, 350, "LKG 75075", "12px", -90);

    // ========================================== //
    // === VASEMMAN PUOLEN MODUULIT           === //
    // ========================================== //
    luoOsa(70, 230, 180, 60, "10");
    
    // M BUSBAR ja sen graafinen symboli
    luoTeksti(250, 220, "M BUSBAR");
    html += `<line x1="330" y1="220" x2="330" y2="280" stroke="#2c3e50" stroke-width="4" />`;
    html += `<rect x="325" y="215" width="10" height="5" fill="#fff" stroke="#2c3e50" stroke-width="1.5" />`;
    html += `<rect x="325" y="280" width="10" height="5" fill="#fff" stroke="#2c3e50" stroke-width="1.5" />`;

    luoRakenne(50, 310, 330, 20, "LKG 75037");
    
    // Riviliittimet / Pienet osat (Käännettynä pystyyn)
    luoOsa(60, 345, 25, 40, "13", "12px");
    luoOsa(85, 345, 25, 40, "14", "12px");
    
    luoOsa(130, 345, 25, 40, "16", "12px");
    luoOsa(155, 345, 25, 40, "17", "12px");
    luoOsa(180, 345, 25, 40, "18", "12px");
    
    luoOsa(290, 345, 40, 40, "19");

    luoRakenne(50, 400, 330, 20, "LKG 75050");
    
    // Riviliittimet 20-29
    for (let i = 0; i < 5; i++) luoOsa(60 + i*30, 440, 30, 45, `${20+i}`);
    for (let i = 0; i < 4; i++) luoOsa(220 + i*20, 440, 20, 45, `${25+i}`, "11px", -90);
    luoOsa(320, 440, 25, 45, "29", "12px");

    // ========================================== //
    // === OIKEAN PUOLEN MODUULIT (PLC)       === //
    // ========================================== //
    // PLC Lohkot
    luoOsa(440, 250, 60, 70, "11");
    luoTeksti(450, 285, "PS307", "12px", -90);
    luoOsa(500, 250, 130, 70, "11.1");
    luoTeksti(570, 265, "CPU319-3 PN/DP", "10px");
    // Pienet "+" -merkit PLC:n reunoille
    luoTeksti(445, 258, "+", "10px"); luoTeksti(445, 312, "+", "10px");
    luoTeksti(622, 258, "+", "10px"); luoTeksti(622, 312, "+", "10px");
    luoOsa(630, 250, 20, 70, "11.2","11px", -90);
    luoOsa(650, 250, 20, 70, "11.3","11px", -90);
  
    // Osa 12 (ulkoreunassa)
    luoOsa(780, 210, 20, 25, "12", "11px");

    luoRakenne(410, 400, 360, 20, "LKG 75050");
    
    // Riviliittimet 30-44 (15 kpl, käännetty pystyyn)
    for (let i = 0; i < 15; i++) {
        luoOsa(430 + i * 20, 440, 20, 45, `${30 + i}`, "11px", -90);
    }

    // ========================================== //
    // === ALAOSAN BUSBARIT & RIVILIITTIMET   === //
    // ========================================== //
    // Busbar kannattimet (pystyssä)
    html += `<rect x="40" y="560" width="15" height="100" fill="#ecf0f1" stroke="#bdc3c7" />`;
    html += `<rect x="480" y="560" width="15" height="100" fill="#ecf0f1" stroke="#bdc3c7" />`;
    html += `<rect x="740" y="560" width="15" height="100" fill="#ecf0f1" stroke="#bdc3c7" />`;
    
    // Kuparikiskot (CU 30x10)
    for (let i = 0; i < 3; i++) {
        let yPos = 575 + i * 30;
        html += `<rect x="20" y="${yPos}" width="760" height="12" fill="#e67e22" stroke="#d35400" />`;
        luoTeksti(120, yPos + 6, "CU 30x10", "12px");
    }


    // Terminaali-lohkon kehykset
    luoRakenne(50, 740, 480, 20, "LKG 75037");
    luoRakenne(20, 740, 20, 85);
    luoTeksti(30, 782, "LKG 75037", "11px", -90);
    
    // Riviliittimet 51-71
    luoOsa(50, 765, 30, 35, "51");
    luoOsa(80, 765, 30, 35, "52");
    
    // Kapeat liittimet 53-70 (18 kpl)
    for (let i = 0; i < 18; i++) {
        luoOsa(110 + i * 18, 765, 18, 35, `${53 + i}`, "10px", -90);
    }
    luoOsa(434, 765, 40, 35, "71"); // Leveämpi loppuliitin
    
    luoRakenne(50, 805, 480, 20, "LKG 75037");
    luoRakenne(10, 840, 780, 20, "C-PROFIL");

    // Alaosan katkoviiva-alue
    html += `<line x1="10" y1="880" x2="790" y2="880" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="10,5" />`;
    html += `<line x1="10" y1="910" x2="790" y2="910" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="10,5" />`;
    luoTeksti(400, 895, "LKG 75050 FOR BUSCABEL INSTALL ON THE BACK BASE", "14px");

    // ========================================== //
    // === OVI JA SEN KOMPONENTIT (Oikea reuna) === //
    // ========================================== //
    
    html += `<rect x="820" y="30" width="160" height="220" fill="#f8f9f9" stroke="#bdc3c7" stroke-width="2" rx="5" />`;
    luoTeksti(900, 60, "OVI", "16px");

    function luoPyoreaOsa(cx, cy, r, vari, numero) {
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('circle').setAttribute('stroke', '#3498db'); this.querySelector('circle').setAttribute('stroke-width', '4');" 
                    onmouseout="this.querySelector('circle').setAttribute('stroke', '#2c3e50'); this.querySelector('circle').setAttribute('stroke-width', '1.5');">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${vari}" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${cx}" y="${cy + r + 15}" fill="#2c3e50" font-size="12px" font-weight="bold" font-family="Arial" text-anchor="middle" pointer-events="none">${numero}</text>
        </g>`;
    }
    luoOsa(840, 105, 120, 95,"72");
    luoRakenne(860, 120, 80, 40,"");


    luoRakenne(860, 165, 10, 10,"");
    luoRakenne(874, 165, 10, 10,"");
    luoRakenne(888, 165, 10, 10,"");
    luoRakenne(902, 165, 10, 10,"");    
    luoRakenne(916, 165, 10, 10,"");
    luoRakenne(930, 165, 10, 10,"");
    luoRakenne(860, 175, 10, 10,"");
    luoRakenne(874, 175, 10, 10,"");
    luoRakenne(888, 175, 10, 10,"");
    luoRakenne(902, 175, 10, 10,"");    
    luoRakenne(916, 175, 10, 10,"");
    luoRakenne(930, 175, 10, 10,"");
    luoRakenne(860, 185, 10, 10,"");
    luoRakenne(874, 185, 10, 10,"");
    luoRakenne(888, 185, 10, 10,"");
    luoRakenne(902, 185, 10, 10,"");    
    luoRakenne(916, 185, 10, 10,"");
    luoRakenne(930, 185, 10, 10,"");





    // Tulostetaan SVG ruudulle
    svgAlue.innerHTML = html;
}
// ========================================== //
// === UUSI SO01.CC001 ja SO02.CC001      === //
// ========================================== //
function generoiSO01_SO02KaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero, koko="16px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x + w/2} ${y + h/2})"` : "";
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="${koko}" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none" ${transform}>${numero}</text>
        </g>`;
    }

    function luoRakenne(x, y, w, h, teksti = "") {
        if (w > 0 && h > 0) {
            html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#95a5a6" stroke-width="1" />`;
        }
        if (teksti) {
            html += `<text x="${x + w/2}" y="${y + h/2}" fill="#7f8c8d" font-size="14px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${teksti}</text>`;
        }
    }

    function luoTeksti(x, y, teksti, koko="14px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x} ${y})"` : "";
        html += `<text x="${x}" y="${y}" fill="#34495e" font-size="${koko}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="central" ${transform} pointer-events="none">${teksti}</text>`;
    }

    // --- Tausta ja yläosan rakenteet ---
    html += `<rect x="10" y="10" width="780" height="920" fill="#ffffff" stroke="#2c3e50" stroke-width="2" />`;
    
    luoRakenne(100, 10, 600, 20);
    luoOsa(350, 10, 100, 20, "8", "12px");
    luoOsa(450, 10, 30, 20, "9", "12px");
    luoTeksti(400, 100, "SPARE SLOT", "26px");

    luoRakenne(30, 180, 740, 20, "LKG 75050");
    luoRakenne(10, 510, 780, 20, "LKG 75050");
    
    luoRakenne(30, 200, 20, 310);
    luoTeksti(40, 350, "LKG 75075", "12px", -90);
    luoRakenne(380, 200, 30, 310);
    luoTeksti(395, 350, "LKG 75075", "12px", -90);

    // --- Vasen keskilohko ---
    luoOsa(70, 230, 180, 60, "10");
    luoTeksti(250, 220, "M BUSBAR");
    html += `<line x1="330" y1="220" x2="330" y2="280" stroke="#2c3e50" stroke-width="4" />`;
    html += `<rect x="325" y="215" width="10" height="5" fill="#fff" stroke="#2c3e50" stroke-width="1.5" />`;
    html += `<rect x="325" y="280" width="10" height="5" fill="#fff" stroke="#2c3e50" stroke-width="1.5" />`;

    luoRakenne(50, 310, 330, 20, "LKG 75037");
    
    // Liittimet 13-18
    for (let i = 0; i < 6; i++) luoOsa(60 + i * 20, 345, 20, 40, `${13 + i}`, "11px", -90);
    luoOsa(230, 345, 35, 40, "42");
    luoOsa(280, 345, 35, 40, "19");

    luoRakenne(50, 400, 330, 20, "LKG 75050");
    
    // Liittimet 20-28
    for(let i=0; i<4; i++) luoOsa(60 + i*30, 440, 30, 45, `${20+i}`);
    for(let i=0; i<4; i++) luoOsa(180 + i*20, 440, 20, 45, `${24+i}`, "11px", -90);
    luoOsa(280, 440, 25, 45, "28", "12px");

    // --- Oikea keskilohko (PLC) ---
    luoOsa(440, 250, 60, 70, "11");
    luoTeksti(450, 285, "PS307", "12px", -90);
    luoOsa(500, 250, 130, 70, "11.1");
    luoTeksti(570, 265, "CPU319-3 PN/DP", "10px");
    luoTeksti(445, 258, "+", "10px"); luoTeksti(445, 312, "+", "10px");
    luoTeksti(622, 258, "+", "10px"); luoTeksti(622, 312, "+", "10px");
    luoOsa(630, 250, 20, 70, "11.2","11px", -90);
    luoOsa(650, 250, 20, 70, "11.3","11px", -90);
    luoOsa(750, 210, 20, 25, "12", "11px");
    luoRakenne(410, 400, 360, 20, "LKG 75050");

    // --- Alaosa (Kiskot ja massiiviset moduulit) ---

    // Kiskojen kiinnikkeet
    html += `<rect x="40" y="560" width="15" height="100" fill="#ecf0f1" stroke="#bdc3c7" />`;
    html += `<rect x="610" y="560" width="15" height="100" fill="#ecf0f1" stroke="#bdc3c7" />`;
    html += `<rect x="740" y="560" width="15" height="100" fill="#ecf0f1" stroke="#bdc3c7" />`;
    
    // Kuparikiskot
    for (let i = 0; i < 3; i++) {
        let yPos = 575 + i * 30;
        html += `<rect x="20" y="${yPos}" width="760" height="12" fill="#e67e22" stroke="#d35400" />`;
        luoTeksti(120, yPos + 6, "CU 30x10", "12px");
    }

    // Isot kiskomoduulit 29-32
    luoOsa(260, 565, 70, 90, "29", "18px");
    luoOsa(340, 565, 70, 90, "30", "18px");
    luoOsa(420, 565, 70, 90, "31", "18px");
    luoOsa(500, 565, 70, 90, "32", "18px");
    
    // Katkoviivalaatikot (varaukset)
    html += `<rect x="580" y="565" width="70" height="90" fill="none" stroke="#2c3e50" stroke-width="2" stroke-dasharray="5,5" />`;
    html += `<rect x="660" y="565" width="70" height="90" fill="none" stroke="#2c3e50" stroke-width="2" stroke-dasharray="5,5" />`;

     // Alimmat riviliittimet LKG 75037 sisällä
    luoRakenne(50, 740, 310, 20, "LKG 75037");
    luoRakenne(20, 740, 20, 85);
    luoTeksti(30, 782, "LKG 75037", "11px", -90);

    luoOsa(50, 765, 30, 35, "33");
    luoOsa(80, 765, 30, 35, "34");
    for (let i = 0; i < 6; i++) luoOsa(110 + i * 20, 765, 20, 35, `${35 + i}`, "11px", -90);
    luoOsa(230, 765, 35, 35, "41");

    luoRakenne(50, 805, 310, 20, "LKG 75037");
    luoRakenne(10, 840, 780, 20, "C-PROFIL");

    // Alaosan katkoviiva-alue
    html += `<line x1="10" y1="880" x2="790" y2="880" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="10,5" />`;
    html += `<line x1="10" y1="910" x2="790" y2="910" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="10,5" />`;
    luoTeksti(400, 895, "LKG 75050 FOR BUSCABEL INSTALL ON THE BACK BASE", "14px");

    // ========================================== //
    // === OVI JA SEN KOMPONENTIT (Oikea reuna) === //
    // ========================================== //
    
    html += `<rect x="820" y="30" width="160" height="220" fill="#f8f9f9" stroke="#bdc3c7" stroke-width="2" rx="5" />`;
    luoTeksti(900, 60, "OVI", "16px");

    function luoPyoreaOsa(cx, cy, r, vari, numero) {
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('circle').setAttribute('stroke', '#3498db'); this.querySelector('circle').setAttribute('stroke-width', '4');" 
                    onmouseout="this.querySelector('circle').setAttribute('stroke', '#2c3e50'); this.querySelector('circle').setAttribute('stroke-width', '1.5');">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${vari}" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${cx}" y="${cy + r + 15}" fill="#2c3e50" font-size="12px" font-weight="bold" font-family="Arial" text-anchor="middle" pointer-events="none">${numero}</text>
        </g>`;
    }
    luoOsa(840, 105, 120, 95,"43");
    luoRakenne(860, 120, 80, 40,"");
    luoRakenne(845, 120, 10, 10,"");
    luoRakenne(845, 130, 10, 10,"");
    luoRakenne(845, 140, 10, 10,"");
    luoRakenne(845, 150, 10, 10,"");
    luoRakenne(845, 165, 10, 10,"");
    luoRakenne(845, 175, 10, 10,"");
    luoRakenne(845, 185, 10, 10,"");

    luoRakenne(860, 165, 10, 10,"");
    luoRakenne(874, 165, 10, 10,"");
    luoRakenne(888, 165, 10, 10,"");
    luoRakenne(902, 165, 10, 10,"");    
    luoRakenne(916, 165, 10, 10,"");
    luoRakenne(930, 165, 10, 10,"");
    luoRakenne(860, 175, 10, 10,"");
    luoRakenne(874, 175, 10, 10,"");
    luoRakenne(888, 175, 10, 10,"");
    luoRakenne(902, 175, 10, 10,"");    
    luoRakenne(916, 175, 10, 10,"");
    luoRakenne(930, 175, 10, 10,"");
    luoRakenne(860, 185, 10, 10,"");
    luoRakenne(874, 185, 10, 10,"");
    luoRakenne(888, 185, 10, 10,"");
    luoRakenne(902, 185, 10, 10,"");    
    luoRakenne(916, 185, 10, 10,"");
    luoRakenne(930, 185, 10, 10,"");

    luoRakenne(945, 120, 10, 10,"");
    luoRakenne(945, 130, 10, 10,"");
    luoRakenne(945, 140, 10, 10,"");
    luoRakenne(945, 150, 10, 10,"");
    luoRakenne(945, 165, 10, 10,"");
    luoRakenne(945, 175, 10, 10,"");
    luoRakenne(945, 185, 10, 10,"");


    svgAlue.innerHTML = html;
}
// ========================================== //
// === UUSI PÄÄKESKUS (SO01.PT001)           === //
// ========================================== //
function generoiSO01PT001KaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero, koko="16px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x + w/2} ${y + h/2})"` : "";
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="${koko}" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none" ${transform}>${numero}</text>
        </g>`;
    }

    function luoRakenne(x, y, w, h, teksti = "") {
        if (w > 0 && h > 0) {
            html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#95a5a6" stroke-width="1" />`;
        }
        if (teksti) {
            html += `<text x="${x + w/2}" y="${y + h/2}" fill="#7f8c8d" font-size="14px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${teksti}</text>`;
        }
    }

    function luoTeksti(x, y, teksti, koko="14px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x} ${y})"` : "";
        html += `<text x="${x}" y="${y}" fill="#34495e" font-size="${koko}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="central" ${transform} pointer-events="none">${teksti}</text>`;
    }

    // --- Tausta ja yläpalkki ---
    html += `<rect x="10" y="10" width="780" height="920" fill="#ffffff" stroke="#2c3e50" stroke-width="2" />`;
    
    luoRakenne(150, 10, 600, 20);
    luoOsa(400, 10, 80, 20, "1", "12px");
    luoOsa(480, 10, 30, 20, "2", "12px");

    // --- Oikea yläkulma: C-RAIL ja tekstit ---
    luoRakenne(500, 50, 250, 15);
    luoTeksti(625, 80, "C-RAIL FOR CABLE GLAND", "18px");
    luoTeksti(625, 105, "DIMENSIONED FOR 2x(4x185/95MM²)", "16px");

    html += `<rect x="470" y="130" width="300" height="600" fill="none" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="10,5" />`;
    


    // --- Vasen pystylogo (LKG 75050) ---
    luoRakenne(30, 50, 30, 550);
    luoTeksti(45, 325, "LKG 75050", "12px", -90);

    // --- Keski-vasen LKG moduulialue ---
    luoRakenne(80, 400, 300, 20, "LKG 75050");
    luoRakenne(80, 490, 300, 20, "LKG 75050");
    luoRakenne(80, 600, 300, 20, "LKG 75050");
    luoRakenne(360, 420, 20, 180);
    luoTeksti(370, 510, "LKG 75050", "12px", -90);

    // Osat 3-7 ja 15
    for(let i=0; i<5; i++) luoOsa(100 + i*30, 435, 30, 45, `${3+i}`);
    luoOsa(300, 440, 40, 35, "15");

    // Osat 8 ja 14
    luoOsa(110, 525, 20, 60, "8", "12px", -90);
    luoOsa(130, 525, 20, 60, "8.1", "12px", -90);
    luoOsa(150, 525, 20, 60, "8.2", "12px", -90);
    luoOsa(170, 525, 20, 60, "8.2", "12px", -90);

    luoOsa(300, 535, 40, 40, "14");

    // --- Alaosan vaakakiskot (L1, L2, L3) ---
    html += `<rect x="380" y="625" width="10" height="90" fill="#ecf0f1" stroke="#bdc3c7" />`;
    html += `<rect x="730" y="625" width="10" height="90" fill="#ecf0f1" stroke="#bdc3c7" />`;

    let kiskoY = [640, 665, 690];
    for (let i = 0; i < 3; i++) {
        html += `<rect x="20" y="${kiskoY[i]}" width="750" height="12" fill="#e67e22" stroke="#d35400" />`;
        luoTeksti(180, kiskoY[i] - 10, "CU 30x10", "12px");
    }
    luoTeksti(785, kiskoY[0] + 6, "L1", "12px");
    luoTeksti(785, kiskoY[1] + 6, "L2", "12px");
    luoTeksti(785, kiskoY[2] + 6, "L3", "12px");

    // --- Oikea alue: Päävirtakiskot ja kytkin (9) ---
    // Yläkiskot (vaaka)
    html += `<rect x="520" y="240" width="200" height="10" fill="#e67e22" stroke="#d35400" />`;
    html += `<rect x="520" y="265" width="200" height="10" fill="#e67e22" stroke="#d35400" />`;
    html += `<rect x="520" y="290" width="200" height="10" fill="#e67e22" stroke="#d35400" />`;


    // Pystykiskot ja tekstit (yläpuoli)
    html += `<rect x="550" y="250" width="15" height="150" fill="#e67e22" stroke="#d35400" />`;
    html += `<rect x="612" y="275" width="15" height="125" fill="#e67e22" stroke="#d35400" />`;
    html += `<rect x="675" y="300" width="15" height="100" fill="#e67e22" stroke="#d35400" />`;
    
    luoTeksti(580, 340, "400mm", "12px", -90);
    luoTeksti(642, 340, "340mm", "12px", -90);
    luoTeksti(705, 340, "280mm", "12px", -90);
    luoTeksti(720, 380, "CU 30x10", "12px");

    // Pääkomponentti 9
    luoOsa(530, 400, 180, 100, "9", "24px");

    // Pystykiskot ja tekstit (alapuoli)
    html += `<rect x="550" y="500" width="15" height="140" fill="#e67e22" stroke="#d35400" />`;
    html += `<rect x="612" y="500" width="15" height="165" fill="#e67e22" stroke="#d35400" />`;
    html += `<rect x="675" y="500" width="15" height="190" fill="#e67e22" stroke="#d35400" />`;
    
    luoTeksti(540, 590, "350mm", "12px", -90);
    luoTeksti(602, 590, "410mm", "12px", -90);
    luoTeksti(665, 590, "470mm", "12px", -90);

    // Osat 11, 12, 13
    luoOsa(537, 520, 40, 30, "11");
    luoOsa(600, 550, 40, 30, "12");
    luoOsa(662, 520, 40, 30, "13");

    // --- Vasen alakulma (LKG 75037) ---
    luoRakenne(50, 750, 150, 20, "LKG 75037");
    luoRakenne(20, 750, 25, 90);
    luoTeksti(32, 795, "LKG 75037", "11px", -90);
    luoOsa(60, 785, 25, 30, "10");
    luoRakenne(50, 820, 150, 20, "LKG 75037");

    // --- Alaosa (C-PROFIL ja katkoviiva) ---
    luoRakenne(30, 860, 740, 15, "C-PROFIL");
    html += `<line x1="10" y1="900" x2="790" y2="900" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="10,5" />`;
    html += `<line x1="10" y1="930" x2="790" y2="930" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="10,5" />`;
    luoTeksti(400, 915, "LKG 75050 FOR BUS CABLE IS TO INSTALL AT THE REAR BASE!", "14px");

    svgAlue.innerHTML = html;
}
// ========================================== //
// === UUSI ALAKESKUS (OU01.ED)           === //
// ========================================== //
function generoiOU01EDKaappiSVG(kaapinNimi) {
    const svgAlue = document.getElementById("sd-kaappi-svg");
    if (!svgAlue) return;

    let html = "";

    function luoOsa(x, y, w, h, numero, koko="16px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x + w/2} ${y + h/2})"` : "";
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('rect').setAttribute('fill', '#3498db'); this.querySelector('text').setAttribute('fill', '#ffffff');" 
                    onmouseout="this.querySelector('rect').setAttribute('fill', '#ffffff'); this.querySelector('text').setAttribute('fill', '#2c3e50');">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${x + w/2}" y="${y + h/2}" fill="#2c3e50" font-size="${koko}" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none" ${transform}>${numero}</text>
        </g>`;
    }

    function luoRakenne(x, y, w, h, teksti = "") {
        if (w > 0 && h > 0) {
            html += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#95a5a6" stroke-width="1" />`;
        }
        if (teksti) {
            html += `<text x="${x + w/2}" y="${y + h/2}" fill="#7f8c8d" font-size="14px" font-weight="bold" font-family="Arial" text-anchor="middle" dominant-baseline="central" pointer-events="none">${teksti}</text>`;
        }
    }

// TEKSTIN LUONTI
    function luoTeksti(x, y, teksti, koko="14px", kulma=0) {
        let transform = kulma ? `transform="rotate(${kulma} ${x} ${y})"` : "";
        html += `<text x="${x}" y="${y}" fill="#34495e" font-size="${koko}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="central" ${transform} pointer-events="none">${teksti}</text>`;
    }

    // Oven painikkeiden luonti
    function luoPyoreaOsa(cx, cy, r, vari, numero) {
        html += `<g style="cursor: pointer; transition: 0.2s;" onclick="naytaKaapinOsanTiedot('${kaapinNimi}', '${numero}')" 
                    onmouseover="this.querySelector('circle').setAttribute('stroke', '#3498db'); this.querySelector('circle').setAttribute('stroke-width', '4');" 
                    onmouseout="this.querySelector('circle').setAttribute('stroke', '#2c3e50'); this.querySelector('circle').setAttribute('stroke-width', '1.5');">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${vari}" stroke="#2c3e50" stroke-width="1.5" />
            <text x="${cx}" y="${cy + r + 15}" fill="#2c3e50" font-size="12px" font-weight="bold" font-family="Arial" text-anchor="middle" pointer-events="none">${numero}</text>
        </g>`;
    }

    // --- Tausta ja ulkoreunat (Matalampi malli, korkeus 500) ---
    html += `<rect x="10" y="10" width="680" height="480" fill="#ffffff" stroke="#2c3e50" stroke-width="2" />`;
    
    // ========================================== //
    // === YLÄOSAN KOMPONENTIT                === //
    // ========================================== //
    luoOsa(40, 60, 40, 120, "2");
    luoOsa(100, 40, 70, 160, "3");
    luoOsa(240, 40, 60, 160, "4");
    luoOsa(300, 40, 60, 160, "5");

    for (let i = 0; i < 7; i++) {
        luoOsa(360 + (i * 35), 40, 35, 160, `${6 + i}`);
    }

    // ========================================== //
    // === KESKIKISKO / RAKENNE               === //
    // ========================================== //
    luoRakenne(10, 240, 680, 40);

    // ========================================== //
    // === ALAOSAN KOMPONENTIT                === //
    // ========================================== //
    luoOsa(40, 320, 40, 120, "13");
    luoOsa(100, 320, 505, 120, "14", "24px");

    // ========================================== //
    // === OVI JA SEN KOMPONENTIT (Oikea reuna) === //
    // ========================================== //
    html += `<rect x="710" y="30" width="280" height="180" fill="#f8f9f9" stroke="#bdc3c7" stroke-width="2" rx="5" />`;
    luoTeksti(850, 60, "OVI", "18px");
    
    // Esimerkkipainikkeet ovelle (muuta numeroita tarpeen mukaan)

    luoPyoreaOsa(850, 120, 12, "#3498db", "15"); // Sininen
  
  // Piirretään ruudulle
    svgAlue.innerHTML = html;
}