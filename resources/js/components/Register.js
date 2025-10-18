import axios from "axios";
import { loadDashboard } from "./Dashboard";

export function loadRegister(app, goLogin) {
  app.innerHTML = `
    <div class="register-container">
      <div class="register-left">
        <header class="register-header">
          <img src="/images/logo.png" alt="EDUTrack logo" class="register-logo" />
          <h1 class="register-system-name">EDUTrack Students and Faculty Management System</h1>
        </header>

        <div class="register-card">
          <h2 class="register-title">Sign up now</h2>

          <form id="registerForm" class="register-form">
            <div class="form-group">
              <input type="text" id="name" placeholder="Name" required />
            </div>
            
            <div class="form-group">
              <input type="email" id="email" placeholder="Email" required />
            </div>
            
            <div class="form-group password-group">
              <input type="password" id="password" placeholder="Password" required />
              <button type="button" class="password-toggle" id="passwordToggle">
                <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            
            <div class="form-group">
              <input type="password" id="password_confirmation" placeholder="Confirm Password" required />
            </div>

            <div class="checkbox-group">
              <label class="register-checkbox">
                <input type="checkbox" id="is_admin" />
                <span class="checkmark"></span>
                Register as Admin
              </label>
            </div>

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

      <div class="register-right">
        <div class="gradient-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
    </div>
  `;

  // Event listeners
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

  // Password toggle functionality
  document.getElementById("passwordToggle").addEventListener("click", (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.getElementById("passwordToggle");
    const eyeIcon = toggleBtn.querySelector('.eye-icon');
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    } else {
      passwordInput.type = "password";
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  });
}