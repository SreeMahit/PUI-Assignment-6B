// const flavors2 = [
//   {
//     name: "original",
//     image: "/Images/original.png",
//     allergen: ["milk"],
//   },
//   {
//     name: "blackberry",
//     image: "/Images/blackberry.png",
//     allergen: ["milk", "egg"],
//   },
//   {
//     name: "caramel",
//     image: "/Images/caramel.png",
//     allergen: ["milk", "egg", "soy"],
//   },
//   {
//     name: "pumpkin",
//     image: "/Images/pumpkin.png",
//     allergen: ["egg", "soy"],
//   },
//   {
//     name: "walnut",
//     image: "/Images/walnut.png",
//     allergen: ["nuts", "milk"],
//   },
//   {
//     name: "glutenfree",
//     image: "/Images/gluten.png",
//     allergen: ["milk"],
//   },
// ];

// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());
// const productName = params.name;

// window.onload = function renderDetails() {
//   const page = window.load("original.html");
//   document.getElementById("product-image").setAttribute("src", function () {
//     for (const product of flavors2) {
//       if (product.name == productName) {
//         console.log(product.image);
//         return product.image;
//       }
//     }
//   });

//   let selectedFlavor = localStorage.getItem("selectedFlavor");
//   document.getElementById("product-image").setAttribute("src", function () {
//     for (const product of flavors2) {
//       if (product.name == selectedFlavor) {
//         console.log(product.image);
//         return product.image;
//       }
//     }
//   });
// };
