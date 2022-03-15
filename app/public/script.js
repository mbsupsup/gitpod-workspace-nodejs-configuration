/*Variables*/
const getRecords = document.getElementById("link-get-records");
const formContainer = document.getElementById("form-container");
const form = document.getElementById("post-form");

/*Form Variables*/
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const salary = document.getElementById("salary");
const address = document.getElementById("address");

//display records on page load
displayRecords();


//Submit POST data
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
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      age: age.value,
      salary: salary.value,
      address: address.value
    })
  }).then(res => res.json())
  .then(displayRecords())

  //clear input fields after submitting
  form.reset();
});

/* FUNCTIONS */
function displayRecords(){
  //Get Records from API and Attach to tbl-records
getData().then(data => {
  let tableBodyContent = "";
  data.map((records)=>{
      tableBodyContent = `<tr>
          <td>${records.contactId}</td>
          <td>${records.firstName}</td>
          <td>${records.lastName}</td>
          <td>${records.email}</td>
          <td>${records.age}</td>
          <td>${records.salary}</td>
          <td>${records.address}</td>
          <td><button class="btn btn-primary">Update</button></td>
          <td><button class="btn btn-danger">Delete</button></td>
          </tr>`;

  });
  document.getElementById("tbl-records-body").innerHTML = tableBodyContent;
});
}
function showForm() {
    if (formContainer.style.display === "none") {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
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