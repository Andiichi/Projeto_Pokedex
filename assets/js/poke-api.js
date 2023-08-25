// criando um objeto para manipulação

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()

    pokemon.numero = pokeDetail.id
    pokemon.nome = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.tipos = types
    pokemon.tipoPrincipal = type

    pokemon.foto = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    // PEGAMOS A URL
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    // PEGANDO A URL 
    return  fetch(url)
            // callbacK - TRANSFORMANDO ESSA LISTA EM JSON
            .then((response) =>  response.json()) //arrow function
            // PEGA O RESULTADO EM JSON
            .then((jsonBody) => jsonBody.results)
            // PEGANDO A LISTA EM JSON E DEIXANDO COMO LISTA DE DETALHES
            .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
            // AS REQUISIÇÕES DE DETALHES APOS PEGAR A LISTA TRANSF. EM JSON E AGUARDANDO
            .then((detailRequests) => Promise.all(detailRequests))
            // A LISTA DOS DETALHES PRONTA APOS O AGUARDO DA PROMISE
            .then((pokemonsDetails) => pokemonsDetails)

            //callback de error - quando houver
           .catch((error) => console.error(error))
}
