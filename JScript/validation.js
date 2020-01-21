



function validateForm() {
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

  const fieldpR = document.getElementById('pR')
  const errorspR = document.getElementById('errors_pR')

  const fieldkR = document.getElementById('kR')
  const errorskR = document.getElementById('errors_kR')


  const errorsSummary = document.getElementById('errors_summary')





  var errorMessages = {
      imie: "</br>Imie musi zawierać minimum 3 litery i nie posiadać cyfr </br>",
      imie0: "</br>Imie nie moze byc dłuzsze niz 20 znakow</br>",
      imie2: "</br>Drugie Imię nie może zawierać cyfr </br>",
      data: "</br>Data Urodzenia musi być w formacie dd/mm/yyyy </br>",
      pesel: "</br>Pesel musi składać się z samych cyfr w liczbie 9 </br>",
      pR: "</br>Data początku rezerwacji musi być w formacie dd/mm/yyyy </br>",
      kR: "</br>Data końca rezerwacji musi być w formacie dd/mm/yyyy </br>",

      data1: "</br>Data urodzenia musi być wcześniejsza niż akutalna data</br>",
      pR1: "</br>Data początku rezerwacji nie może zostać wykonana przed dniem dzisiejszym </br>",
      kR1: "</br>Data końca rezerwacji nie może zostać wykonana przed dniem dzisiejszym </br>",
      pkR: "</br>Data końca rezerwacji nie może być wcześniejsza niż data poczatku rezerwacji </br>",
  }
  
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
    if (!regPesel.test(fieldPesel.value.trim())) {
        messages.push(errorMessages['pesel']);
        errorsPesel.innerHTML = errorMessages['pesel']
        document.getElementById("pesel").style.backgroundColor = 'red';
    } else {
        document.getElementById("pesel").style.backgroundColor = 'white';
        errorsPesel.innerHTML = "";
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







    var datapR = fieldpR.value;
    var dataSeperateValues1 = datapR.split("/");

    var day1 = dataSeperateValues1[0];
    var month1 = dataSeperateValues1[1];
    var year1 = dataSeperateValues1[2];


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



    if (messages.length > 0) {
        valid = false;
        errorsSummary.innerHTML = messages.join('\n');
    }

    if(valid)
    {
     //   window.open("index.html");

        alert("Wysłano !");

    }



    return valid;
}
