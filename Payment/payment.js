const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", () => {
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

  const paymentData = {
    method: "card",
    cardNumber: document.getElementById("cardNumber").value,
    cardName: document.getElementById("cardName").value,
  };

  sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

  alert("Payment successful! Redirecting to ticket page...");
  window.location.href = "../Ticket/myTickets.html";
});
