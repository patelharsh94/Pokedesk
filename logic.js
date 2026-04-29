class Pokemon {
    constructor(name, height, weight, imageUrl, abilities, images, id, moves, types) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.imageUrl = imageUrl;
        this.abilities = abilities;
        this.images = images;
        this.id = id;
        this.moves = moves;
        this.types = types;
    }
}

var currPokemon = null;
var imageIndex = 0;
var isMoreInfo = true;

function setPokemonDetails() {
    if (currPokemon) {
        currPokemon.name = currPokemon.name.charAt(0).toUpperCase() + currPokemon.name.slice(1);
        document.querySelector('.pokemon-name').innerHTML = `<div><h1>${currPokemon.name}</h1></div>`;
        document.querySelector('.pokemon-id').innerHTML = `<div class="pokemon-info-row"><h4>Id:</h4> <p>${currPokemon.id}<p></div>`;
        document.querySelector('.pokemon-types').innerHTML = `<div class="pokemon-info-row"><h4>Types: </h4> <p>${currPokemon.types.join(', ')}<p></div>`;
        document.querySelector('.pokemon-image-carsoule').innerHTML = `<img src=${currPokemon.imageUrl} ></img>`
    }
}

function getMoreInfo() {
    if (currPokemon && isMoreInfo) {
        currPokemon.name = currPokemon.name.charAt(0).toUpperCase() + currPokemon.name.slice(1);
        document.querySelector('.pokemon-name').innerHTML = `<div><h1>${currPokemon.name}</h1></div>`;
        document.querySelector('.pokemon-id').innerHTML = `<div class="pokemon-info-row"><h4>Id:</h4> <p>${currPokemon.id}<p></div>`;
        document.querySelector('.pokemon-types').innerHTML = `<div class="pokemon-info-row"><h4>Types: </h4> <p>${currPokemon.types.join(', ')}<p></div>`;
        document.querySelector('.pokemon-height').innerHTML = `<div class="pokemon-info-row"><h4>Height:</h4> <p>${currPokemon.height}<p></div>`;
        document.querySelector('.pokemon-weight').innerHTML = `<div class="pokemon-info-row"><h4>Weight:</h4> <p>${currPokemon.weight}<p></div>`;
        document.querySelector('.pokemon-abilities').innerHTML = `<div class="pokemon-info-row"><h4>Abilities: </h4> <p>${currPokemon.abilities.join(', ')}<p></div>`;
        document.querySelector('.pokemon-moves').innerHTML = `<div class="pokemon-info-row"><h4>Moves: </h4> <p>${currPokemon.moves.join(', ')}<p></div>`;
        document.querySelector('.pokemon-more-info-button').textContent = 'Less Info';
        
    } else if(!isMoreInfo) {
        document.querySelector('.pokemon-height').innerHTML = ``;
        document.querySelector('.pokemon-weight').innerHTML = ``;
        document.querySelector('.pokemon-abilities').innerHTML = ``;
        document.querySelector('.pokemon-moves').innerHTML = ``;
        document.querySelector('.pokemon-more-info-button').textContent = 'More Info';
    }
    isMoreInfo = !isMoreInfo;
}

function getPokemonDetails(id) {
    var data = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    var spriteList = ['front_default', 'back_default', 'front_female', 'back_female', 'front_shiny', 'back_shiny',  'front_shiny_female', 'back_shiny_female'];
    data.then(response => response.json())
        .then(pokemon => {
            var name = pokemon.name;
            var height = pokemon.height;
            var weight = pokemon.weight;
            var imageUrl = pokemon.sprites.front_default;
            var abilities = pokemon.abilities.map(ability => ability.ability.name);
            var id = pokemon.id;
            var images = [];

            spriteList.forEach(sprite => {
                if (pokemon.sprites[sprite]) {
                    images.push(pokemon.sprites[sprite]);
                }
            });
            
            var moves = pokemon.moves.map(move => move.move.name);
            var types = pokemon.types.map(type => type.type.name);

            currPokemon = new Pokemon(name, height, weight, imageUrl, abilities, images, id, moves, types);
            console.log("setting curr pokemon to: " + currPokemon)
            setPokemonDetails();
        })
        .catch(error => {
            console.error('Error fetching Pokémon details:', error);
        });
    
}

function prevImage (){
    if (imageIndex == 0) {
        imageIndex = currPokemon?.images.length-1;
    } else {
        imageIndex--;
    }
    document.querySelector('.pokemon-image-carsoule').innerHTML = `<img src=${currPokemon.images[imageIndex]} ></img>`
}

function nextImage (){
    if (imageIndex ==  currPokemon?.images.length-1) {
        imageIndex = 0;
    } else {
        imageIndex ++;
    }
    document.querySelector('.pokemon-image-carsoule').innerHTML = `<img src=${currPokemon.images[imageIndex]} ></img>`
}