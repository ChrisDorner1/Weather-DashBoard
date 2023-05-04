var searchBar = document.querySelector(".searchBar")
var searchBtn = document.querySelector(".searchBtn")
var tomorrow = document.querySelector(".tomorrow")
var currentT = document.querySelector(".currentT")
var nextT = document.querySelector(".nextT")
var nextT2 = document.querySelector(".nextT2")
var nextT3 = document.querySelector(".nextT3")
var nextT4 = document.querySelector(".nextT4")
var card = document.querySelector(".card")
var set = document.querySelector(".d-none")
var storedCities = document.querySelector(".prev")
var pic1= document.querySelector(".pic1")
var pic2 = document.querySelector(".pic2")
var pic3 = document.querySelector(".pic3")
var pic4 = document.querySelector(".pic4")
var pic5 = document.querySelector(".pic5")
var todays = document.querySelector(".todays")
var todaysImg = document.querySelector(".todaysI")

// uses stored cities for search
storedCities.addEventListener("click", function(event){
    input(event.target.textContent)
})

//pull stored searches and places them below search bar
var storedArr = localStorage.getItem("stored")
if (storedArr) {
    storedArr = JSON.parse(storedArr)
    displayStoredCities()
} else {
    storedArr = []
}

function displayStoredCities() {
    storedCities.innerHTML = ""
    for (var i = 0; i < storedArr.length; i++) {
       var savedCity = document.createElement("div")
       savedCity.textContent = storedArr[i]
       storedCities.appendChild(savedCity)
    }
}

//saves previously searched cities
function saved(cityName) {
    storedArr.push(cityName)
    localStorage.setItem("stored", JSON.stringify(storedArr))
    displayStoredCities()
}

//adds listener to search button to preform search 
searchBtn.addEventListener("click", function(){
    var cityName = document.getElementById("city").value
    input(cityName)
    saved(cityName)
})

//search and display content function
function input(cityName) {
    if (cityName == "") {
        alert("Please enter the city you want to see.")
    } else {
        var url= "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=&appid=e19e2b263fc9d0529488931d1e9bdaf5"
        fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then (function(data) {
            var lat = data[0].lat
            var long = data[0].lon
            var location = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=e19e2b263fc9d0529488931d1e9bdaf5&units=imperial"
            fetch(location)
            .then(function (response) {
                return response.json()
            })
            .then(function(data){
                set.className = "d-inline"
                tomorrow.textContent = "Temp: " + data.list[0].main.temp + " Deg F " + " Wind: " + data.list[0].wind.speed + " MPH " + " Humidity: " + data.list[0].main.humidity + " %"
                pic1.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png") 
                nextT.textContent = "Temp: " + data.list[8].main.temp + " Deg F " + " Wind: " + data.list[8].wind.speed + " MPH " + " Humidity: " + data.list[8].main.humidity + " %"
                pic2.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png")
                nextT2.textContent = "Temp: " + data.list[16].main.temp + " Deg F " + " Wind: " + data.list[16].wind.speed + " MPH " + " Humidity: " + data.list[16].main.humidity + " %"
                pic3.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png")
                nextT3.textContent = "Temp: " + data.list[24].main.temp + " Deg F " + " Wind: " + data.list[24].wind.speed + " MPH " + " Humidity: " + data.list[24].main.humidity + " %"
                pic4.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png")
                nextT4.textContent = "Temp: " + data.list[32].main.temp + " Deg F " + " Wind: " + data.list[32].wind.speed + " MPH " + " Humidity: " + data.list[32].main.humidity + " %"
                pic5.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png")
            })
            var dt = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=e19e2b263fc9d0529488931d1e9bdaf5&units=imperial"
            fetch(dt)
            .then(function(response){

                return response.json()
            })
            .then(function(data) {
                todays.textContent = "Temp: " + data.main.temp + " Deg F " + " Wind: " + data.wind.speed + " MPH " + " Humidity: " + data.main.humidity + " %"
                todaysImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            }
            )
        })
    }
}