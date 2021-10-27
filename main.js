const flavors = [
  {
    name: "original",
    image: "original.png",
    allergen: ["milk"],
  },
  {
    name: "blackberry",
    image: "blackberry.png",
    allergen: ["milk", "egg"],
  },
  {
    name: "caramel",
    image: "caramel.png",
    allergen: ["milk", "egg", "soy"],
  },
  {
    name: "pumpkin",
    image: "pumpkin.png",
    allergen: ["egg", "soy"],
  },
  {
    name: "walnut",
    image: "walnut.png",
    allergen: ["nuts", "milk"],
  },
  {
    name: "glutenfree",
    image: "gluten.png",
    allergen: ["milk"],
  },
];

function showPopup() {
  const cartPopup = document.getElementsByClassName("cart-pop-up");
  console.log(cartPopup);
  cartPopup[0].style.display = "block";
}

function hidePopup() {
  const cartPopup = document.getElementsByClassName("cart-pop-up");
  console.log(cartPopup);
  cartPopup[0].style.display = "none";
}

const glazing = document.getElementById("glazing");
const number = document.getElementById("number");
const totalVal = document.getElementById("total");
const cartTotal = document.getElementById("cart-total");
const emptyDiv = document.getElementsByClassName("cart-pop-up-empty");
const cartNumber = document.getElementById("item-number");
const cartNumberWrapper = document.getElementById("index-wrapper");
const cartButton = document.getElementsByClassName(
  "cart-pop-up-primary-button"
);

let cartArr = [];
cartArr = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
console.log(cartArr);
let totalPrice = 0;
let total = 0;

function addToCart() {
  const rollName = document.getElementById("roll-name").innerHTML;
  const selectedGlazing = glazing.options[glazing.selectedIndex].text;
  const selectedNumber = number.options[number.selectedIndex].text;
  total = parseFloat(totalVal.innerHTML.slice(-4));

  if (
    selectedGlazing == "--select a glazing--" &&
    selectedNumber == "--select a box--"
  ) {
    window.alert("Please select a glazing and box size!");
    return;
  } else if (
    selectedGlazing == "--select a glazing--" &&
    selectedNumber != "--select a box--"
  ) {
    window.alert("Please select a glazing!");
    return;
  } else if (
    selectedGlazing != "--select a glazing--" &&
    selectedNumber == "--select a box--"
  ) {
    window.alert("Please select a box!");
    return;
  }

  let itemDetails = {
    name: rollName,
    glazing: selectedGlazing,
    number: selectedNumber,
    image: ``,
    price: total,
  };

  for (const i of flavors) {
    if (i.name == rollName) {
      itemDetails.image = i.image;
    }
  }
  cartArr.push(itemDetails);

  let stringedCart = JSON.stringify(cartArr);
  localStorage.setItem("cart", stringedCart);

  renderCart();
}

function setTotal() {
  const number = document.getElementById("number");
  const selectedNumber = number.options[number.selectedIndex].text;
  const glazing = document.getElementById("glazing");
  const selectedGlazing = glazing.options[glazing.selectedIndex].text;

  if (selectedGlazing != "--select a glazing--") {
    if (selectedNumber == "Box of 1") {
      document.getElementById("total").innerHTML = "Total: $0.99";
    } else if (selectedNumber == "Box of 3") {
      document.getElementById("total").innerHTML = "Total: $1.99";
    } else if (selectedNumber == "Box of 6") {
      document.getElementById("total").innerHTML = "Total: $2.99";
    } else if (selectedNumber == "Box of 12") {
      document.getElementById("total").innerHTML = "Total: $3.99";
    } else {
      document.getElementById("total").innerHTML = "Total: $0.00";
    }
  }
}

function removeItem(id) {
  cartArr.splice(id, 1);
  const cartPopUp = document.getElementsByClassName("items-list");
  cartPopUp[0].innerHTML = "";

  let stringedCart = JSON.stringify(cartArr);
  localStorage.setItem("cart", stringedCart);

  if (cartArr.length <= 0) {
    cartButton[0].innerHTML = "Reveal the rolls";
    cartButton[0].setAttribute("href", "list.html");
    cartTotal.classList.add("hidden");
    emptyDiv[0].classList.remove("hidden");
    cartNumber.style.visibility = "hidden";
    cartNumber.innerHTML = cartArr.length;
  } else {
    renderCart();
  }
}

function renderCart() {
  const cartPopUp = document.getElementsByClassName("items-list");

  if (cartArr.length <= 0) {
    cartButton[0].innerHTML = "Reveal the rolls";
    cartButton[0].setAttribute("href", "list.html");
    cartTotal.classList.add("hidden");
    emptyDiv[0].classList.remove("hidden");
    cartNumber.style.visibility = "hidden";
    cartNumber.innerHTML = cartArr.length;
  } else {
    cartPopUp[0].innerHTML = "";
    let newItem = ``;
    for (i = 0; i < cartArr.length; i++) {
      newItem = `<div class="cart-pop-up-item"> 
    <img
      class="cart-pop-up-image"
      src="images/${cartArr[i].image}"
      alt="product image"
    />
    <div class="cart-pop-up-item-details">
      <h5>${cartArr[i].name}</h5>
      <ul>
        <li>${cartArr[i].glazing}</li>
        <li>${cartArr[i].number}</li>
      </ul>
    </div>
    <img
      class="cart-pop-up-icon"
      src="images/cross.png"
      alt="icon to remove item"
      onclick=removeItem(${i})
    />
    </div>`;

      cartPopUp[0].innerHTML = cartPopUp[0].innerHTML + newItem;
    }

    if (emptyDiv.length > 0) {
      emptyDiv[0].classList.add("hidden");
      cartNumber.style.visibility = "visible";
      cartNumber.innerHTML = cartArr.length;
    }

    cartButton[0].innerHTML = "Checkout";
    cartButton[0].setAttribute("href", "cart.html");

    cartTotal.classList.remove("hidden");
    totalPrice = 0;
    for (const i of cartArr) {
      totalPrice = totalPrice + i.price;
    }
    cartTotal.innerHTML = `Total: $${Number(totalPrice).toFixed(2)}`;
  }
}

window.onload = renderCart();

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const selectedProduct = params.name;

console.log(selectedProduct);
