const btnCallback = document.getElementById("btn-callback");
const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const n = document.querySelector(".navigation");
const closeBtn = document.querySelector(".close");
const htmlBody = document.body;
const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const inputPhone = document.getElementById("input-number");
const nameError = document.querySelector(".name-error");
const phoneError = document.querySelector(".phone-error");
const emailError = document.querySelector(".email-error");
const failedError = document.querySelector(".failed");
const success = document.querySelector(".success");
const navAnchors = document.querySelector(".anchors");

navAnchors.addEventListener("click", function () {
  hamburgerMenu.classList.add("hidden");
  n.classList.remove("hidden");
  htmlBody.classList.remove("hide-of");
});

btnCallback.addEventListener("click", async function () {
  try {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const phone = inputPhone.value.trim();

    let isValid = true;

    if (!name) {
      nameError.classList.remove("hidden");
      isValid = false;
    } else if (!email) {
      emailError.classList.remove("hidden");
      isValid = false;
    } else if (!phone) {
      phoneError.classList.remove("hidden");
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      emailError.classList.remove("hidden");
      isValid = false;
    } else if (phone.length != 10) {
      phoneError.classList.remove("hidden");
      isValid = false;
    }

    if (isValid) {
      const response = await fetch("/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      });
      if (response.status == 200) {
        failedError.classList.add("hidden");
        success.classList.remove("hidden");
      }
    }
  } catch (error) {
    failedError.classList.remove("hidden");
    success.classList.add("hidden");
  }
});
hamburger.addEventListener("click", function () {
  hamburgerMenu.classList.remove("hidden");
  n.classList.add("hidden");
  htmlBody.classList.add("hide-of");
});
closeBtn.addEventListener("click", function () {
  hamburgerMenu.classList.add("hidden");
  n.classList.remove("hidden");
  htmlBody.classList.remove("hide-of");
});

// INPUT
