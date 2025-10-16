import Chart from "chart.js/auto";
import axios from "axios";
import { loadSystemSettings } from "./SystemSettings";
import { loadProfile } from "./Profile.js";
import { loadStudents } from "./Students.js";
import { loadFaculty } from "./Faculty.js";
import { loadReport } from "./Report.js";

export async function loadDashboard(app) {
    app.innerHTML = `
        <div class="dashboard-container">
            <nav class="sidebar new-sidebar">
                <button class="new-item-btn">+ New Item</button>
                <ul class="sidebar-menu">
                    <li><a href="#" class="active" data-page="overview"><span>Overview</span></a></li>
                    <li><a href="#" id="menuStudents" data-page="students"><span>Students</span></a></li>
                    <li><a href="#" id="menuFaculty" data-page="faculty"><span>Faculty</span></a></li>
                    <li><a href="#" id="menuReport" data-page="report"><span>Report</span></a></li>
                    <li><a href="#" id="menuProfile" data-page="profile"><span>Profile</span></a></li>
                    <li><a href="#" data-page="settings"><span>System Settings</span></a></li>
                </ul>
            </nav>

            <div class="main new-main">
                <header class="topbar new-topbar">
                    <div class="topbar-left">
                        <h1 class="dashboard-title">Dashboard Overview</h1>
                        <span class="system-settings">⚙️ Manage your system</span>
                    </div>
                    <div class="topbar-center">
                        <input type="text" class="search-input" placeholder="Search...">
                    </div>
                </header>

                <section class="overview-section">
                    <h2 class="overview-title">Key Metrics</h2>
                    <p class="overview-desc">A quick look at your institution's data</p>
                    <div class="overview-cards">
                        <div class="overview-card student-card">
                            <div class="card-icon">👨‍🎓</div>
                            <div>
                                <div class="card-label">Total Students</div>
                                <div class="card-value" id="studentCount">0</div>
                            </div>
                        </div>
                        <div class="overview-card faculty-card">
                            <div class="card-icon">👩‍🏫</div>
                            <div>
                                <div class="card-label">Total Faculty</div>
                                <div class="card-value" id="facultyCount">0</div>
                            </div>
                        </div>
                        <div class="overview-card course-card">
                            <div class="card-icon">📘</div>
                            <div>
                                <div class="card-label">Total Courses</div>
                                <div class="card-value" id="courseCount">0</div>
                            </div>
                        </div>
                        <div class="overview-card department-card">
                            <div class="card-icon">🏛️</div>
                            <div>
                                <div class="card-label">Total Departments</div>
                                <div class="card-value" id="departmentCount">0</div>
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

                <section class="recent-activity-section">
                    <h2>Recent Activity</h2>
                    <ul class="activity-list" id="recentActivity"></ul>
                </section>
            </div>
        </div>
    `;

    try {
        const [studentsRes, facultyRes, coursesRes, departmentsRes] = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/students"),
            axios.get("http://127.0.0.1:8000/api/faculty"),
            axios.get("http://127.0.0.1:8000/api/courses"),
            axios.get("http://127.0.0.1:8000/api/departments"),
        ]);

        const students = studentsRes.data;
        const faculty = facultyRes.data;
        const courses = coursesRes.data;
        const departments = departmentsRes.data;

        document.getElementById("studentCount").textContent = students.length;
        document.getElementById("facultyCount").textContent = faculty.length;
        document.getElementById("courseCount").textContent = courses.length;
        document.getElementById("departmentCount").textContent = departments.length;

        const courseCounts = {};
        students.forEach(s => {
            const course = s.course?.course_name || "Unassigned";
            courseCounts[course] = (courseCounts[course] || 0) + 1;
        });

        const deptCounts = {};
        faculty.forEach(f => {
            const dept = f.department?.department_name || "Unassigned";
            deptCounts[dept] = (deptCounts[dept] || 0) + 1;
        });

        renderChart("studentsChart", "Students per Course", courseCounts);
        renderChart("facultyChart", "Faculty per Department", deptCounts);

        // 🕒 Recent activity (latest 5 students and faculty)
        const recentActivity = [
            ...students.slice(-3).map(s => `👨‍🎓 New student added: ${s.name}`),
            ...faculty.slice(-3).map(f => `👩‍🏫 New faculty joined: ${f.name}`)
        ].reverse();

        const list = document.getElementById("recentActivity");
        list.innerHTML = recentActivity
            .map(item => `<li>${item}</li>`)
            .join("");

    } catch (error) {
        console.error("Error loading dashboard data:", error);
    }

    setupMenuListeners(app);
}

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
                    borderRadius: 8,
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

function setupMenuListeners(app) {
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');

            if (page === 'settings') loadSystemSettings(app);
        });
    });

    document.getElementById("menuProfile")?.addEventListener("click", (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user_id");
        loadProfile(app, userId);
    });

    document.getElementById("menuStudents")?.addEventListener("click", (e) => {
        e.preventDefault();
        loadStudents(app);
    });

    document.getElementById("menuFaculty")?.addEventListener("click", (e) => {
        e.preventDefault();
        loadFaculty(app);
    });

    document.getElementById("menuReport")?.addEventListener("click", (e) => {
        e.preventDefault();
        loadReport(app);
    });
}
