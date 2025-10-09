import axios from "axios";


export function loadLogin(app, goRegister) {
    app.innerHTML = `
      <div class="login-page">
        <div class="login-box">
          <h1>Login</h1>
          <p>Manage students, faculty, and more</p>
          <form id="loginForm">
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input type="email" id="email" placeholder="Placeholder content" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Placeholder content" required>
            </div>
            <div class="options">
              <span></span>
              <a href="#" id="forgotPassword">Forgot password?</a>
            </div>
            <button type="submit" class="btn">Login</button>
            <div class="divider">or</div>
            <button type="button" class="btn register-link" id="goRegister">Register now</button>
          </form>
        </div>
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
