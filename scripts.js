let bill = 0;
let amountOfPeople = 0;
let tipRate = 0;

//Dynamically update bill amount/tip calculation on input change
const billAmount = (event) => {
  bill = event.target.value;
  inputValidator(bill, ".splitter__bill");
  calculateTip();
};

//Dynamically update amount of people/tip calculation on input change
const peopleAmount = (event) => {
  amountOfPeople = event.target.value;
  inputValidator(amountOfPeople, ".splitter__number-of-people");
  calculateTip();
};

//Input validator function
const inputValidator = (input, inputParent) => {
  if (input <= 0) {
    document
      .querySelector(inputParent)
      .classList.add("splitter__inputs-invalid");
  } else {
    document
      .querySelector(inputParent)
      .classList.remove("splitter__inputs-invalid");
  }
};

//Tip button event listener
const getTip = (event) => {
  tipRate = event.target.value;

  if (event.target.type == "submit") {
    document
      .querySelectorAll(".splitter__tip-amount-btns button")
      .forEach((button) =>
        button.classList.remove("splitter__tip-amount-btns-active")
      );

    const tipInput = document.querySelector(".splitter__tip-amount-btns input");
    const invalidClass = document.querySelector(".splitter__tip-amount-btns");

    tipInput.classList.remove("splitter__tip-amount-btns-active");
    invalidClass.classList.remove("splitter__inputs-invalid");
    tipInput.value = "";
  } else {
    document
      .querySelectorAll(".splitter__tip-amount-btns button")
      .forEach((button) =>
        button.classList.remove("splitter__tip-amount-btns-active")
      );

    inputValidator(tipRate, ".splitter__tip-amount-btns");
  }
  event.target.classList.add("splitter__tip-amount-btns-active");
  calculateTip();
};

//Render tip calculation
const calculateTip = () => {
  const tipPerPerson = document.querySelector(".splitter__result-tip h2");
  const totalPerPerson = document.querySelector(".splitter__result-total h2");
  const resetBtn = document.querySelector(".splitter__result button");

  if (bill > 0 && tipRate > 0 && amountOfPeople > 0) {
    let tipAmount;
    let totalAmount;

    if (tipRate > 0.5) {
      tipAmount = ((bill * (tipRate / 100)) / amountOfPeople).toFixed(2);
      totalAmount = ((bill * (1 + tipRate / 100)) / amountOfPeople).toFixed(2);
    } else {
      tipAmount = ((bill * tipRate) / amountOfPeople).toFixed(2);
      totalAmount = ((bill * (1 + tipRate)) / amountOfPeople).toFixed(2);
    }

    tipPerPerson.textContent = `$${tipAmount}`;
    totalPerPerson.textContent = `$${totalAmount}`;
    resetBtn.disabled = false;
  } else {
    resetBtn.disabled = true;
  }
};

//Hacky site refresh
const reset = () => {
  location.reload();
};
