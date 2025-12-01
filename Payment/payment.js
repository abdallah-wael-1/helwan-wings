const cardForm = document.getElementById("cardForm");
const cashInfo = document.getElementById("cashInfo");
const payBtn = document.getElementById("payBtn");
const paymentRadios = document.querySelectorAll('input[name="paymentType"]');

paymentRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "card") {
      cardForm.style.display = "block";
      cashInfo.style.display = "none";
    } else {
      cardForm.style.display = "none";
      cashInfo.style.display = "block";
    }
  });
});

payBtn.addEventListener("click", () => {
  const selectedPayment = document.querySelector(
    'input[name="paymentType"]:checked'
  );

  if (!selectedPayment) {
    alert("Please select a payment method.");
    return;
  }

  if (selectedPayment.value === "card") {
    const fields = [
      "cardNumber",
      "cardName",
      "expiry",
      "cvv",
      "country",
      "city",
      "address",
      "postalCode",
    ];
    let valid = true;
    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.classList.add("error");
        valid = false;
      } else {
        el.classList.remove("error");
      }
    });
    if (!valid) {
      alert("Please fill in all fields.");
      return;
    }
  }

  const paymentData = {
    method: selectedPayment.value,
    cardNumber: document.getElementById("cardNumber")?.value || "",
    cardName: document.getElementById("cardName")?.value || "",
  };

  sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

  alert("Payment successful! Redirecting to ticket page...");
  window.location.href = "../Ticket/myTickets.html";
});
