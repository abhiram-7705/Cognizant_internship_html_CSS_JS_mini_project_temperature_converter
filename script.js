
const calculateBtn = document.querySelector("#calculateBtn");
const highlightSection = document.querySelector('#highlightSection');
const cityContainer = document.querySelector('#cityContainer');

const unitRadios = document.querySelectorAll('input[name = "unit"]');
const unitLabel = document.getElementById('unitLabel');
unitRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
        const unit = document.querySelector('input[name="unit"]:checked').value;
        if(unit==="C")
        {
            document.getElementById("temperature").placeholder="Enter Temperature in Celsius";
        }
        else if(unit==="F")
        {
            document.getElementById("temperature").placeholder="Enter Temperature in Fahrenheit";
        }
        else
        {
            document.getElementById("temperature").placeholder="Enter Temperature in Kelvin";
        }
    });
});
function validateInput() {
    const temperror = document.getElementById("temperror");
    const cityerror = document.getElementById("cityerror");
    temperror.innerHTML = "";
    cityerror.innerHTML = "";
    const unit = document.querySelector('input[name="unit"]:checked').value;
    if(unit==null)
    {
        return false;
    }
    const tempInput = document.getElementById("temperature").value.trim();
    if(tempInput==="")
    {
        temperror.innerHTML = "Please enter temperature value!";
        return false;
    }
    const cityValue = document.getElementById("city").value;
    if(cityValue==="")
    {
        cityerror.innerHTML = "Please select a city!";
        return false;
    }
    const num=Number(tempInput);
    if (num>1000) {
        temperror.innerHTML = "Temperature is too high! Please enter correct value";
        return false;
    }
    if (unit==="K"&&num<0) {
        temperror.innerHTML = "Kelvin cannot be negative! Please enter real value";
        return false;
    }
    if (unit === "C" && num < -273.15) {
        temperror.innerHTML = "Celsius cannot be below -273.15! Please enter correct value";
        return false;
    }
    if (unit === "F" && num < -459.67) {
        temperror.innerHTML = "Fahrenheit cannot be below -459.67! Please enter correct value";
        return false;
    }
    return true;
}

function highlightCity(cityName) {
    if (!cityName) return;
    const currentlyHighlighted = highlightSection.querySelector('.city-card');
    if (currentlyHighlighted) {
        cityContainer.appendChild(currentlyHighlighted);
    }

    let selector = `.city-card[data-city="${CSS.escape(cityName)}"]`;
    let card = cityContainer.querySelector(selector);
    if (card) {
        highlightSection.appendChild(card);
    }
}

cityContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.city-card');
    if (!card) return;

    const cityName = card.dataset.city;
    highlightCity(cityName);
});

function calculate()
{
    event.preventDefault();
    if(validateInput())
    {
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const tempInput = parseInt(document.getElementById("temperature").value.trim());
    let c=0;
    let f=0;
    let k=0;
    if(unit=="C")
    {
        c=tempInput;
        f=((c*9/5)+32);
        k=(c+273.15);
    }
    else if(unit=="F")
    {
        f=tempInput;
        c=((f-32)*5/9);
        k=(c+273.15);
    }
    else
    {
        k=tempInput;
        c=(k-273.15);
        f=((c*9/5)+32);
    }
    document.getElementById("unitLabel1").innerText="°C   "+c.toFixed(2);
    document.getElementById("unitLabel2").innerText="°F   "+f.toFixed(2);
    document.getElementById("unitLabel3").innerText="°K   "+k.toFixed(2);
    updateCity(c);
    }

}
function updateCity(c)
{
    let i=0;
    const updated={}
    updated["Chennai"]=0
    updated["Mumbai"]=-2
    updated["Delhi"]=-2
    updated["Bangalore"]=0
    updated["Hyderabad"]=-1
    updated["Kolkata"]=-2
    updated["Pune"]=1
    updated["Ahmedabad"]=2
    updated["Jaipur"]=3
    updated["Kochi"]=2
    const cityCards = document.querySelectorAll("#cityContainer .city-card");
    cityCards.forEach(card => {
    const tempElement = card.querySelector(".city-temp");
    const city=card.getAttribute("data-city");
    tempElement.textContent = `${(c+updated[city]).toFixed(2)} °C`;
    i++;
});
    const highCity=document.getElementById("city").value;
    highlightCity(highCity);

    const currHighlighted=document.getElementById("highlightSection");
    currHighlighted.querySelector(".city-temp").textContent=(c+updated[highCity]).toFixed(2)+"  °C";
}