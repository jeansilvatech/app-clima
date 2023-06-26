const form = document.querySelector('form')
const inputCity = document.querySelector('form input')
const btnSearch = document.querySelector('form button')
const cityName = document.querySelector('.city-name')
const countryFlag = document.querySelector('.country')
const cityTemp = document.querySelector('.local-temp p')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const descriptionIcon = document.querySelector('.icon-description')
const descriptionText = document.querySelector('.text-description')

const bgTemp = document.querySelector('.bg-temp')

const card = document.querySelector('.card')
const cardCity = document.querySelector('.card-city')
const loading = document.querySelector('.loading')
const errorMessage = document.querySelector('.error')
const logo = document.querySelector('.logo')
const preload = document.querySelector('.preload')
const urlBase = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "3b9bf2db9f68c1b2bb535fc531b4c466"
const language = "pt_br"
setInterval(() => {
    preload.style.display = 'none'
 }, 5000);
const api = async (city)=>{
    const res = await fetch(`${urlBase}q=${city}&units=metric&appid=${apiKey}&lang=${language}`)
    const data = await res.json()
    return data;
}
   
function cardReponsive(size){
    if (window.matchMedia("(max-width:600px)").matches) {
        card.style.height = '100%'
      }else{
        card.style.height = size
      }
}
function renderCondition(){
    if(!inputCity.value == ''){
        render(inputCity.value)
        inputCity.value = '' 
        loading.style.display = 'flex'
        errorMessage.style.display = 'none' 
    setInterval(() => {
        loading.style.display = 'none'
     }, 5000);
    }else{
        errorMessage.style.display = 'flex'
    }
}
const render = async (city)=>{
    const data = await api(city);
    if(data.name === undefined){
        errorMessage.style.display = 'flex'
        cardCity.style.display = 'none'
        const sizeMobile = "20%"
        cardReponsive(sizeMobile)
    }
    cityName.innerText = data.name
    cityTemp.innerText = `${parseInt(data.main.temp)}°C`
    humidity.innerText =  `${parseInt(data.main.humidity)}%`
    wind.innerText =  `${data.wind.speed} km/h`
    descriptionText.innerText = data.weather[0].description
    descriptionIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryFlag.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    cardCity.style.display = 'flex'
    logo.style.display = 'none'
    const sizeDesktop = "60%"
    cardReponsive(sizeDesktop)
    switch(data.weather[0].icon){
        case "01d":
            bgTemp.style.backgroundImage = `url("../../assets/img/01d.jpg")`;
         break;
         case "01n":
            bgTemp.style.backgroundImage = `url("../../assets/img/01n.jpg")`;
         break;
         case "04d":
            bgTemp.style.backgroundImage = `url("../../assets/img/04d.jpg")`;
         break;
         case "04n":
            bgTemp.style.backgroundImage = `url("../../assets/img/04n.jpg")`;
         break;
            default:
                bgTemp.style.backgroundImage = ''
    }
    
}

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    renderCondition()
})
btnSearch.addEventListener('submit', (event)=>{
    event.preventDefault()
    renderCondition()
})
window.document.addEventListener('DOMContentLoaded', ()=>{

})
