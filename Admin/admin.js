document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser || currentUser.role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "../../index.html";
    return;
  }

  document.getElementById(
    "adminName"
  ).textContent = `Hello, ${currentUser.name}`;

  let flights = [
    {
      id: 1,
      flightNumber: "HW101",
      from: "Cairo",
      to: "Dubai",
      price: 3200,
      departure: "10:30 AM",
      arrival: "2:00 PM",
      offer: true,
    },
    {
      id: 2,
      flightNumber: "HW202",
      from: "Cairo",
      to: "Jeddah",
      price: 2500,
      departure: "1:00 PM",
      arrival: "3:30 PM",
      offer: false,
    },
    {
      id: 3,
      flightNumber: "HW303",
      from: "Alex",
      to: "Istanbul",
      price: 4100,
      departure: "8:00 AM",
      arrival: "11:40 AM",
      offer: true,
    },
  ];

  const tableBody = document.getElementById("flightData");
  const addBtn = document.getElementById("addFlightBtn");
  const modal = document.getElementById("flightModal");
  const closeModalBtn = document.querySelector(".close");
  const flightForm = document.getElementById("flightForm");
  const modalTitle = document.getElementById("modalTitle");

  let editingFlightId = null;

  function renderFlights() {
    tableBody.innerHTML = "";
    flights.forEach((f) => {
      const tr = document.createElement("tr");
      tr.dataset.id = f.id;
      tr.innerHTML = `
            <td>${f.id}</td>
            <td>${f.flightNumber}</td>
            <td>${f.from}</td>
            <td>${f.to}</td>
            <td>${f.price} EGP</td>
            <td>${f.departure}</td>
            <td>${f.arrival}</td>
            <td>${f.offer ? "Yes" : "No"}</td>
            <td class="actions">
              <span class="edit"><i class="fas fa-edit"></i></span>
              <span class="delete"><i class="fas fa-trash"></i></span>
            </td>
          `;
      tableBody.appendChild(tr);
    });
  }

  tableBody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const id = parseInt(tr.dataset.id);
    if (e.target.closest(".edit")) openModal(id);
    else if (e.target.closest(".delete")) deleteFlight(id);
  });

  addBtn.addEventListener("click", () => openModal());

  function openModal(id = null) {
    editingFlightId = id;
    modal.classList.add("show");

    if (id) {
      modalTitle.textContent = "Edit Flight";
      const f = flights.find((f) => f.id === id);
      flightForm.flightNumber.value = f.flightNumber;
      flightForm.from.value = f.from;
      flightForm.to.value = f.to;
      flightForm.price.value = f.price;
      flightForm.departure.value = f.departure;
      flightForm.arrival.value = f.arrival;
      flightForm.offer.checked = f.offer;
    } else {
      modalTitle.textContent = "Add Flight";
      flightForm.reset();
    }
  }

  function closeModal() {
    modal.classList.remove("show");
  }

  closeModalBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  flightForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const flightData = {
      flightNumber: flightForm.flightNumber.value,
      from: flightForm.from.value,
      to: flightForm.to.value,
      price: parseFloat(flightForm.price.value),
      departure: flightForm.departure.value,
      arrival: flightForm.arrival.value,
      offer: flightForm.offer.checked,
    };

    if (editingFlightId) {
      const fIndex = flights.findIndex((f) => f.id === editingFlightId);
      flights[fIndex] = { id: editingFlightId, ...flightData };
    } else {
      const newId = flights.length
        ? Math.max(...flights.map((f) => f.id)) + 1
        : 1;
      flights.push({ id: newId, ...flightData });
    }

    closeModal();
    renderFlights();
  });

  function deleteFlight(id) {
    if (!confirm("Delete this flight?")) return;
    flights = flights.filter((f) => f.id !== id);
    renderFlights();
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("⚠️ Are you sure you want to log out?")) {
      alert("Logged out successfully!");
      window.location.href = "../Auth/Register/register.html";
    }
  });

  renderFlights();
});
