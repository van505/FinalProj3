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
              <h2 class="banner-title">Report Management </h2>
              <p class="banner-subtitle">can filter and download</p>
            </div>
          </section>

          <section class="filters-section">
            <div class="filters-container">
              <div class="filter-group">
                <select id="reportType" class="filter-select">
                  <option value="students">Students Report</option>
                  <option value="faculty">Faculty Report</option>
                  <option value="courses">Courses Report</option>
                  <option value="departments">Departments Report</option>
                  <option value="academic_years">Academic Years Report</option>
                  <option value="archives">Archives Report</option>
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

              <div class="filter-group">
                <select id="exportFormat" class="filter-select">
                  <option value="csv">Export as CSV</option>
                  <option value="pdf">Export as PDF</option>
                  <option value="excel">Export as Excel</option>
                  <option value="word">Export as Word</option>
                </select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              
              <div class="action-buttons">
                <button id="filterBtn" class="btn btn-clear">Clear Filters</button>
                <button id="exportBtn" class="btn btn-export">Export Report</button>
              </div>
            </div>
          </section>

          <section class="report-summary" id="reportSummary"></section>

          <section class="table-section">
            <div class="table-container">
              <table class="report-table">
                <thead>
                  <tr id="reportHeader">
                    <!-- Headers will be dynamically populated based on report type -->
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
  document.getElementById("courseSelect").addEventListener("change", fetchReport);
  document.getElementById("departmentSelect").addEventListener("change", fetchReport);
  document.getElementById("academicYearSelect").addEventListener("change", fetchReport);
  document.getElementById("exportBtn").addEventListener("click", exportReport);
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
    const header = document.getElementById("reportHeader");
    const summary = document.getElementById("reportSummary");

    tbody.innerHTML = `<tr><td colspan="4" class="no-data">Loading...</td></tr>`;

    try {
      let data = [];
      let headers = [];
      let summaryText = "";

      switch(type) {
        case 'students':
          headers = ['#', 'Student Name', 'Course', 'Academic Year', 'Status'];
          data = await fetchStudentsReport(course, department, year);
          summaryText = `Showing <strong>${data.length}</strong> students found.`;
          break;
        case 'faculty':
          headers = ['#', 'Faculty Name', 'Department', 'Academic Year', 'Status'];
          data = await fetchFacultyReport(course, department, year);
          summaryText = `Showing <strong>${data.length}</strong> faculty found.`;
          break;
        case 'courses':
          headers = ['#', 'Course Name', 'Department', 'Created Date', 'Status'];
          data = await fetchCoursesReport();
          summaryText = `Showing <strong>${data.length}</strong> courses found.`;
          break;
        case 'departments':
          headers = ['#', 'Department Name', 'Head', 'Created Date', 'Status'];
          data = await fetchDepartmentsReport();
          summaryText = `Showing <strong>${data.length}</strong> departments found.`;
          break;
        case 'academic_years':
          headers = ['#', 'Academic Year', 'Status', 'Created Date', 'Actions'];
          data = await fetchAcademicYearsReport();
          summaryText = `Showing <strong>${data.length}</strong> academic years found.`;
          break;
        case 'archives':
          headers = ['#', 'Type', 'Name/Title', 'Archived Date', 'Actions'];
          data = await fetchArchivesReport();
          summaryText = `Showing <strong>${data.length}</strong> archived items found.`;
          break;
      }

      // Update table headers
      header.innerHTML = headers.map(h => `<th>${h}</th>`).join('');

      if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="${headers.length}" class="no-data">No records found</td></tr>`;
        summary.textContent = "";
        return;
      }

      // Render table rows based on data type
      tbody.innerHTML = data.map((item, index) => {
        switch(type) {
          case 'students':
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${item.first_name || item.firstname} ${item.last_name || item.lastname}</td>
                <td>${item.course?.name || item.course?.course_name || 'N/A'}</td>
                <td>${item.academic_year?.year || item.academic_year?.academic_year || 'N/A'}</td>
                <td><span class="status-badge ${item.yearstatus === "active" ? "active" : "inactive"}">
                  ${item.yearstatus || "Active"}
                </span></td>
              </tr>
            `;
          case 'faculty':
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${item.first_name || item.firstname} ${item.last_name || item.lastname}</td>
                <td>${item.department?.name || item.department?.department_name || 'N/A'}</td>
                <td>${item.academic_year?.year || item.academic_year?.academic_year || 'N/A'}</td>
                <td><span class="status-badge ${item.yearstatus === "active" ? "active" : "inactive"}">
                  ${item.yearstatus || "Active"}
                </span></td>
              </tr>
            `;
          case 'courses':
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${item.name || item.course_name}</td>
                <td>${item.department?.name || item.department?.department_name || 'N/A'}</td>
                <td>${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
                <td><span class="status-badge active">Active</span></td>
              </tr>
            `;
          case 'departments':
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${item.name || item.department_name}</td>
                <td>${item.head || item.department_head || 'N/A'}</td>
                <td>${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
                <td><span class="status-badge active">Active</span></td>
              </tr>
            `;
          case 'academic_years':
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${item.year || item.academic_year}</td>
                <td><span class="status-badge ${item.is_active ? "active" : "inactive"}">
                  ${item.is_active ? "Active" : "Inactive"}
                </span></td>
                <td>${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button class="action-btn edit-btn" data-id="${item.id}">Edit</button>
                  <button class="action-btn archive-btn" data-id="${item.id}">Archive</button>
                </td>
              </tr>
            `;
          case 'archives':
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${item.type}</td>
                <td>${item.name}</td>
                <td>${item.archived_at ? new Date(item.archived_at).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button class="action-btn edit-btn" data-type="${item.group}" data-id="${item.id}">Restore</button>
                  <button class="action-btn archive-btn" data-type="${item.group}" data-id="${item.id}">Delete</button>
                </td>
              </tr>
            `;
          default:
            return '';
        }
      }).join('');

      summary.innerHTML = `<div class="summary-box">${summaryText}</div>`;

    } catch (err) {
      console.error("Error fetching report:", err);
      tbody.innerHTML = `<tr><td colspan="5" class="no-data">Error loading data</td></tr>`;
    }
  }

  // Individual fetch functions for each report type
  async function fetchStudentsReport(course, department, year) {
    // Try multiple possible endpoints
    let res = await fetch('/api/students');
    if (!res.ok) {
      res = await fetch('/api/reports/students');
    }
    if (!res.ok) {
      res = await fetch('/api/reports/student');
    }
    
    if (!res.ok) return [];
    
    let data = await res.json();
    
    // Apply client-side filtering
    if (course) {
      data = data.filter(s => s.course_id == course || s.course?.id == course);
    }
    if (department) {
      data = data.filter(s => s.department_id == department || s.department?.id == department);
    }
    if (year) {
      data = data.filter(s => s.academic_year_id == year || s.academic_year?.id == year);
    }
    
    return data;
  }

  async function fetchFacultyReport(course, department, year) {
    // Try multiple possible endpoints
    let res = await fetch('/api/faculties');
    if (!res.ok) {
      res = await fetch('/api/faculty');
    }
    if (!res.ok) {
      res = await fetch('/api/reports/faculty');
    }
    
    if (!res.ok) return [];
    
    let data = await res.json();
    
    // Apply client-side filtering
    if (course) {
      data = data.filter(f => f.course_id == course || f.course?.id == course);
    }
    if (department) {
      data = data.filter(f => f.department_id == department || f.department?.id == department);
    }
    if (year) {
      data = data.filter(f => f.academic_year_id == year || f.academic_year?.id == year);
    }
    
    return data;
  }

  async function fetchCoursesReport() {
    const res = await fetch('/api/courses');
    if (!res.ok) return [];
    
    let data = await res.json();
    const department = document.getElementById("departmentSelect").value;
    
    // Apply client-side filtering
    if (department) {
      data = data.filter(c => c.department_id == department || c.department?.id == department);
    }
    
    return data;
  }

  async function fetchDepartmentsReport() {
    const res = await fetch('/api/departments');
    if (!res.ok) return [];
    
    let data = await res.json();
    const course = document.getElementById("courseSelect").value;
    
    // Apply client-side filtering (if needed)
    // For departments, we might filter by courses that belong to them
    if (course) {
      // This would require a different approach - maybe fetch courses first
      const coursesRes = await fetch('/api/courses');
      if (coursesRes.ok) {
        const courses = await coursesRes.json();
        const targetCourse = courses.find(c => c.id == course);
        if (targetCourse) {
          data = data.filter(d => d.id == targetCourse.department_id);
        }
      }
    }
    
    return data;
  }

  async function fetchAcademicYearsReport() {
    const res = await fetch('/api/academic-years');
    if (!res.ok) return [];
    
    let data = await res.json();
    const year = document.getElementById("academicYearSelect").value;
    
    // Apply client-side filtering
    if (year) {
      data = data.filter(a => a.id == year);
    }
    
    return data;
  }

  async function fetchArchivesReport() {
    const res = await fetch('/api/archives');
    if (!res.ok) return [];
    const data = await res.json();
    const rows = [];
    (data.courses || []).forEach(c => rows.push({ group: 'course', type: 'Course', name: c.name, id: c.id, archived_at: c.archived_at }));
    (data.departments || []).forEach(d => rows.push({ group: 'department', type: 'Department', name: d.name, id: d.id, archived_at: d.archived_at }));
    (data.academic_years || []).forEach(a => rows.push({ group: 'academic_year', type: 'Academic Year', name: a.year || a.academic_year, id: a.id, archived_at: a.archived_at }));
    (data.faculties || []).forEach(f => rows.push({ group: 'faculty', type: 'Faculty', name: (f.first_name||f.firstname)+' '+(f.last_name||f.lastname), id: f.id, archived_at: f.archived_at }));
    (data.students || []).forEach(s => rows.push({ group: 'student', type: 'Student', name: (s.first_name||s.firstname)+' '+(s.last_name||s.lastname), id: s.id, archived_at: s.archived_at }));
    return rows;
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

  // Enhanced export functionality
  async function exportReport() {
    const format = document.getElementById("exportFormat").value;
    const type = document.getElementById("reportType").value;
    const course = document.getElementById("courseSelect").value;
    const department = document.getElementById("departmentSelect").value;
    const year = document.getElementById("academicYearSelect").value;

    try {
      let data = [];
      let headers = [];
      let title = "";

      // Get data based on report type
      switch(type) {
        case 'students':
          headers = ['#', 'Student Name', 'Course', 'Academic Year', 'Status'];
          data = await fetchStudentsReport(course, department, year);
          title = "Students Report";
          break;
        case 'faculty':
          headers = ['#', 'Faculty Name', 'Department', 'Academic Year', 'Status'];
          data = await fetchFacultyReport(course, department, year);
          title = "Faculty Report";
          break;
        case 'courses':
          headers = ['#', 'Course Name', 'Department', 'Created Date', 'Status'];
          data = await fetchCoursesReport();
          title = "Courses Report";
          break;
        case 'departments':
          headers = ['#', 'Department Name', 'Head', 'Created Date', 'Status'];
          data = await fetchDepartmentsReport();
          title = "Departments Report";
          break;
        case 'academic_years':
          headers = ['#', 'Academic Year', 'Status', 'Created Date', 'Actions'];
          data = await fetchAcademicYearsReport();
          title = "Academic Years Report";
          break;
        case 'archives':
          headers = ['#', 'Type', 'Name/Title', 'Archived Date', 'Actions'];
          data = await fetchArchivesReport();
          title = "Archives Report";
          break;
      }

      if (!data.length) {
        alert("No data to export!");
        return;
      }

      // Prepare data for export
      const exportData = data.map((item, index) => {
        switch(type) {
          case 'students':
            return [
              index + 1,
              `${item.first_name || item.firstname} ${item.last_name || item.lastname}`,
              item.course?.name || item.course?.course_name || 'N/A',
              item.academic_year?.year || item.academic_year?.academic_year || 'N/A',
              item.yearstatus || "Active"
            ];
          case 'faculty':
            return [
              index + 1,
              `${item.first_name || item.firstname} ${item.last_name || item.lastname}`,
              item.department?.name || item.department?.department_name || 'N/A',
              item.academic_year?.year || item.academic_year?.academic_year || 'N/A',
              item.yearstatus || "Active"
            ];
          case 'courses':
            return [
              index + 1,
              item.name || item.course_name,
              item.department?.name || item.department?.department_name || 'N/A',
              item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A',
              'Active'
            ];
          case 'departments':
            return [
              index + 1,
              item.name || item.department_name,
              item.head || item.department_head || 'N/A',
              item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A',
              'Active'
            ];
          case 'academic_years':
            return [
              index + 1,
              item.year || item.academic_year,
              item.is_active ? "Active" : "Inactive",
              item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A',
              'Available'
            ];
          case 'archives':
            return [
              index + 1,
              item.type,
              item.name,
              item.archived_at ? new Date(item.archived_at).toLocaleDateString() : 'N/A',
              'Available'
            ];
          default:
            return [];
        }
      });

      // Export based on format
      switch(format) {
        case 'csv':
          exportToCSV(headers, exportData, title);
          break;
        case 'pdf':
          await exportToPDF(headers, exportData, title);
          break;
        case 'excel':
          await exportToExcel(headers, exportData, title);
          break;
        case 'word':
          await exportToWord(headers, exportData, title);
          break;
      }

      // Success confirmation (global modal styles)
      alert('Successfully exported report!');

    } catch (err) {
      console.error("Error exporting report:", err);
      alert("Failed to export report. Please try again.");
    }
  }

  function exportToCSV(headers, data, title) {
    const csvContent = [
      headers.join(","),
      ...data.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${title}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function exportToPDF(headers, data, title) {
    // Create a simple HTML table and use browser's print to PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2563EB; text-align: center; }
            .date { color: #666; font-size: 12px; text-align: center; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #2563EB; color: white; font-weight: bold; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            @media print {
              body { margin: 0; }
              @page { margin: 1cm; }
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p class="date">Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                ${headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${row.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Open in new window and trigger print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  async function exportToExcel(headers, data, title) {
    // Create CSV format that Excel can open
    const csvContent = [
      headers.join(","),
      ...data.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${title}_${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function exportToWord(headers, data, title) {
    // Create HTML content for Word export
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2563EB; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #2563EB; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .date { color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p class="date">Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                ${headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${row.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${title}_${new Date().toISOString().split('T')[0]}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
