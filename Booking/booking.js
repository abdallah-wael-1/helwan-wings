const form = document.getElementById("bookingForm");
const popup = document.getElementById("confirmPopup");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validation
  const fields = [
    "from",
    "to",
    "date",
    "passengers",
    "class",
    "flightType",
    "seat",
    "meal",
  ];
  let isValid = true;

  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (
      el &&
      (!el.value || el.value === "Select" || el.value === "Select class")
    ) {
      el.classList.add("input-error");
      isValid = false;
    } else if (el) {
      el.classList.remove("input-error");
    }
  });

  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  if (from === to) {
    alert("Departure and destination cannot be the same.");
    document.getElementById("from").classList.add("input-error");
    document.getElementById("to").classList.add("input-error");
    return;
  }

  const date = document.getElementById("date").value;
  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    alert("Departure date cannot be in the past.");
    document.getElementById("date").classList.add("input-error");
    return;
  }

  if (isValid) {
    popup.style.display = "flex";
  }
});

confirmBtn.addEventListener("click", function () {
  const bookingData = {
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    date: document.getElementById("date").value,
    flightClass: document.getElementById("class").value,
    flightType: document.getElementById("flightType").value,
    seat: document.getElementById("seat").value,
    meal: document.getElementById("meal").value,
  };

  sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

  window.location.href = "../payment/payment.html";
});

cancelBtn.addEventListener("click", function () {
  popup.style.display = "none";
});
