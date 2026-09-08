// ========================================== //
// === 1. GLOBAALIT MUUTTUJAT JA TILA ======= //
// ========================================== //

let kayttajaRooli = 'katsoja'; // UUSI: 'admin', 'asentaja' tai 'katsoja' (Oletuksena turvallisin)
let onkoAdmin = false; // Säilytetään yhteensopivuuden vuoksi (vastaa tilaa kayttajaRooli === 'admin')
let kirjautunutKayttaja = ""; // Tallentaa sähköpostin alkuosan

const kuljetinData = {};
let valittuKuljetinID = "";
let muokattavaIndeksi = -1; 
let laatikotPiirretty = false;
let peruskunnostusNakymaPaalla = false;
let vikaTyyppiFiltteri = "Kaikki"; // UUSI: Vika/PK -suodatus
let vikaSorttaus = "kl_asc";
let vikaFiltteri = "Kaikki";
let vikaHakuTeksti = ""; 
let historiaHakuTeksti = ""; 
let aktiivinenKaappi = "";
let aktiivinenOsaNumero = "";

let varaosatData = {};
let huoltoHistoria = {};
let aktiivisetViat = {};
let keskitettyVaraosaHaku = "";

// ========================================== //
// === 2. SUPABASE YHTEYDEN ALUSTUS ========= //
// ========================================== //

const supabaseUrl = 'https://hpwsekjtjdsyugjrswri.supabase.co';
const supabaseKey = 'sb_publishable_44-9RfCR4zmmKmm3dWL4kw_b4elVyzu';
const supabaseclient = window.supabase.createClient(supabaseUrl, supabaseKey);

// ========================================== //
// === 3. EVÄSTEIDEN HALLINTA (GDPR)      === //
// ========================================== //

function tarkistaEvasteSuostumus() {
    // Tarkistetaan selaimen muistista, onko suostumus jo annettu
    const suostumus = localStorage.getItem("cookie_consent_level");
    
    // Jos suostumusta ei löydy, näytetään banneri
    if (!suostumus) {
        document.getElementById("cookie-banner").style.display = "block";
    } else {
        // Tässä voitaisiin laukaista analytiikka, jos käyttäjä on valinnut 'kaikki'
        // esim. if (suostumus === 'kaikki') kaynnistaAnalytiikka();
    }
}

function hyvaksyEvasteet(taso) {
    // taso on joko 'valttamattomat' tai 'kaikki'
    
    // Tallennetaan käyttäjän valinta ja päivämäärä
    localStorage.setItem("cookie_consent_level", taso);
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    
    // Piilotetaan banneri animoidusti (fade out)
    const banner = document.getElementById("cookie-banner");
    banner.style.transition = "opacity 0.5s";
    banner.style.opacity = "0";
    
    setTimeout(() => {
        banner.style.display = "none";
    }, 500);

    // Jos valittiin kaikki, ja sinulla on Google Analytics tms., käynnistä se tässä.
    if (taso === 'kaikki') {
        console.log("Kaikki evästeet hyväksytty. Analytiikan voi käynnistää.");
        // kaynnistaGoogleAnalytics();
    } else {
        console.log("Vain välttämättömät evästeet hyväksytty.");
    }
}

// Suoritetaan tarkistus automaattisesti kun sivu on latautunut
window.addEventListener("DOMContentLoaded", tarkistaEvasteSuostumus);