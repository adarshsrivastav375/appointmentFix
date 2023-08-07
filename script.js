const Btn = document.querySelector(".btn");
const myForm = document.querySelector("#myform");
let itemList = document.getElementById("items");
const formBox = document.querySelector("#main");
myForm.addEventListener("submit", onSubmit);
itemList.addEventListener("click", deleteItem);
itemList.addEventListener("click", editItem);

// delete Item;
// function deleteItem(e) {
//   if (e.target.classList.contains("delete")) {
//     if (confirm("Are you sure ?")) {
//       let li = e.target.parentElement;
//       itemList.removeChild(li);
//       const name = li.firstChild.textContent.split(" ")[0]; // Extract the name part
//       const savedData = localStorage.getItem("formData");
//       const dataArray = savedData ? JSON.parse(savedData) : [];
//       // Use filter to remove the item with matching name
//       const updatedDataArray = dataArray.filter((data) => data.name !== name);

//       localStorage.setItem("formData", JSON.stringify(updatedDataArray));
//     }
//   }
// }
function deleteItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      let li = e.target.parentElement;
      itemList.removeChild(li);
      const name = li.firstChild.textContent.split(" ")[0]; // Extract the name part
      console.log("dele", name);
      const savedData = localStorage.getItem("formData");
      const dataArray = savedData ? JSON.parse(savedData) : [];

      // Use filter to remove the item with matching name
      const updatedDataArray = dataArray.filter((data) => data.name !== name);

      localStorage.setItem("formData", JSON.stringify(updatedDataArray));
    }
  }
}

function myFunction(e) {
  itemList.innerHTML = "";
  const savedData = localStorage.getItem("formData");
  const dataArray = savedData ? JSON.parse(savedData) : [];
  var nameArray = dataArray.map(function (el) {
    return { name: el.name, email: el.email };
  });
  nameArray.map(function (item) {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(`${item.name} ${item.email}`));
    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger float-lg-right btn-sm m-1 delete";
    deleteButton.appendChild(document.createTextNode("X"));
    li.appendChild(deleteButton);
    // Edit button
    let editButton = document.createElement("button");
    editButton.className = "btn btn-primary float-lg-right btn-sm m-1 edit";
    editButton.appendChild(document.createTextNode("Edit"));
    li.appendChild(editButton);

    itemList.appendChild(li);
  });
}
//on sumit and edit
function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(myForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const savedData = localStorage.getItem("formData");
  const dataArray = savedData ? JSON.parse(savedData) : [];

  const editButton = document.querySelector(".submit-btn");
  if (editButton.textContent === "Edit Item") {
    const name = document.querySelector("#name").value;
    // Find the index of the item to edit
    const editIndex = dataArray.findIndex((item) => item.name === name);
    if (editIndex !== -1) {
      // Update the data at the index
      dataArray[editIndex] = data;
    }
  } else {
    dataArray.push(data);
  }

  localStorage.setItem("formData", JSON.stringify(dataArray));

  // Reset the form and the submit button text
  myForm.reset();
  editButton.textContent = "Add Item";
  document.querySelector(".submit-btn").style.backgroundColor = "#007bff";

  // Refresh the displayed list
  myFunction();
}

// function onSubmit(e) {
//   e.preventDefault();
//   const formData = new FormData(myForm);
//   // Convert form data to a plain object
//   const data = {};
//   formData.forEach((value, key) => {
//     data[key] = value;
//   });
//   // Retrieve existing data from local storage
//   const savedData = localStorage.getItem("formData");
//   // If there is existing data, parse it from JSON, otherwise, create an empty array
//   const dataArray = savedData ? JSON.parse(savedData) : [];
//   // Add the new form data to the array
//   dataArray.push(data);
//   // Save the updated array to local storage
//   localStorage.setItem("formData", JSON.stringify(dataArray));
//   alert("Form data saved to local storage!");
//   myFunction();
//   myForm.reset();
// }
function editItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("edit")) {
    const li = e.target.parentElement;
    const name = li.firstChild.textContent.split(" ")[0]; // Extract name
    const savedData = localStorage.getItem("formData");
    const dataArray = savedData ? JSON.parse(savedData) : [];
    // Find the item to edit based on the name
    const itemToEdit = dataArray.find((data) => data.name === name);
    console.log(itemToEdit);
    // Populate the form fields with the data for editing
    document.querySelector("#name").value = itemToEdit.name;
    document.querySelector("#email").value = itemToEdit.email;
    document.querySelector("#phone").value = itemToEdit.mobile;

    // Change form submit button to indicate editing
    document.querySelector(".submit-btn").textContent = "Edit Item";
    document.querySelector(".submit-btn").style.backgroundColor = "#509";
  }
}
