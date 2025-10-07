import Chart from "chart.js/auto";

// ✅ Export function so app.js can call it
export function loadDashboard(app) {
    const sidebar = `
        <div class="sidebar">
            <h2>Home</h2>
            <ul>
                <li><a href="#">Overview</a></li>
                <li><a href="#">Students</a></li>
                <li><a href="#">Faculty</a></li>
                <li><a href="#">Archive</a></li>
                <li><a href="#">Report</a></li>
                <li><a href="#">Profile</a></li>
            </ul>
        </div>
    `;

    const dashboardContent = `
        <div class="main">
            <div class="topbar">
                <h1>Dashboard</h1>
                <div class="search">
                    <input type="text" placeholder="Search">
                </div>
                <div class="user">👤 Balbuena Ivan</div>
                <button id="logoutBtn" class="logout-btn">Logout</button>
            </div>

            <div class="overview">
                <div class="card">
                    <h3>Total Students</h3>
                    <p>12,437</p>
                </div>
                <div class="card">
                    <h3>Courses</h3>
                    <p>136</p>
                </div>
                <div class="card">
                    <h3>Departments</h3>
                    <p>9</p>
                </div>
                <div class="card">
                    <h3>Academic Year</h3>
                    <p>2024 - 2025</p>
                </div>
            </div>

            <div class="chart-section">
                <h2>Total Number of Students per Course</h2>
                <canvas id="barChart"></canvas>
            </div>
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

    // ✅ Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    });
}
