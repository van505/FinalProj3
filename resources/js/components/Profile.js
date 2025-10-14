import { loadSystemSettings } from "./SystemSettings";
import { loadStudents } from "./Students";
import axios from "axios";

export function loadProfile(app) {
    app.innerHTML = `
        <nav class="sidebar new-sidebar">
            <button class="new-item-btn">+ New Item</button>
            <ul class="sidebar-menu">
                <li><a href="#" data-page="overview"><span>Overview</span></a></li>
                <li><a href="#" data-page="students"><span>Students</span></a></li>
                <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
                <li><a href="#" data-page="archive"><span>Archive</span></a></li>
                <li><a href="#" id="menuReport" data-page="report"><span>Report</span></a></li>
                <li><a href="#" class="active" data-page="profile"><span>Profile</span></a></li>
                <li><a href="#" id="menuSettings" data-page="settings"><span>System Settings</span></a></li>
            </ul>
        </nav>
        <div class="main new-main" style="background:#f8fafc;min-height:100vh;">
            <header class="topbar new-topbar">
                <div class="topbar-left">
                    <h1 class="dashboard-title">My Profile</h1>
                </div>
            </header>
            <section style="display:flex;gap:2rem;align-items:flex-start;justify-content:flex-start;margin-top:2rem;">
                <div style="background:#fff;padding:2rem 2.5rem;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.07);flex:2;">
                    <h3 style="margin-bottom:1.5rem;">Profile Information</h3>
                    <form id="profileForm" style="display:flex;gap:2rem;flex-wrap:wrap;">
                        <div style="flex:1;min-width:220px;">
                            <label>Full Name *</label>
                            <input type="text" id="name" class="input" required style="width:100%;margin-bottom:1rem;">
                        </div>
                        <div style="flex:1;min-width:220px;">
                            <label>Email Address *</label>
                            <input type="email" id="email" class="input" required style="width:100%;margin-bottom:1rem;">
                        </div>
                        <button type="submit" class="btn btn-blue" style="height:40px;align-self:flex-end;">Update Profile</button>
                    </form>
                    <hr style="margin:2rem 0;">
                    <h3>Change Password</h3>
                    <form id="passwordForm" style="display:flex;gap:1rem;flex-wrap:wrap;">
                        <div style="flex:1;min-width:180px;">
                            <label>Current Password</label>
                            <input type="password" id="current_password" class="input" style="width:100%;">
                        </div>
                        <div style="flex:1;min-width:180px;">
                            <label>New Password</label>
                            <input type="password" id="new_password" class="input" style="width:100%;">
                        </div>
                        <div style="flex:1;min-width:180px;">
                            <label>Confirm New Password</label>
                            <input type="password" id="confirm_password" class="input" style="width:100%;">
                        </div>
                        <button type="submit" class="btn btn-blue" style="height:40px;align-self:flex-end;">Update Password</button>
                    </form>
                    <div id="profileMsg" style="margin-top:1rem;"></div>
                </div>
                <div style="flex:1;min-width:260px;display:flex;flex-direction:column;gap:1.5rem;">
                    <div style="background:#fff;padding:1.5rem;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.07);text-align:center;">
                        <div style="font-size:3rem;margin-bottom:0.5rem;"><span style="background:#e5e7eb;border-radius:50%;padding:0.5rem 1.2rem;">👤</span></div>
                        <div style="font-weight:600;font-size:1.1rem;" id="summaryName"></div>
                        <div style="color:#6b7280;" id="summaryEmail"></div>
                        <div style="margin-top:1rem;display:flex;justify-content:center;gap:1.5rem;">
                            <div>
                                <div style="font-size:0.9rem;color:#888;">Role</div>
                                <div style="font-weight:500;">Admin</div>
                            </div>
                            <div>
                                <div style="font-size:0.9rem;color:#888;">Status</div>
                                <div style="font-weight:500;color:#22c55e;">Active</div>
                            </div>
                        </div>
                    </div>
                    <div style="background:#fff;padding:1.5rem;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
                        <div style="font-weight:600;color:#3b82f6;margin-bottom:0.5rem;">Quick Actions</div>
                        <button class="btn btn-outline" style="width:100%;margin-bottom:0.5rem;">Download Data</button>
                        <button class="btn btn-outline" style="width:100%;margin-bottom:0.5rem;">Activity Log</button>
                        <button class="btn btn-outline" style="width:100%;" id="logoutBtn">Logout</button>
                    </div>
                </div>
            </section>
        </div>
    `;

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

    // Token for auth requests
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
        } catch (err) {
            console.error(err);
            document.getElementById("profileMsg").textContent = "Failed to load profile.";
        }
    }
    loadProfileData();

    // Update Profile
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

    // Change Password
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
