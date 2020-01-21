function fetchUserData(callback) {
  return fetch('http://localhost:5000/api/user', { method: 'get' })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(users) {
        callback(users);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function fetchHouseData() {
  return fetch('http://localhost:5000/api/house', { method: 'get' })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(houses) {
        console.log(houses);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function fetchReservartionData() {
  return fetch('http://localhost:5000/api/reservation', { method: 'get' })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(reservations) {
        console.log(reservations);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function insertUserData(users) {
  const table = document.getElementById("users-table");
  users.forEach((user, index) => {

    var row = table.insertRow(index + 1);

    const {
      _id,
      firstName,
      secondName,
      dateOfBirth,
      surname,
      pesel,
      reservations,
      nationality
    } = user;

    console.log(user)

    const idCell = row.insertCell(0);
    var firstNameCell = row.insertCell(1);
    var secondNameCell = row.insertCell(2);
    var dateOfBirthCell = row.insertCell(3);
    var peselCell = row.insertCell(4);
    //var reservationsCell = row.insertCell(5);
    var nationalityCell = row.insertCell(5);
    const deleteBtnCell = row.insertCell(6);
    const modifyBtnCell = row.insertCell(7);

    const input = (key, value, disabled=false) => {
      return `<input data-key="${key}" type="string" value="${value}" ${disabled ? 'disabled="true"' : ""}"></input>`;
    }

    // Add some text to the new cells:
    idCell.innerHTML = input(_id, _id, true);
    firstNameCell.innerHTML = input("firstName", firstName);
    secondNameCell.innerHTML = input("secondName", secondName);
    dateOfBirthCell.innerHTML = input("dateOfBirth", dateOfBirth);
    peselCell.innerHTML = input("pesel", pesel);
    //reservationsCell.innerHTML = '' || reservations;
    nationalityCell.innerHTML = input("nationality", nationality);
    deleteBtnCell.innerHTML = `<button class="u" id="usunButton3" data-user_id=${_id} data-index=${index} onclick="deleteUser(this)">-</button>`;
    modifyBtnCell.innerHTML = `<button class="zm" id="zBM1" data-user_id=${_id} data-index=${index} onclick="modifyUser(this)">?</button>`;
  });
}

function getInputValue(html) {
  const re = /(value=")[\d\w]*"/g;
  return html.match(re)[0].split("\"")[1];
}

function getInputKey(html) {
  const re = /(data-key=")[\d\w]*"/g;
  return html.match(re)[0].split("\"")[1];
}

function modifyUser(btn) {
  const { user_id, index } = btn.dataset;

  const table = document.getElementById("users-table");
  const { innerHTML } = table.childNodes[1].rows.item(index + 1).cells[0];
  const value = getInputValue(innerHTML);
  const key = getInputKey(innerHTML);

  console.log(value);
  console.log(key)

  // fetch(`http://localhost:5000/api/user?id=${user_id}`, { method: 'post' }, body: JSON.stringify({
  //
  // }))
  // .then(res => window.location.reload());

}

function deleteUser(btn) {
  const { user_id } = btn.dataset;
  fetch(`http://localhost:5000/api/user?id=${user_id}`, { method: 'delete' })
  .then(res => window.location.reload());
}

function insertReservationData(reservations) {

}

function insertHouseData(houses) {

}

// fetchUserData()
// .then(() => {
//   fetchHouseData()
//   .then(() => {
//     fetchReservartionData();
//   })
// })

fetchUserData(insertUserData);

// fetchUserData().then(users => {
//   insertUserData(users)
// });
// fetchHouseData();
// fetchReservartionData();
