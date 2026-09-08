// ========================================== //
// === 3. KIRJAUTUMINEN JA ROOLIT =========== //
// ========================================== //

async function tarkistaKirjautuminen() {
    const { data: { session } } = await supabaseclient.auth.getSession();
    
    if (session) {
        if (session.user.email) {
            kirjautunutKayttaja = session.user.email.split('@')[0];
        }

        // Haetaan käyttäjän rooli turvallisesti Supabasen kayttajaroolit-taulusta
        try {
            const { data: rooliData, error: rooliVirhe } = await supabaseclient
                .from('kayttajaroolit')
                .select('rooli')
                .eq('id', session.user.id)
                .single();

            if (rooliData && rooliData.rooli) {
                kayttajaRooli = rooliData.rooli; // Asettaa 'admin', 'asentaja' tai 'katsoja'
            } else {
                kayttajaRooli = 'katsoja'; // Oletus, jos käyttäjää ei löydy roolitaulusta
            }
        } catch (e) {
            console.error("Virhe roolin haussa:", e);
            kayttajaRooli = 'katsoja'; // Turvallinen fallback virhetilanteessa
        }

        console.log(`Kirjautunut käyttäjä: ${kirjautunutKayttaja} | Rooli: ${kayttajaRooli}`);

        // Säilytetään yhteensopivuus vanhojen onkoAdmin-tarkistusten kanssa
        if (kayttajaRooli === 'admin') {
            onkoAdmin = true;
            // Paljastetaan admineille tarkoitetut piilotetut napit (jos html:ssä on luokka admin-vain)
            document.querySelectorAll('.admin-vain').forEach(el => el.classList.remove('admin-vain'));
        } else {
            onkoAdmin = false;
        }
        
        // Vaihdetaan näkymä kirjautumisruudusta varsinaiseen sovellukseen
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        
        // Ladataan ohjelman data ja käyttöliittymä
        await lataaKaikkiDataTietokannasta();
        generoiListanakyma();
        paivitaVikaKartta();
        paivitaVikaLista();
        vaihdaTaso('kaikki');
    }
}

async function suoritaKirjautuminen() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error');

    errorMsg.style.display = 'none';

    if (!email || !password) {
        errorMsg.innerText = 'Täytä molemmat kentät.';
        errorMsg.style.display = 'block';
        return;
    }

    const { data, error } = await supabaseclient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        errorMsg.innerText = 'Virhe: ' + error.message;
        errorMsg.style.display = 'block';
    } else {
        location.reload(); // Pakottaa sivun päivittymään session voimaantulon jälkeen
    }
}

async function suoritaUloskirjautuminen() {
    await supabaseclient.auth.signOut();
    location.reload();
}