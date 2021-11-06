const flavors = [
  {
    name: "original",
    image: "/Images/original.png",
    title: "original",
    desc: "The OG. The good old. The original. You can't go wrong with the classics. The best of Bun Bun, all in one cinnamon roll.",
    allergen: ["Milk"],
  },
  {
    name: "blackberry",
    image: "/Images/blackberry.png",
    title: "blackberry",
    desc: "They say fruits are good for you. Our newest cinnamon roll is scrumptious blackberry flavored goodness that's all things sweet.",
    allergen: ["Milk", "Egg"],
  },
  {
    name: "caramel",
    image: "/Images/caramel.png",
    title: "caramel pecan",
    desc: "What's a good cinnamon roll without caramel dripping as you take a bite? Now this is a roll you wouldn't want to miss.",
    allergen: ["Milk", "Egg", "Soy"],
  },
  {
    name: "pumpkin",
    image: "/Images/pumpkin.png",
    title: "pumpkin spice",
    desc: "'Tis the season for spooks, spice, and everything orange. At Bun Bun, it's always October. Get your pumpkin spice cinnamon roll",
    allergen: ["Egg", "Soy"],
  },
  {
    name: "walnut",
    image: "/Images/walnut.png",
    title: "walnut",
    desc: "We hear you, you like a little crunch when you bite into a cinnamon roll. The walnut cinnamon roll is your best friend.",
    allergen: ["Nuts", "Milk"],
  },
  {
    name: "glutenfree",
    image: "/Images/gluten.png",
    title: "original (gluten-free)",
    desc: "The OG. The good old. The original. The best of Bun Bun, all in one cinnamon roll. Now gluten-free. We've got you covered!",
    allergen: ["Milk"],
  },
];

const cartPopup = document.getElementsByClassName("cart-pop-up");

function showPopup() {
  cartPopup[0].style.display = "block";
}

function hidePopup() {
  cartPopup[0].style.display = "none";
}

const glazing = document.getElementById("glazing");
const number = document.getElementById("number");
const totalVal = document.getElementById("total");
const cartTotalPrice = document.getElementById("cart-total");
const emptyDiv = document.getElementsByClassName("cart-pop-up-empty");
const cartNum = document.getElementById("item-number");
const cartNumberWrapper = document.getElementById("index-wrapper");
const cartButton = document.getElementsByClassName(
  "cart-pop-up-primary-button"
);
const mainCartPrice = document.getElementById("main-cart-total");

let cartArr = [];
cartArr = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let totalPrice = 0;
let totalAmt = 0;

const selectFlavor = localStorage.getItem("selectedFlavor");
localStorage.setItem("cCounter", 0);
let carousalArr = [];
carousalArr = [...flavors];
for (product of carousalArr) {
  if (product.name == selectFlavor) {
    carousalArr.splice(carousalArr.indexOf(product), 1);
  }
}

function addToCart() {
  const rollName = document.getElementById("roll-name").innerHTML;
  const selectedGlazing = glazing.options[glazing.selectedIndex].text;
  const selectedNumber = number.options[number.selectedIndex].text;
  totalAmt = parseFloat(totalVal.innerHTML.slice(-4));

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
    price: totalAmt,
  };

  for (roll of flavors) {
    if (roll.title == rollName) {
      itemDetails.image = roll.image;
    }
  }

  cartArr.push(itemDetails);

  let stringedCart = JSON.stringify(cartArr);
  localStorage.setItem("cart", stringedCart);

  renderCart();
}

function setTotal() {
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
    cartTotalPrice.classList.add("hidden");
    emptyDiv[0].classList.remove("hidden");
    cartNum.style.visibility = "hidden";
    cartNum.innerHTML = cartArr.length;
    renderCheckOut();
  } else {
    renderCart();
    renderCheckOut();
  }
}

function renderCart() {
  const cartPopUp = document.getElementsByClassName("items-list");

  if (cartArr.length <= 0) {
    cartPopUp[0].innerHTML = "";
    cartButton[0].innerHTML = "Reveal the rolls";
    cartButton[0].setAttribute("href", "list.html");
    cartTotalPrice.classList.add("hidden");
    emptyDiv[0].classList.remove("hidden");
    cartNum.style.visibility = "hidden";
    cartNum.innerHTML = cartArr.length;
  } else {
    cartPopUp[0].innerHTML = "";
    let newItem = ``;
    for (i = 0; i < cartArr.length; i++) {
      newItem = `<div class="cart-pop-up-item"> 
    <img
      class="cart-pop-up-image"
      src="${cartArr[i].image}"
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
      cartNum.style.visibility = "visible";
      cartNum.innerHTML = cartArr.length;
    }

    cartButton[0].innerHTML = "Checkout";
    cartButton[0].setAttribute("href", "cart.html");

    cartTotalPrice.classList.remove("hidden");
    totalPrice = 0;
    for (const i of cartArr) {
      totalPrice = totalPrice + i.price;
    }
    cartTotalPrice.innerHTML = `Total: $${Number(totalPrice).toFixed(2)}`;
  }
}

window.onload = renderCart();

function saveFlavor(flavor) {
  localStorage.setItem("selectedFlavor", flavor);
}

function renderCheckOut() {
  const mainCart = document.getElementsByClassName("cart-list");
  const emptyCart = document.getElementsByClassName("cart-empty-wrapper");

  if (cartArr.length <= 0) {
    emptyCart[0].classList.remove("hidden");
    mainCart[0].classList.add("hidden");
    mainCartPrice.innerHTML = `Total: $0.00`;
  } else {
    emptyCart[0].classList.add("hidden");
    mainCart[0].classList.remove("hidden");
    mainCart[0].innerHTML = "";
    let newItem = ``;
    for (i = 0; i < cartArr.length; i++) {
      newItem = `<div class="cart-item">
      <img
        class="cart-image"
        src="${cartArr[i].image}"
        alt="product image"
      />
      <div class="cart-item-details">
        <h5>${cartArr[i].name}</h5>
        <ul>
          <li>${cartArr[i].glazing}</li>
          <li>${cartArr[i].number}</li>
        </ul>
      </div>
      <img
        class="cart-icon"
        src="images/cross.png"
        alt="icon to remove item"
        onclick=removeItemFromCart(${i})
      />
    </div>`;

      mainCart[0].innerHTML = mainCart[0].innerHTML + newItem;
    }

    totalPrice = 0;
    for (const i of cartArr) {
      totalPrice = totalPrice + i.price;
    }
    mainCartPrice.innerHTML = `Total: $${Number(totalPrice).toFixed(2)}`;
  }
}

function removeItemFromCart(id) {
  cartArr.splice(id, 1);
  const mainCart = document.getElementsByClassName("cart-list");
  const emptyCart = document.getElementById("cart-empty-wrapper");
  mainCart[0].innerHTML = "";

  let stringedCart = JSON.stringify(cartArr);
  localStorage.setItem("cart", stringedCart);

  renderCart();
  renderCheckOut();
}

function alertATC() {
  window.alert(
    "Adding to Cart from this page hasn't been implemented yet. Please go to More Info and then add to cart. Sorry!"
  );
}

function alertPO() {
  window.alert("You've reached the end of this website. Cheers!");
}

function renderCarousal(index) {
  const recoImg = document.getElementById("reco-image");
  const recoH4 = document.getElementById("reco-h4");
  const recoDesc = document.getElementById("reco-desc");
  const recoBtn = document.getElementById("reco-btn");
  recoImg.setAttribute("src", carousalArr[index].image);
  recoH4.innerHTML = carousalArr[index].title;
  recoDesc.innerHTML = carousalArr[index].desc;
  recoBtn.setAttribute("onclick", `saveFlavor('${carousalArr[index].name}')`);
}

function changeLeft() {
  arrIndex = JSON.parse(localStorage.getItem("cCounter"));
  arrIndex = arrIndex - 1;
  if (arrIndex < 0) {
    arrIndex = carousalArr.length - 1;
  }
  localStorage.setItem("cCounter", arrIndex);
  renderCarousal(arrIndex);
}

function changeRight() {
  arrIndex = JSON.parse(localStorage.getItem("cCounter"));
  arrIndex = arrIndex + 1;
  if (arrIndex >= carousalArr.length) {
    arrIndex = 0;
  }
  localStorage.setItem("cCounter", arrIndex);
  renderCarousal(arrIndex);
}
