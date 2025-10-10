import Chart from "chart.js/auto";
import { loadSystemSettings } from './SystemSettings';
import { loadProfile } from "./Profile.js";
import { loadStudents } from "./Students";

// ✅ Export function so app.js can call it
export function loadDashboard(app) {
    const sidebar = `
        <nav class="sidebar new-sidebar">
            <button class="new-item-btn">+ New Item</button>
            <ul class="sidebar-menu">
                <li><a href="#" class="active" data-page="overview"><span>Overview</span></a></li>
                <li><a href="#" id="menuStudents" data-page="students"><span>Students</span></a></li>
                <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
                <li><a href="#" data-page="archive"><span>Archive</span></a></li>
                <li><a href="#" data-page="report"><span>Report</span></a></li>
                <li><a href="#" id="menuProfile" data-page="profile"><span>Profile</span></a></li>
                <li><a href="#" data-page="settings"><span>System Settings</span></a></li>
            </ul>
        </nav>
    `;

    const dashboardContent = `
        <div class="main new-main">
            <header class="topbar new-topbar">
                <div class="topbar-left">
                    <h1 class="dashboard-title">DashBoard</h1>
                    <span class="system-settings">⚙️ System Settings</span>
                </div>
                <div class="topbar-center">
                    <input type="text" class="search-input" placeholder="Search">
                </div>
                <div class="topbar-right">
                    <span class="user">👤 Balbuena Ivan</span>
                    <button id="logoutBtn" class="logout-btn">Logout</button>
                </div>
            </header>

            <section class="overview-section">
                <h2 class="overview-title">Overview</h2>
                <p class="overview-desc">Stay informed with the latest updates across your campus</p>
                <div class="overview-cards">
                    <div class="overview-card">
                        <div class="card-icon">👥</div>
                        <div>
                            <div class="card-label">Student at service</div>
                            <div class="card-value">12,437</div>
                        </div>
                    </div>
                    <div class="overview-card">
                        <div class="card-icon">📚</div>
                        <div>
                            <div class="card-label">Course</div>
                            <div class="card-value">136</div>
                        </div>
                    </div>
                    <div class="overview-card">
                        <div class="card-icon">🏢</div>
                        <div>
                            <div class="card-label">Department</div>
                            <div class="card-value">9</div>
                        </div>
                    </div>
                    <div class="overview-card">
                        <div class="card-icon">📅</div>
                        <div>
                            <div class="card-label">Academic Year</div>
                            <div class="card-value">2024 - 2025</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="chart-section new-chart-section">
                <div class="chart-header">
                    <span class="chart-title">Total numbers of students per course</span>
                </div>
                <div class="chart-container">
                    <canvas id="barChart"></canvas>
                </div>
            </section>
        </div>
    `;

    // ✅ Render layout
    app.innerHTML = sidebar + dashboardContent;

    // ✅ Create chart
    const ctx = document.getElementById("barChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["CSP", "Criminology", "Engineering", "Arts & Science", "Nursing", "Accountancy"],
            datasets: [
                {
                    label: "Number of Students",
                    data: [4500, 2800, 800, 750, 650, 600],
                    backgroundColor: [
                        "#4B6BFB",
                        "#E74C3C",
                        "#F39C12",
                        "#27AE60",
                        "#8E44AD",
                        "#3498DB",
                    ],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: { beginAtZero: true },
            },
        },
    });

    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page === 'settings') {
                loadSystemSettings(app);
            }
        });
    });

    // ✅ Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    });

    // Add event listener for Profile menu
    const menuProfile = document.getElementById("menuProfile");
    if (menuProfile) {
        menuProfile.addEventListener("click", (e) => {
            e.preventDefault();
            const mainContent = document.querySelector(".main.new-main") || document.querySelector("#mainContent");
            const userId = localStorage.getItem("user_id");
            loadProfile(mainContent, userId);
        });
    }

    // Add event listener for Students menu
    const menuStudents = document.getElementById("menuStudents");
    if (menuStudents) {
        menuStudents.addEventListener("click", (e) => {
            e.preventDefault();
            const mainContent = document.querySelector(".main.new-main") || document.querySelector("#mainContent");
            loadStudents(mainContent);
        });
    }
}
