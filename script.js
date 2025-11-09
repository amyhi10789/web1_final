import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const auth = getAuth();

const loginBtn = document.getElementById("login-btn");
const userDropdown = document.getElementById("user-dropdown");
const logoutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, (user) => {
  if (!loginBtn || !userDropdown) return;

  if (user) {
    loginBtn.style.display = "none";
    userDropdown.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    userDropdown.style.display = "none";
  }
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await signOut(auth);
    localStorage.setItem("justLoggedOut", "true");
    window.location.href = "index.html";
  });
}

const loginToast = document.getElementById("login-toast");
const logoutToast = document.getElementById("logout-toast");

if (localStorage.getItem("justLoggedIn") === "true") {
  loginToast && (loginToast.style.display = "flex");
  localStorage.removeItem("justLoggedIn");
}

if (localStorage.getItem("justLoggedOut") === "true") {
  logoutToast && (logoutToast.style.display = "flex");
  localStorage.removeItem("justLoggedOut");
}

document.getElementById("toast-close")?.addEventListener("click", () => {
  loginToast.style.display = "none";
});

document.getElementById("toast-close-logout")?.addEventListener("click", () => {
  logoutToast.style.display = "none";
});

const userIcon = document.getElementById("user-icon");
const dropdownMenu = document.getElementById("dropdown-menu");

if (userIcon && dropdownMenu) {
  userIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  dropdownMenu.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
  });
}

const signupForm = document.getElementById("signup-form");
const popupOverlay = document.getElementById("signupPopup");
const popupClose = document.querySelector(".popup-close");

if (signupForm && popupOverlay) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    popupOverlay.style.display = "flex";

    const input = signupForm.querySelector("input[type='email']");
    if (input) input.value = "";
  });
}

popupClose?.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

popupOverlay?.addEventListener("click", (e) => {
  if (e.target === popupOverlay) popupOverlay.style.display = "none";
});
