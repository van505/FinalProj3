import axios from "axios";


export function loadLogin(app, goRegister) {
  app.innerHTML = `
    <div class="login-page">
      <!-- Top header -->
      <header class="login-header">
        <div class="header-content">
          <img src="/images/logo.png" alt="EDUTrack logo" class="header-logo" />
          <div class="header-text">
            <h1 class="header-title">EDUTrack</h1>
            <p class="header-tagline">Lets you manage faculty and monitor student and more</p>
          </div>
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

      <!-- Footer -->
      <footer class="login-footer">
        <div class="footer-content">
          <div class="footer-links">
            <a href="#" class="footer-link">Calendar</a>
            <a href="#" class="footer-link">About us</a>
            <a href="#" class="footer-link">Contact Us</a>
          </div>
        </div>
      </footer>
      
      <!-- Login Status Overlay -->
      <div id="loginOverlay" class="login-overlay" aria-hidden="true">
        <div class="login-modal-card is-loading" role="dialog" aria-modal="true" aria-labelledby="loginOverlayTitle">
          <div class="modal-body">
            <!-- Loading state -->
            <div class="state state-loading">
              <div class="spinner" aria-hidden="true"></div>
              <h3 id="loginOverlayTitle" class="status-title">Loading...</h3>
              <p class="status-text">Please wait.</p>
            </div>
            <!-- Success state -->
            <div class="state state-success" aria-live="polite">
              <div class="icon-circle success">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="status-pill success">Successfully login!</div>
            </div>
            <!-- Error state -->
            <div class="state state-error" aria-live="assertive">
              <div class="icon-circle error">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <p id="loginErrorText" class="status-text">Error statement here</p>
              <div class="status-pill error">Failed to Login!</div>
              <a href="#" id="backToLogin" class="back-link">Go back to login form</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;


    const overlay = document.getElementById("loginOverlay");
    const overlayCard = overlay.querySelector('.login-modal-card');
    const errorTextEl = document.getElementById('loginErrorText');
    const loginBtn = document.querySelector('#loginForm .btn.btn-primary');
    const registerBtn = document.getElementById('goRegister');

    function setOverlayMode(mode, msg) {
      overlayCard.classList.remove('is-loading','is-success','is-error');
      overlayCard.classList.add(`is-${mode}`);
      if (mode === 'error' && msg) errorTextEl.textContent = msg;
    }
    function openOverlay(mode, msg) {
      setOverlayMode(mode, msg);
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
      document.body.classList.add('modal-open');
    }
    function closeOverlay() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      document.body.classList.remove('modal-open');
    }
    document.getElementById('backToLogin').addEventListener('click', (e)=>{
      e.preventDefault();
      closeOverlay();
      loginBtn.disabled = false;
      if (registerBtn) registerBtn.disabled = false;
    });

    // Close on clicking the dim background
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOverlay();
        loginBtn.disabled = false;
        if (registerBtn) registerBtn.disabled = false;
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeOverlay();
        loginBtn.disabled = false;
        if (registerBtn) registerBtn.disabled = false;
      }
    });

    // Ensure overlay sits at top level
    if (overlay.parentElement !== document.body) {
      document.body.appendChild(overlay);
    }

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        loginBtn.disabled = true;
        if (registerBtn) registerBtn.disabled = true;
        openOverlay('loading');

        try {
            const response = await axios.post("/api/login", { email, password });

            // Save token
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

            // Success state then redirect
            setOverlayMode('success');
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 900);

        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            const msg = err?.response?.data?.message || err?.message || "Invalid credentials!";
            openOverlay('error', msg);
        }
    });

    document.getElementById("goRegister").addEventListener("click", (e) => {
        e.preventDefault();
        goRegister(app, loadLogin);
    });
}
