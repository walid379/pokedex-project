const button = document.getElementById("button")
const input = document.getElementById("input")

const nom = document.getElementById("nom")
const nom2 = document.getElementById("nom2")

const sprite_front_default = document.getElementById("img")
const sprite_front_popup_default = document.getElementById("img_popup1")
const sprite_back_popup_default = document.getElementById("img_popup2")
const sprite_front_popup_shiny = document.getElementById("img_popup3")
const sprite_back_popup_shiny = document.getElementById("img_popup4")

const talent = document.getElementById("talent")
const poids = document.getElementById("poids")
const taille = document.getElementById("taille")

const types1 = document.getElementById("type1")
const types2 = document.getElementById("type2")

const popup = document.getElementById("popup")
const close = document.getElementById("close")

let history = JSON.parse(localStorage.getItem("items")) || []
let api


window.addEventListener("load", async function() {
    const randomId = Math.floor(Math.random() * 1025) + 1
    api = "https://pokeapi.co/api/v2/pokemon/" + randomId
    await fetchAndDisplayPokemon()
})

button.addEventListener("click", async function(){
    localStorage.setItem("items", JSON.stringify(history))
    const valeur = input.value
    input.value = ""
    api = "https://pokeapi.co/api/v2/pokemon/" + valeur
    const poke = await getName()
    if (!poke) {
        alert("Ce nom n'est pas valide")
    }else{
        nom.textContent = poke
        nom2.textContent = poke

        const sprite_front = await getFrontSpriteDefault()
        sprite_front_default.src = sprite_front
        document.body.setAttribute("src", sprite_front_default)
        
        sprite_front_popup_default.src = sprite_front
        document.body.setAttribute("src", sprite_front_popup_default)

        const back_sprite_default = await getBackSpriteDefault()
        sprite_back_popup_default.src = back_sprite_default
        document.body.setAttribute("src", sprite_back_popup_default)

        const front_sprite_shiny = await getFrontSpriteShiny()
        sprite_front_popup_shiny.src = front_sprite_shiny
        document.body.setAttribute("src", sprite_front_popup_shiny)

        const back_sprite_shiny = await getBackSpriteShiny()
        sprite_back_popup_shiny.src = back_sprite_shiny
        document.body.setAttribute("src", sprite_back_popup_shiny)


        const poid = await getWeight()
        poids.textContent = poid/10 + " kg"

        const hauteur = await getHeight()
        taille.textContent = hauteur*10 + " cm"

        const ability = await getAbility()
        talent.textContent = "Ability : " + ability

        const type1 = await getType1()
        types1.src = type1
        document.body.setAttribute("src", types1)

        const type2 = await getType2()
        if(type2){
            types2.src = type2
            document.body.setAttribute("src", types2)
            types2.style.display = "block"
        }
        else{
            types2.src = ""
            types2.style.display = "none"
        }
    }
})

sprite_front_default.addEventListener("click", function(){
    popup.style.display = "flex"
})

close.addEventListener("click", function(){
    popup.style.display = "none"
})

window.addEventListener("click", function(e){
    if (e.target === popup) {
        popup.style.display = "none"
    }
})

async function getName(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return upperCasePremiereLettre(data.name)
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getFrontSpriteDefault(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return data.sprites.front_default
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getBackSpriteDefault(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return data.sprites.back_default
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getFrontSpriteShiny(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return data.sprites.front_shiny
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getBackSpriteShiny(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return data.sprites.back_shiny
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getWeight(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return data.weight
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getHeight(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return data.height
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getType1(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        const firstType = data.types[0].type.name
        const iconPath = `./src/types/${firstType}.png`
        return iconPath
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getType2(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()

        if (data.types.length > 1) {
            const secondType = data.types[1].type.name
            return `./src/types/${secondType}.png`
        }else{
            return null
        }
    }catch(error){
        console.error('Erreur', error)
    }
}

async function getAbility(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return upperCasePremiereLettre(data.abilities[0].ability.name)
    }catch(error){
        console.error('Erreur', error)
    }
}

async function fetchAndDisplayPokemon() {
    const poke = await getName()
    if (!poke) return

    nom.textContent = poke
    nom2.textContent = poke

    sprite_front_default.src = await getFrontSpriteDefault()
    sprite_front_popup_default.src = sprite_front_default.src
    sprite_back_popup_default.src = await getBackSpriteDefault()
    sprite_front_popup_shiny.src = await getFrontSpriteShiny()
    sprite_back_popup_shiny.src = await getBackSpriteShiny()

    poids.textContent = (await getWeight()) / 10 + " kg"
    taille.textContent = (await getHeight()) * 10 + " cm"
    talent.textContent = "Ability : " + await getAbility()

    const type1 = await getType1()
    types1.src = type1
    document.body.setAttribute("src", types1)

    const type2 = await getType2()
    if(type2){
        types2.src = type2
        document.body.setAttribute("src", types2)
        types2.style.display = "block"
    }
    else{
        types2.src = ""
        types2.style.display = "none"
    }
}

function upperCasePremiereLettre(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}