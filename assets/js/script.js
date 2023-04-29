var searchBar = document.querySelector(".searchBar")
var searchBtn = document.querySelector(".searchBtn")
var tomorrow = document.querySelector(".tomorrow")
var currentT = document.querySelector(".currentT")
var nextT = document.querySelector(".nextT")
var nextT2 = document.querySelector(".nextT2")
var nextT3 = document.querySelector(".nextT3")
var nextT4 = document.querySelector(".nextT4")

searchBtn.addEventListener("click", function(){
    input()
})

function input() {
    var cityName = document.getElementById("city").value
    if (cityName == "") {
        alert("Please enter the city you want to see.")
    } else {
        tomorrow.style.display = "block"
        // today.textContent = cityName
        var url= "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=&appid=e19e2b263fc9d0529488931d1e9bdaf5"
        fetch(url)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then (function(data) {
            var lat = data[0].lat
            var long = data[0].lon
            var location = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=e19e2b263fc9d0529488931d1e9bdaf5&units=imperial"
            fetch(location)
            .then(function (response) {
                console.log(response)
                return response.json()
            })
            .then(function(data){
                console.log(data.list)
                console.log(data.list[0].weather[0].main)
                currentT.textContent = data.list[0].main.temp + " Degrees F " + data.list[0].weather[0].main
                nextT.textContent = data.list[8].main.temp + " Degrees F " + data.list[8].weather[0].main
                nextT2.textContent = data.list[16].main.temp + " Degrees F " + data.list[16].weather[0].main
                nextT3.textContent = data.list[24].main.temp + " Degrees F " + data.list[24].weather[0].main
                nextT4.textContent = data.list[32].main.temp + " Degrees F " + data.list[32].weather[0].main
            })
        })
        
    }
}