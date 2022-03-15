/*Variables*/
const getRecords = document.getElementById("link-get-records");
const formContainer = document.getElementById("form-container");
const form = document.getElementById("post-form");
const tableBody = document.getElementById("tbl-records-body");
const formTitle = document.getElementById("form-title")

/*Form Input Variables*/
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const salaryInput = document.getElementById("salary");
const addressInput = document.getElementById("address");

//display records on page load
displayRecords();


//Submit POST data if submit button is clicked
form.addEventListener('submit',function(e){
  // prevent from going to a different page upon clicking submit button
  e.preventDefault();
  // get data from the form
  const formData = new FormData(this);
  fetch('/api/contact',{
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      age: ageInput.value,
      salary: salaryInput.value,
      address: addressInput.value
    })
  }).then(res => res.json())
  .then(displayRecords())

  //clear input fields after submitting
  form.reset();
});

//update and delete data
tableBody.addEventListener('click',(e)=>{
  e.preventDefault();
  //if e.target.id is equal to the button's id name (update or delete), it means that's the desired action
  let deleteBtnIsPressed = (e.target.id == "delete-record");
  let updateBtnIsPressed = (e.target.id == "update-record");

  //get the selected record's id (declaration is in data-id in update/delete button)
  let selectedId = e.target.dataset.id;

  //perform action based on the button
  if(deleteBtnIsPressed){
    fetch('api/contact/'+selectedId,{
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(displayRecords());
  }

  if(updateBtnIsPressed){
    //first parentElement directs to <td>, second one directs to <tr>
    let row = e.target.parentElement.parentElement;
    //get data from row
    let rowFirstName = row.querySelector('#rowFirstName').textContent;
    let rowLastName = row.querySelector('#rowLastName').textContent;
    let rowEmail = row.querySelector('#rowEmail').textContent;
    let rowAge = row.querySelector('#rowAge').textContent;
    let rowSalary = row.querySelector('#rowSalary').textContent;
    let rowAddress = row.querySelector('#rowAddress').textContent;

    //show form and display data on it
    showForm("Update Record");
    firstNameInput.value = rowFirstName;
    lastNameInput.value = rowLastName;
    emailInput.value = rowEmail;
    ageInput.value = rowAge;
    salaryInput.value = rowSalary;
    addressInput.value = rowAddress;

  }
  
});

/* FUNCTIONS */
function displayRecords(){
  //Get Records from API and Attach to tbl-records
getData().then(data => {
  let tableBodyContent = "";
  data.map((records)=>{
      
      tableBodyContent += `<tr>
          <td id="rowContactId">${records.contactId}</td>
          <td id="rowFirstName">${records.firstName}</td>
          <td id="rowLastName">${records.lastName}</td>
          <td id="rowEmail">${records.email}</td>
          <td id="rowAge">${records.age}</td>
          <td id="rowSalary">${records.salary}</td>
          <td id="rowAddress">${records.address}</td>
          <td><button class="btn btn-primary" id="update-record"  data-id=${records.contactId}>Update</button></td>
          <td><button class="btn btn-danger"id="delete-record"  data-id=${records.contactId}>Delete</button></td>
          </tr>`;

  });
  tableBody.innerHTML = tableBodyContent;
});
}
function showForm(title) {
    if (formContainer.style.display === "none") {
      formContainer.style.display = "block";      
    }
    if(title == "Add A New Record"){
      form.reset();
    }

    //Change title depending on whether form is update or new record
    formTitle.innerHTML = title;
  }


async function getData() {
    const response = await fetch('/api/contact', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return response.json();
}