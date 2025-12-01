const btn = document.querySelector(".search-btn");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const closeBtn = document.getElementById("close-popup");

btn.addEventListener("click", () => {
  let from = document.querySelectorAll(".search-box input")[0].value;
  let to = document.querySelectorAll(".search-box input")[1].value;
  let date = document.querySelectorAll(".search-box input")[2].value;

  if (!from || !to || !date) {
    popupText.innerHTML = "⚠️ Please fill all fields!";
  } else {
    popupText.innerHTML = `
      <strong>From:</strong> ${from}<br>
      <strong>To:</strong> ${to}<br>
      <strong>Date:</strong> ${date}
    `;
  }

  popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
