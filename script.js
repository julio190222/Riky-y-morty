const apiUrl = 'https://rickandmortyapi.com/api/character';
const cardContainer = document.getElementById('cardContainer');
const characterFilter = document.getElementById('characterFilter');

async function fetchCharacters() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
}

function createCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
        <h3>${character.name}</h3>
        <p>${character.status}</p>
        <p>${character.species} - ${character.gender}</p>
        <p>${character.origin.name}</p>
    `;
    return card;
}

function populateCards(characters) {
    cardContainer.innerHTML = '';
    characters.forEach(character => {
        const card = createCard(character);
        cardContainer.appendChild(card);
    });
}

function populateFilter(characters) {
    characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.id;
        option.textContent = character.name;
        characterFilter.appendChild(option);
    });
}

characterFilter.addEventListener('change', (event) => {
    const selectedId = event.target.value;
    if (selectedId === 'all') {
        fetchCharacters().then(populateCards);
    } else {
        fetchCharacters().then(characters => {
            const filteredCharacter = characters.find(c => c.id == selectedId);
            populateCards([filteredCharacter]);
        });
    }
});

fetchCharacters().then(characters => {
    populateCards(characters);
    populateFilter(characters);
});