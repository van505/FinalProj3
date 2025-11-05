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
                <div class="avatar-circle" id="avatarCircle" role="button" tabindex="0" aria-label="Upload profile picture">
                  <img id="avatarImage" class="avatar-image" alt="Profile picture" />
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
                    <button type="button" id="downloadDataBtn" class="btn btn-secondary">Download Data</button>
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

    <input type="file" id="avatarInput" class="hidden-file-input" accept="image/*" />

    <div id="exportModal" class="profile-export-modal" aria-hidden="true">
      <div class="profile-export-card" role="dialog" aria-modal="true" aria-labelledby="exportModalTitle">
        <div class="modal-header">
          <h3 id="exportModalTitle" class="modal-title">Download My Data</h3>
          <button type="button" id="exportModalClose" class="modal-close" aria-label="Close">×</button>
        </div>
        <div class="modal-separator"></div>
        <div class="modal-body">
          <label for="exportFormat" class="form-label">Select Format</label>
          <select id="exportFormat" class="form-input">
            <option value="pdf">PDF</option>
            <option value="doc">Word (.doc)</option>
            <option value="xls">Excel (.csv)</option>
          </select>
        </div>
        <div class="modal-separator"></div>
        <div class="modal-footer">
          <button type="button" id="exportCancelBtn" class="btn btn-secondary">Cancel</button>
          <button type="button" id="exportConfirmBtn" class="btn btn-primary">Download</button>
        </div>
      </div>
    </div>

    
  `;

  // Ensure the export modal overlay is attached to document.body for reliable centering and stacking
  const exportOverlayEl = document.getElementById("exportModal");
  if (exportOverlayEl && exportOverlayEl.parentElement !== document.body) {
    document.body.appendChild(exportOverlayEl);
  }

  // Navigation
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

  // Auth
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: { Authorization: `Bearer ${token}` }
  });

  // State
  let currentUser = null;

  // Load user data
  async function loadProfileData() {
    try {
      const res = await api.get("/profile");
      const user = res.data;
      currentUser = user;
      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;
      document.getElementById("summaryName").textContent = user.name;
      document.getElementById("summaryEmail").textContent = user.email;
      document.getElementById("heroName").textContent = (user.name || "User").split(" ")[0];
      document.getElementById("heroDate").textContent = new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

      // Avatar
      const avatarImage = document.getElementById("avatarImage");
      const avatarCircle = document.getElementById("avatarCircle");
      const storedAvatar = localStorage.getItem("avatarUrl");
      let serverAvatar = user.avatar_url || user.avatar;
      if (serverAvatar && typeof serverAvatar === "string" && serverAvatar.startsWith("/")) {
        // normalize relative URL to absolute if API baseURL is set
        try { serverAvatar = new URL(serverAvatar, api.defaults.baseURL || window.location.origin).toString(); } catch (_) {}
      }
      const effectiveAvatar = serverAvatar || storedAvatar || null;
      if (effectiveAvatar) {
        avatarImage.src = effectiveAvatar;
        avatarImage.classList.add("visible");
        avatarCircle.classList.add("has-image");
        if (effectiveAvatar !== storedAvatar) {
          localStorage.setItem("avatarUrl", effectiveAvatar);
        }
      } else {
        avatarImage.removeAttribute("src");
        avatarImage.classList.remove("visible");
        avatarCircle.classList.remove("has-image");
      }
    } catch (err) {
      console.error(err);
      document.getElementById("profileMsg").textContent = "Failed to load profile.";
    }
  }
  loadProfileData();

  // Profile update
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

  // Password update
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

  // Export helpers
  function openExportModal() {
    const overlay = document.getElementById("exportModal");
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.add("open");
    document.getElementById("exportFormat").value = "pdf";
    document.body.classList.add("modal-open");
  }
  function closeExportModal() {
    const overlay = document.getElementById("exportModal");
    overlay.setAttribute("aria-hidden", "true");
    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
  function downloadBlob(filename, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  function toProfileDocHtml(user) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Profile</title></head><body>
      <h1>Profile</h1>
      <p><strong>Name:</strong> ${user.name || ''}</p>
      <p><strong>Email:</strong> ${user.email || ''}</p>
    </body></html>`;
  }
  function toActivityDocHtml(items) {
    const rows = items.map(a => `<tr><td>${a.date || a.created_at || ''}</td><td>${a.action || a.type || a.event || ''}</td><td>${a.details || a.description || ''}</td></tr>`).join("");
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Activity Log</title></head><body>
      <h1>Activity Log</h1>
      <table border="1" cellspacing="0" cellpadding="6"><thead><tr><th>Date</th><th>Action</th><th>Details</th></tr></thead><tbody>${rows}</tbody></table>
    </body></html>`;
  }
  function toProfileCsv(user) {
    return ["Field,Value", `Name,${JSON.stringify(user.name || '')}`, `Email,${JSON.stringify(user.email || '')}`].join("\n");
  }
  function toActivityCsv(items) {
    const header = "Date,Action,Details";
    const rows = items.map(a => [a.date || a.created_at || '', a.action || a.type || a.event || '', (a.details || a.description || '').toString().replace(/\n/g, ' ')].map(v => JSON.stringify(v)).join(","));
    return [header, ...rows].join("\n");
  }
  function openPrintWindow(html) {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  }

  // Download Data
  document.getElementById("downloadDataBtn").addEventListener("click", () => {
    openExportModal();
  });

  // Activity Log removed

  // Export modal events
  document.getElementById("exportModalClose").addEventListener("click", closeExportModal);
  document.getElementById("exportCancelBtn").addEventListener("click", closeExportModal);
  document.getElementById("exportConfirmBtn").addEventListener("click", () => {
    const format = document.getElementById("exportFormat").value; // pdf | doc | xls
    if (currentUser) {
      if (format === "doc") {
        const html = toProfileDocHtml(currentUser);
        const blob = new Blob([html], { type: "application/msword" });
        downloadBlob("profile.doc", blob);
      } else if (format === "xls") {
        const csv = toProfileCsv(currentUser);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        downloadBlob("profile.csv", blob);
      } else {
        const html = toProfileDocHtml(currentUser);
        openPrintWindow(html);
      }
    }
    closeExportModal();
  });

  // Avatar upload
  const avatarCircle = document.getElementById("avatarCircle");
  const avatarInput = document.getElementById("avatarInput");
  const avatarImage = document.getElementById("avatarImage");

  function triggerAvatarPicker() {
    avatarInput.click();
  }
  avatarCircle.addEventListener("click", triggerAvatarPicker);
  avatarCircle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerAvatarPicker();
    }
  });

  avatarInput.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const msg = document.getElementById("profileMsg");
    msg.textContent = "";
    const reader = new FileReader();
    reader.onload = () => {
      avatarImage.src = reader.result;
      avatarImage.classList.add("visible");
      avatarCircle.classList.add("has-image");
      try { localStorage.setItem("avatarUrl", reader.result); } catch (_) {}
    };
    reader.readAsDataURL(file);

    async function tryUpload(endpoint, fieldName) {
      const form = new FormData();
      form.append(fieldName, file);
      return api.post(endpoint, form, { headers: { "Content-Type": "multipart/form-data" } });
    }

    const attempts = [
      { endpoint: "/profile/avatar", field: "avatar" },
      { endpoint: "/profile/avatar/upload", field: "avatar" },
      { endpoint: "/user/avatar", field: "avatar" },
      { endpoint: "/user/avatar", field: "file" },
      { endpoint: "/user/photo", field: "photo" },
      { endpoint: "/users/avatar", field: "avatar" },
      { endpoint: "/profile/photo", field: "image" }
    ];

    let uploadedUrl = null;
    let lastError = null;
    for (const a of attempts) {
      try {
        const res = await tryUpload(a.endpoint, a.field);
        const url = (res && res.data && (res.data.avatar_url || res.data.url || res.data.path)) || null;
        if (url) {
          uploadedUrl = url;
          break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (uploadedUrl) {
      try {
        const abs = uploadedUrl.startsWith("http") ? uploadedUrl : new URL(uploadedUrl, api.defaults.baseURL || window.location.origin).toString();
        avatarImage.src = abs;
        localStorage.setItem("avatarUrl", abs);
      } catch (_) {
        avatarImage.src = uploadedUrl;
        localStorage.setItem("avatarUrl", uploadedUrl);
      }
      msg.textContent = "Profile picture updated.";
    } else {
      console.error("Avatar upload failed", lastError);
      msg.textContent = "Failed to upload profile picture.";
    }

    avatarInput.value = "";
  });

  // Logout
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