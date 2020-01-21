const form = document.getElementById('form')


var dataNow = new Date();


const fieldiL = document.getElementById('iL')
const errorsiL = document.getElementById('errors_iL')

const fieldiS = document.getElementById('iS')
const errorsiS = document.getElementById('errors_iS')

const fieldiP = document.getElementById('iP')
const errorsiP = document.getElementById('errors_iP')

const fieldPi = document.getElementById('Pi')
const errorsPi = document.getElementById('errors_Pi')

const fieldData = document.getElementById('data')
const errorsData = document.getElementById('errors_data')

const fieldOP = document.getElementById('OP')
const errorsOP = document.getElementById('errors_OP')

const errorsSummary = document.getElementById('errors_summary')

function submitData(e) {
  e.preventDefault();
  if(validateForm()) {
    const body = {
      nOfBathrooms: fieldiL.value,
      nOfBedrooms: fieldiS.value,
      nOfRooms: fieldiP.value,
      floor: fieldPi.value,
      dateOfRegistration: fieldData.value,
      description: fieldOP.value
    };

    fetch(`http://localhost:5000/api/house`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => alert(`Pomyslnie utworzono mieszkanie`));
  }
}



var errorMessages = {
    iL: "</br>Liczba Lazienek musi składać się z samych cyfr w zakresie 1-99 </br>",
    iS: "</br>Liczba Sypialni musi składać się z samych cyfr w zakresie 1-99 </br>",
    iP: "</br>Liczba Pokoi musi składać się z samych cyfr w zakresie 1-99 </br>",
    Pi: "</br>Liczba Pięter musi składać się z samych cyfr w zakresie 1-99 </br>",
    data: "</br>Data włączenia mieszkania do oferty musi być w formacie dd/mm/yyyy </br>",
    OP: "</br>Opis nie moze byc dluzszy niz 500 znakow oraz zawierać znaków specjalnychv",

    data1: "</br>Data włączania mieszkania do oferty musi być wcześniejsza lub równa akutalnej dacie</br>",

}



function validateForm() {
    let messages = [];
    let valid = true;

    const regiL = /^[0-9 ]{1,2}$/g;
    if (!regiL.test(fieldiL.value.trim())) {
        messages.push(errorMessages['iL']);
        errorsiL.innerHTML = errorMessages['iL']
        document.getElementById("iL").style.backgroundColor = 'red';
    } else {
        document.getElementById("iL").style.backgroundColor = 'white';
        errorsiL.innerHTML = "";
    }

    const regiS = /^[0-9 ]{1,2}$/g;
    if (!regiS.test(fieldiS.value.trim())) {
        messages.push(errorMessages['iS']);
        errorsiS.innerHTML = errorMessages['iS']
        document.getElementById("iS").style.backgroundColor = 'red';
    } else {
        document.getElementById("iS").style.backgroundColor = 'white';
        errorsiS.innerHTML = "";
    }

    const regiP = /^[0-9 ]{1,2}$/g;
    if (!regiP.test(fieldiP.value.trim())) {
        messages.push(errorMessages['iP']);
        errorsiP.innerHTML = errorMessages['iP']
        document.getElementById("iP").style.backgroundColor = 'red';
    } else {
        document.getElementById("iP").style.backgroundColor = 'white';
        errorsiP.innerHTML = "";
    }

    const regPi = /^[0-9 ]{1,2}$/g;
    if (!regPi.test(fieldPi.value.trim())) {
        messages.push(errorMessages['Pi']);
        errorsPi.innerHTML = errorMessages['Pi']
        document.getElementById("Pi").style.backgroundColor = 'red';
    } else {
        document.getElementById("Pi").style.backgroundColor = 'white';
        errorsPi.innerHTML = "";
    }

    const regData = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (!regData.test(fieldData.value.trim())) {
        messages.push(errorMessages['data']);
        errorsData.innerHTML = errorMessages['data']
        document.getElementById("data").style.backgroundColor = 'red';
    } else {
        document.getElementById("data").style.backgroundColor = 'white';
        errorsData.innerHTML = "";
    }

    const regOP = /^[0-9a-zA-Z./ ]{0,500}$/g;
    if (!regOP.test(fieldOP.value.trim())) {
        messages.push(errorMessages['OP']);
        errorsOP.innerHTML = errorMessages['OP']
        document.getElementById("OP").style.backgroundColor = 'red';
    } else {
        document.getElementById("OP").style.backgroundColor = 'white';
        errorsOP.innerHTML = "";
    }

    var dataUrodzeniaValue = fieldData.value;
    var dataSeperateValues = dataUrodzeniaValue.split("/");

    var day = dataSeperateValues[0];
    var month = dataSeperateValues[1];
    var year = dataSeperateValues[2];
    var dayNow = dataNow.getDate();
    var monthNow = dataNow.getMonth();
    var yearNow = dataNow.getFullYear();

    if((year > yearNow) ||  (year == yearNow && month > monthNow+1) || (year == yearNow && month == monthNow+1 && day > dayNow))
    {
        valid = false;
        document.getElementById("data").style.backgroundColor = 'red';
        messages.push(errorMessages['data1']);
        errorsData.innerHTML = errorMessages['data1']

    }





if (messages.length > 0) {
    valid = false;
    errorsSummary.innerHTML = messages.join('\n');
  }
  return valid;
}
