import axios from "axios";


export function loadLogin(app, goRegister) {
    app.innerHTML = `
      <div class="form-container">
        <h2>Login</h2>
        <form id="loginForm">
          <input type="email" id="email" placeholder="Email" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
        <p>No account? <a href="#" id="goRegister">Register</a></p>
      </div>
    `;

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await axios.post("/api/login", { email, password });

            // ✅ Save token for later API use
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

            // ✅ Go to dashboard after successful login
            window.location.href = '/dashboard';

        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Invalid credentials!");
        }
    });

    document.getElementById("goRegister").addEventListener("click", (e) => {
        e.preventDefault();
        goRegister(app, loadLogin);
    });
}
