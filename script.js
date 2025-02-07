const apiKey = '5b3ce3597851110001cf6248ce52305d63b541e9b030f687415cb54f';

// Autocomplétion des adresses
document.getElementById('depart').addEventListener('input', async (e) => {
    const query = e.target.value;
    if (query.length < 3) return; // Ne pas faire de requête pour moins de 3 caractères

    const response = await fetch(`https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(query)}`);
    const data = await response.json();
    const datalist = document.getElementById('departList');
    datalist.innerHTML = ''; // Réinitialiser la liste

    if (data.features && data.features.length > 0) {
        data.features.forEach(feature => {
            const option = document.createElement('option');
            option.value = feature.properties.label;
            datalist.appendChild(option);
        });
    }
});

document.getElementById('arrivee').addEventListener('input', async (e) => {
    const query = e.target.value;
    if (query.length < 3) return; // Ne pas faire de requête pour moins de 3 caractères

    const response = await fetch(`https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(query)}`);
    const data = await response.json();
    const datalist = document.getElementById('arriveeList');
    datalist.innerHTML = ''; // Réinitialiser la liste

    if (data.features && data.features.length > 0) {
        data.features.forEach(feature => {
            const option = document.createElement('option');
            option.value = feature.properties.label;
            datalist.appendChild(option);
        });
    }
});
