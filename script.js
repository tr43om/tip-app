"use strict";
const themeSwitch = document.querySelector("input#switch");
const inputBill = document.querySelector(".form__input--bill");
const inputPeople = document.querySelector(".form__input--number");
const inputCustom = document.querySelector(".form__custom");

const tips = [...document.querySelectorAll(".form__field--tip .radio__input")];
const currencies = [
  ...document.querySelectorAll(".form__field--currency .radio__input"),
];

const labelAmount = document.querySelector(".info__label--amount");
const labelTotal = document.querySelector(".info__label--total");

const switchTheme = function () {
  if (themeSwitch.checked) {
    document.body.style.setProperty("--background", "#000");
    document.body.style.setProperty("--container-bg", "#1b2425");
    document.body.style.setProperty("--active-bg", "#96a2a1 ");
    document
      .querySelectorAll(".switch-container span")[0]
      .style.setProperty("--switch-label", "var(--white)");
    document
      .querySelectorAll(".switch-container span")[1]
      .style.setProperty("--switch-label", "var(--white)");
  } else {
    document.body.style.setProperty("--background", "var(--light-cyan)");
    document.body.style.setProperty("--active-bg", "var(--primary)");
    document.body.style.setProperty("--container-bg", "var(--white)");
    document.body.style.setProperty("--switch-label", "var(--label-color)");
  }
};

themeSwitch.addEventListener("click", switchTheme);

const resetBtn = document.querySelector(".btn--reset");
let bill, num, tip, selectedCurrency;

const calcTip = () => {
  const calculatedTip = (bill / 100) * tip;
  const tipForOnePerson = calculatedTip / num;
  return Number(tipForOnePerson.toFixed(2));
};
const internationalizeCurrency = function (num) {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: selectedCurrency,
  }).format(num);
};
const updateUI = function () {
  switchTheme();
  getValues();

  document
    .querySelector(".form__field--bill")
    .style.setProperty(
      "--currency",
      `"${internationalizeCurrency().slice(0, 1)}"`
    );

  const tipAmount = calcTip();

  const total = calcTip() + Number(bill);
  if (inputBill.value != "" && inputPeople.value != "") {
    labelAmount.textContent = internationalizeCurrency(tipAmount);
    labelTotal.textContent = internationalizeCurrency(total);
  }
  if (inputBill.value === "" || inputPeople.value === "") {
    labelAmount.textContent = internationalizeCurrency(0);
    labelTotal.textContent = internationalizeCurrency(0);
  }
  if (inputCustom.value != "") tips.forEach((tip) => (tip.checked = false));

  if (!tip) internationalizeCurrency(0);

  inputBill.value === "0"
    ? document.body.style.setProperty("--opacity", "100")
    : document.body.style.setProperty("--opacity", "0");
};

const resetUI = function () {
  inputBill.value = "";
  inputPeople.value = "";
  inputCustom.value = "";
  tips[0].checked = true;
  labelAmount.textContent = "$0";
  labelTotal.textContent = "$0";
};

const getValues = function () {
  bill = inputBill.value;
  selectedCurrency = currencies.find((currency) => currency.checked)?.value;
  num = inputPeople.value;
  if (!inputCustom.value) {
    tip = tips.find((tip) => tip.checked)?.value;
  } else {
    tip = Number(inputCustom.value);
  }
};
resetBtn.addEventListener("click", resetUI);

inputPeople.addEventListener("input", updateUI);

inputBill.addEventListener("input", updateUI);

inputCustom.addEventListener("input", updateUI);

tips.forEach((tip) =>
  tip.addEventListener("change", function () {
    inputCustom.value = "";
    updateUI();
  })
);
currencies.forEach((currency) =>
  currency.addEventListener("change", function () {
    updateUI();
  })
);

updateUI();
