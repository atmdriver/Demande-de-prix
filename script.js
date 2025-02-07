async function calculerPrix() {
    const depart = document.getElementById('depart').value;
    const arrivee = document.getElementById('arrivee').value;
    const dateDepart = document.getElementById('dateDepart').value;
    const heureDepart = document.getElementById('heureDepart').value;
    const gammeVoiture = document.getElementById('gammeVoiture').value;

    const startCoords = await getCoordinates(depart);
    const endCoords = await getCoordinates(arrivee);

    if (startCoords && endCoords) {
        const distance = await getRouteDistance(startCoords, endCoords);
        if (distance) {
            const tarifBase = gammeVoiture === 'berline' ? 1.5 : 2.0; // Tarif par kilomètre
            const heure = parseInt(heureDepart.split(':')[0]);
            const tarifNuit = heure >= 20 || heure < 6 ? 1.2 : 1.0; // Majoration de nuit

            // Vous pouvez utiliser la date pour des calculs supplémentaires
            const date = new Date(dateDepart);
            const jourSemaine = date.getDay(); // 0 pour Dimanche, 1 pour Lundi, etc.

            // Exemple: Tarif majoré le weekend
            const tarifWeekend = jourSemaine === 0 || jourSemaine === 6 ? 1.1 : 1.0;

            const prixTotal = distance * tarifBase * tarifNuit * tarifWeekend;

            document.getElementById('resultat').innerText = `Prix estimé: ${prixTotal.toFixed(2)} €`;
        } else {
            document.getElementById('resultat').innerText = 'Impossible de calculer la distance.';
        }
    } else {
        document.getElementById('resultat').innerText = 'Adresses invalides.';
    }
}
