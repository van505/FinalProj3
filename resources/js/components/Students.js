import axios from "axios";

export async function loadStudents(app) {
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
            New Student
          </button>

          <ul class="sidebar-menu">
            <li><a href="#" class="menu-item" data-page="overview">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg><span>Overview</span></a></li>

            <li><a href="#" class="menu-item active" data-page="students">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg><span>Students</span></a></li>

            <li><a href="#" class="menu-item" data-page="faculty">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg><span>Faculty</span></a></li>

            <li><a href="#" class="menu-item" data-page="report">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path>
              </svg><span>Report</span></a></li>

            <li><a href="#" class="menu-item" data-page="profile">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg><span>Profile</span></a></li>

            <li><a href="#" class="menu-item" data-page="settings">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 
                2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 
                1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 
                2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4 
                a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 
                2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 
                1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 
                2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9 
                a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 
                2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9 
                a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 
                2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 
                a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 
                2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9 
                a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 
                2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg><span>Settings</span></a></li>
          </ul>
        </div>

        <div class="sidebar-footer">
          <span class="version-text">v1.0.0</span>
        </div>
      </nav>

      <div class="main-content">
        <header class="top-header">
          <div class="header-left">
            <h1 class="page-title">Students</h1>
          </div>
          <div class="header-right">
            <div class="search-container">
              <input type="text" id="searchInput" class="search-input" placeholder="Search student...">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </header>

        <div class="content-area">
          <section class="filters-section">
            <div class="filters-container">
              <div class="filter-group">
                <select id="departmentFilter" class="filter-select"><option value="">All Departments</option></select>
              </div>
              <div class="filter-group">
                <select id="courseFilter" class="filter-select"><option value="">All Courses</option></select>
              </div>
              <div class="filter-group">
                <select id="academicYearFilter" class="filter-select"><option value="">All Academic Years</option></select>
              </div>
              <div class="action-buttons">
                <button id="clearFilterBtn" class="btn btn-clear">Clear</button>
                <button id="exportBtn" class="btn btn-export">Export CSV</button>
              </div>
            </div>
          </section>

          <section class="table-section">
            <div class="table-container">
              <table class="report-table">
                <thead>
                  <tr><th>Name</th><th>Course</th><th>Department</th><th>Academic Year</th><th>Status</th></tr>
                </thead>
                <tbody id="studentTableBody">
                  <tr><td colspan="5" class="no-data">Loading...</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

    let allStudents = [];
    let allDepartments = [];
    let allCourses = [];
    let allYears = [];

    async function loadOptions() {
        const [deptRes, courseRes, yearRes] = await Promise.all([
            axios.get("/api/departments"),
            axios.get("/api/courses"),
            axios.get("/api/academic-years"),
        ]);

        allDepartments = deptRes.data;
        allCourses = courseRes.data;
        allYears = yearRes.data;

        document.getElementById("departmentFilter").innerHTML =
            '<option value="">All Departments</option>' +
            allDepartments
                .map((d) => `<option value="${d.id}">${d.name}</option>`)
                .join("");

        document.getElementById("courseFilter").innerHTML =
            '<option value="">All Courses</option>' +
            allCourses
                .map((c) => `<option value="${c.id}">${c.name}</option>`)
                .join("");

        document.getElementById("academicYearFilter").innerHTML =
            '<option value="">All Academic Years</option>' +
            allYears
                .map((y) => `<option value="${y.id}">${y.year}</option>`)
                .join("");
    }

    async function fetchStudents() {
        const res = await axios.get("/api/students");
        allStudents = res.data;
        renderStudents();
    }

    function renderStudents() {
        const search = document
            .getElementById("searchInput")
            .value.toLowerCase();
        const dept = document.getElementById("departmentFilter").value;
        const course = document.getElementById("courseFilter").value;
        const year = document.getElementById("academicYearFilter").value;

        const tbody = document.getElementById("studentTableBody");
        const filtered = allStudents.filter(
            (s) =>
                (!dept || s.department_id == dept) &&
                (!course || s.course_id == course) &&
                (!year || s.academic_year_id == year) &&
                (!search || s.name.toLowerCase().includes(search))
        );

        if (!filtered.length) {
            tbody.innerHTML = `<tr><td colspan="5" class="no-data">No students found</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered
            .map(
                (s) => `
        <tr>
          <td>${s.name}</td>
          <td>${s.course_name || "N/A"}</td>
          <td>${s.department_name || "N/A"}</td>
          <td>${s.academic_year || "N/A"}</td>
          <td>${s.status || "Active"}</td>
        </tr>`
            )
            .join("");
    }

    // Event listeners
    document.addEventListener("input", (e) => {
        if (e.target.id === "searchInput") renderStudents();
    });
    document.addEventListener("change", (e) => {
        if (
            ["departmentFilter", "courseFilter", "academicYearFilter"].includes(
                e.target.id
            )
        )
            renderStudents();
    });
    document.getElementById("clearFilterBtn").addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        document.getElementById("departmentFilter").value = "";
        document.getElementById("courseFilter").value = "";
        document.getElementById("academicYearFilter").value = "";
        renderStudents();
    });

    await loadOptions();
    await fetchStudents();
}
