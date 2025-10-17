import axios from "axios";


export function loadLogin(app, goRegister) {
  app.innerHTML = `
    <div class="login-page">
      <!-- Top header -->
      <header class="login-header">
        <div class="header-content">
          <img src="/images/logo.png" alt="EDUTrack logo" class="header-logo" />
          <h1 class="header-title">EDUTrack</h1>
        </div>
      </header>

      <div class="login-content">
        <div class="login-container">
          <!-- Left image -->
          <div class="login-side">
            <img src="/images/login-hero2.jpg" alt="Students" class="side-img" />
          </div>

          <!-- Login form -->
          <div class="login-form-container">
            <h2 class="login-title">Login</h2>
            <p class="login-sub">Manage students, faculty, and more</p>

            <form id="loginForm" class="login-form" autocomplete="on" novalidate>
              <div class="form-group">
                <label for="email" class="form-label">E-Mail</label>
                <input type="email" id="email" name="email" class="form-input" placeholder="you@example.com" required />
              </div>

              <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" name="password" class="form-input" placeholder="••••••••" required />
              </div>

              <div class="form-row form-aux">
                <div></div>
                <a href="#" id="forgotPassword" class="link-muted">Forgot password?</a>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>

              <div class="divider">or</div>

              <div class="form-actions">
                <button type="button" class="btn btn-ghost" id="goRegister">Register now</button>
              </div>
            </form>
          </div>
        </div>
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
