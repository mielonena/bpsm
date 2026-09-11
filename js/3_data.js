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
                    kommentti: v.kommentti, tyoNumero: v.tyo_numero, tyoTyyppi: v.tyo_tyyppi, suunniteltu_pvm: v.suunniteltu_pvm, kestoarvio: v.kestoarvio, varaosatarpeet: v.varaosatarpeet
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
async function naytaKirjautunutKayttaja() {
    const nimiKentta = document.getElementById("kayttaja-nimi");
    if (!nimiKentta) return;

    try {
        // Haetaan Supabasesta nykyinen istunto / käyttäjä
        const { data: { user }, error } = await supabaseclient.auth.getUser();
        
        if (user) {
            // Otetaan sähköpostiosoite tai puhelinnumero
            const tunnus = user.email || "Tuntematon tunnus";
            
            // Muotoillaan rooli nätimmin (isolla alkukirjaimella)
            let rooliMuotoiltu = "";
            if (typeof kayttajaRooli !== 'undefined') {
                rooliMuotoiltu = kayttajaRooli.charAt(0).toUpperCase() + kayttajaRooli.slice(1);
            }
            
            // Värjätään rooli (katsoja = harmaa, muut = vihreä)
            const rooliVari = kayttajaRooli === 'katsoja' ? '#7f8c8d' : '#27ae60';

            nimiKentta.innerHTML = `<span style="margin-left: 8px; font-size: 11px; padding: 2px 6px; background: ${rooliVari}; color: white; border-radius: 10px;">${rooliMuotoiltu}</span>`;
        } else {
            nimiKentta.innerText = "Ei kirjautunut";
        }
    } catch (e) {
        console.error("Virhe käyttäjän tietojen haussa:", e);
        nimiKentta.innerText = "Yhteysvirhe";
    }
}
