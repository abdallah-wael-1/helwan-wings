const ticketsContainer = document.getElementById("ticketsContainer");

let bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];

const bookingData = JSON.parse(sessionStorage.getItem("bookingData"));
const paymentData = JSON.parse(sessionStorage.getItem("paymentData"));

if (bookingData && paymentData) {
  bookings.push({ booking: bookingData, payment: paymentData });
  sessionStorage.setItem("bookings", JSON.stringify(bookings));

  sessionStorage.removeItem("bookingData");
  sessionStorage.removeItem("paymentData");
}

function goHome() {
  window.location.href = "../index.html";
}

function bookAnother() {
  window.location.href = "../Booking/booking.html";
}

function cancelBooking(index) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    bookings.splice(index, 1);

    sessionStorage.setItem("bookings", JSON.stringify(bookings));

    renderTickets();
  }
}

function renderTickets() {
  ticketsContainer.innerHTML = "";

  if (bookings.length === 0) {
    ticketsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fas fa-inbox"></i></div>
        <div class="empty-text">No Tickets Found</div>
        <div class="empty-subtext">Please complete a booking and payment first.</div>
        <div class="ticket-actions">
          <button class="btn btn-primary" onclick="goHome()">Go to Home</button>
          <button class="btn btn-secondary" onclick="bookAnother()">Book Another Trip</button>
        </div>
      </div>
    `;
    return;
  }

  bookings.forEach((b, index) => {
    const ticketNumber = Math.floor(100000 + Math.random() * 900000);
    const badgeClass =
      b.payment.status === "paid" ? "status-paid" : "status-pending";
    const badgeText = b.payment.status === "paid" ? "Paid" : "Pending";

    ticketsContainer.innerHTML += `
      <div class="ticket-card">
        <div class="status-badge ${badgeClass}">${badgeText}</div>

        <div class="ticket-header">
          <div class="ticket-number">Ticket #${ticketNumber}</div>
          <div class="ticket-date">${b.booking.date}</div>
        </div>

        <div class="flight-route">
          <div class="flight-location">
            <div class="location-code">${b.booking.from}</div>
            <div class="location-name">Departure</div>
          </div>
          <div class="flight-icon"><i class="fas fa-plane"></i></div>
          <div class="flight-location">
            <div class="location-code">${b.booking.to}</div>
            <div class="location-name">Arrival</div>
          </div>
        </div>

        <div class="ticket-details">
          <div class="detail-item"><div class="detail-label">Class</div><div class="detail-value">${
            b.booking.flightClass
          }</div></div>
          <div class="detail-item"><div class="detail-label">Seat</div><div class="detail-value">${
            b.booking.seat
          }</div></div>
          <div class="detail-item"><div class="detail-label">Meal</div><div class="detail-value">${
            b.booking.meal
          }</div></div>
          <div class="detail-item"><div class="detail-label">Payment</div><div class="detail-value">${b.payment.method.toUpperCase()}</div></div>
        </div>

        <div class="ticket-actions">
          <button class="btn btn-primary" onclick="bookAnother()">Book Another Trip</button>
          <button class="btn btn-secondary" onclick="goHome()">Go to Home</button>
          <button class="btn btn-cancel" onclick="cancelBooking(${index})">
            <i class="fas fa-times-circle"></i> Cancel Booking
          </button>
        </div>
      </div>
    `;
  });
}

renderTickets();
