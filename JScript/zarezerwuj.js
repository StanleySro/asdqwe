const fieldFirstName = document.getElementById('imie')
const fieldSecondName = document.getElementById('imie2')
const fieldData = document.getElementById('data')
const fieldPesel = document.getElementById('pesel')
const fieldNationality = document.getElementById('nationality')
const fieldReservartionStart = document.getElementById('pR')
const fieldReservartionEnd = document.getElementById('kR')
const fielDetails = document.getElementById('sr')

function redirectToStaly(e) {
  e.preventDefault();
  const houseId = getQueryVariable('houseId');
  window.location.replace(`stalyKlientPesel.html?houseId=${houseId}`);

}

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

function submitData(e) {
  e.preventDefault();
  if (validateForm()) {
    const body = {
      firstName: fieldFirstName.value,
      secondName: fieldSecondName.value,
      dateOfBirth: fieldData.value,
      pesel: fieldPesel.value,
      nationality: fieldNationality.value,
    }
    fetch(`http://localhost:5000/api/user`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(user => {
      const { _id } = user;
      const houseId = getQueryVariable('houseId');
      const body = {
        houseId,
        rentingPersonId: _id,
        reservationStart: fieldReservartionStart.value,
        reservationEnd: fieldReservartionEnd.value,
        details: fielDetails.value,
      };

      fetch(`http://localhost:5000/api/reservation`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers : {
          'Content-Type': 'application/json'
        }
      })
      .then(res => alert(`Pomyslnie utworzono rezerwacje`));
    });
  }

}
