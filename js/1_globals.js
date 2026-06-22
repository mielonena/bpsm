// ========================================== //
// === 1. GLOBAALIT MUUTTUJAT JA TILA ======= //
// ========================================== //

let onkoAdmin = false; // Tieto siitä, onko kirjautuneella käyttäjällä admin-oikeudet
let kirjautunutKayttaja = ""; // Tallentaa sähköpostin alkuosan

const kuljetinData = {};
let valittuKuljetinID = "";
let muokattavaIndeksi = -1; 
let laatikotPiirretty = false;
let peruskunnostusNakymaPaalla = false;
let vikaSorttaus = "kl_asc";
let vikaFiltteri = "Kaikki";
let vikaHakuTeksti = ""; 
let historiaHakuTeksti = ""; 

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