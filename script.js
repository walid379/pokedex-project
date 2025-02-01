const button = document.getElementById("button")
const input = document.getElementById("input")
const nom = document.getElementById("nom")
const image = document.getElementById("img")
const nom2 = document.getElementById("nom2")
const image2 = document.getElementById("img2")
const popup = document.getElementById("popup")
const close = document.getElementById("close")
const poids = document.getElementById("poids")
const taille = document.getElementById("taille")
const types = document.getElementById("type1")
let api

button.addEventListener("click", async function(){
    const valeur = input.value
    input.value = ""
    api = "https://pokeapi.co/api/v2/pokemon/" + valeur
    const poke = await getName()
    if (!poke) {
        alert("Ce nom n'est pas valide")
    }else{
        nom.textContent = poke
        nom2.textContent = poke
        const sprite_front = await getImage()
        image.src = sprite_front
        image2.src = sprite_front
        document.body.setAttribute("src", image)
        document.body.setAttribute("src", image2)

        const poid = await getWeight()
        poids.textContent = poid/10 + " kg"

        const hauteur = await getHeight()
        taille.textContent = hauteur*10 + " cm"
    }
})

image.addEventListener("click", function(){
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

async function getImage(){
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

async function getType(){
    try{
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error('Erreur HTTP' + response.status)
        }
        const data = await response.json()
        return data.types.map(typeInfo => typeInfo.type.name)
    }catch(error){
        console.error('Erreur', error)
    }
}

function upperCasePremiereLettre(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}