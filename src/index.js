import { WishList } from "./wishlist.js";

const form = document.querySelector("form");
const carMakeInput = document.querySelector("#makeInput");
const carModelInput = document.querySelector("#modelInput");
const carYearInput = document.querySelector("#yearInput");
const carMakeParagraph = document.querySelector("p[data-car-make]");
const carModelParagraph = document.querySelector("p[data-car-model]");
const carYearParagraph = document.querySelector("p[data-car-year]");
const removeButton = document.querySelector(".removeBtn");
const wishlistContainer = document.querySelector("ul");

const myWishlist = new WishList();

function showCarDetails(car) {
  carMakeParagraph.textContent = `Make: ${car.make}`;
  carModelParagraph.textContent = `Model: ${car.model}`;
  carYearParagraph.textContent = `Year: ${car.year}`;
  removeButton.disabled = false;
  removeButton.setAttribute("data-carId", car.id);
}

function updateDOMList() {
  wishlistContainer.innerHTML = "";

  myWishlist.list.forEach((car) => {
    const li = document.createElement("li");
    li.textContent = `${car.make} ${car.model} (${car.year})`;

    li.addEventListener("click", () => {
      showCarDetails(car);
    });

    wishlistContainer.appendChild(li);
  });
}

function addCar(event) {
  event.preventDefault();
  const make = carMakeInput.value;
  const model = carModelInput.value;
  const year = carYearInput.value;

  if (make && model && year) {
    myWishlist.add(make, model, year);
    updateDOMList();
    carMakeInput.value = "";
    carModelInput.value = "";
    carYearInput.value = "";
  } else {
    alert("Please fill in all fields");
  }
}

form.addEventListener("submit", addCar);

function removeCar() {
  const carId = Number(removeButton.getAttribute("data-carId"));
  myWishlist.remove(carId);
  updateDOMList();
  carMakeParagraph.textContent = "";
  carModelParagraph.textContent = "";
  carYearParagraph.textContent = "";
  removeButton.disabled = true;
}

removeButton.addEventListener("click", removeCar);
