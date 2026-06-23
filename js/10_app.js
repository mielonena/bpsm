// ========================================== //
// === 13. ALUSTUKSET (Sivun lataus) ======== //
// ========================================== //

document.addEventListener("DOMContentLoaded", () => {
    tarkistaKirjautuminen(); // Käynnistää RLS- ja datan lataus prosessit
    
    // Piirretään kiinteät grafiikat (Riippumatta onko kirjauduttu)
    luoRuudukonNumerot();
    luoLuisut(); 
    generoi700Sarja(); 
    generoi750Sarja(); 
    generoi630Sarja(); 
    generoi680Sarja();
    generoiSahkokeskukset();
    generoiSDKaappiSVG();
    const tooltip = document.getElementById("rata-tooltip");
    const rataOsat = document.querySelectorAll(".rata-osa");

    rataOsat.forEach(osa => {
        osa.addEventListener("mousemove", (e) => {
            const nimi = osa.getAttribute("data-nimi");
            if (nimi && tooltip) {
                tooltip.innerHTML = nimi; tooltip.style.display = "block";
                tooltip.style.left = e.pageX + "px"; tooltip.style.top = e.pageY + "px";
            }
        });
        osa.addEventListener("mouseout", () => { if(tooltip) tooltip.style.display = "none"; });
    });
});