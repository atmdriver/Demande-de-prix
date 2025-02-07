async function getCoordinates(address) {
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        return data.features[0].geometry.coordinates;
    }
    return null;
}

async function getRouteDistance(start, end) {
    const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`);
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
        return data.routes[0].summary.distance / 1000; // Distance en kilomètres
    }
    return null;
}

async function calculerPrix() {
    const depart = document.getElementById('depart').value;
    const arrivee = document.getElementById('arrivee').value;
    const heureDepart = document.getElementById('heureDepart').value;
    const gammeVoiture = document.getElementById('gammeVoiture').value;

    if (!depart || !arrivee) {
        document.getElementById('resultat').innerText = 'Veuillez remplir les adresses de départ et d\'arrivée.';
        return;
    }

    const startCoords = await getCoordinates(depart);
    const endCoords = await getCoordinates(arrivee);

    if (startCoords && endCoords) {
        const distance = await getRouteDistance(startCoords, endCoords);
        if (distance) {
            const tarifBase = gammeVoiture === 'berline' ? 1.5 : 2.0; // Tarif par kilomètre
            const heure = parseInt(heureDepart.split(':')[0]);
            const tarifNuit = heure >= 20 || heure < 6 ? 1.2 : 1.0; // Majoration de nuit

            const prixTotal = distance * tarifBase * tarifNuit;

            document.getElementById('resultat').innerText = `Prix estimé: ${prixTotal.toFixed(2)} €`;
        } else {
            document.getElementById('resultat').innerText = 'Impossible de calculer la distance.';
        }
    } else {
        document.getElementById('resultat').innerText = 'Adresses invalides.';
    }
}
