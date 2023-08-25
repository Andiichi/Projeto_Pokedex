/* 
Que testes devo realizar em um REST API?
        Method.
        URI.
        Headers.
        Query Parameters.
        Body.
*/


const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 9
let offset = 0


// CARREGA MAIS POKEMON AO CLICAR NO BUTÃO "CARREGAR MAIS"
function loadPokemonItens(offset, limit){
    // ADICIONANDO ITEMS NA NOSSA LISTAGEM DO HTML - DEFAULT 5 ITENS
    function convertPokemonToLi(pokemon){
        return `
            <li class="pokemon ${pokemon.tipoPrincipal}">
                        <span class="number">#${pokemon.numero}</span>
                        <span class="name">${pokemon.nome}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.tipos.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                <img src="${pokemon.foto}" alt="${pokemon.nome}"/>
                        </div>
            </li>
            `
}
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map(convertPokemonToLi).join('')     
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

window.addEventListener("load", event => {
    document.getElementById("clearButton").onclick = function() {
        location.reload(true);
    }
});
