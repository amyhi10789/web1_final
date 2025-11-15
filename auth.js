import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjAwCUUNJkwRN62bJ7Xi619SSG1mbU13A",
  authDomain: "mongacafe-7dd61.firebaseapp.com",
  projectId: "mongacafe-7dd61",
  storageBucket: "mongacafe-7dd61.appspot.com",
  messagingSenderId: "14116209385",
  appId: "1:14116209385:web:26959cf520a0748b986678",
  measurementId: "G-DZG8MM11KZ"
};

let app;
if (!window.__MONGA_APP__) {
  app = initializeApp(firebaseConfig);
  window.__MONGA_APP__ = app;
} else {
  app = window.__MONGA_APP__;
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const signinBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");
const googleBtn = document.getElementById("google-btn");
const authMsg = document.getElementById("auth-message");

if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, emailInput.value, passInput.value)
      .then(() => {
        localStorage.setItem("justLoggedIn", "true");
        window.location.href = "index.html";
      })
      .catch(err => authMsg.textContent = err.message);
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passInput.value)
      .then(() => {
        localStorage.setItem("justLoggedIn", "true");
        window.location.href = "index.html";
      })
      .catch(err => authMsg.textContent = err.message);
  });
}

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem("justLoggedIn", "true");
        window.location.href = "index.html";
      })
      .catch(err => authMsg.textContent = err.message);
  });
}

export { auth };
