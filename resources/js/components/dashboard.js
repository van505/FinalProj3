import Chart from "chart.js/auto";

export function loadDashboard(app) {
    app.innerHTML = `
      <div class="dashboard">
        <aside class="sidebar">
          <h2>Home</h2>
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Students</a></li>
            <li><a href="#">Faculty</a></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">Report</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </aside>

        <main class="main-content">
          <header class="topbar">
            <h1>Dashboard</h1>
            <div class="search-box">
              <input type="text" placeholder="Search" />
            </div>
            <div class="user-info">
              <span>👤 Balbuena Ivan</span>
            </div>
          </header>

          <section class="overview">
            <h2>Overview</h2>
            <p>Stay informed with the latest updates across your campus</p>
            <div class="stats">
              <div class="card"><h3>👨‍🎓 12,437</h3><p>Total Students</p></div>
              <div class="card"><h3>📚 136</h3><p>Courses</p></div>
              <div class="card"><h3>🏫 9</h3><p>Departments</p></div>
              <div class="card"><h3>📅 2024–2025</h3><p>Academic Year</p></div>
            </div>
          </section>

          <section class="chart-section">
            <h3>Total number of students per course</h3>
            <canvas id="studentChart" height="120"></canvas>
          </section>
        </main>
      </div>
    `;

    // Bar Chart Example
    const ctx = document.getElementById("studentChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["CSP", "Criminology", "Engineering", "Art & Science", "Nursing", "Accountancy"],
            datasets: [{
                label: "Students",
                data: [4567, 2345, 1345, 2300, 1200, 1500],
                backgroundColor: [
                    "#3b82f6", "#ef4444", "#f97316", "#22c55e", "#a855f7", "#facc15"
                ],
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
