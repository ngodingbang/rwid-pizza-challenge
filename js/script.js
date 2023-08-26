class Pizza {
  constructor(name, price, allowedToppings = []) {
    this.name = name;
    this.price = price;
    this.allowedToppings = allowedToppings;
    this.toppings = [];
    this.size = null;
  }

  setSize(size) {
    this.size = size;
  }

  addTopping(topping) {
    if (this.allowedToppings.includes(topping.name)) {
      this.toppings.push(topping);
    } else {
      console.log(`Topping '${topping.name}' is not allowed for ${this.name}.`);
    }
  }

  calculateTotalPrice() {
    let totalPrice = this.price;

    if (this.size === "medium") {
      totalPrice += 2;
    } else if (this.size === "large") {
      totalPrice += 4;
    }

    totalPrice += this.toppings.reduce(
      (acc, topping) => acc + topping.price,
      0
    );

    return totalPrice;
  }
}

class Topping {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const toppingPrices = {
  avocado: 1,
  onions: 1,
  broccoli: 1,
  zucchini: 1,
  lobster: 2,
  salmon: 2,
  oyster: 2,
  tuna: 2,
  bacon: 3,
  ham: 3,
  duck: 3,
  sausage: 3,
};

const pizzaOptions = [
  new Pizza("Pizza 1", 8, [
    "avocado",
    "broccoli",
    "onions",
    "zucchini",
    "tuna",
    "ham",
  ]),
  new Pizza("Pizza 2", 10, [
    "broccoli",
    "onions",
    "zucchini",
    "lobster",
    "oyster",
    "salmon",
    "bacon",
    "ham",
  ]),
  new Pizza("Pizza 3", 12, [
    "broccoli",
    "onions",
    "zucchini",
    "tuna",
    "bacon",
    "duck",
    "ham",
    "sausage",
  ]),
];

function getSelectedPizzaOption() {
  const pizzaRadios = document.getElementsByName("pizza");
  for (let i = 0; i < pizzaRadios.length; i++) {
    if (pizzaRadios[i].checked) {
      return pizzaOptions[parseInt(pizzaRadios[i].value) - 1];
    }
  }
  return null;
}

// Function to get selected size option
function getSelectedSizeOption() {
  const sizeRadios = document.getElementsByName("size");
  for (let i = 0; i < sizeRadios.length; i++) {
    if (sizeRadios[i].checked) {
      return sizeRadios[i].value;
    }
  }
  return null;
}

// Function to get selected toppings
function getSelectedToppings() {
  const selectedToppings = [];
  const toppingCheckboxes = document.getElementsByName("topping");
  for (let i = 0; i < toppingCheckboxes.length; i++) {
    if (toppingCheckboxes[i].checked) {
      selectedToppings.push(toppingCheckboxes[i].value);
    }
  }
  return selectedToppings;
}

function calculateAndUpdateTotalPrice() {
  const selectedPizza = getSelectedPizzaOption();
  const selectedSize = getSelectedSizeOption();
  const selectedToppings = getSelectedToppings();

  const toppingCheckboxes = document.querySelectorAll('input[name="topping"]');
  toppingCheckboxes.forEach(checkbox => {
    const toppingName = checkbox.value;
    checkbox.disabled =
      selectedPizza && !selectedPizza.allowedToppings.includes(toppingName);
  });

  if (selectedPizza && selectedSize) {
    selectedPizza.setSize(selectedSize);
    selectedPizza.toppings = selectedToppings.map(
      toppingName => new Topping(toppingName, toppingPrices[toppingName])
    );

    const pizzaPrice = selectedPizza.price;
    const sizePrice =
      selectedSize === "small" ? -1 : selectedSize === "large" ? 2 : 0;
    const toppingsPrice = selectedToppings.reduce(
      (acc, toppingName) => acc + toppingPrices[toppingName],
      0
    );

    const pizzaResultElement = document.getElementById("pizza-result");
    const sizeResultElement = document.getElementById("size-result");
    const toppingResultElement = document.getElementById("topping-result");
    const totalResultElement = document.getElementById("total-result");

    pizzaResultElement.textContent = `$${pizzaPrice.toFixed(2)}`;
    sizeResultElement.textContent =
      sizePrice === 0 ? "" : `$${sizePrice.toFixed(2)}`;
    toppingResultElement.textContent = `$${toppingsPrice.toFixed(2)}`;

    const totalPrice = pizzaPrice + sizePrice + toppingsPrice;
    totalResultElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

// Attach event listeners to checkboxes and radios
const pizzaRadios = document.getElementsByName("pizza");
const sizeRadios = document.getElementsByName("size");
const toppingCheckboxes = document.getElementsByName("topping");

pizzaRadios.forEach(radio =>
  radio.addEventListener("change", calculateAndUpdateTotalPrice)
);
sizeRadios.forEach(radio =>
  radio.addEventListener("change", calculateAndUpdateTotalPrice)
);
toppingCheckboxes.forEach(checkbox =>
  checkbox.addEventListener("change", calculateAndUpdateTotalPrice)
);

// Attach event listener to reset button
const resetButton = document.getElementById("reset-order");
resetButton.addEventListener("click", () => {
  pizzaRadios.forEach(radio => (radio.checked = false));
  sizeRadios.forEach(radio => (radio.checked = false));
  toppingCheckboxes.forEach(checkbox => (checkbox.checked = false));

  const pizzaResultElement = document.getElementById("pizza-result");
  const sizeResultElement = document.getElementById("size-result");
  const toppingResultElement = document.getElementById("topping-result");
  const totalResultElement = document.getElementById("total-result");

  pizzaResultElement.textContent = "$0.00";
  sizeResultElement.textContent = "";
  toppingResultElement.textContent = "$0.00";
  totalResultElement.textContent = "$0.00";
});
