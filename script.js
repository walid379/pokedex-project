const button = document.getElementById("button")
const input = document.getElementById("input")

let nom0 = document.getElementById("nom0")
const nom_popup = document.getElementById("nom_popup")

let nom1 = document.getElementById("nom1")
let nom2 = document.getElementById("nom2")
let nom3 = document.getElementById("nom3")
let nom4 = document.getElementById("nom4")
let nom5 = document.getElementById("nom5")

let noms = [nom0, nom1, nom2, nom3, nom4, nom5]

let histo0 = document.getElementById("histo0")
let histo1 = document.getElementById("histo1")
let histo2 = document.getElementById("histo2")
let histo3 = document.getElementById("histo3")
let histo4 = document.getElementById("histo4")
let histo5 = document.getElementById("histo5")

let histos = [histo1, histo2, histo3, histo4, histo5]

let sprite0 = document.getElementById("img0")
let sprite1 = document.getElementById("img1")
let sprite2 = document.getElementById("img2")
let sprite3 = document.getElementById("img3")
let sprite4 = document.getElementById("img4")
let sprite5 = document.getElementById("img5")

let sprites = [sprite0, sprite1, sprite2, sprite3, sprite4, sprite5]

const sprite_frontd = document.getElementById("img_popup1")
const sprite_backd = document.getElementById("img_popup2")
const sprite_fronts = document.getElementById("img_popup3")
const sprite_backs = document.getElementById("img_popup4")

const talent = document.getElementById("talent")
const poids = document.getElementById("poids")
const taille = document.getElementById("taille")

const types1 = document.getElementById("type1")
const types2 = document.getElementById("type2")

const popup = document.getElementById("popup")
const close = document.getElementById("close")

let historique = []

const pokemons = new Map()

async function getPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        if (!response.ok) {
            alert('Pokémon introuvable')
        }

        const data = await response.json();
        const firstType = data.types[0].type.name
        iconPath1 = `./src/types/${firstType}.png`
        if (data.types.length > 1) {
            const secondType = data.types[1].type.name
            iconPath2 = `./src/types/${secondType}.png`
        }else{
            iconPath2 = ""
        }
        const pokemon = {
            name: upperCasePremiereLettre(data.name),
            sprite_front_default: data.sprites.front_default,
            sprite_back_default: data.sprites.back_default,
            sprite_front_shiny: data.sprites.front_shiny,
            sprite_back_shiny: data.sprites.back_shiny,
            weight: data.weight,
            height: data.height,
            ability: upperCasePremiereLettre(data.abilities[0].ability.name),
            type1: iconPath1,
            type2: iconPath2,
        }
        pokemons.set(id, pokemon)
        return pokemon
    } catch (error) {
        console.error("Erreur lors de la récupération du Pokémon :", error.message);
        return null; // Permet de gérer proprement l'erreur
    }
}

async function generateMainPokemon(value) {
    data = await getPokemon(value)

    pokemons[0] = {
        name: data.name,
        sprite: data.sprite_front_default,
        spriteFront: data.sprite_front_default,
        spriteBack: data.sprite_back_default,
        spriteFrontShiny: data.sprite_front_shiny,
        spriteBackShiny: data.sprite_back_shiny,
        weight: data.weight / 10 + " kg",
        height: data.height * 10 + " cm",
        ability: "Ability : " + data.ability,
        type1: data.type1,
        type2: data.type2
    }
    sprites[0].src = data.sprite_front_default
    noms[0].textContent = data.name
}

async function generatePokemon() {
    for (let i = 0; i < 6; i++) {
        const randomId = Math.floor(Math.random() * 1025) + 1
        const data = await getPokemon(randomId)

        // Stocker les données dans un tableau
        pokemons[i] = {
            name: data.name,
            sprite: data.sprite_front_default,
            spriteFront: data.sprite_front_default,
            spriteBack: data.sprite_back_default,
            spriteFrontShiny: data.sprite_front_shiny,
            spriteBackShiny: data.sprite_back_shiny,
            weight: data.weight / 10 + " kg",
            height: data.height * 10 + " cm",
            ability: "Ability : " + data.ability,
            type1: data.type1,
            type2: data.type2
        }
        // Modifier l'affichage de la liste
        sprites[i].src = data.sprite_front_default
        noms[i].textContent = data.name

        // Ajouter un event listener sur chaque Pokémon
        sprites[i].addEventListener("click", () => showPopup(i))
    }
}

function showPopup(index) {
    const data = pokemons[index] // Récupère les données du Pokémon cliqué

    // Modifier le contenu du popup avec les bonnes infos
    nom_popup.textContent = data.name
    sprite_frontd.src = data.spriteFront
    sprite_backd.src = data.spriteBack
    sprite_fronts.src = data.spriteFrontShiny
    sprite_backs.src = data.spriteBackShiny
    poids.textContent = data.weight
    taille.textContent = data.height
    talent.textContent = data.ability
    types1.src = data.type1
    types2.src = data.type2

    // Afficher le popup
    popup.classList.remove("hidden")
}

window.addEventListener("load", async function() {
    await generatePokemon()
})

button.addEventListener("click", async function(){
    const valeur = input.value
    input.value = ""
    generateMainPokemon(valeur)
})

sprites.forEach(function(sprite, index){
    sprite.addEventListener("click", function(){
        popup.style.display = "flex"
        const data = pokemons[index]
        ajouterNomHistorique(data.name)
        if(data.type2 === ""){
            type2.style.display = "none"
        }
        else{
            type2.style.display = "block"
        }
    })
})

histos.forEach(function(histo, index){
    histo.addEventListener("click", function(){
        const data = historique[index]
        generateMainPokemon(data)
    })
})

function ajouterNomHistorique(nom){
    if (!historique.includes(nom)) {
        if(historique.length >= 5){
            historique.shift()
        }
        historique.push(nom)
        histo0.style.display = "none" // Cache le message par défaut
        for (let i = 0; i < histos.length; i++) {
            if (historique[i]) {
                histos[i].textContent = historique[i]
                histos[i].style.display = "block"
            } else {
                histos[i].style.display = "none"
            }
        }
    }
}

close.addEventListener("click", function(){
    popup.style.display = "none"
})

window.addEventListener("click", function(e){
    if (e.target === popup) {
        popup.style.display = "none"
    }
})

function upperCasePremiereLettre(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}