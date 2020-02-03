const form = document.getElementById('form')

var dataNow = new Date();

const fieldFirstName = document.getElementById('imie')
const errorsFirstName = document.getElementById('errors_imie')

const fieldSecondName = document.getElementById('imie2')
const errorsSecondName = document.getElementById('errors_imie2')

const fieldData = document.getElementById('data')
const errorsData = document.getElementById('errors_data')

const fieldPesel = document.getElementById('pesel')
const errorsPesel = document.getElementById('errors_pesel')


const errorsSummary = document.getElementById('errors_summary')

const nationality = document.getElementById('obywatelstwo').value;

function submitData(e) {
  e.preventDefault();
  if(validateForm()) {
    const body = {
      firstName: fieldFirstName.value,
      secondName: fieldSecondName.value,
      dateOfBirth: fieldData.value,
      pesel: fieldPesel.value,
      nationality,
    }

    fetch(`http://localhost:5001/api/user`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        alert(`Blad`)
        console.error(res.error);
      } else {
        alert(`Pomyslnie utworzono urzytkownika`)
      }
      });
  }
}


var errorMessages = {
    imie: "</br>Imie musi zawierać minimum 3 litery i nie posiadać cyfr </br>",
    imie0: "</br>Imie nie moze byc dłuzsze niz 20 znakow</br>",
    imie2: "</br>Drugie Imię nie może zawierać cyfr </br>",
    data: "</br>Data Urodzenia musi być w formacie dd/mm/yyyy </br>",
    pesel: "</br>Pesel musi składać się z samych cyfr w liczbie 9 </br>",

    data1: "</br>Data urodzenia musi być wcześniejsza niż akutalna data</br>",

}



function validateForm() {
    let messages = [];
    let valid = true;

    const regImie = /^[a-zA-Z ]{3,}$/g;
    if (!regImie.test(fieldFirstName.value.trim())) {
        messages.push(errorMessages['imie']);
        errorsFirstName.innerHTML = errorMessages['imie']
        document.getElementById("imie").style.backgroundColor = 'red';
    } else {
        document.getElementById("imie").style.backgroundColor = 'white';
        errorsFirstName.innerHTML = "";
    }


    const regImie0 = /^[a-zA-Z ]{3,20}$/g;
    if (!regImie0.test(fieldFirstName.value.trim())) {
        messages.push(errorMessages['imie0']);
        errorsFirstName.innerHTML = errorMessages['imie0']
        messages.push(errorMessages['imie']);
        errorsFirstName.innerHTML = errorMessages['imie']
        document.getElementById("imie").style.backgroundColor = 'red';
    } else {
        document.getElementById("imie").style.backgroundColor = 'white';
        errorsFirstName.innerHTML = "";
    }

    const regImie2 = /^[a-zA-Z ]{0,}$/g;
    if (!regImie2.test(fieldSecondName.value.trim())) {
        messages.push(errorMessages['imie2']);
        errorsSecondName.innerHTML = errorMessages['imie2']
        document.getElementById("imie2").style.backgroundColor = 'red';
    } else {
        document.getElementById("imie2").style.backgroundColor = 'white';
        errorsSecondName.innerHTML = "";
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

    const regPesel = /[1-9]{9}/;
    if (false && !regPesel.test(fieldPesel.value.trim())) {
        messages.push(errorMessages['pesel']);
        errorsPesel.innerHTML = errorMessages['pesel']
        document.getElementById("pesel").style.backgroundColor = 'red';
    } else {
        document.getElementById("pesel").style.backgroundColor = 'white';
        errorsPesel.innerHTML = "";
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
