export function loadReport(app) {
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
              <a href="#" class="menu-item active" id="menuReport" data-page="report">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
                <span>Report</span>
              </a>
            </li>
            <li>
              <a href="#" class="menu-item" data-page="profile">
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
            <h1 class="page-title">Report</h1>
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
          <section class="report-banner">
            <div class="banner-content">
              <h2 class="banner-title">Report</h2>
            </div>
          </section>

          <section class="filters-section">
            <div class="filters-container">
              <div class="filter-group">
                <select id="reportType" class="filter-select">
                  <option value="faculty">Faculty Report</option>
                  <option value="student">Student Report</option>
                </select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              
              <div class="filter-group">
                <select id="courseSelect" class="filter-select">
                  <option value="">All Courses</option>
                </select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              
              <div class="filter-group">
                <select id="departmentSelect" class="filter-select">
                  <option value="">All Departments</option>
                </select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              
              <div class="filter-group">
                <select id="academicYearSelect" class="filter-select">
                  <option value="">All Academic Years</option>
                </select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              
              <div class="action-buttons">
                <button id="filterBtn" class="btn btn-clear">Clear</button>
                <button id="exportBtn" class="btn btn-export">Export CSV</button>
              </div>
            </div>
          </section>

          <section class="report-summary" id="reportSummary"></section>

          <section class="table-section">
            <div class="table-container">
              <table class="report-table">
                <thead>
                  <tr id="reportHeader">
                    <th>Name</th>
                    <th>Course/Department</th>
                    <th>Academic Year</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="reportTableBody">
                  <tr><td colspan="4" class="no-data">Loading...</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="make-report-section">
            <div class="make-report-container">
              <h3 class="section-title">Make a report</h3>
              <form class="report-form">
                <div class="form-group">
                  <label for="reportTitle" class="form-label">Report Title</label>
                  <input type="text" id="reportTitle" class="form-input" placeholder="Report title..." />
                </div>
                
                <div class="form-group">
                  <label for="reportSubject" class="form-label">Choose Subject</label>
                  <select id="reportSubject" class="form-select">
                    <option value="">Choose Subject</option>
                    <option value="faculty">Faculty</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="reportContent" class="form-label">Report Content</label>
                  <textarea id="reportContent" class="form-textarea" placeholder="Write you report..."></textarea>
                </div>
                
                <div class="form-actions">
                  <button type="button" class="btn btn-send-report">Send Report</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  // --- Functionality (unchanged) ---
  fetchDropdowns();
  fetchReport();

  document.getElementById("filterBtn").addEventListener("click", fetchReport);
  document.getElementById("reportType").addEventListener("change", fetchReport);
  document.getElementById("exportBtn").addEventListener("click", exportToCSV);
  document.querySelector(".btn-send-report").addEventListener("click", sendReport);

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
