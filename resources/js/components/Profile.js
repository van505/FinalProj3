import { loadSystemSettings } from "./SystemSettings";
import { loadStudents } from "./Students";
import axios from "axios";

export function loadProfile(app) {
  app.innerHTML = `
    <div class="dashboard-container">
      <nav class="sidebar new-sidebar">
        <div class="sidebar-inner">
          <div class="sidebar-brand">
            <img src="/images/logo.png" alt="EDUTrack logo" class="sidebar-logo" />
            <div class="brand-title">EDUTrack</div>
          </div>

          <button class="new-item-btn">+ New Item</button>

          <ul class="sidebar-menu">
            <li><a href="#" data-page="overview"><span>Overview</span></a></li>
            <li><a href="#" data-page="students"><span>Students</span></a></li>
            <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
            <li><a href="#" id="menuReport" data-page="report"><span>Report</span></a></li>
            <li><a href="#" class="active" data-page="profile"><span>Profile</span></a></li>
            <li><a href="#" id="menuSettings" data-page="settings"><span>System Settings</span></a></li>
          </ul>
        </div>

        <div class="sidebar-footer">v1.0.0</div>
      </nav>

      <main class="main new-main profile-page">
        <header class="topbar new-topbar">
          <div class="topbar-left">
            <h1 class="dashboard-title">My Profile</h1>
          </div>
        </header>

        <section class="profile-hero" role="banner">
          <div class="hero-inner">
            <div class="hero-welcome">
              <div class="hero-title">Welcome, <span id="heroName">User</span></div>
              <div class="hero-sub" id="heroDate"></div>
            </div>
            <div class="hero-action">
              <button id="logoutBtn" class="btn btn-logout">Log out</button>
            </div>
          </div>
        </section>

        <section class="profile-main">
          <div class="profile-card summary-card">
            <div class="avatar-wrap">
              <div class="avatar">👤</div>
            </div>
            <div class="summary-info">
              <div class="summary-name" id="summaryName">Admin User</div>
              <div class="summary-email" id="summaryEmail">admin@example.com</div>
              <div class="summary-meta">
                <div class="meta-item">
                  <div class="meta-label">Role</div>
                  <div class="meta-value">Admin</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Status</div>
                  <div class="meta-value meta-active">Active</div>
                </div>
              </div>
            </div>
          </div>

          <div class="profile-forms">
            <div class="card form-card">
              <h3 class="card-title">Profile Information</h3>
              <form id="profileForm" class="form-grid" novalidate>
                <div class="field">
                  <label for="name">Full Name *</label>
                  <input type="text" id="name" class="input" required />
                </div>
                <div class="field">
                  <label for="email">Email Address *</label>
                  <input type="email" id="email" class="input" required />
                </div>
                <div class="form-actions">
                  <button type="button" class="btn btn-outline">Download Data</button>
                  <button type="button" class="btn btn-ghost">Activity Log</button>
                  <button type="submit" class="btn btn-primary">Update Profile</button>
                </div>
                <div id="profileMsg" class="form-message" aria-live="polite"></div>
              </form>
            </div>

            <div class="card form-card">
              <h3 class="card-title">Change Password</h3>
              <form id="passwordForm" class="form-grid" novalidate>
                <div class="field">
                  <label for="current_password">Current Password</label>
                  <input type="password" id="current_password" class="input" />
                </div>
                <div class="field">
                  <label for="new_password">New Password</label>
                  <input type="password" id="new_password" class="input" />
                </div>
                <div class="field">
                  <label for="confirm_password">Confirm New Password</label>
                  <input type="password" id="confirm_password" class="input" />
                </div>
                <div class="form-actions right">
                  <button type="submit" class="btn btn-primary">Update Password</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;

  // Navigation handlers (keep logic unchanged)
  document.getElementById("menuSettings").addEventListener("click", (e) => {
    e.preventDefault();
    loadSystemSettings(app);
  });
  document.querySelectorAll('.sidebar-menu a[data-page="students"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      loadStudents(app);
    });
  });

  // Token for auth requests — logic preserved
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: { Authorization: `Bearer ${token}` }
  });

  // Load user data
  async function loadProfileData() {
    try {
      const res = await api.get("/profile");
      const user = res.data;
      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;
      document.getElementById("summaryName").textContent = user.name;
      document.getElementById("summaryEmail").textContent = user.email;
      document.getElementById("heroName").textContent = (user.name || "User").split(" ")[0];
      document.getElementById("heroDate").textContent = new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    } catch (err) {
      console.error(err);
      document.getElementById("profileMsg").textContent = "Failed to load profile.";
    }
  }
  loadProfileData();

  // Update Profile (logic unchanged)
  document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const msg = document.getElementById("profileMsg");
    try {
      const res = await api.put("/profile/update", { name, email });
      msg.textContent = res.data.message;
      loadProfileData();
    } catch (err) {
      msg.textContent = "Error updating profile.";
      console.error(err);
    }
  });

  // Change Password (logic unchanged)
  document.getElementById("passwordForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const current_password = document.getElementById("current_password").value;
    const new_password = document.getElementById("new_password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const msg = document.getElementById("profileMsg");

    if (new_password !== confirm_password) {
      msg.textContent = "New passwords do not match.";
      return;
    }

    try {
      const res = await api.put("/profile/password", {
        current_password,
        new_password,
        new_password_confirmation: confirm_password
      });
      msg.textContent = res.data.message;
      document.getElementById("passwordForm").reset();
    } catch (err) {
      msg.textContent = "Error updating password. Check your current password.";
      console.error(err);
    }
  });

  // Logout (logic unchanged)
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed, clearing token anyway.");
    }
    localStorage.removeItem("token");
    window.location.href = "/";
  });
}
