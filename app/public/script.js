const getRecords = document.getElementById("link-get-records");

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

/* FUNCTIONS */
function showForm() {
    var form = document.getElementById("post-form");
    if (form.style.display === "none") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
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