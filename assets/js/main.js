const pokeList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
//let details = document.getElementsByClassName('pokemon');
const limit = 12;
let offset = 0;
const maxRecords = 151;

function loadPokemonItems(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="pokeApi.pokeSingle(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li></a>
        `).join('');
    pokeList.innerHTML += newHtml;
    })
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const nextRecords = offset + limit;

    if(nextRecords >= maxRecords){
        const newlimit = maxRecords - offset;
        loadPokemonItems(offset, newlimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItems(offset, limit);
    }
})