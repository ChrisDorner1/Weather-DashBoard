var searchBar = document.querySelector(".searchBar")
var searchBtn = document.querySelector(".searchBtn")
var today = document.querySelector(".current")

searchBtn.addEventListener("click", function(){
    input()
})

function input() {
    var cityName = document.getElementById("city").value
    if (cityName == "") {
        alert("Please enter the city you want to see.")
    } else {
        // today.style.display = "flex"
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
                console.log(data)
            })
        })
        
    }
}