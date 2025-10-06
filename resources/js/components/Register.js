import axios from "axios";
import { loadDashboard } from "./Dashboard"; // make sure you have this

export function loadRegister(app, goLogin) {
    app.innerHTML = `
      <div class="form-container">
        <h2>Register</h2>
        <form id="registerForm">
          <input type="text" id="name" placeholder="Name" required>
          <input type="email" id="email" placeholder="Email" required>
          <input type="password" id="password" placeholder="Password" required>
          <input type="password" id="password_confirmation" placeholder="Confirm Password" required>
          <label>
            <input type="checkbox" id="is_admin"> Register as Admin
          </label>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="#" id="goLogin">Login</a></p>
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

            // Save token
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

           // Instead of auto-login, go back to login form
            alert("Registration successful! Please log in.");
            goLogin(app, loadRegister);   // 🔥 this loads the login page

        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Registration failed"));
        }
    });

    document.getElementById("goLogin").addEventListener("click", (e) => {
        e.preventDefault();
        goLogin(app, loadRegister);
    });
}
