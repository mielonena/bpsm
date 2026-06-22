// ========================================== //
// === 12. EXCEL TUONTI & VIENTI ============ //
// ========================================== //

async function tuoCSVHistoria(event) {
    if(!onkoAdmin) { alert("Vain admin voi tuoda dataa!"); return; }
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async function(e) {
        const text = e.target.result; const rows = text.split('\n');
        let lisattyjaHistoriaan = 0; let lisattyjaVikoihin = 0; let ohitettujaTuplia = 0;

        for (let i = 1; i < rows.length; i++) { 
            const row = rows[i].trim(); if (!row) continue;
            const cols = row.split(';'); 
            
            if (cols.length >= 9) { 
                const otsikko = cols[0].trim(); 
                const laitetunnusRaaka = cols[1].trim(); 
                const tyoNumero2 = cols[2].trim();
                const kuvaus1 = cols[3].trim(); const kuvaus2 = cols[4].trim(); const tyoTyyppi = cols[5].trim();
                const status = cols[6].trim(); let pvm = cols[7].trim(); const tyoNumero1 = cols[8].trim();

                if (pvm.includes(" ")) pvm = pvm.split(" ")[0]; 
                const laitelista = laitetunnusRaaka.split(',').map(id => id.trim());

                for (const laitetunnus of laitelista) {
                    if (!laitetunnus) continue;
                    let fullId = null;
                    const elem = document.querySelector(`[data-nimi="${laitetunnus}"]`);
                    if (elem) { 
                        const onclickAttr = elem.getAttribute("onclick"); 
                        const match = onclickAttr.match(/'(.*?)'/); 
                        if (match) fullId = match[1]; 
                    } else { fullId = laitetunnus; }

                    if (fullId) {
                        let yhdistettyTyoNumero = [tyoNumero1, tyoNumero2].filter(Boolean).join(" / ");
                        let yhdistettyKuvaus = [kuvaus1, kuvaus2].filter(Boolean).join(" | ");

                        if (!huoltoHistoria[fullId]) huoltoHistoria[fullId] = [];

                        const onkoTupla = huoltoHistoria[fullId].some(vanha => 
                            vanha.pvm === pvm && vanha.tyoNumero === yhdistettyTyoNumero && 
                            vanha.otsikko === otsikko && vanha.tyoTyyppi === tyoTyyppi
                        );

                        if (!onkoTupla) {
                            const uusiHist = { 
                                laite_id: fullId, pvm: pvm, tyo_numero: yhdistettyTyoNumero, sijainti: "-", 
                                tyo_tyyppi: tyoTyyppi, otsikko: otsikko, osat: yhdistettyKuvaus, tekija: "Tuotu CSV", status: status 
                            };
                            
                            try {
                                const { data } = await supabaseclient.from('huoltohistoria').insert(uusiHist).select();
                                if(data && data[0]) uusiHist.id = data[0].id;

                                huoltoHistoria[fullId].push({
                                    id: uusiHist.id, pvm: uusiHist.pvm, tyoNumero: uusiHist.tyo_numero, sijainti: uusiHist.sijainti,
                                    tyoTyyppi: uusiHist.tyo_tyyppi, otsikko: uusiHist.otsikko, osat: uusiHist.osat, tekija: uusiHist.tekija, status: uusiHist.status
                                });
                                lisattyjaHistoriaan++;

                                if (status.toLowerCase() === "new") {
                                    const vikaObj = {
                                        laite_id: fullId, prio: "keski", otsikko: otsikko, sijainti: "Kts. kuvaus",
                                        kommentti: yhdistettyKuvaus, tyo_numero: yhdistettyTyoNumero, tyo_tyyppi: tyoTyyppi
                                    };
                                    await supabaseclient.from('aktiiviset_viat').upsert(vikaObj);
                                    aktiivisetViat[fullId] = {
                                        prio: vikaObj.prio, otsikko: vikaObj.otsikko, sijainti: vikaObj.sijainti,
                                        kommentti: vikaObj.kommentti, tyoNumero: vikaObj.tyo_numero, tyoTyyppi: vikaObj.tyo_tyyppi
                                    };
                                    lisattyjaVikoihin++;
                                }
                            } catch(e) { console.error(e); }
                        } else { ohitettujaTuplia++; }
                    }
                }
            }
        }
        
        event.target.value = ""; 
        alert(`Tuonti valmis!\n• ${lisattyjaHistoriaan} uutta merkintää pilveen.\n• ${lisattyjaVikoihin} aktiivista työtä siirretty kartalle.\n• ${ohitettujaTuplia} kaksoiskappaletta ohitettiin.`);
        paivitaVikaKartta(); paivitaVikaLista(); paivitaKokoHistoriaNakyma(); paivitaPeruskunnostetutKartalle();
    };
    reader.readAsText(file, 'UTF-8'); 
}

function lataaAktiivisetViatExcel() {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; 
    csvContent += "Laite / Tunnus;Ryhmä;Prioriteetti;Työnumero;Tyyppi;Vian kuvaus;Sijainti laitteessa;Lisätiedot\n";

    const viatArray = Object.entries(aktiivisetViat).filter(([id, tila]) => tila).map(([id, tila]) => {
        let prio = (tila === true) ? "korkea" : (typeof tila === "string" ? tila : tila.prio);
        let otsikko = (typeof tila === "object" && tila.otsikko) ? tila.otsikko : "Vika";
        let sijainti = (typeof tila === "object" && tila.sijainti) ? tila.sijainti : "Laite";
        let kommentti = (typeof tila === "object" && tila.kommentti) ? tila.kommentti : "-";
        let tyoNumero = (typeof tila === "object" && tila.tyoNumero) ? tila.tyoNumero : "-";
        let tyoTyyppi = (typeof tila === "object" && tila.tyoTyyppi) ? tila.tyoTyyppi : "Vika";
        return { id, prio, otsikko, sijainti, kommentti, tyoNumero, tyoTyyppi };
    });

    if (viatArray.length === 0) { alert("Ei aktiivisia vikoja ladattavaksi."); return; }

    viatArray.sort((a, b) => {
        const tiedotA = erotteleLaiteTiedot(a.id); const tiedotB = erotteleLaiteTiedot(b.id);
        const ryhmaVertailu = tiedotA.ryhma.localeCompare(tiedotB.ryhma, undefined, { numeric: true });
        if (ryhmaVertailu !== 0) return ryhmaVertailu; return tiedotA.nimi.localeCompare(tiedotB.nimi, undefined, { numeric: true });
    });

    viatArray.forEach(item => {
        const tiedot = erotteleLaiteTiedot(item.id);
        let prioTeksti = item.prio === "korkea" ? "KORKEA" : (item.prio === "keski" ? "KESKI" : "MATALA");
        let otsikkoClean = item.otsikko.replace(/\s*\([^)]*\)\s*$/, '').replace(/;/g, ",").replace(/\n/g, " ");
        let sijaintiClean = item.sijainti.replace(/;/g, ",").replace(/\n/g, " ");
        let kommenttiClean = item.kommentti.replace(/\s*\(Työ:\s*[^)]*\)\s*$/, '').replace(/;/g, ",").replace(/\n/g, " ");
        csvContent += `${tiedot.nimi};${tiedot.ryhma};${prioTeksti};${item.tyoNumero};${item.tyoTyyppi};${otsikkoClean};${sijaintiClean};${kommenttiClean}\n`;
    });

    const tanaan = new Date();
    const pvm = `${String(tanaan.getDate()).padStart(2, '0')}${String(tanaan.getMonth() + 1).padStart(2, '0')}${tanaan.getFullYear()}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri); link.setAttribute("download", `aktiiviset_viat_${pvm}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function lataaExcel(lataaKaikki) {
    let data = [["Status", "Tyyppi", "Päivämäärä", "Laite / Tunnus", "Työnumero", "Otsikko / Vika", "Vaihdetut osat / Kuvaus", "Sijainti"]];
    let historiakohteet = lataaKaikki ? Object.entries(huoltoHistoria) : [[valittuKuljetinID, huoltoHistoria[valittuKuljetinID]]];

    historiakohteet.forEach(([laiteId, tapahtumat]) => {
        if (!tapahtumat) return;
        tapahtumat.forEach(t => {
            data.push([
                t.status === "New" ? "⏳ Odottaa" : (t.status === "Completed" ? "✅ Valmis" : (t.status || "-")),
                t.tyoTyyppi || "-", t.pvm, laiteId, t.tyoNumero || "-", t.otsikko || "-", t.osat || "-", t.sijainti || "-"
            ]);
        });
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [ { wch: 12 }, { wch: 15 }, { wch: 12 }, { wch: 20 }, { wch: 15 }, { wch: 40 }, { wch: 40 }, { wch: 20 } ];

    const range = XLSX.utils.decode_range(ws['!ref']);
    for(let R = range.s.r; R <= range.e.r; ++R) {
        for(let C = range.s.c; C <= range.e.c; ++C) {
            let cell = ws[XLSX.utils.encode_cell({c:C, r:R})];
            if(cell && !cell.s) cell.s = { alignment: { wrapText: true, vertical: "top" } };
        }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Huoltohistoria");
    const pvm = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `huoltohistoria_${pvm}.xlsx`);
}

async function tuoVaraosatExcel(event) {
    if(!onkoAdmin) { alert("Vain admin voi tuoda varaosia!"); return; }
    const file = event.target.files[0]; if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        let lisatty = 0;

        for (let i = 1; i < json.length; i++) {
            const row = json[i]; if (!row || row.length === 0) continue;
            const laiteIdRaaka = row[0] ? String(row[0]).trim() : ""; if (!laiteIdRaaka) continue;

            let fullId = null;
            const elem = document.querySelector(`[data-nimi="${laiteIdRaaka}"]`);
            if (elem) { 
                const match = elem.getAttribute("onclick").match(/'(.*?)'/); 
                if (match) fullId = match[1]; 
            } else { fullId = laiteIdRaaka; }

            const uusiOsa = {
                laite_id: fullId, numero: row[1] ? String(row[1]).trim() : "-",
                maara: row[2] ? String(row[2]).trim() : "0", nimi: row[3] ? String(row[3]).trim() : "-",
                hylly: row[4] ? String(row[4]).trim() : "-", toimittaja: row[5] ? String(row[5]).trim() : "-"
            };

            try {
                const { data: dbData } = await supabaseclient.from('varaosat').insert(uusiOsa).select();
                if(dbData && dbData[0]) uusiOsa.id = dbData[0].id;
                if (!varaosatData[fullId]) varaosatData[fullId] = [];
                varaosatData[fullId].push(uusiOsa);
                lisatty++;
            } catch(err) { console.error(err); }
        }
        
        alert(`📦 Varaosat tuotu!\nYhdistettiin ${lisatty} laitteen osaa.`);
        event.target.value = ""; 
        if (valittuKuljetinID) paivitaVaraosatTaulukko(valittuKuljetinID);
    };
    reader.readAsArrayBuffer(file);
}