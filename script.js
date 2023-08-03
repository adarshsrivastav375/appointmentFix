const Btn = document.querySelector(".btn");
const myForm = document.querySelector("#myform");
let itemList = document.getElementById("items");

const formBox = document.querySelector("#main");
Btn.addEventListener("click", (e) => {
  e.preventDefault;
  Btn.style.background = "green";
});
myForm.addEventListener("submit", onSubmit);
itemList.addEventListener("click", deleteItem);

// delete Item;
function deleteItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure ?")) {
      let li = e.target.parentElement;
      itemList.removeChild(li);
      const name = e.target.parentElement.textContent.split("X");
      const savedData = localStorage.getItem("formData");
      const dataArray = savedData ? JSON.parse(savedData) : [];
      dataArray.forEach((data, index) => {
        if (data.name == name[0]) {
          dataArray.splice(index, 1);
        }
      });
      localStorage.setItem("formData", JSON.stringify(dataArray));
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
  console.log(nameArray);
  nameArray.map(function (item) {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(`${item.name} ${item.email}`));
    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger float-lg-right btn-sm m-1 delete";
    deleteButton.appendChild(document.createTextNode("X"));
    li.appendChild(deleteButton);
    itemList.appendChild(li);
  });
}

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(myForm);
  // Convert form data to a plain object
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  // Retrieve existing data from local storage
  const savedData = localStorage.getItem("formData");
  // If there is existing data, parse it from JSON, otherwise, create an empty array
  const dataArray = savedData ? JSON.parse(savedData) : [];
  // Add the new form data to the array
  dataArray.push(data);
  // Save the updated array to local storage
  localStorage.setItem("formData", JSON.stringify(dataArray));
  alert("Form data saved to local storage!");
  myFunction();
}
