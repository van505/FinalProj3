import axios from "axios";
import { loadDashboard } from "./Dashboard";

export function loadRegister(app, goLogin) {
  app.innerHTML = `
    <div class="register-container">
      <div class="register-left">
        <header class="register-header">
          <img src="public/images/logo.png" alt="Logo" class="register-logo" />
          <h1 class="register-system-name">EDUTrack Students and Faculty Management System</h1>
        </header>

        <div class="register-card">
          <h2 class="register-title">Sign up now</h2>

          <form id="registerForm" class="register-form">
            <input type="text" id="name" placeholder="Name" required />
            <input type="email" id="email" placeholder="Email" required />
            <input type="password" id="password" placeholder="Password" required />
            <input type="password" id="password_confirmation" placeholder="Confirm Password" required />

            <label class="register-checkbox">
              <input type="checkbox" id="is_admin" /> Register as Admin
            </label>

            <button type="submit" class="register-btn">Register</button>
          </form>

          <p class="register-switch">
            Already have an account? <a href="#" id="goLogin">Log In</a>
          </p>

          <p class="register-terms">
            By Creating an Account, it means you agree to our
            <a href="#">Privacy Policy</a> and
            <a href="#">Terms of Service</a>
          </p>
        </div>
      </div>

      <div class="register-right"></div>
    </div>
  `;

  // --- Logic remains unchanged ---
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirmation = document.getElementById("password_confirmation").value;
    const is_admin = document.getElementById("is_admin").checked;

    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation,
        is_admin,
      });
      loadDashboard(app);
    } catch (err) {
      alert("Registration failed: " + err.response.data.message);
    }
  });

  document.getElementById("goLogin").addEventListener("click", (e) => {
    e.preventDefault();
    goLogin();
  });

  // --- Logic remains unchanged ---
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirmation = document.getElementById("password_confirmation").value;
    const is_admin = document.getElementById("is_admin").checked;

    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation,
        is_admin,
      });
      loadDashboard(app);
    } catch (err) {
      alert("Registration failed: " + err.response.data.message);
    }
  });

  document.getElementById("goLogin").addEventListener("click", (e) => {
    e.preventDefault();
    goLogin();
  });




  // --- Logic stays the same ---
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirmation = document.getElementById("password_confirmation").value;
    const is_admin = document.getElementById("is_admin").checked;

    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation,
        is_admin,
      });
      loadDashboard(app);
    } catch (err) {
      alert("Registration failed: " + err.response.data.message);
    }
  });

  document.getElementById("goLogin").addEventListener("click", (e) => {
    e.preventDefault();
    goLogin();
  });


    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const password_confirmation = document.getElementById("password_confirmation").value;
        const is_admin = document.getElementById("is_admin").checked;

        try {
            const response = await axios.post("/api/register", {
                name, email, password, password_confirmation, is_admin
            });

            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

            alert("Registration successful! Please log in.");
            goLogin(app, loadRegister);

        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Registration failed"));
        }
    });

    document.getElementById("goLogin").addEventListener("click", (e) => {
        e.preventDefault();
        goLogin(app, loadRegister);
    });
}