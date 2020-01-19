const form = document.getElementById('form1')

var dataNow = new Date();

const fieldPesel = document.getElementById('pesel')
const errorsPesel = document.getElementById('errors_pesel')

const fieldpR = document.getElementById('pR')
const errorspR = document.getElementById('errors_pR')

const fieldkR = document.getElementById('kR')
const errorskR = document.getElementById('errors_kR')







var errorMessages = {
    pesel: "</br>Pesel musi składać się z samych cyfr w liczbie 9 </br>",
    pesel1: "</br>Wpisany pesel nie pokrywa się z żadnym znajdującym sie z naszej bazie danych </br>",
    pR: "</br>Data początku rezerwacji musi być w formacie dd/mm/yyyy </br>",
    kR: "</br>Data końca rezerwacji musi być w formacie dd/mm/yyyy </br>",

    pR1: "</br>Data początku rezerwacji nie może zostać wykonana przed dniem dzisiejszym </br>",
    kR1: "</br>Data końca rezerwacji nie może zostać wykonana przed dniem dzisiejszym </br>",
    pkR: "</br>Data końca rezerwacji nie może być wcześniejsza niż data poczatku rezerwacji </br>"
}



function validateForm() {
    let messages = [];
    let valid = true;


    

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


   
    var dayNow = dataNow.getDate();
    var monthNow = dataNow.getMonth();
    var yearNow = dataNow.getFullYear();



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

    if((year2 < year1) ||  (year2 == year1 && month2 < month1) || (year2 == year1 && month2 == month1 && day2 < day1))
    {
        valid = false;
        document.getElementById("kR").style.backgroundColor = 'red';
        document.getElementById("pR").style.backgroundColor = 'red';

        messages.push(errorMessages['pkR']);
        errorskR.innerHTML = errorMessages['pkR']
        errorspR.innerHTML = errorMessages['pkR']
        

    }



    if ((fieldPesel.value=='123456789')||(fieldPesel.value=='987654321')||(fieldPesel.value=='111222333')) {
        document.getElementById("pesel").style.backgroundColor = 'white';
        errorsPesel.innerHTML = "";
    } else {
        messages.push(errorMessages['pesel1']);
        errorsPesel.innerHTML = errorMessages['pesel1'];
        document.getElementById("pesel").style.backgroundColor = 'red';
    }


    if (messages.length > 0) {
        valid = false;
    } 

    if(valid)
    {
     //   window.open("index.html");
        
        alert("Wysłano !");

    }


    return valid;
}


