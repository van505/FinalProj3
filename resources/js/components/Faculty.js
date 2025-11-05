import axios from "axios";

export function loadFaculty(app) {
  app.innerHTML = `
    <div class="dashboard-container">
      <nav class="sidebar">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <img src="/images/logo.png" alt="EDUTrack logo" class="sidebar-logo" />
            <h1 class="sidebar-title">EDUTrack</h1>
          </div>

          <button class="new-item-btn" id="addFacultyBtn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Faculty
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
              <a href="#" class="menu-item active" data-page="faculty">
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
            <h1 class="page-title">Faculty Management</h1>
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
          <section class="students-banner">
            <div class="banner-content">
              <h2 class="banner-title">Faculty Management</h2>
              <p class="banner-subtitle">can add, edit, delete data</p>
            </div>
          </section>

          <section class="filters-section">
            <div class="filters-container">
              <div class="search-group">
                <input type="text" id="searchInput" class="search-field" placeholder="Search faculty..." />
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>

              <div class="filter-group">
                <select id="departmentFilter" class="filter-select"><option value="">All Departments</option></select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>

              <div class="filter-group">
                <select id="academicYearFilter" class="filter-select"><option value="">All Academic Years</option></select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>

              <div class="filter-group">
                <select id="yearstatusFilter" class="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>

              <button id="clearFilters" class="btn btn-clear">Clear Filters</button>
            </div>
        </section>

          <section class="table-section">
            <div class="table-container">
              <table class="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Faculty ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Academic Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="facultyList"></tbody>
          </table>
            </div>
        </section>
        </div>
      </div>

      <!-- Modal -->
      <div id="facultyModal" class="faculty-modal hidden" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="modal-content" role="document">
          <button id="closeFacultyModal" class="modal-close" aria-label="Close">&times;</button>
          <h3 id="facultyModalTitle" class="modal-title">Add New Faculty</h3>

          <form id="facultyForm" class="student-form" autocomplete="on" novalidate>
            <input type="hidden" name="edit_id" id="edit_id" />

            <div class="form-column">
              <div class="form-group">
                <label for="faculty_id" class="form-label">Faculty ID</label>
                <input type="text" name="faculty_id" id="faculty_id" class="form-input" placeholder="Faculty ID" required />
              </div>
              <div class="form-group">
                <label for="first_name" class="form-label">First Name</label>
                <input type="text" name="first_name" id="first_name" class="form-input" placeholder="First Name" required />
              </div>
              <div class="form-group">
                <label for="middle_name" class="form-label">Middle Name</label>
                <input type="text" name="middle_name" id="middle_name" class="form-input" placeholder="Middle Name" />
              </div>
              <div class="form-group">
                <label for="last_name" class="form-label">Last Name</label>
                <input type="text" name="last_name" id="last_name" class="form-input" placeholder="Last Name" required />
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" id="email" class="form-input" placeholder="Email" required />
              </div>
              <div class="form-group">
                <label for="phone" class="form-label">Phone</label>
                <input type="text" name="phone" id="phone" class="form-input" placeholder="Phone" />
              </div>
            </div>

            <div class="form-column">
              <div class="form-group">
                <label for="address" class="form-label">Address</label>
                <input type="text" name="address" id="address" class="form-input" placeholder="Address" />
              </div>
              <div class="form-group">
                <label for="position" class="form-label">Position</label>
                <input type="text" name="position" id="position" class="form-input" placeholder="Position" />
              </div>
              <div class="form-group">
                <label for="date_hired" class="form-label">Date Hired</label>
                <input type="date" name="date_hired" id="date_hired" class="form-input" />
              </div>
              <div class="form-group">
                <label for="departmentSelect" class="form-label">Department</label>
                <select name="department_id" id="departmentSelect" class="form-select" required>
              <option value="">Select Department</option>
            </select>
              </div>
              <div class="form-group">
                <label for="academicYearSelectForm" class="form-label">Academic Year</label>
                <select name="academic_year_id" id="academicYearSelectForm" class="form-select" required>
              <option value="">Select Academic Year</option>
            </select>
              </div>
              <div class="form-group">
                <label for="yearstatus" class="form-label">Status</label>
                <select name="yearstatus" id="yearstatus" class="form-select" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" id="cancelBtn" class="btn btn-cancel">Cancel</button>
              <button type="submit" id="submitBtn" class="btn btn-save">Save Faculty</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  
  const facultyModalEl = document.getElementById("facultyModal");
  if (facultyModalEl && facultyModalEl.parentElement !== document.body) {
    document.body.appendChild(facultyModalEl);
  }

  // ----- existing logic (kept unchanged) -----
  let allFaculty = [];
  let allDepartments = [];
  let allAcademicYears = [];
  let isEditing = false;

  // Load dropdown data
  async function loadSelectOptions() {
    const [departmentsRes, yearsRes] = await Promise.all([
      axios.get("/api/departments"),
      axios.get("/api/academic-years")
    ]);
    allDepartments = departmentsRes.data;
    allAcademicYears = yearsRes.data;

    document.getElementById("departmentFilter").innerHTML =
      `<option value="">All Departments</option>` +
      allDepartments.map(d => `<option value="${d.id}">${d.name}</option>`).join("");

    document.getElementById("departmentSelect").innerHTML =
      `<option value="">Select Department</option>` +
      allDepartments.map(d => `<option value="${d.id}">${d.name}</option>`).join("");

    document.getElementById("academicYearFilter").innerHTML =
      `<option value="">All Academic Years</option>` +
      allAcademicYears.map(y => `<option value="${y.id}">${y.year}</option>`).join("");

    document.getElementById("academicYearSelectForm").innerHTML =
      `<option value="">Select Academic Year</option>` +
      allAcademicYears.map(y => `<option value="${y.id}">${y.year}</option>`).join("");
  }

  // Fetch faculty
  async function fetchFaculty() {
    try {
      const res = await axios.get("/api/faculty");
      allFaculty = res.data;
      renderFaculty();
    } catch (err) {
      console.error("Error fetching faculty:", err);
    }
  }

  // Render table
  function renderFaculty() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const department = document.getElementById("departmentFilter").value;
    const academicYear = document.getElementById("academicYearFilter").value;
    const yearstatus = document.getElementById("yearstatusFilter").value;

    const tbody = document.getElementById("facultyList");
    const filtered = allFaculty.filter(f => {
      let match = true;
      if (search)
        match =
          f.first_name.toLowerCase().includes(search) ||
          f.last_name.toLowerCase().includes(search) ||
          f.email.toLowerCase().includes(search);
      if (match && department) match = f.department_id == department;
      if (match && academicYear) match = f.academic_year_id == academicYear;
      if (match && yearstatus) match = f.yearstatus == yearstatus;
      return match;
    });

    tbody.innerHTML = filtered.length
      ? filtered
          .map(f => `
          <tr>
            <td>${f.id}</td>
            <td>${f.faculty_id}</td>
            <td>${f.first_name} ${f.middle_name || ""} ${f.last_name}</td>
            <td>${f.email}</td>
            <td>${allDepartments.find(d => d.id == f.department_id)?.name || ""}</td>
            <td>${f.position || ""}</td>
            <td>${allAcademicYears.find(y => y.id == f.academic_year_id)?.year || ""}</td>
            <td>
              <span class="status-badge ${f.yearstatus}">
                ${f.yearstatus}
              </span>
            </td>
            <td class="actions">
              <button class="action-btn edit-btn" data-id="${f.id}" title="Edit">Edit</button>
              <button class="action-btn archive-btn" data-id="${f.id}" title="Archive">Archive</button>
            </td>
          </tr>
        `)
          .join("")
      : `<tr><td colspan="9" class="text-center p-4">No faculty found.</td></tr>`;

    // Attach edit/archive logic
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => openEditModal(btn.dataset.id));
    });
    document.querySelectorAll(".archive-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteFaculty(btn.dataset.id));
    });
  }

  async function deleteFaculty(id) {
    if (confirm("Delete this faculty?")) {
      await axios.delete(`/api/faculty/${id}`);
      fetchFaculty();
    }
  }

  async function openEditModal(id) {
    const res = await axios.get(`/api/faculty/${id}`);
    const f = res.data;
    isEditing = true;

    document.getElementById("edit_id").value = f.id;
    document.getElementById("faculty_id").value = f.faculty_id;
    document.getElementById("first_name").value = f.first_name;
    document.getElementById("middle_name").value = f.middle_name || "";
    document.getElementById("last_name").value = f.last_name;
    document.getElementById("email").value = f.email;
    document.getElementById("phone").value = f.phone || "";
    document.getElementById("address").value = f.address || "";
    document.getElementById("position").value = f.position || "";
    document.getElementById("date_hired").value = f.date_hired || "";
    document.getElementById("departmentSelect").value = f.department_id || "";
    document.getElementById("academicYearSelectForm").value = f.academic_year_id || "";
    document.getElementById("yearstatus").value = f.yearstatus || "active";

    document.getElementById("facultyModalTitle").textContent = "Edit Faculty";
    document.getElementById("submitBtn").textContent = "Update Faculty";
    document.getElementById("facultyModal").classList.remove("hidden");
    document.body.classList.add("modal-open");
  }

  // Modal logic
  document.getElementById("addFacultyBtn").addEventListener("click", showModal);
  const addFacultyBtnTop = document.getElementById("addFacultyBtnTop");
  if (addFacultyBtnTop) {
    addFacultyBtnTop.addEventListener("click", showModal);
  }
  document.getElementById("closeFacultyModal").addEventListener("click", hideModal);
  document.getElementById("cancelBtn").addEventListener("click", hideModal);

  function showModal() {
    document.getElementById("facultyModal").classList.remove("hidden");
    document.getElementById("facultyModalTitle").textContent = "Add New Faculty";
    document.getElementById("submitBtn").textContent = "Save Faculty";
    resetForm();
    document.body.classList.add("modal-open");
  }

  function hideModal() {
    document.getElementById("facultyModal").classList.add("hidden");
    resetForm();
    document.body.classList.remove("modal-open");
  }

  // Submit form
  const form = document.getElementById("facultyForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const id = data.edit_id;
    delete data.edit_id;

    if (isEditing) await axios.put(`/api/faculty/${id}`, data);
    else await axios.post("/api/faculty", data);

    hideModal();
    fetchFaculty();
  });

  function resetForm() {
    form.reset();
    isEditing = false;
  }

  // Filters
  document.getElementById("searchInput").addEventListener("input", renderFaculty);
  document.addEventListener("change", (e) => {
    const id = e.target?.id;
    if (
      id === "departmentFilter" ||
      id === "academicYearFilter" ||
      id === "yearstatusFilter"
    ) {
      renderFaculty();
    }
  });
  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("departmentFilter").value = "";
    document.getElementById("academicYearFilter").value = "";
    document.getElementById("yearstatusFilter").value = "";
    renderFaculty();
  });

  loadSelectOptions().then(fetchFaculty);
}
