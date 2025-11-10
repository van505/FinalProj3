import Chart from "chart.js/auto";
import axios from "axios";
import { loadSystemSettings } from "./SystemSettings";
import { loadProfile } from "./Profile.js";
import { loadStudents } from "./Students.js";
import { loadFaculty } from "./Faculty.js";
import { loadReport } from "./Report.js";

export async function loadDashboard(app) {
    // UI changed to match the provided design (logic / IDs kept the same)
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
                            <a href="#" class="menu-item active" data-page="overview">
                                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <span>Overview</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="menu-item" id="menuStudents" data-page="students">
                                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Students</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="menu-item" id="menuFaculty" data-page="faculty">
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
                            <a href="#" class="menu-item" id="menuProfile" data-page="profile">
                                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="menu-item" data-page="settings">
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
                        <h1 class="page-title">DashBoard</h1>
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
                    <section class="overview-banner">
                        <div class="banner-content">
                            <h2 class="banner-title">Overview</h2>
                            <p class="banner-subtitle">Stay informed with the latest updates across your campus</p>
                        </div>
                    </section>

                    <section class="metrics-section">
                        <div class="metrics-grid">
                            <div class="metric-card student-card">
                                <div class="metric-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div class="metric-content">
                                    <div class="metric-label">Total student in campus</div>
                                    <div class="metric-value" id="studentCount">0</div>
                                </div>
                            </div>

                            <div class="metric-card faculty-card">
                                <div class="metric-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <div class="metric-content">
                                    <div class="metric-label">Total Faculty(employee)</div>
                                    <div class="metric-value" id="facultyCount">0</div>
                                </div>
                            </div>

                            <div class="metric-card course-card">
                                <div class="metric-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                </div>
                                <div class="metric-content">
                                    <div class="metric-label">Courses</div>
                                    <div class="metric-value" id="courseCount">0</div>
                                </div>
                            </div>

                            <div class="metric-card department-card">
                                <div class="metric-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 21h18"></path>
                                        <path d="M5 21V7l8-4v18"></path>
                                        <path d="M19 21V11l-6-4"></path>
                                    </svg>
                                </div>
                                <div class="metric-content">
                                    <div class="metric-label">Departments</div>
                                    <div class="metric-value" id="departmentCount">0</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="charts-section">
                        <div class="chart-container">
                            <h3 class="chart-title">Total numbers of students per course</h3>
                            <div class="chart-wrapper">
                                <canvas id="studentsChart"></canvas>
                            </div>
                        </div>

                        <div class="chart-container">
                            <h3 class="chart-title">Total numbers of faculty per department</h3>
                            <div class="chart-wrapper">
                                <canvas id="facultyChart"></canvas>
                            </div>
                        </div>
                    </section>

                    <section class="activity-section">
                        <div class="activity-container">
                            <h3 class="activity-title">Recent Activity</h3>
                            <ul class="activity-list" id="recentActivity"></ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `;

    // --- existing logic (unchanged) ---
    try {
        const [studentsRes, facultyRes, coursesRes, departmentsRes] = await Promise.all([
            axios.get("/api/students"),
            axios.get("/api/faculty"),
            axios.get("/api/courses"),
            axios.get("/api/departments"),
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
            const course = (s.course && (s.course.course_name || s.course.name)) || "Unassigned";
            courseCounts[course] = (courseCounts[course] || 0) + 1;
        });

        const deptCounts = {};
        faculty.forEach(f => {
            const dept = (f.department && (f.department.department_name || f.department.name)) || "Unassigned";
            deptCounts[dept] = (deptCounts[dept] || 0) + 1;
        });

        renderChart("studentsChart", "Students per Course", courseCounts);
        renderPieChart("facultyChart", deptCounts);

        const recentActivity = [
            ...students.slice(-3).map(s => `👨‍🎓 New student added: ${s.firstname || s.name || s.studID || "Student"}`),
            ...faculty.slice(-3).map(f => `👩‍🏫 New faculty joined: ${f.firstname || f.name || "Faculty"}`)
        ].reverse();

        const list = document.getElementById("recentActivity");
        list.innerHTML = recentActivity.map(item => `<li>${item}</li>`).join("");

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

function renderPieChart(canvasId, dataObj) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    const labels = Object.keys(dataObj);
    const values = Object.values(dataObj);
    const baseColors = [
        "#4B6BFB", "#22C55E", "#EAB308", "#F97316", "#EF4444",
        "#06B6D4", "#A855F7", "#84CC16", "#10B981", "#0EA5E9",
        "#F43F5E", "#14B8A6", "#8B5CF6", "#D946EF", "#F59E0B"
    ];
    const colors = labels.map((_, i) => baseColors[i % baseColors.length]);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: 10 },
            plugins: {
                legend: {
                    position: "right",
                    align: "center",
                    labels: {
                        boxWidth: 14,
                        boxHeight: 14,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 12
                    }
                }
            }
        }
    });
}

function setupMenuListeners(app) {
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');

            if (page === 'settings') loadSystemSettings(app);
            if (page === 'students') loadStudents(app);
            if (page === 'faculty') loadFaculty(app);
            if (page === 'report') loadReport(app);
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
