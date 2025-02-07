const apiKey = '5b3ce3597851110001cf6248ce52305d63b541e9b030f687415cb54f';

async function getCoordinates(address) {
    try {
        const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
            return data.features[0].geometry.coordinates; // [longitude, latitude]
        } else {
            console.error("Aucun résultat trouvé pour l'adresse :", address);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées :", error);
        return null;
    }
}

async function getRouteDistance(start, end) {
    try {
        const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
            return data.routes[0].summary.distance / 1000; // Distance en kilomètres
        } else {
            console.error("Aucun itinéraire trouvé entre les points :", start, end);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors du calcul de la distance :", error);
        return null;
    }
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

    // Récupérer les coordonnées de départ et d'arrivée
    const startCoords = await getCoordinates(depart);
    const endCoords = await getCoordinates(arrivee);

    if (startCoords && endCoords) {
        // Calculer la distance
        const distance = await getRouteDistance(startCoords, endCoords);

        if (distance) {
            // Calculer le prix
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
async function calculerPrix() {
    console.log("Début du calcul du prix...");

    const depart = document.getElementById('depart').value;
    const arrivee = document.getElementById('arrivee').value;
    const heureDepart = document.getElementById('heureDepart').value;
    const gammeVoiture = document.getElementById('gammeVoiture').value;

    console.log("Adresse de départ :", depart);
    console.log("Adresse d'arrivée :", arrivee);

    if (!depart || !arrivee) {
        console.error("Adresses manquantes.");
        document.getElementById('resultat').innerText = 'Veuillez remplir les adresses de départ et d\'arrivée.';
        return;
    }

    console.log("Récupération des coordonnées de départ...");
    const startCoords = await getCoordinates(depart);
    console.log("Coordonnées de départ :", startCoords);

    console.log("Récupération des coordonnées d'arrivée...");
    const endCoords = await getCoordinates(arrivee);
    console.log("Coordonnées d'arrivée :", endCoords);

    if (startCoords && endCoords) {
        console.log("Calcul de la distance...");
        const distance = await getRouteDistance(startCoords, endCoords);
        console.log("Distance calculée :", distance);

        if (distance) {
            console.log("Calcul du prix...");
            const tarifBase = gammeVoiture === 'berline' ? 1.5 : 2.0;
            const heure = parseInt(heureDepart.split(':')[0]);
            const tarifNuit = heure >= 20 || heure < 6 ? 1.2 : 1.0;

            const prixTotal = distance * tarifBase * tarifNuit;
            console.log("Prix total calculé :", prixTotal);

            document.getElementById('resultat').innerText = `Prix estimé: ${prixTotal.toFixed(2)} €`;
        } else {
            console.error("Distance non calculée.");
            document.getElementById('resultat').innerText = 'Impossible de calculer la distance.';
        }
    } else {
        console.error("Coordonnées invalides.");
        document.getElementById('resultat').innerText = 'Adresses invalides.';
    }
}
