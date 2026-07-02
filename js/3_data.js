// ========================================== //
// === 4. DATAN LATAUS TIETOKANNASTA ======== //
// ========================================== //

async function lataaKaikkiDataTietokannasta() {
    try {
        const [ { data: viat }, { data: historia }, { data: osat } ] = await Promise.all([
            supabaseclient.from('aktiiviset_viat').select('*'),
            supabaseclient.from('huoltohistoria').select('*'),
            supabaseclient.from('varaosat').select('*')
        ]);

        aktiivisetViat = {};
        if (viat) {
            viat.forEach(v => {
                aktiivisetViat[v.laite_id] = {
                    prio: v.prio, otsikko: v.otsikko, sijainti: v.sijainti,
                    kommentti: v.kommentti, tyoNumero: v.tyo_numero, tyoTyyppi: v.tyo_tyyppi
                };
            });
        }

        huoltoHistoria = {};
        if (historia) {
            historia.forEach(h => {
                if (!huoltoHistoria[h.laite_id]) huoltoHistoria[h.laite_id] = [];
                huoltoHistoria[h.laite_id].push({
                    id: h.id, pvm: h.pvm, tyoNumero: h.tyo_numero, tyoTyyppi: h.tyo_tyyppi,
                    sijainti: h.sijainti, otsikko: h.otsikko, osat: h.osat, tekija: h.tekija, status: h.status
                });
            });
        }

        varaosatData = {};
        if (osat) {
            osat.forEach(o => {
                if (!varaosatData[o.laite_id]) varaosatData[o.laite_id] = [];
                varaosatData[o.laite_id].push({
                    id: o.id, numero: o.numero, maara: o.maara, nimi: o.nimi,
                    hylly: o.hylly, toimittaja: o.toimittaja
                });
            });
        }
    } catch (err) {
        console.error("Virhe ladattaessa dataa:", err);
    }
}
