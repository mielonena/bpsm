// ========================================== //
// === 3. KIRJAUTUMINEN JA ROOLIT =========== //
// ========================================== //

async function tarkistaKirjautuminen() {
    const { data: { session } } = await supabaseclient.auth.getSession();
    
    if (session) {
	if (session.user.email) {
            kirjautunutKayttaja = session.user.email.split('@')[0];
        }

	console.log("Käyttäjän metadata:", session.user.app_metadata);
        // Luetaan käyttäjän rooli metatiedoista
        if (session.user.app_metadata && session.user.app_metadata.role === 'admin') {
            onkoAdmin = true;
	document.querySelectorAll('.admin-vain').forEach(el => el.classList.remove('admin-vain'));
        } else {
            onkoAdmin = false;
        }
        
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        
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
