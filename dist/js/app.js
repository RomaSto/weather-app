var APPID = "5ab3f0d672d9c84db4a2b6d0db21530b";
var searchForm;
var formInput;
var cityName ;
var cityList;
var clearBtn;

function update(weather) {
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(weather.location + ", " + weather.country + ": " + weather.temp + "°C, " + weather.description));
    cityList.appendChild(entry);
    cityName ="";
}

window.onload = function () {
    var listenToInput;
    var submitOnClick;
    var clearCityList;

    cityList = document.getElementById('cityList');
    searchForm = document.getElementById("searchForm");
    formInput = document.getElementById("formInput");
    clearBtn = document.getElementById('clearBtn');

    listenToInput = function(){
        cityName = formInput.value;
    }
    submitOnClick =  function(e){
        updateByName(cityName)
        e.preventDefault();
        formInput.value = "";
    }
    clearCityList = function(){
            cityList.innerHTML = '';
    }

    if(formInput.addEventListener){
            formInput.addEventListener("change", listenToInput, false);
    }
    if(searchForm.addEventListener){
            searchForm.addEventListener("submit", submitOnClick, false);
    }

    if(clearBtn.addEventListener){
            clearBtn.addEventListener("click", clearCityList, false);
    }

}

function updateByName(cityName){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APPID;
    sendRequest(url);
}


function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
	    var weather = {};
	    weather.country = data.sys.country;
	    weather.description = data.weather[0].description;
	    weather.location = data.name;
	    weather.temp = data.main.temp;		
	    update(weather);
	}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}
