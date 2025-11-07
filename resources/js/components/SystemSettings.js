export function loadSystemSettings(app) {
  app.innerHTML = `
    <div class="dashboard-container">
      <nav class="sidebar">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <img src="/images/logo.png" alt="EDUTrack logo" class="sidebar-logo" />
            <h1 class="sidebar-title">EDUTrack</h1>
          </div>

          <button class="new-item-btn" id="addCourseBtn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Course
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
              <a href="#" class="menu-item" data-page="profile">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" class="menu-item active" data-page="settings">
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
            <h1 class="page-title">System Settings</h1>
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
          <section class="system-settings-banner">
            <div class="banner-content">
              <div class="banner-header">
                <svg class="banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <div class="banner-text">
                  <h2 class="banner-title">System Settings</h2>
                  <p class="banner-subtitle">Manage Courses, Departments, Academic Years, and Archives</p>
                </div>
              </div>
            </div>
          </section>
        

          <section class="filters-section">
            <div class="filters-container" id="filtersContainer">
              <!-- Filters will be dynamically populated based on active tab -->
            </div>
        </section>

          <section class="tabs-section">
            <div class="tabs-container">
              <button class="tab-btn active" data-tab="courses">Courses</button>
              <button class="tab-btn" data-tab="departments">Departments</button>
              <button class="tab-btn" data-tab="academic">Academic Years</button>
              <button class="tab-btn" data-tab="archives">Archives</button>
            </div>
          </section>

          <div id="tabContent" class="tab-content"></div>
        </div>
      </div>
    </div>
  `;

  /* ---------------- Filter templates for each tab ---------------- */
  function getCoursesFilters() {
    return `
      <div class="search-group">
        <input type="text" id="courseSearch" class="search-field" placeholder="Search Course Name" />
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="courseDepartmentFilter" class="filter-select">
          <option value="">All Departments</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="courseFilter" class="filter-select">
          <option value="">All Courses</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <button id="clearCourseFilters" class="btn btn-clear">Clear Filters</button>
    `;
  }

  function getDepartmentsFilters() {
    return `
      <div class="search-group">
        <input type="text" id="departmentSearch" class="search-field" placeholder="Search Department Head" />
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="departmentFilter" class="filter-select">
          <option value="">All Departments</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <button id="clearDepartmentFilters" class="btn btn-clear">Clear Filters</button>
    `;
  }

  function getAcademicFilters() {
    return `
      <div class="search-group">
        <input type="text" id="academicSearch" class="search-field" placeholder="Search Academic Year" />
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="academicYearFilter" class="filter-select">
          <option value="">All Academic Years</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="statusFilter" class="filter-select">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <button id="clearAcademicFilters" class="btn btn-clear">Clear Filters</button>
    `;
  }

  function getArchivesFilters() {
    return `
      <div class="search-group">
        <input type="text" id="archiveSearch" class="search-field" placeholder="Search" />
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="archiveCourseFilter" class="filter-select">
          <option value="">All Courses</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="archiveDepartmentFilter" class="filter-select">
          <option value="">All Departments</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <div class="filter-group">
        <select id="archiveAcademicYearFilter" class="filter-select">
          <option value="">All Academic Years</option>
        </select>
        <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      <button id="clearArchiveFilters" class="btn btn-clear">Clear Filters</button>
    `;
  }

  /* ---------------- Tab templates (UI only) ---------------- */
  function getCoursesContent() {
    return `
      <div class="courses-section">
        <div class="courses-header">
          <div class="courses-title-section">
            <h3 class="courses-title">Courses</h3>
            <p class="courses-subtitle">Manage courses and assign to departments</p>
          </div>
          <button id="refreshCourses" class="btn btn-refresh">Refresh</button>
        </div>

        <div class="courses-table-container">
          <table class="courses-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="coursesTable"></tbody>
          </table>
        </div>

        <div class="add-edit-course-section">
          <h4 class="add-edit-title">Add/Edit Course</h4>
          <form id="addCourseForm" class="course-form">
            <input type="hidden" id="edit_course_id" name="edit_course_id" />
            <div class="form-row">
              <div class="form-group">
                <label for="course_name" class="form-label">Course Name</label>
                <input type="text" id="course_name" name="course_name" class="form-input" placeholder="Course Name" required />
              </div>
              <div class="form-group">
                <label for="course_department_id" class="form-label">Select Department</label>
                <select id="course_department_id" name="department_id" class="form-select" required>
                  <option value="">Select Department</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" id="cancelCourseEditBtn" class="btn btn-cancel hidden">Cancel</button>
              <button type="submit" id="courseSubmitBtn" class="btn btn-add-course">Add Course</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function getDepartmentsContent() {
    return `
      <div class="departments-section">
        <div class="departments-header">
          <div class="departments-title-section">
            <h3 class="departments-title">Departments</h3>
            <p class="departments-subtitle">Create and manage departments</p>
          </div>
          <button id="refreshDepartments" class="btn btn-refresh">Refresh</button>
        </div>

        <div class="departments-table-container">
          <table class="departments-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Head</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="departmentsTable"></tbody>
          </table>
        </div>

        <div class="add-edit-department-section">
          <h4 class="add-edit-title">Add/Edit Department</h4>
          <form id="addDepartmentForm" class="department-form">
            <input type="hidden" id="edit_department_id" name="edit_department_id" />
            <div class="form-row">
              <div class="form-group">
                <label for="department_name" class="form-label">Department Name</label>
                <input type="text" id="department_name" name="department_name" class="form-input" placeholder="Department Name" required />
              </div>
              <div class="form-group">
                <label for="department_head" class="form-label">Department Head</label>
                <input type="text" id="department_head" name="department_head" class="form-input" placeholder="Department Head" required />
              </div>
            </div>
            <div class="form-actions">
              <button type="button" id="cancelDepartmentEditBtn" class="btn btn-cancel hidden">Cancel</button>
              <button type="submit" id="departmentSubmitBtn" class="btn btn-add-department">Add Department</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function getAcademicContent() {
    return `
      <div class="academic-section">
        <div class="academic-header">
          <div class="academic-title-section">
            <h3 class="academic-title">Academic Years</h3>
            <p class="academic-subtitle">Add academic year ranges and set active</p>
          </div>
          <button id="refreshAcademic" class="btn btn-refresh">Refresh</button>
        </div>

        <div class="academic-table-container">
          <table class="academic-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Academic Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="academicTable"></tbody>
          </table>
        </div>

        <div class="add-edit-academic-section">
          <h4 class="add-edit-title">Add/Edit Academic Year</h4>
          <form id="addAcademicForm" class="academic-form">
            <input type="hidden" id="edit_academic_id" />
            <div class="form-row">
              <div class="form-group">
                <label for="academic_year" class="form-label">Academic Year</label>
                <input type="text" id="academic_year" class="form-input" placeholder="Academic Year (eg.202" required />
              </div>
              <div class="form-group">
                <label for="is_active" class="form-label">Set Active</label>
                <div class="checkbox-group">
                  <input type="checkbox" id="is_active" class="form-checkbox" />
                  <label for="is_active" class="checkbox-label">Active</label>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" id="cancelAcademicEditBtn" class="btn btn-cancel hidden">Cancel</button>
              <button type="submit" id="academicSubmitBtn" class="btn btn-add-academic">Add Academic Year</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function getArchivesContent() {
    return `
      <div class="archives-section">
        <div class="archives-header">
          <div class="archives-title-section">
            <h3 class="archives-title">Archives</h3>
            <p class="archives-subtitle">Restore archived items</p>
          </div>
          <button id="refreshArchives" class="btn btn-refresh">Refresh</button>
        </div>

        <div class="archives-table-container">
          <table class="archives-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name / Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="archiveTable"></tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ---------------- Tab switching (keeps existing logic) ---------------- */
  const tabContent = document.getElementById("tabContent");
  async function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
    
    // Update sidebar button text based on active tab
    const sidebarBtn = document.getElementById('addCourseBtn');
    if (sidebarBtn) {
      switch(tab) {
        case 'courses':
          sidebarBtn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Course
          `;
          break;
        case 'departments':
          sidebarBtn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Department
          `;
          break;
        case 'academic':
          sidebarBtn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Academic Year
          `;
          break;
        default:
          sidebarBtn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Item
          `;
      }
    }

    // Update filters based on active tab
    const filtersContainer = document.getElementById('filtersContainer');
    if (filtersContainer) {
      switch(tab) {
        case 'courses':
          filtersContainer.innerHTML = getCoursesFilters();
          await populateCourseFilters();
          setupCourseFilters();
          break;
        case 'departments':
          filtersContainer.innerHTML = getDepartmentsFilters();
          await populateDepartmentFilters();
          setupDepartmentFilters();
          break;
        case 'academic':
          filtersContainer.innerHTML = getAcademicFilters();
          await populateAcademicFilters();
          setupAcademicFilters();
          break;
        case 'archives':
          filtersContainer.innerHTML = getArchivesFilters();
          await populateArchiveFilters();
          setupArchiveFilters();
          break;
      }
    }

    if (tab === "courses") {
      tabContent.innerHTML = getCoursesContent();
      await populateCourseDepartments();
      fetchCourses();
      setupCourseForm();
    } else if (tab === "departments") {
      tabContent.innerHTML = getDepartmentsContent();
      fetchDepartments();
      setupDepartmentForm();
      const refreshBtn = document.getElementById('refreshDepartments');
      if (refreshBtn) refreshBtn.addEventListener('click', fetchDepartments);
    } else if (tab === "academic") {
      tabContent.innerHTML = getAcademicContent();
      fetchAcademicYears();
      setupAcademicForm();
    } else if (tab === "archives") {
      tabContent.innerHTML = getArchivesContent();
      fetchArchives();
    }
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });

  /* ---------------- Courses, Departments, Academic, Archives logic (unchanged) ---------------- */
  let editingCourseId = null;
  let allCoursesData = [];
  
  async function fetchCourses() {
    const res = await fetch('/api/courses', { credentials: 'include' });
    const table = document.getElementById('coursesTable');
    if (!table) return;
    if (res.ok) {
      const data = await res.json();
      allCoursesData = data;
      renderCourses();
    } else {
      table.innerHTML = `<tr><td colspan="4" class="text-error">Failed to load courses.</td></tr>`;
    }
  }

  function renderCourses() {
    const table = document.getElementById('coursesTable');
    if (!table) return;
    
    const searchTerm = document.getElementById('courseSearch')?.value.toLowerCase() || '';
    const departmentFilter = document.getElementById('courseDepartmentFilter')?.value || '';
    const courseFilter = document.getElementById('courseFilter')?.value || '';
    
    let filteredData = allCoursesData.filter(c => {
      let matches = true;
      
      if (searchTerm) {
        matches = matches && c.name.toLowerCase().includes(searchTerm);
      }
      
      if (departmentFilter) {
        matches = matches && c.department_id == departmentFilter;
      }
      
      if (courseFilter) {
        matches = matches && c.id == courseFilter;
      }
      
      return matches;
    });

    table.innerHTML = filteredData.length
      ? filteredData.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${c.name}</td>
              <td>${c.department?.name || ''}</td>
              <td>
              <button class="action-btn edit-btn" data-id="${c.id}" data-name="${c.name}" data-department="${c.department_id}">Edit</button>
              <button class="action-btn archive-btn" data-id="${c.id}">Archive</button>
              </td>
            </tr>
          `).join('')
        : `<tr><td colspan="4" class="text-muted">No courses found.</td></tr>`;

    // Attach event listeners
    document.querySelectorAll('.archive-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to archive this course?')) return;
        
        try {
          const res = await fetch(`/api/courses/${btn.dataset.id}`, { method: 'DELETE', credentials: 'include' });
          if (res.ok) {
            alert('Course archived successfully!');
            await fetchCourses(); // Refresh the table
            resetCourseForm();
          } else {
            alert('Failed to archive course. Please try again.');
          }
        } catch (error) {
          console.error('Error archiving course:', error);
          alert('Failed to archive course. Please try again.');
        }
        });
      });
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          editingCourseId = btn.dataset.id;
          document.getElementById('edit_course_id').value = editingCourseId;
          document.getElementById('course_name').value = btn.dataset.name;
          document.getElementById('course_department_id').value = btn.dataset.department;
          document.getElementById('courseSubmitBtn').textContent = "Update Course";
          document.getElementById('cancelCourseEditBtn').classList.remove('hidden');
        });
      });
  }

  function setupCourseForm() {
    const form = document.getElementById('addCourseForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const courseName = document.getElementById('course_name').value;
      const departmentId = document.getElementById('course_department_id').value;
      const editId = document.getElementById('edit_course_id').value;
      const submitBtn = document.getElementById('courseSubmitBtn');
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = editId ? "Updating..." : "Adding...";
      
      try {
        const body = JSON.stringify({ name: courseName, department_id: departmentId });
        let res;

        if (editId) {
          res = await fetch(`/api/courses/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
        } else {
          res = await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
        }
        
        if (res.ok) {
          alert(editId ? "Course updated successfully!" : "Course added successfully!");
          await fetchCourses(); // Refresh the table
          resetCourseForm();
        } else {
          const errorData = await res.json().catch(() => ({}));
          alert(`Failed to save course: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error saving course:', error);
        alert('Failed to save course. Please try again.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = editId ? "Update Course" : "Add Course";
      }
    });
    document.getElementById('cancelCourseEditBtn').addEventListener('click', resetCourseForm);
  }

  function resetCourseForm() {
    const form = document.getElementById('addCourseForm');
    if (!form) return;
    form.reset();
    document.getElementById('edit_course_id').value = "";
    document.getElementById('courseSubmitBtn').textContent = "Add Course";
    document.getElementById('cancelCourseEditBtn').classList.add('hidden');
    editingCourseId = null;
  }

  /* ---------------- Departments ---------------- */
  let editingDepartmentId = null;
  let allDepartmentsData = [];
  
  async function fetchDepartments() {
    const res = await fetch('/api/departments', { credentials: 'include' });
    const table = document.getElementById('departmentsTable');
    if (!table) return;
    if (res.ok) {
      const data = await res.json();
      // Normalize backend differences (name vs department_name, head vs department_head)
      allDepartmentsData = (data || []).map(d => ({
        id: d.id,
        name: d.name || d.department_name || '',
        head: d.head || d.department_head || ''
      }));
      renderDepartments();
    } else {
      table.innerHTML = `<tr><td colspan="4" class="text-error">Failed to load departments.</td></tr>`;
    }
  }

  function renderDepartments() {
    const table = document.getElementById('departmentsTable');
    if (!table) return;
    
    const searchTerm = document.getElementById('departmentSearch')?.value.toLowerCase() || '';
    const departmentFilter = document.getElementById('departmentFilter').value;
    
    let filteredData = allDepartmentsData.filter(d => {
      let matches = true;
      
      if (searchTerm) {
        const name = (d.name || d.department_name || "").toLowerCase();
        const head = (d.head || d.department_head || "").toLowerCase();
        matches = matches && (name.includes(searchTerm) || head.includes(searchTerm));
      }
      
      if (departmentFilter) {
        matches = matches && d.id == departmentFilter;
      }
      
      return matches;
    });

    table.innerHTML = filteredData.length
      ? filteredData.map((d, i) => `
            <tr>
              <td>${i + 1}</td>
            <td>${d.name || d.department_name || ''}</td>
            <td>${d.head || d.department_head || ''}</td>
              <td>
              <button class="action-btn edit-btn" data-id="${d.id}" data-name="${d.name}" data-head="${d.head}">Edit</button>
              <button class="action-btn archive-btn" data-id="${d.id}">Archive</button>
              </td>
            </tr>
          `).join('')
        : `<tr><td colspan="4" class="text-muted">No departments found.</td></tr>`;

    // Attach event listeners
    document.querySelectorAll('.archive-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to archive this department?')) return;
        
        try {
          const res = await fetch(`/api/departments/${btn.dataset.id}`, { method: 'DELETE', credentials: 'include' });
          if (res.ok) {
            alert('Department archived successfully!');
            await fetchDepartments(); // Refresh the table
            resetDepartmentForm();
          } else {
            alert('Failed to archive department. Please try again.');
          }
        } catch (error) {
          console.error('Error archiving department:', error);
          alert('Failed to archive department. Please try again.');
        }
        });
      });
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          editingDepartmentId = btn.dataset.id;
          document.getElementById('edit_department_id').value = editingDepartmentId;
          document.getElementById('department_name').value = btn.dataset.name;
          document.getElementById('department_head').value = btn.dataset.head;
          document.getElementById('departmentSubmitBtn').textContent = "Update Department";
          document.getElementById('departmentSubmitBtn').classList.remove('btn-add-department');
          document.getElementById('departmentSubmitBtn').classList.add('btn-update');
          document.getElementById('cancelDepartmentEditBtn').classList.remove('hidden');
        });
      });
  }

  function setupDepartmentForm() {
    const form = document.getElementById('addDepartmentForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const departmentName = document.getElementById('department_name').value;
      const departmentHead = document.getElementById('department_head').value;
      const editId = document.getElementById('edit_department_id').value;
      const submitBtn = document.getElementById('departmentSubmitBtn');
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = editId ? "Updating..." : "Adding...";
      
      try {
        const body = JSON.stringify({ name: departmentName, head: departmentHead });
        let res;

        if (editId) {
          res = await fetch(`/api/departments/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
        } else {
          res = await fetch('/api/departments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
        }
        
        if (res.ok) {
          alert(editId ? "Department updated successfully!" : "Department added successfully!");
          await fetchDepartments(); // Refresh the table
          resetDepartmentForm();
        } else {
          const errorData = await res.json().catch(() => ({}));
          alert(`Failed to save department: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error saving department:', error);
        alert('Failed to save department. Please try again.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = editId ? "Update Department" : "Add Department";
      }
    });
    document.getElementById('cancelDepartmentEditBtn').addEventListener('click', resetDepartmentForm);
  }

  function resetDepartmentForm() {
    const form = document.getElementById('addDepartmentForm');
    if (!form) return;
    form.reset();
    document.getElementById('edit_department_id').value = "";
    document.getElementById('departmentSubmitBtn').textContent = "Add Department";
    document.getElementById('departmentSubmitBtn').classList.remove('btn-update');
    document.getElementById('departmentSubmitBtn').classList.add('btn-add-department');
    document.getElementById('cancelDepartmentEditBtn').classList.add('hidden');
    editingDepartmentId = null;
  }

  /* ---------------- Academic Years ---------------- */
  let editingAcademicId = null;
  let allAcademicData = [];
  
  async function fetchAcademicYears() {
    const res = await fetch('/api/academic-years', { credentials: 'include' });
    const table = document.getElementById('academicTable');
    if (!table) return;
    if (res.ok) {
      const data = await res.json();
      allAcademicData = data;
      renderAcademicYears();
    } else {
      table.innerHTML = `<tr><td colspan="4" class="text-error">Failed to load academic years.</td></tr>`;
    }
  }

  function renderAcademicYears() {
    const table = document.getElementById('academicTable');
    if (!table) return;
    
    const searchTerm = document.getElementById('academicSearch')?.value.toLowerCase() || '';
    const academicYearFilter = document.getElementById('academicYearFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    let filteredData = allAcademicData.filter(a => {
      let matches = true;
      
      if (searchTerm) {
        const year = (a.year || a.academic_year || '').toString();
        matches = matches && year.toLowerCase().includes(searchTerm);
      }
      
      if (academicYearFilter) {
        matches = matches && a.id == academicYearFilter;
      }
      
      if (statusFilter) {
        const isActive = a.is_active ? 'active' : 'inactive';
        matches = matches && isActive === statusFilter;
      }
      
      return matches;
    });

    table.innerHTML = filteredData.length
      ? filteredData.map((a, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${a.year || a.academic_year}</td>
              <td>${a.is_active ? 'Active' : 'Inactive'}</td>
              <td>
              <button class="action-btn edit-btn" data-id="${a.id}" data-year="${a.year || a.academic_year}" data-active="${a.is_active ? 1 : 0}">Edit</button>
              <button class="action-btn archive-btn" data-id="${a.id}">Archive</button>
              </td>
            </tr>
          `).join('')
        : `<tr><td colspan="4" class="text-muted">No academic years found.</td></tr>`;

    // Attach event listeners
    document.querySelectorAll('.archive-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Are you sure you want to archive this academic year?')) return;
          
          try {
            const res = await fetch(`/api/academic-years/${btn.dataset.id}`, { method: 'DELETE', credentials: 'include' });
            if (res.ok) {
              alert('Academic year archived successfully!');
              await fetchAcademicYears(); // Refresh the table
              resetAcademicForm();
            } else {
              alert('Failed to archive academic year. Please try again.');
            }
          } catch (error) {
            console.error('Error archiving academic year:', error);
            alert('Failed to archive academic year. Please try again.');
          }
        });
      });
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          editingAcademicId = btn.dataset.id;
          document.getElementById('edit_academic_id').value = editingAcademicId;
          document.getElementById('academic_year').value = btn.dataset.year;
          document.getElementById('is_active').checked = btn.dataset.active === "1";
          document.getElementById('academicSubmitBtn').textContent = "Update Academic Year";
          document.getElementById('cancelAcademicEditBtn').classList.remove('hidden');
        });
      });
  }

  function setupAcademicForm() {
    const form = document.getElementById('addAcademicForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const year = document.getElementById('academic_year').value;
      const is_active = document.getElementById('is_active').checked ? 1 : 0;
      const editId = document.getElementById('edit_academic_id').value;
      const submitBtn = document.getElementById('academicSubmitBtn');
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = editId ? "Updating..." : "Adding...";
      
      try {
        const body = JSON.stringify({ year, is_active });
        let res;

        if (editId) {
          res = await fetch(`/api/academic-years/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
        } else {
          res = await fetch('/api/academic-years', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
        }
        
        if (res.ok) {
          alert(editId ? "Academic year updated successfully!" : "Academic year added successfully!");
          await fetchAcademicYears(); // Refresh the table
          resetAcademicForm();
        } else {
          const errorData = await res.json().catch(() => ({}));
          alert(`Failed to save academic year: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error saving academic year:', error);
        alert('Failed to save academic year. Please try again.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = editId ? "Update Academic Year" : "Add Academic Year";
      }
    });
    document.getElementById('cancelAcademicEditBtn').addEventListener('click', resetAcademicForm);
  }

  function resetAcademicForm() {
    const form = document.getElementById('addAcademicForm');
    if (!form) return;
    form.reset();
    document.getElementById('edit_academic_id').value = "";
    document.getElementById('academicSubmitBtn').textContent = "Add Academic Year";
    document.getElementById('cancelAcademicEditBtn').classList.add('hidden');
    editingAcademicId = null;
  }

  /* ---------------- Archives ---------------- */
  let allArchivesData = [];
  async function fetchArchives() {
    const res = await fetch('/api/archives', { credentials: 'include' });
    const table = document.getElementById('archiveTable');
    if (!table) return;
    if (!res.ok) {
      table.innerHTML = `<tr><td colspan="4" class="text-error">Failed to load archives.</td></tr>`;
      return;
    }

    const data = await res.json();
    const rows = [];
    // Use singular type keys matching earlier implementation: course, department, academic_year, faculty, student
    (data.courses || []).forEach(c => rows.push({ group: 'course', type: 'Course', name: c.name, id: c.id }));
    (data.departments || []).forEach(d => rows.push({ group: 'department', type: 'Department', name: d.name, id: d.id }));
    (data.academic_years || []).forEach(a => rows.push({ group: 'academic_year', type: 'Academic Year', name: a.year || a.academic_year, id: a.id }));
    (data.faculties || []).forEach(f => rows.push({ group: 'faculty', type: 'Faculty', name: (f.first_name||f.firstname)+' '+(f.last_name||f.lastname), id: f.id }));
    (data.students || []).forEach(s => rows.push({ group: 'student', type: 'Student', name: (s.first_name||s.firstname)+' '+(s.last_name||s.lastname), id: s.id }));

    allArchivesData = rows;
    renderArchives();
  }

  function renderArchives() {
    const table = document.getElementById('archiveTable');
    if (!table) return;

    const search = document.getElementById('archiveSearch')?.value.toLowerCase() || '';
    const courseFilter = document.getElementById('archiveCourseFilter')?.value || '';
    const deptFilter = document.getElementById('archiveDepartmentFilter')?.value || '';
    const acadFilter = document.getElementById('archiveAcademicYearFilter')?.value || '';

    let filtered = allArchivesData.filter(r => {
      let matches = true;
      if (search) {
        matches = matches && (r.name.toLowerCase().includes(search) || r.type.toLowerCase().includes(search));
      }
      if (courseFilter) {
        matches = matches && (r.group === 'course' && String(r.id) === String(courseFilter));
      }
      if (deptFilter) {
        matches = matches && (r.group === 'department' && String(r.id) === String(deptFilter));
      }
      if (acadFilter) {
        matches = matches && (r.group === 'academic_year' && String(r.id) === String(acadFilter));
      }
      return matches;
    });

    table.innerHTML = filtered.length
      ? filtered.map(r => `
          <tr>
            <td>${r.type}</td>
            <td>${r.name}</td>
            <td>
              <button class="action-btn edit-btn btn-restore" data-type="${r.group}" data-id="${r.id}">Restore</button>
              <button class="action-btn archive-btn btn-delete" data-type="${r.group}" data-id="${r.id}">Delete</button>
            </td>
          </tr>
        `).join('')
      : `<tr><td colspan="3" class="text-muted">No archived data found.</td></tr>`;

    // actions
    document.querySelectorAll('.btn-restore').forEach(btn => {
      btn.addEventListener('click', async () => {
        const type = btn.dataset.type; // course | department | academic_year | faculty | student
        const id = btn.dataset.id;

        if (!confirm(`Are you sure you want to restore this ${type}?`)) return;

        try {
          // Try archives restore endpoint first
          let res = await fetch(`/api/archives/restore/${type}/${id}`, { method: 'POST', credentials: 'include' });

          // Fallbacks for common backend routes
          if (!res.ok) {
            const restoreEndpoints = {
              course: `/api/courses/${id}/restore`,
              department: `/api/departments/${id}/restore`,
              academic_year: `/api/academic-years/${id}/restore`,
              faculty: `/api/faculties/${id}/restore`,
              student: `/api/students/${id}/restore`
            };
            const alt = restoreEndpoints[type];
            if (alt) {
              res = await fetch(alt, { method: 'POST', credentials: 'include' });
            }
          }

          if (res.ok) {
            alert('Item restored successfully!');
            await fetchArchives(); // Refresh the table
          } else {
            alert('Failed to restore item. Please try again.');
          }
        } catch (error) {
          console.error('Error restoring item:', error);
          alert('Failed to restore item. Please try again.');
        }
      });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Permanently delete this archived item? This cannot be undone.')) return;
        const type = btn.dataset.type; // course | department | academic_year | faculty | student
        const id = btn.dataset.id;

        try {
          // Try archives delete endpoint first
          let res = await fetch(`/api/archives/${type}/${id}`, { method: 'DELETE', credentials: 'include' });

          // Fallbacks for common backend routes
          if (!res.ok) {
            const deleteEndpoints = {
              course: `/api/courses/${id}/force-delete`,
              department: `/api/departments/${id}/force-delete`,
              academic_year: `/api/academic-years/${id}/force-delete`,
              faculty: `/api/faculties/${id}/force-delete`,
              student: `/api/students/${id}/force-delete`
            };
            const alt = deleteEndpoints[type];
            if (alt) {
              res = await fetch(alt, { method: 'DELETE', credentials: 'include' });
            }
          }

          if (res.ok) {
            alert('Item permanently deleted successfully!');
            await fetchArchives(); // Refresh the table
          } else {
            alert('Failed to delete item. Please try again.');
          }
        } catch (error) {
          console.error('Error deleting item:', error);
          alert('Failed to delete item. Please try again.');
        }
      });
    });
  }

  /* ---------------- helpers ---------------- */
  async function populateCourseDepartments() {
    const res = await fetch('/api/departments', { credentials: 'include' });
    if (!res.ok) return;
    const departments = await res.json();
    const select = document.getElementById('course_department_id');
    if (select) {
      select.innerHTML = `<option value="">Select Department</option>` + departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    }
  }

  // Course filters
  async function populateCourseFilters() {
    const [departmentsRes, coursesRes] = await Promise.all([
      fetch('/api/departments', { credentials: 'include' }),
      fetch('/api/courses', { credentials: 'include' })
    ]);
    
    if (departmentsRes.ok) {
      const departments = await departmentsRes.json();
      const deptSelect = document.getElementById('courseDepartmentFilter');
      if (deptSelect) {
        deptSelect.innerHTML = `<option value="">All Departments</option>` + departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
      }
    }
    
    if (coursesRes.ok) {
      const courses = await coursesRes.json();
      const courseSelect = document.getElementById('courseFilter');
      if (courseSelect) {
        courseSelect.innerHTML = `<option value="">All Courses</option>` + courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
      }
    }
  }

  function setupCourseFilters() {
    const searchInput = document.getElementById('courseSearch');
    const departmentFilter = document.getElementById('courseDepartmentFilter');
    const courseFilter = document.getElementById('courseFilter');
    const clearFiltersBtn = document.getElementById('clearCourseFilters');

    if (searchInput) {
      searchInput.addEventListener('input', renderCourses);
    }

    if (departmentFilter) {
      departmentFilter.addEventListener('change', renderCourses);
    }

    if (courseFilter) {
      courseFilter.addEventListener('change', renderCourses);
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (departmentFilter) departmentFilter.value = '';
        if (courseFilter) courseFilter.value = '';
        renderCourses();
      });
    }
  }

  // Department filters
  async function populateDepartmentFilters() {
    const res = await fetch('/api/departments', { credentials: 'include' });
    if (!res.ok) return;
    const departments = await res.json();
    const select = document.getElementById('departmentFilter');
    if (select) {
      select.innerHTML = `<option value="">All Departments</option>` + departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    }
  }

  function setupDepartmentFilters() {
    const searchInput = document.getElementById('departmentSearch');
    const departmentFilter = document.getElementById('departmentFilter');
    const clearFiltersBtn = document.getElementById('clearDepartmentFilters');

    if (searchInput) {
      searchInput.addEventListener('input', renderDepartments);
    }

    if (departmentFilter) {
      departmentFilter.addEventListener('change', renderDepartments);
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (departmentFilter) departmentFilter.value = '';
        renderDepartments();
      });
    }
  }

  // Academic filters
  async function populateAcademicFilters() {
    const res = await fetch('/api/academic-years', { credentials: 'include' });
    if (!res.ok) return;
    const academicYears = await res.json();
    const select = document.getElementById('academicYearFilter');
    if (select) {
      select.innerHTML = `<option value="">All Academic Years</option>` + academicYears.map(a => `<option value="${a.id}">${a.year || a.academic_year}</option>`).join('');
    }
  }

  function setupAcademicFilters() {
    const searchInput = document.getElementById('academicSearch');
    const academicYearFilter = document.getElementById('academicYearFilter');
    const statusFilter = document.getElementById('statusFilter');
    const clearFiltersBtn = document.getElementById('clearAcademicFilters');

    if (searchInput) {
      searchInput.addEventListener('input', renderAcademicYears);
    }

    if (academicYearFilter) {
      academicYearFilter.addEventListener('change', renderAcademicYears);
    }

    if (statusFilter) {
      statusFilter.addEventListener('change', renderAcademicYears);
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (academicYearFilter) academicYearFilter.value = '';
        if (statusFilter) statusFilter.value = '';
        renderAcademicYears();
      });
    }
  }

  // Archive filters
  async function populateArchiveFilters() {
    const [coursesRes, departmentsRes, academicRes] = await Promise.all([
      fetch('/api/courses', { credentials: 'include' }),
      fetch('/api/departments', { credentials: 'include' }),
      fetch('/api/academic-years', { credentials: 'include' })
    ]);
    
    if (coursesRes.ok) {
      const courses = await coursesRes.json();
      const courseSelect = document.getElementById('archiveCourseFilter');
      if (courseSelect) {
        courseSelect.innerHTML = `<option value="">All Courses</option>` + courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
      }
    }
    
    if (departmentsRes.ok) {
      const departments = await departmentsRes.json();
      const deptSelect = document.getElementById('archiveDepartmentFilter');
      if (deptSelect) {
        deptSelect.innerHTML = `<option value="">All Departments</option>` + departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
      }
    }
    
    if (academicRes.ok) {
      const academicYears = await academicRes.json();
      const academicSelect = document.getElementById('archiveAcademicYearFilter');
      if (academicSelect) {
        academicSelect.innerHTML = `<option value="">All Academic Years</option>` + academicYears.map(a => `<option value="${a.id}">${a.year || a.academic_year}</option>`).join('');
      }
    }
  }

  function setupArchiveFilters() {
    const searchInput = document.getElementById('archiveSearch');
    const courseFilter = document.getElementById('archiveCourseFilter');
    const departmentFilter = document.getElementById('archiveDepartmentFilter');
    const academicYearFilter = document.getElementById('archiveAcademicYearFilter');
    const clearFiltersBtn = document.getElementById('clearArchiveFilters');

    if (searchInput) {
      searchInput.addEventListener('input', renderArchives);
    }

    if (courseFilter) {
      courseFilter.addEventListener('change', renderArchives);
    }

    if (departmentFilter) {
      departmentFilter.addEventListener('change', renderArchives);
    }

    if (academicYearFilter) {
      academicYearFilter.addEventListener('change', renderArchives);
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (courseFilter) courseFilter.value = '';
        if (departmentFilter) departmentFilter.value = '';
        if (academicYearFilter) academicYearFilter.value = '';
        renderArchives();
      });
    }
  }

  /* ---------------- initialize ---------------- */
  showTab("courses");

  // Add Course button in sidebar
  document.getElementById("addCourseBtn").addEventListener("click", () => {
    showTab("courses");
  });

  // sidebar navigation (keeps consistent with Dashboard behavior)
  document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      if (page === 'settings') return;
      if (page === 'students') window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'students' } }));
      if (page === 'faculty') window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'faculty' } }));
      if (page === 'report') window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'report' } }));
      if (page === 'overview') window.location.reload();
    });
  });
}