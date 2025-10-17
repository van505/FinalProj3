export function loadReport(app) {
  app.innerHTML = `
  <div class="dashboard-container">
    <nav class="sidebar new-sidebar">
      <div class="sidebar-inner">
        <div class="sidebar-brand">
          <img src="/images/logo.png" alt="logo" class="sidebar-logo" />
          <div class="brand-title">EDUTrack</div>
        </div>

        <button class="new-item-btn">+ New Item</button>

        <ul class="sidebar-menu">
          <li><a href="#" data-page="overview"><span>Overview</span></a></li>
          <li><a href="#" data-page="students"><span>Students</span></a></li>
          <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
          <li><a href="#" id="menuReport" class="active" data-page="report"><span>Report</span></a></li>
          <li><a href="#" data-page="profile"><span>Profile</span></a></li>
          <li><a href="#" data-page="settings"><span>System Settings</span></a></li>
        </ul>
      </div>

      <div class="sidebar-footer">v1.0.0</div>
    </nav>

    <div class="main new-main">
      <header class="topbar new-topbar">
        <div class="topbar-left">
          <h1 class="dashboard-title">Reports</h1>
        </div>
      </header>

      <section class="report-container">
        <h2 class="report-title">📊 Reports Overview</h2>

        <!-- Filters -->
        <div class="report-filters">
          <select id="reportType">
            <option value="faculty">Faculty Report</option>
            <option value="student">Student Report</option>
          </select>
          <select id="courseSelect"><option value="">All Courses</option></select>
          <select id="departmentSelect"><option value="">All Departments</option></select>
          <select id="academicYearSelect"><option value="">All Academic Years</option></select>
          <button id="filterBtn" class="btn-primary">Filter</button>
          <button id="exportBtn" class="btn-secondary">⬇️ Export CSV</button>
        </div>

        <div class="report-summary" id="reportSummary"></div>

        <div class="table-wrapper">
          <table class="report-table">
            <thead>
              <tr id="reportHeader">
                <th>Name</th>
                <th>Course / Department</th>
                <th>Academic Year</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="reportTableBody">
              <tr><td colspan="4" class="no-data">Loading...</td></tr>
            </tbody>
          </table>
        </div>

        <!-- Manual Report Section -->
        <div class="make-report">
          <h3>📝 Make a Report</h3>
          <input type="text" id="reportTitle" placeholder="Report title..." />
          <select id="reportSubject">
            <option value="">Choose Subject</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
          <textarea id="reportContent" placeholder="Write your report..."></textarea>
          <button class="send-report-btn">Send Report</button>
        </div>
      </section>
    </div>
  </div>
  `;

  // --- Functionality (unchanged) ---
  fetchDropdowns();
  fetchReport();

  document.getElementById("filterBtn").addEventListener("click", fetchReport);
  document.getElementById("reportType").addEventListener("change", fetchReport);
  document.getElementById("exportBtn").addEventListener("click", exportToCSV);
  document.querySelector(".send-report-btn").addEventListener("click", sendReport);

  async function fetchDropdowns() {
    try {
      const [courseRes, deptRes, yearRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/departments"),
        fetch("/api/academic-years")
      ]);
      const [courses, departments, years] = await Promise.all([
        courseRes.json(),
        deptRes.json(),
        yearRes.json()
      ]);

      const courseSelect = document.getElementById("courseSelect");
      const deptSelect = document.getElementById("departmentSelect");
      const yearSelect = document.getElementById("academicYearSelect");

      courses.forEach(c => {
        courseSelect.innerHTML += `<option value="${c.id}">${c.name || c.course_name}</option>`;
      });
      departments.forEach(d => {
        deptSelect.innerHTML += `<option value="${d.id}">${d.name || d.department_name}</option>`;
      });
      years.forEach(y => {
        yearSelect.innerHTML += `<option value="${y.id}">${y.year || y.academic_year}</option>`;
      });
    } catch (err) {
      console.error("Error loading dropdowns:", err);
    }
  }

  async function fetchReport() {
    const type = document.getElementById("reportType").value;
    const course = document.getElementById("courseSelect").value;
    const department = document.getElementById("departmentSelect").value;
    const year = document.getElementById("academicYearSelect").value;
    const tbody = document.getElementById("reportTableBody");
    const summary = document.getElementById("reportSummary");

    tbody.innerHTML = `<tr><td colspan="4" class="no-data">Loading...</td></tr>`;

    try {
      const params = new URLSearchParams({
        course_id: course,
        department_id: department,
        academic_year_id: year
      });
      const res = await fetch(`/api/reports/${type}?${params}`);
      const data = await res.json();

      if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="4" class="no-data">No records found</td></tr>`;
        summary.textContent = "";
        return;
      }

      tbody.innerHTML = data
        .map(item => `
          <tr>
            <td>${item.first_name || item.firstname} ${item.last_name || item.lastname}</td>
            <td>${type === "student" ? item.course?.course_name || "N/A" : item.department?.department_name || "N/A"}</td>
            <td>${item.academic_year?.year || "N/A"}</td>
            <td><span class="status-badge ${item.yearstatus === "active" ? "active" : "inactive"}">
              ${item.yearstatus || "Active"}
            </span></td>
          </tr>
        `).join("");

      summary.innerHTML = `
        <div class="summary-box">
          Showing <strong>${data.length}</strong> ${type === "student" ? "students" : "faculty"} found.
        </div>
      `;
    } catch (err) {
      console.error("Error fetching report:", err);
      tbody.innerHTML = `<tr><td colspan="4" class="no-data">Error loading data</td></tr>`;
    }
  }

  async function sendReport() {
    const title = document.getElementById("reportTitle").value.trim();
    const subject = document.getElementById("reportSubject").value;
    const content = document.getElementById("reportContent").value.trim();

    if (!title || !subject || !content) {
      alert("Please fill in all fields before sending.");
      return;
    }

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subject, content })
      });

      if (!res.ok) throw new Error("Failed to send report");
      alert("✅ Report sent successfully!");

      document.getElementById("reportTitle").value = "";
      document.getElementById("reportSubject").value = "";
      document.getElementById("reportContent").value = "";
    } catch (err) {
      console.error("Error sending report:", err);
      alert("❌ Failed to send report. Please try again.");
    }
  }

  function exportToCSV() {
    const rows = Array.from(document.querySelectorAll("#reportTableBody tr"))
      .map(tr => Array.from(tr.children).map(td => td.textContent));
    if (!rows.length || rows[0][0] === "No records found") {
      alert("No data to export!");
      return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "report.csv";
    link.click();
  }
}
