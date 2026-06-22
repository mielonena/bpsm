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
    luoKaappi(190, 50, 120, 200, "SO01", "SO01", "iso");
    
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
    luoKaappi(50, 350, 120, 200, "SO02", "SO02", "iso");
    
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
    luoKaappi(50, 650, 120, 200, "OU01", "OU01", "iso");
    
    luoKaappi(190, 750, 120, 100, "OU01.ED001", "OU01.ED001", "matala");
    luoKaappi(330, 750, 120, 100, "OU01.ED002", "OU01.ED002", "matala");

    adX = 470;
    const ou01_smalls = ["DI011", "ID012", "AD001-A011", "AD002-A011", "AD003-A011", "AD004-A011"];
    ou01_smalls.forEach(sm => {
        let id = `OU01.${sm}`;
        let otsikko = sm.replace("-A011", ""); // Lyhennetty näkymä
        luoKaappi(adX, 770, 90, 80, id, otsikko, "pieni");
        adX += 110;
    });

    ryhma.innerHTML = html;
}