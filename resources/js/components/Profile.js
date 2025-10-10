import { loadSystemSettings } from "./SystemSettings";
import { loadStudents } from "./Students";

export function loadProfile(app) {
    app.innerHTML = `
        <nav class="sidebar new-sidebar">
            <button class="new-item-btn">+ New Item</button>
            <ul class="sidebar-menu">
                <li><a href="#" data-page="overview"><span>Overview</span></a></li>
                <li><a href="#" id="menuStudents" data-page="students"><span>Students</span></a></li>
                <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
                <li><a href="#" data-page="archive"><span>Archive</span></a></li>
                <li><a href="#" data-page="report"><span>Report</span></a></li>
                <li><a href="#" class="active" data-page="profile"><span>Profile</span></a></li>
                <li><a href="#" id="menuSettings" data-page="settings"><span>System Settings</span></a></li>
            </ul>
        </nav>

        <div class="main new-main">
            <header class="topbar new-topbar">
                <div class="topbar-left">
                    <h1 class="dashboard-title">DashBoard</h1>
                    <span class="system-settings">Profile</span>
                </div>
                <div class="topbar-right">
                    <button id="logoutBtn" class="logout-btn">Logout</button>
                </div>
            </header>

            <section style="display:flex;justify-content:center;align-items:center;min-height:60vh;">
                <div style="background:#fff;padding:2rem 2.5rem;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.07);width:100%;max-width:400px;">
                    <h2 style="text-align:center;margin-bottom:1.5rem;">Profile</h2>
                    <form id="updateProfileForm" style="display:flex;flex-direction:column;gap:1rem;">
                        <input type="text" id="name" placeholder="Full Name" required />
                        <input type="email" id="email" placeholder="Email" required />
                        <button type="submit" class="btn btn-blue" style="margin-top:1rem;">Update Profile</button>
                    </form>
                    <p id="message" style="margin-top:1rem;text-align:center;"></p>
                </div>
            </section>
        </div>
    `;

    // Sidebar menu click handlers
    document.getElementById("menuSettings").addEventListener("click", (e) => {
        e.preventDefault();
        loadSystemSettings(app);
    });
    document.getElementById("menuStudents").addEventListener("click", (e) => {
        e.preventDefault();
        loadStudents(app);
    });

    // Load user info
    const userId = localStorage.getItem("user_id") || 1;
    async function loadProfileData() {
        const res = await fetch(`/api/profile/${userId}`);
        if (res.ok) {
            const user = await res.json();
            document.getElementById("name").value = user.name || "";
            document.getElementById("email").value = user.email || "";
        }
    }
    loadProfileData();

    // Update Profile
    document.getElementById("updateProfileForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const res = await fetch(`/api/profile/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });
        const msg = document.getElementById("message");
        msg.textContent = res.ok ? "Profile updated!" : "Failed to update profile.";
        if (res.ok) loadProfileData();
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    });
}
