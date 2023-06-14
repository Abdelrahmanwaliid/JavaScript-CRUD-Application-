// All input Variables

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let currUpdateBtn;
let searchedItem = "title";
let tbody = document.getElementById("tbody");
let mood = "create";
let tmp;

// Calculate Total price
function getTotalPrice() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "crimson";
    total.innerHTML = "";
  }
}

// Create a product

let dataPro;
if (localStorage.product != null) {
  // if localStorage have data
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // Counter
  if (title.value != "" && newPro.count <= 100) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  // save LocalStorage
  window.localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read (Show Data)
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deletePro(${i})" id="delete">Delate</button></td>
    </tr>

    `;
  }
  tbody.innerHTML = table;

  // Delete All Products
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataPro.length})</button>

    `;
  } else {
    btnDelete.innerHTML = "";
  }
  getTotalPrice();
}
showData();

// Delete One Product
function deletePro(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData(); // To Update Data
}

// Delete All Products
function deleteAll() {
  dataPro.splice(0);
  localStorage.clear();
  showData();
}

// Update a Product
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotalPrice();
  category.value = dataPro[i].category;
  count.value = dataPro[i].count;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search for Products
let searchMood = "title";

function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.value = "";
  search.placeholder = "Search by " + searchMood;
  search.focus();
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.includes(value)) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deletePro(${i})" id="delete">Delate</button></td>
        </tr>
        `;
      }
    } else {
      if (searchMood === "category") {
        if (dataPro[i].category.includes(value)) {
          table += `
          <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">Update</button></td>
          <td><button onclick="deletePro(${i})" id="delete">Delate</button></td>
          </tr>
      
          `;
        }
      }
    }
  }
  tbody.innerHTML = table;
}
/*********************E N D************************/
