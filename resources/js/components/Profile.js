import { loadSystemSettings } from "./SystemSettings";
import { loadStudents } from "./Students";
import axios from "axios";

export function loadProfile(app) {
    app.innerHTML = `
    <div class="dashboard-container">
      <nav class="sidebar">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <img src="/images/logo.png" alt="EDUTrack logo" class="sidebar-logo" />
            <h1 class="sidebar-title">EDUTrack</h1>
          </div>
          
          <button class="new-item-btn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Item
          </button>
          
          <ul class="sidebar-menu">
            <li>
              <a href="#" class="menu-item" data-page="overview">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Overview</span>
              </a>
            </li>
            <li>
              <a href="#" class="menu-item" data-page="students">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Students</span>
              </a>
            </li>
            <li>
              <a href="#" class="menu-item" data-page="faculty">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Faculty</span>
              </a>
            </li>
            <li>
              <a href="#" class="menu-item" id="menuReport" data-page="report">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
                <span>Report</span>
              </a>
            </li>
            <li>
              <a href="#" class="menu-item active" data-page="profile">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" class="menu-item" id="menuSettings" data-page="settings">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>System Settings</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div class="sidebar-footer">
          <span class="version-text">v1.0.0</span>
        </div>
      </nav>

      <div class="main-content">
        <header class="top-header">
          <div class="header-left">
            <h1 class="page-title">My Profile</h1>
          </div>
          <div class="header-right">
            <div class="search-container">
              <input type="text" class="search-input" placeholder="Search">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </header>

        <div class="content-area">
          <section class="welcome-banner">
            <div class="banner-content">
              <div class="welcome-text">
                <h2 class="welcome-title">Welcome, <span id="heroName">User</span></h2>
                <p class="welcome-date" id="heroDate"></p>
              </div>
              <div class="banner-actions">
                <button id="logoutBtn" class="logout-btn">Log out</button>
              </div>
            </div>
          </section>

          <section class="profile-content">
            <div class="profile-summary">
              <div class="profile-avatar">
                <div class="avatar-circle">
                  <svg class="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              <div class="profile-info">
                <h3 class="profile-name" id="summaryName">Admin User</h3>
                <p class="profile-email" id="summaryEmail">admin@gmail.com</p>
                <div class="profile-meta">
                  <div class="meta-item">
                    <span class="meta-label">Role:</span>
                    <span class="meta-value">Admin</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Status:</span>
                    <span class="meta-value status-active">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-forms">
              <div class="form-section">
                <h3 class="section-title">Profile Information</h3>
                <form id="profileForm" class="profile-form">
                  <div class="form-group">
                    <label for="name" class="form-label">Full Name*</label>
                    <input type="text" id="name" class="form-input" required />
                  </div>
                  <div class="form-group">
                    <label for="email" class="form-label">Email Address*</label>
                    <input type="email" id="email" class="form-input" required />
                  </div>
                  <div class="form-actions">
                    <button type="button" class="btn btn-secondary">Download Data</button>
                    <button type="button" class="btn btn-warning">Activity Log</button>
                    <button type="submit" class="btn btn-primary">Update Profile</button>
                  </div>
                  <div id="profileMsg" class="form-message" aria-live="polite"></div>
                </form>
              </div>

              <div class="form-section">
                <h3 class="section-title">Change Password</h3>
                <form id="passwordForm" class="password-form">
                  <div class="form-group">
                    <label for="current_password" class="form-label">Current Password:</label>
                    <input type="password" id="current_password" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label for="new_password" class="form-label">New Password:</label>
                    <input type="password" id="new_password" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label for="confirm_password" class="form-label">Confirm New Password:</label>
                    <input type="password" id="confirm_password" class="form-input" />
                  </div>
                  <div class="form-actions right">
                    <button type="submit" class="btn btn-primary">Update Password</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

    // Navigation handlers (keep logic unchanged)
    document.getElementById("menuSettings").addEventListener("click", (e) => {
        e.preventDefault();
        loadSystemSettings(app);
    });
    document
        .querySelectorAll('.sidebar-menu a[data-page="students"]')
        .forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                loadStudents(app);
            });
        });

    // Token for auth requests — logic preserved
    const token = localStorage.getItem("token");
    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: { Authorization: `Bearer ${token}` },
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
            document.getElementById("heroName").textContent = (
                user.name || "User"
            ).split(" ")[0];
            document.getElementById("heroDate").textContent =
                new Date().toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
        } catch (err) {
            console.error(err);
            document.getElementById("profileMsg").textContent =
                "Failed to load profile.";
        }
    }
    loadProfileData();

    // Update Profile (logic unchanged)
    document
        .getElementById("profileForm")
        .addEventListener("submit", async (e) => {
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
    document
        .getElementById("passwordForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const current_password =
                document.getElementById("current_password").value;
            const new_password = document.getElementById("new_password").value;
            const confirm_password =
                document.getElementById("confirm_password").value;
            const msg = document.getElementById("profileMsg");

            if (new_password !== confirm_password) {
                msg.textContent = "New passwords do not match.";
                return;
            }

            try {
                const res = await api.put("/profile/password", {
                    current_password,
                    new_password,
                    new_password_confirmation: confirm_password,
                });
                msg.textContent = res.data.message;
                document.getElementById("passwordForm").reset();
            } catch (err) {
                msg.textContent =
                    "Error updating password. Check your current password.";
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
