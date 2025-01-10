// app.js
import { defaultBusLines } from './busLines.js'; // Importation des lignes de bus


// Fonction pour mettre en surbrillance le texte correspondant à la recherche
function highlightText(text, query) {
    if (!query.trim()) {
        // Si la recherche est vide, retourner le texte sans surbrillance
        return text;
    }
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

// Fonction pour afficher les résultats de la recherche
function displayResults(query) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Vider les résultats précédents

    const lowerCaseQuery = query.toLowerCase();

    const filteredResults = defaultBusLines.filter(
        (bus) =>
            bus.number.includes(lowerCaseQuery) ||
            bus.route.toLowerCase().includes(lowerCaseQuery)
    );

    if (filteredResults.length === 0) {
        const noResults = document.createElement("div");
        noResults.className = "no-results";
        noResults.textContent = "Aucun résultat trouvé.";
        resultsContainer.appendChild(noResults);
        return;
    }

    filteredResults.forEach((bus) => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";   

        // Ajout du numéro et de l'itinéraire avec la mise en surbrillance
        const highlightedNumber = highlightText(bus.number, query);
        const highlightedRoute = highlightText(bus.route, query);

        resultItem.innerHTML = `<span class="bus-number">Bus ${highlightedNumber}:</span> ${highlightedRoute}`;
        resultsContainer.appendChild(resultItem);
    });
}

// Écouteur d'événements pour la barre de recherche
document.getElementById("search-bar").addEventListener("input", (event) => {
    displayResults(event.target.value);
});