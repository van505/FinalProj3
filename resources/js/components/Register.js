import axios from "axios";
import { loadDashboard } from "./Dashboard";

export function loadRegister(app, goLogin) {
    app.innerHTML = `
      <div class="register-page">
        <div class="register-sidebar"></div>
        <div class="register-content">
          <div class="auth-card">
            <div class="auth-header">
              <h1>Sign up now</h1>
              <p>Be a User</p>
            </div>
            <form id="registerForm" class="auth-form">
              <div class="form-group">
                <input type="text" id="name" placeholder="Name" required>
              </div>
              <div class="form-group">
                <input type="email" id="email" placeholder="Email" required>
              </div>
              <div class="form-group">
                <input type="password" id="password" placeholder="Password" required>
              </div>
              <div class="form-group">
                <input type="password" id="password_confirmation" placeholder="Confirm Password" required>
              </div>
              <div class="form-group check">
                <label>
                  <input type="checkbox" id="is_admin"> Register as Admin
                </label>
              </div>
              <button type="submit" class="btn">Register</button>
            </form>
            <div class="switch-text">
              Already have an account? <a href="#" id="goLogin">Log In</a>
            </div>
            <div style="margin-top:10px;font-size:12px;color:#888;">
              By Creating an Account, it means you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    `;

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