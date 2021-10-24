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
    name: "caramel pecan",
    image: "caramel.png",
    allergen: ["milk", "egg", "soy"],
  },
  {
    name: "pumpkin spice",
    image: "pumpkin.png",
    allergen: ["egg", "soy"],
  },
  {
    name: "walnut",
    image: "walnut.png",
    allergen: ["nuts", "milk"],
  },
  {
    name: "original (gluten-free)",
    image: "gluten.png",
    allergen: ["milk"],
  },
];

// This code controls the cart popup when a user hovers over the icon

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
let totalPrice = 0;
let total = 0;

// Code to add to cart

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

  // console.log(selectedGlazing);
  // console.log(selectedNumber);
  // console.log(rollName);
  // console.log(itemDetails);
  // console.log(cartArr);

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
  }

  const cartPopUp = document.getElementsByClassName("items-list");
  cartPopUp[0].innerHTML = cartPopUp[0].innerHTML + newItem;

  if (emptyDiv.length > 0) {
    // emptyDiv[0].setAttribute("class", "hidden");
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

// Code to update the total price depending on the chosen options

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

// Code to reset all parameters and update the shopping cart
// popup when user deletes an option in the cart

function removeItem(id) {
  cartArr.splice(id, 1);
  const cartPopUp = document.getElementsByClassName("items-list");
  cartPopUp[0].innerHTML = "";

  let newItem = ``;

  if (cartArr.length <= 0) {
    cartButton[0].innerHTML = "Reveal the rolls";
    cartButton[0].setAttribute("href", "list.html");
    cartTotal.classList.add("hidden");
    emptyDiv[0].classList.remove("hidden");
    cartNumber.style.visibility = "hidden";
    cartNumber.innerHTML = cartArr.length;
  } else {
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

      totalPrice = 0;
      for (const i of cartArr) {
        totalPrice = totalPrice + i.price;
      }
      cartTotal.innerHTML = `Total: $${Number(totalPrice).toFixed(2)}`;

      cartPopUp[0].innerHTML = cartPopUp[0].innerHTML + newItem;
      cartNumber.innerHTML = cartArr.length;
    }
  }
}
