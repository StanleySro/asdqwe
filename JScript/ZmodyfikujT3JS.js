const form = document.getElementById('form')

var dataNow = new Date();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

const fieldmM = document.getElementById('mM')
const errorsmM = document.getElementById('errors_mM')

    fetch(`http://localhost:5000/api/house`)
    .then(res => res.json())
    .then(houses => {
      fieldmM.innerHTML = houses.map(house => `<option value=${house._id}>${house._id}</option>`).join("");
      fieldmM.value = getQueryVariable('houseId') || houses[0]._id;
    });

const fieldoW = document.getElementById('oW')
const errorsoW = document.getElementById('errors_oW')

    fetch(`http://localhost:5000/api/user`)
    .then(res => res.json())
    .then(users => {
      fieldoW.innerHTML = users.map(user => `<option value=${user._id}>${user.firstName} ${user.secondName}</option>`).join("");
      fieldoW.value = users[0]._id;
    });

const fieldpR = document.getElementById('pR')
const errorspR = document.getElementById('errors_pR')

const fieldkR = document.getElementById('kR')
const errorskR = document.getElementById('errors_kR')

const fieldsR = document.getElementById('sR')
const errorssR = document.getElementById('errors_sR')

const fielddZ = document.getElementById('dZ')
const errorsdZ = document.getElementById('errors_dZ')

const fielddW = document.getElementById('dW')
const errorsdW = document.getElementById('errors_dW')


const errorsSummary = document.getElementById('errors_summary')





var errorMessages = {
    mM: "</br>Id Mieszkania musi miec min. 5 znakow </br>",
    oW: "</br>Id Osoby wynajmującej musi miec min. 5 znakow </br>",
    pR: "</br>Data początku rezerwacji musi być w formacie dd/mm/yyyy </br>",
    kR: "</br>Data końca rezerwacji musi być w formacie dd/mm/yyyy </br>",
    sR: "</br>Szczegóły rezerwacji nie mogą by dłuższe niż 100 znaków oraz zawierać znaków specjalnych",
    dZ: "</br>Data zameldowania musi być w formacie dd/mm/yyyy </br>",
    dW: "</br>Data wymeldowania musi być w formacie dd/mm/yyyy </br>",

    pR1: "</br>Data początku rezerwacji nie może zostać wykonana przed dniem dzisiejszym </br>",
    kR1: "</br>Data końca rezerwacji nie może zostać wykonana przed dniem dzisiejszym </br>",
    pkR: "</br>Data końca rezerwacji nie może być wcześniejsza niż data poczatku rezerwacji </br>",

    dZ1: "</br>Data początku zameldowania nie może zostać wykonana przed dniem dzisiejszym </br>",
    dW1: "</br>Data zakończenia zameldowania nie może zostać wykonana przed dniem dzisiejszym </br>",
    dWZ: "</br>Data końca zameldowania nie może być wcześniejsza niż data poczatku zameldowania </br>",
}

function submitData(e) {
  e.preventDefault();
  if(validateForm()) {

    const body = {
      houseId: fieldmM.value,
      rentingPersonId: fieldoW.value,
      reservationStart: fieldpR.value,
      reservationEnd: fieldkR.value,
      details: fieldsR.value,
      startOfAccomodation: fielddZ.value,
      endOfAccomodation: fielddW.value
    };

    fetch(`http://localhost:5000/api/reservation`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => alert(`Pomyslnie utworzono rezerwacje`));
  }
}


function validateForm() {
    let messages = [];
    let valid = true;

    if (fieldmM.value.length < 5) {
        messages.push(errorMessages['mM']);
        errorsmM.innerHTML = errorMessages['mM']
        document.getElementById("mM").style.backgroundColor = 'red';
    } else {
        document.getElementById("mM").style.backgroundColor = 'white';
        errorsmM.innerHTML = "";
    }

    if (fieldoW.value.length < 5) {
        messages.push(errorMessages['oW']);
        errorsoW.innerHTML = errorMessages['oW']
        document.getElementById("oW").style.backgroundColor = 'red';
    } else {
        document.getElementById("oW").style.backgroundColor = 'white';
        errorsmM.innerHTML = "";
    }

    const regpR = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (!regpR.test(fieldpR.value.trim())) {
        messages.push(errorMessages['pR']);
        errorspR.innerHTML = errorMessages['pR']
        document.getElementById("pR").style.backgroundColor = 'red';
    } else {
        document.getElementById("pR").style.backgroundColor = 'white';
        errorspR.innerHTML = "";
    }

    const regkR = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (!regkR.test(fieldkR.value.trim())) {
        messages.push(errorMessages['kR']);
        errorskR.innerHTML = errorMessages['kR']
        document.getElementById("kR").style.backgroundColor = 'red';
    } else {
        document.getElementById("kR").style.backgroundColor = 'white';
        errorskR.innerHTML = "";
    }

    const regsR = /^[0-9a-zA-Z ]{0,100}$/g;
    if (!regsR.test(fieldsR.value.trim())) {
        messages.push(errorMessages['sR']);
        errorssR.innerHTML = errorMessages['sR']
        document.getElementById("sR").style.backgroundColor = 'red';
    } else {
        document.getElementById("sR").style.backgroundColor = 'white';
        errorssR.innerHTML = "";
    }

    const regdZ = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (!regdZ.test(fielddZ.value.trim())) {
        messages.push(errorMessages['dZ']);
        errorsdZ.innerHTML = errorMessages['dZ']
        document.getElementById("dZ").style.backgroundColor = 'red';
    } else {
        document.getElementById("dZ").style.backgroundColor = 'white';
        errorsdZ.innerHTML = "";
    }

    const regdW = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (!regdW.test(fielddW.value.trim())) {
        messages.push(errorMessages['dW']);
        errorsdW.innerHTML = errorMessages['dW']
        document.getElementById("dW").style.backgroundColor = 'red';
    } else {
        document.getElementById("dW").style.backgroundColor = 'white';
        errorsdW.innerHTML = "";
    }



    var datapR = fieldpR.value;
    var dataSeperateValues1 = datapR.split("/");

    var day1 = dataSeperateValues1[0];
    var month1 = dataSeperateValues1[1];
    var year1 = dataSeperateValues1[2];
    var dayNow = dataNow.getDate();
    var monthNow = dataNow.getMonth();
    var yearNow = dataNow.getFullYear();


    if((year1 < yearNow) ||  (year1 == yearNow && month1 < monthNow+1) || (year1 == yearNow && month1 == monthNow+1 && day1 < dayNow))
    {
        valid = false;
        document.getElementById("pR").style.backgroundColor = 'red';
        messages.push(errorMessages['pR1']);
        errorspR.innerHTML = errorMessages['pR1']

    }

    var datakR = fieldkR.value;
    var dataSeperateValues2 = datakR.split("/");

    var day2 = dataSeperateValues2[0];
    var month2 = dataSeperateValues2[1];
    var year2 = dataSeperateValues2[2];


    if((year2 < yearNow) ||  (year2 == yearNow && month2 < monthNow+1) || (year2 == yearNow && month2 == monthNow+1 && day2 < dayNow))
    {
        valid = false;
        document.getElementById("kR").style.backgroundColor = 'red';
        messages.push(errorMessages['kR1']);
        errorskR.innerHTML = errorMessages['kR1']

    }

    if((year2 < year1) ||  (year2 == year1 && month2 < month1) || (year2 == year1 && month2 == month1 && day2 < day1))
    {
        valid = false;
        document.getElementById("kR").style.backgroundColor = 'red';
        document.getElementById("pR").style.backgroundColor = 'red';

        messages.push(errorMessages['pkR']);
        errorskR.innerHTML = errorMessages['pkR']
        errorspR.innerHTML = errorMessages['pkR']


    }


    var datadZ = fielddZ.value;
    var dataSeperateValues3 = datadZ.split("/");

    var day3 = dataSeperateValues3[0];
    var month3 = dataSeperateValues3[1];
    var year3 = dataSeperateValues3[2];


    if((year3 < yearNow) ||  (year3 == yearNow && month3 < monthNow+1) || (year3 == yearNow && month3 == monthNow+1 && day3 < dayNow))
    {
        valid = false;
        document.getElementById("dZ").style.backgroundColor = 'red';
        messages.push(errorMessages['dZ1']);
        errorsdZ.innerHTML = errorMessages['dZ1']

    }

    var datadW = fielddW.value;
    var dataSeperateValues4 = datadW.split("/");

    var day4 = dataSeperateValues4[0];
    var month4 = dataSeperateValues4[1];
    var year4 = dataSeperateValues4[2];


    if((year4 < yearNow) ||  (year4 == yearNow && month4 < monthNow+1) || (year4 == yearNow && month4 == monthNow+1 && day4 < dayNow))
    {
        valid = false;
        document.getElementById("dW").style.backgroundColor = 'red';
        messages.push(errorMessages['dW1']);
        errorsdW.innerHTML = errorMessages['dW1']

    }

    if((year4 < year3) ||  (year4 == year3 && month4 < month3) || (year4 == year3 && month4 == month3 && day4 < day3))
    {
        valid = false;
        document.getElementById("dW").style.backgroundColor = 'red';
        document.getElementById("dZ").style.backgroundColor = 'red';

        messages.push(errorMessages['dWZ']);
        errorsdW.innerHTML = errorMessages['dWZ']
        errorsdZ.innerHTML = errorMessages['dWZ']


    }



if (messages.length > 0) {
    valid = false;
    errorsSummary.innerHTML = messages.join('\n');
} else {

}
if(valid)
{
    alert("Wysłano !");
//    window.open("zalogowano.html");


}

return valid;
}
