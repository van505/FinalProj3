import Chart from "chart.js/auto";
import axios from "axios";
import { loadSystemSettings } from "./SystemSettings";
import { loadProfile } from "./Profile.js";
import { loadStudents } from "./Students.js";
import { loadFaculty } from "./Faculty.js";
import { loadReport } from "./Report.js";

export async function loadDashboard(app) {
    const sidebar = `
        <nav class="sidebar new-sidebar">
            <button class="new-item-btn">+ New Item</button>
            <ul class="sidebar-menu">
                <li><a href="#" class="active" data-page="overview"><span>Overview</span></a></li>
                <li><a href="#" id="menuStudents" data-page="students"><span>Students</span></a></li>
                <li><a href="#" id="menuFaculty" data-page="faculty"><span>Faculty</span></a></li>
                <li><a href="#" data-page="archive"><span>Archive</span></a></li>
                <li><a href="#" id="menuReport" data-page="report"><span>Report</span></a></li>
                <li><a href="#" id="menuProfile" data-page="profile"><span>Profile</span></a></li>
                <li><a href="#" data-page="settings"><span>System Settings</span></a></li>
            </ul>
        </nav>
    `;

    // Dashboard Layout
    const dashboardContent = `
        <div class="main new-main">
            <header class="topbar new-topbar">
                <div class="topbar-left">
                    <h1 class="dashboard-title">Dashboard</h1>
                    <span class="system-settings">⚙️ System Settings</span>
                </div>
                <div class="topbar-center">
                    <input type="text" class="search-input" placeholder="Search">
                </div>
            </header>

            <section class="overview-section">
                <h2 class="overview-title">Overview</h2>
                <p class="overview-desc">Stay informed with the latest updates across your campus</p>
                <div class="overview-cards">
                    <div class="overview-card">
                        <div class="card-icon">👨‍🎓</div>
                        <div>
                            <div class="card-label">Total Students</div>
                            <div class="card-value" id="studentCount">0</div>
                        </div>
                    </div>
                    <div class="overview-card">
                        <div class="card-icon">👩‍🏫</div>
                        <div>
                            <div class="card-label">Total Faculty</div>
                            <div class="card-value" id="facultyCount">0</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="chart-section new-chart-section">
                <div class="chart-header">
                    <span class="chart-title">Students per Course</span>
                </div>
                <div class="chart-container">
                    <canvas id="studentsChart"></canvas>
                </div>
            </section>

            <section class="chart-section new-chart-section">
                <div class="chart-header">
                    <span class="chart-title">Faculty per Department</span>
                </div>
                <div class="chart-container">
                    <canvas id="facultyChart"></canvas>
                </div>
            </section>
        </div>
    `;

    app.innerHTML = sidebar + dashboardContent;

    // ✅ Fetch data from backend
    try {
        const [studentsRes, facultyRes] = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/students"),
            axios.get("http://127.0.0.1:8000/api/faculty")
        ]);

        const students = studentsRes.data;
        const faculty = facultyRes.data;

        // Update total counts
        document.getElementById("studentCount").textContent = students.length;
        document.getElementById("facultyCount").textContent = faculty.length;

        // ✅ Students per course
        const courseCounts = {};
        students.forEach(s => {
            const course = s.course?.course_name || "Unassigned";
            courseCounts[course] = (courseCounts[course] || 0) + 1;
        });

        // ✅ Faculty per department
        const deptCounts = {};
        faculty.forEach(f => {
            const dept = f.department?.department_name || "Unassigned";
            deptCounts[dept] = (deptCounts[dept] || 0) + 1;
        });

        // Render Charts
        renderChart("studentsChart", "Students per Course", courseCounts);
        renderChart("facultyChart", "Faculty per Department", deptCounts);

    } catch (error) {
        console.error("Error loading dashboard data:", error);
    }

    // ✅ Sidebar Navigation
    setupMenuListeners(app);
}

// ✅ Helper to draw chart
function renderChart(canvasId, label, dataObj) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(dataObj),
            datasets: [
                {
                    label,
                    data: Object.values(dataObj),
                    backgroundColor: "#4B6BFB",
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: { y: { beginAtZero: true } },
        },
    });
}

// ✅ Sidebar link handling
function setupMenuListeners(app) {
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');

            if (page === 'settings') loadSystemSettings(app);
        });
    });

    // Profile
    document.getElementById("menuProfile")?.addEventListener("click", (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user_id");
        loadProfile(app, userId);
    });

    // Students
    document.getElementById("menuStudents")?.addEventListener("click", (e) => {
        e.preventDefault();
        loadStudents(app);
    });

    // Faculty
    document.getElementById("menuFaculty")?.addEventListener("click", (e) => {
        e.preventDefault();
        loadFaculty(app);
    });

    // Report
    document.getElementById("menuReport")?.addEventListener("click", (e) => {
        e.preventDefault();
        loadReport(app);
    });
}
