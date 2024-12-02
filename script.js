let employeeId = 1; // Simulated employee ID
let vehiclePricing = {
  Cycle: { daily: 5, monthly: 100, yearly: 500 },
  MotorCycle: { daily: 10, monthly: 200, yearly: 1000 },
  FourWheeler: { daily: 20, monthly: 500, yearly: 3500 },
};

document.getElementById("fullName").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const name = this.value;
    if (name.length < 2 || /\d/.test(name)) {
      alert("Invalid name");
      return;
    }
    document.getElementById(
      "gender-label"
    ).innerText = `Hi ${name}! Can I know your gender?`;
    document.getElementById("gender-container").classList.remove("hidden");
    this.parentElement.classList.add("hidden");
  }
});

document.querySelectorAll('input[name="gender"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("email-container").classList.remove("hidden");
    document.getElementById("gender-container").classList.add("hidden");
  });
});

document.getElementById("email").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const email = this.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }
    document.getElementById("password-container").classList.remove("hidden");
    this.parentElement.classList.add("hidden");
  }
});

document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  const strength = checkPasswordStrength(password);
  this.className = strength;
});

document.getElementById("password").addEventListener("keypress", function (e) {
  const password = this.value;
  if (e.key === "Enter") {
    if (password.length < 8) {
      alert("Password must be of 8 characters");
      return;
    }
    document
      .getElementById("confirm-password-container")
      .classList.remove("hidden");
    this.parentElement.classList.add("hidden");
  }
});

document
  .getElementById("confirmPassword")
  .addEventListener("keypress", function (e) {
    const pass = document.getElementById("password");
    if (e.key === "Enter") {
      const confirmPassword = this.value;
      if (confirmPassword !== pass.value) {
        alert("Passwords do not match");
        return;
      }
      document.getElementById("contact-container").classList.remove("hidden");
      this.parentElement.classList.add("hidden");
    }
  });

document
  .getElementById("contactNumber")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const contactNumber = document.getElementById("contactNumber").value;
      const contactPattern = /^\d{9,}$/; // At least 9 digits
      if (!contactPattern.test(contactNumber)) {
        alert("Invalid contact number");
        return;
      }
      document.getElementById(
        "registration-id"
      ).innerText = `Registration ID: ${employeeId}`;
      document.getElementById("registration-id").classList.remove("hidden");
      document
        .getElementById("vehicle-registration")
        .classList.remove("hidden");
      this.parentElement.classList.add("hidden");
    }
  });

document
  .getElementById("vehicleName")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const vehicleName = this.value;
      if (vehicleName.length < 1) {
        alert("Vehicle name cannot be empty");
        return;
      }
      document
        .getElementById("vehicle-type-container")
        .classList.remove("hidden");
      this.parentElement.classList.add("hidden");
    }
  });

document.getElementById("vehicleType").addEventListener("change", function () {
  document
    .getElementById("vehicle-number-container")
    .classList.remove("hidden");
  document.getElementById("vehicle-type-container").classList.add("hidden");
});

document
  .getElementById("vehicleNumber")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const vehicleNumber = this.value;
      if (vehicleNumber.length < 1) {
        alert("Vehicle number cannot be empty");
        return;
      }
      document
        .getElementById("employee-id-container")
        .classList.remove("hidden");
      this.parentElement.classList.add("hidden");
    }
  });

document
  .getElementById("employeeId")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const employeeIdInput = this.value;
      if (employeeIdInput.length < 1) {
        alert("Employee ID cannot be empty");
        return;
      }
      document
        .getElementById("identification-container")
        .classList.remove("hidden");
      this.parentElement.classList.add("hidden");
    }
  });

document
  .getElementById("identification")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.getElementById("pass-selection").classList.remove("hidden");
      this.parentElement.classList.add("hidden");
      displayPassPricing();
    }
  });

document.getElementById("getPass").addEventListener("click", function () {
  const selectedVehicleType = document.getElementById("vehicleType").value;
  const pricing = vehiclePricing[selectedVehicleType];
  const passPrice = `Daily: ${pricing.daily} INR, Monthly: ${pricing.monthly} INR, Yearly: ${pricing.yearly} INR`;
  alert(`Pass Price: ${passPrice}`);
});

function checkPasswordStrength(password) {
  let strength = "normal";
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const lengthValid = password.length >= 8;

  if (hasUpper && hasLower && hasNumber && lengthValid) {
    strength = "strong";
  } else if (hasUpper || hasLower || hasNumber) {
    strength = "normal";
  } else {
    strength = "error";
  }

  return strength;
}

function displayPassPricing() {
  const vehicleType = document.getElementById("vehicleType").value;
  const pricing = vehiclePricing[vehicleType];
  const passPricingDiv = document.getElementById("pass-pricing");

  passPricingDiv.innerHTML = `
                <p>Daily Pass: ${pricing.daily} INR</p>
                <p>Monthly Pass: ${pricing.monthly} INR</p>
                <p>Yearly Pass: ${pricing.yearly} INR</p>
                
            `;

  document.getElementById("currency").addEventListener("change", function () {
    const selectedCurrency = this.value;
    let convertedPrices = convertPrices(pricing, selectedCurrency);
    const old_div = document.getElementById("old_pricing");
    if (old_div) {
      old_div.remove();
    }
    passPricingDiv.innerHTML = `
                    <div id="old_pricing">
                        <p>Daily Pass: ${convertedPrices.daily} ${selectedCurrency}</p>
                        <p>Monthly Pass: ${convertedPrices.monthly} ${selectedCurrency}</p>
                        <p>Yearly Pass: ${convertedPrices.yearly} ${selectedCurrency}</p>
                    </div>
                `;
  });
}

function convertPrices(pricing, currency) {
  const conversionRates = {
    INR: 1,
    USD: 0.012, // Example conversion rate
    YEN: 1.3, // Example conversion rate
  };

  return {
    daily: (pricing.daily * conversionRates[currency]).toFixed(2),
    monthly: (pricing.monthly * conversionRates[currency]).toFixed(2),
    yearly: (pricing.yearly * conversionRates[currency]).toFixed(2),
  };
}

document.getElementById('getPass').addEventListener('click', function () {
    document.getElementById('choose-plan').classList.remove('hidden');
});

document.getElementById('generateTicket').addEventListener('click', function () {
    const vehicleType = document.getElementById('vehicleType').value;
    const pricing = vehiclePricing[vehicleType];
    const selectedCurrency = document.getElementById('currency').value;
    const selectedPlan = document.getElementById('planSelection').value;

    // Get the price based on the selected plan
    let planPrice;
    switch (selectedPlan) {
        case 'daily':
            planPrice = convertPrices(pricing, selectedCurrency).daily;
            break;
        case 'monthly':
            planPrice = convertPrices(pricing, selectedCurrency).monthly;
            break;
        case 'yearly':
            planPrice = convertPrices(pricing, selectedCurrency).yearly;
            break;
    }

    const ticketDiv = document.getElementById('ticket');
    ticketDiv.innerHTML = `
        <h2>Your Ticket</h2>
        <p>Vehicle Type: ${vehicleType}</p>
        <p>Selected Plan: ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Pass</p>
        <p>Price: ${planPrice} ${selectedCurrency}</p>
    `;
    ticketDiv.classList.remove('hidden');
    document.getElementById('choose-plan').classList.add('hidden'); // Hide the plan selection after generating the ticket
});
