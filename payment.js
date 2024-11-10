// Handle payment method selection to toggle fields
document.getElementById("paymentMethod").addEventListener("change", function () {
  const paymentMethod = this.value;
  const cardFields = document.getElementById("cardPaymentFields");
  const upiFields = document.getElementById("upiPaymentFields");

  // Show/hide fields based on selected payment method
  if (paymentMethod === "card") {
      cardFields.style.display = "block";
      upiFields.style.display = "none";
  } else if (paymentMethod === "upi") {
      cardFields.style.display = "none";
      upiFields.style.display = "block";
  }
});

// Generate UPI payment link and QR code upon clicking the UPI Proceed button
document.getElementById("upiProceedButton").addEventListener("click", function () {
  const upiId = document.getElementById("upiId").value;
  const amount = "100"; // Set a specific amount or retrieve dynamically

  if (upiId) {
      const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${amount}&cu=INR`;
      document.getElementById("upiLink").href = upiLink;
      document.getElementById("upiInterface").style.display = "block";

      // Generate QR code using an online service
      const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(upiLink)}&chs=150x150`;
      document.getElementById("upiQrCode").src = qrCodeUrl;
  } else {
      alert("Please enter a valid UPI ID.");
  }
});

// Example form submission handler for card payments
document.getElementById("paymentForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const paymentMethod = document.getElementById("paymentMethod").value;

  if (paymentMethod === "card") {
      // Process the card payment here
      alert("Processing card payment...");
  } else if (paymentMethod === "upi") {
      // UPI payment is already initiated via the QR code/link
      alert("Please use the UPI link or QR code to complete your payment.");
  }
});
