import axios from "axios";

export function loadStudents(app) {
    app.innerHTML = `
    <div class="dashboard-container">
      <nav class="sidebar">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <img src="/images/logo.png" alt="EDUTrack logo" class="sidebar-logo" />
            <h1 class="sidebar-title">EDUTrack</h1>
          </div>
          
          <button class="new-item-btn" id="addStudentBtn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Student
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
              <a href="#" class="menu-item active" data-page="students">
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
            <h1 class="page-title">Students Management</h1>
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
              <h2 class="banner-title">Students Management</h2>
              <p class="banner-subtitle">can add, edit, delete data</p>
            </div>
          </section>

          <section class="filters-section">
            <div class="filters-container">
              <div class="search-group">
                <input type="text" id="searchInput" class="search-field" placeholder="Search students..." />
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
              
              <div class="filter-group">
                <select id="courseFilter" class="filter-select">
                  <option value="">All Courses</option>
                </select>
                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
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
                <select id="yearstatusFilter" class="filter-select">
                  <option value="">All Year Status</option>
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
                <th>Student ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Department</th>
                <th>Academic Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="studentList"></tbody>
          </table>
            </div>
        </section>
        </div>
      </div>

      <div id="studentModal" class="student-modal hidden" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="modal-content" role="document">
          <button id="closeStudentModal" class="modal-close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h3 id="studentModalTitle" class="modal-title">Add New Student</h3>

          <form id="studentForm" class="student-form" autocomplete="on" novalidate>
            <input type="hidden" name="edit_id" id="edit_id" />

            <div class="form-column">
              <div class="form-group">
                <label for="studID" class="form-label">Student ID</label>
                <input type="text" name="studID" id="studID" class="form-input" placeholder="e.g. STU000123" required />
              </div>

              <div class="form-group">
                <label for="firstname" class="form-label">First Name</label>
                <input type="text" name="firstname" id="firstname" class="form-input" placeholder="First Name" required />
              </div>

              <div class="form-group">
                <label for="middlename" class="form-label">Middle Name</label>
                <input type="text" name="middlename" id="middlename" class="form-input" placeholder="Middle Name" />
              </div>

              <div class="form-group">
                <label for="lastname" class="form-label">Last Name</label>
                <input type="text" name="lastname" id="lastname" class="form-input" placeholder="Last Name" required />
              </div>

              <div class="form-group">
                <label for="suffix" class="form-label">Suffix</label>
                <input type="text" name="suffix" id="suffix" class="form-input" placeholder="Suffix" />
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" id="email" class="form-input" placeholder="you@example.com" required />
              </div>

              <div class="form-group">
                <label for="phone" class="form-label">Phone</label>
                <input type="text" name="phone" id="phone" class="form-input" placeholder="+123456789" />
              </div>
            </div>

            <div class="form-column">
              <div class="form-group">
                <label for="date_of_birth" class="form-label">Date of Birth</label>
                <input type="date" name="date_of_birth" id="date_of_birth" class="form-input" />
              </div>

              <div class="form-group">
                <label for="sex" class="form-label">Sex</label>
                <select name="sex" id="sex" class="form-select">
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
              </div>

              <div class="form-group">
                <label for="departmentSelect" class="form-label">Department</label>
                <select name="department_id" id="departmentSelect" class="form-select" required>
              <option value="">Select Department</option>
            </select>
              </div>

              <div class="form-group">
                <label for="courseSelect" class="form-label">Course</label>
                <select name="course_id" id="courseSelect" class="form-select" required>
              <option value="">Select Course</option>
            </select>
              </div>

              <div class="form-group">
                <label for="academicYearSelectForm" class="form-label">Academic Year</label>
                <select name="academic_year_id" id="academicYearSelectForm" class="form-select" required>
              <option value="">Select Academic Year</option>
            </select>
              </div>

              <div class="form-group">
                <label for="yearstatus" class="form-label">Year Status</label>
                <select name="yearstatus" id="yearstatus" class="form-select" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>
              </div>

              <div class="form-group">
                <label for="enrollment_date" class="form-label">Enrollment Date</label>
                <input type="date" name="enrollment_date" id="enrollment_date" class="form-input" />
              </div>
            </div>

            <div class="form-actions">
              <button type="button" id="cancelBtn" class="btn btn-cancel">Cancel</button>
              <button type="submit" id="submitBtn" class="btn btn-save">Save Student</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

    const studentModalEl = document.getElementById("studentModal");
    if (studentModalEl && studentModalEl.parentElement !== document.body) {
        document.body.appendChild(studentModalEl);
    }

    let isEditing = false;
    let allStudents = [];
    let allDepartments = [];
    let allCourses = [];
    let allAcademicYears = [];

    // Load departments, courses, academic years for filters and form
    async function loadSelectOptions() {
        try {
            const [departmentsRes, coursesRes, yearsRes] = await Promise.all([
                axios.get("/api/departments"),
                axios.get("/api/courses"),
                axios.get("/api/academic-years"),
            ]);
            allDepartments = departmentsRes.data;
            allCourses = coursesRes.data;
            allAcademicYears = yearsRes.data;

            // Department filter
            document.getElementById("departmentFilter").innerHTML =
                `<option value="">All Departments</option>` +
                allDepartments
                    .map((d) => `<option value="${d.id}">${d.name}</option>`)
                    .join("");

            // Course filter (initially all)
            updateCourseFilter();

            // Academic year filter
            document.getElementById("academicYearFilter").innerHTML =
                `<option value="">All Academic Years</option>` +
                allAcademicYears
                    .map(
                        (y) =>
                            `<option value="${y.id}">${
                                y.year || y.academic_year
                            }</option>`
                    )
                    .join("");

            // Department select (form)
            document.getElementById("departmentSelect").innerHTML =
                `<option value="">Select Department</option>` +
                allDepartments
                    .map((d) => `<option value="${d.id}">${d.name}</option>`)
                    .join("");

            // Academic year select (form)
            document.getElementById("academicYearSelectForm").innerHTML =
                `<option value="">Select Academic Year</option>` +
                allAcademicYears
                    .map(
                        (y) =>
                            `<option value="${y.id}">${
                                y.year || y.academic_year
                            }</option>`
                    )
                    .join("");

            // Course select (form, initially all)
            updateCourseSelect();
        } catch (error) {
            console.error("Error loading select options:", error.response?.data || error);
            
            if (error.response?.status === 401) {
                alert("Authentication error. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/";
            } else {
                alert("Failed to load form options. Please refresh the page.");
            }
        }
    }

    // --- FILTER LOGIC ---

    // When department filter changes, update course filter options
    document.addEventListener("change", function (e) {
        if (e.target && e.target.id === "departmentFilter") {
            updateCourseFilter();
            renderStudents();
        }
        if (e.target && e.target.id === "courseFilter") {
            renderStudents();
        }
        if (e.target && e.target.id === "academicYearFilter") {
            renderStudents();
        }
        if (e.target && e.target.id === "yearstatusFilter") {
            renderStudents();
        }
    });

    function updateCourseFilter() {
        const deptId = document.getElementById("departmentFilter").value;
        const courseFilter = document.getElementById("courseFilter");
        let filteredCourses = deptId
            ? allCourses.filter((c) => c.department_id == deptId)
            : allCourses;
        courseFilter.innerHTML =
            `<option value="">All Courses</option>` +
            filteredCourses
                .map((c) => `<option value="${c.id}">${c.name}</option>`)
                .join("");
    }

    // --- FORM LOGIC ---

    // When department select (form) changes, update course select (form)
    document.addEventListener("change", function (e) {
        if (e.target && e.target.id === "departmentSelect") {
            updateCourseSelect();
        }
    });

    function updateCourseSelect() {
        const deptId = document.getElementById("departmentSelect").value;
        const courseSelect = document.getElementById("courseSelect");
        let filteredCourses = deptId
            ? allCourses.filter((c) => c.department_id == deptId)
            : allCourses;
        courseSelect.innerHTML =
            `<option value="">Select Course</option>` +
            filteredCourses
                .map((c) => `<option value="${c.id}">${c.name}</option>`)
                .join("");
    }

    // --- REST OF YOUR LOGIC (fetchStudents, renderStudents, form submit, etc.) ---

    // Fetch students
    async function fetchStudents() {
        try {
            const res = await axios.get("/api/students");
            allStudents = res.data;
            renderStudents();
        } catch (error) {
            console.error("Error fetching students:", error.response?.data || error);
            
            if (error.response?.status === 401) {
                alert("Authentication error. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/";
            } else {
                alert("Failed to fetch students. Please try again.");
            }
        }
    }

    // Render students with filters/search
    function renderStudents() {
        const search = document
            .getElementById("searchInput")
            .value.toLowerCase();
        const department = document.getElementById("departmentFilter").value;
        const course = document.getElementById("courseFilter").value;
        const academicYear =
            document.getElementById("academicYearFilter").value;
        const yearstatus = document.getElementById("yearstatusFilter").value;

        const tbody = document.getElementById("studentList");
        let filtered = allStudents.filter((s) => {
            let match = true;
            if (search) {
                match =
                    (s.studID && s.studID.toLowerCase().includes(search)) ||
                    (s.firstname &&
                        s.firstname.toLowerCase().includes(search)) ||
                    (s.lastname && s.lastname.toLowerCase().includes(search)) ||
                    (s.email && s.email.toLowerCase().includes(search));
            }
            if (match && department) match = s.department_id == department;
            if (match && course) match = s.course_id == course;
            if (match && academicYear)
                match = s.academic_year_id == academicYear;
            if (match && yearstatus) match = s.yearstatus == yearstatus;
            return match;
        });

        tbody.innerHTML = filtered.length
            ? filtered
                  .map(
                      (s) => `
            <tr>
              <td>${s.id}</td>
              <td>${s.studID}</td>
              <td>${s.firstname} ${s.middlename ? s.middlename + " " : ""}${
                          s.lastname
                      }</td>
              <td>${
                  allCourses.find((c) => c.id == s.course_id)?.name ||
                  allCourses.find((c) => c.id == s.course_id)?.course_name ||
                  ""
              }</td>
              <td>${
                  allDepartments.find((d) => d.id == s.department_id)?.name ||
                  allDepartments.find((d) => d.id == s.department_id)
                      ?.department_name ||
                  ""
              }</td>
              <td>${
                  allAcademicYears.find((y) => y.id == s.academic_year_id)
                      ?.year ||
                  allAcademicYears.find((y) => y.id == s.academic_year_id)
                      ?.academic_year ||
                  ""
              }</td>
              <td>
                <span class="status-badge ${
                    s.yearstatus === "active"
                        ? "active"
                        : s.yearstatus === "graduated"
                        ? "graduated"
                        : "inactive"
                }">
                  ${s.yearstatus || "active"}
                </span>
              </td>
              <td>
                <button class="action-btn edit-btn" data-id="${
                    s.id
                }" title="Edit">Edit</button>
                <button class="action-btn archive-btn" data-id="${
                    s.id
                }" title="Archive">Archive</button>
              </td>
            </tr>
          `
                  )
                  .join("")
            : `<tr><td colspan="8" class="text-center p-4">No students found.</td></tr>`;

        // Archive logic
        document.querySelectorAll(".archive-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                if (confirm("Archive this student?")) {
                    try {
                        await axios.delete(`/api/students/${id}`);
                        alert("Student archived successfully!");
                        fetchStudents();
                        resetForm();
                    } catch (error) {
                        console.error("Error archiving student:", error.response?.data || error);
                        
                        if (error.response?.status === 401) {
                            alert("Authentication error. Please log in again.");
                            localStorage.removeItem("token");
                            window.location.href = "/";
                        } else {
                            alert("Failed to archive student. Please try again.");
                        }
                    }
                }
            });
        });

        // Edit logic
        document.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                try {
                    const res = await axios.get(`/api/students/${id}`);
                    const s = res.data;

                    document.getElementById("edit_id").value = s.id;
                    document.getElementById("studID").value = s.studID;
                    document.getElementById("firstname").value = s.firstname;
                    document.getElementById("middlename").value =
                        s.middlename || "";
                    document.getElementById("lastname").value = s.lastname;
                    document.getElementById("suffix").value = s.suffix || "";
                    document.getElementById("email").value = s.email;
                    document.getElementById("phone").value = s.phone || "";
                    document.getElementById("date_of_birth").value =
                        s.date_of_birth || "";
                    document.getElementById("sex").value = s.sex || "";
                    document.getElementById("departmentSelect").value =
                        s.department_id || "";
                    updateCourseSelect();
                    document.getElementById("courseSelect").value =
                        s.course_id || "";
                    document.getElementById("academicYearSelectForm").value =
                        s.academic_year_id || "";
                    document.getElementById("yearstatus").value =
                        s.yearstatus || "";
                    document.getElementById("enrollment_date").value =
                        s.enrollment_date || "";

                    document
                        .getElementById("studentModal")
                        .classList.remove("hidden");
                    document.getElementById("studentModalTitle").textContent =
                        "Edit Student";
                    document.getElementById("submitBtn").textContent =
                        "Update Student";
                    isEditing = true;
                    document.body.classList.add("modal-open");
                } catch (error) {
                    console.error("Error fetching student data:", error.response?.data || error);
                    
                    if (error.response?.status === 401) {
                        alert("Authentication error. Please log in again.");
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    } else {
                        alert("Failed to fetch student data. Please try again.");
                    }
                }
            });
        });
    }

    // Modal logic
    function showStudentModal() {
        document.getElementById("studentModal").classList.remove("hidden");
        document.getElementById("studentModalTitle").textContent =
            "Add New Student";
        document.getElementById("submitBtn").textContent = "Save Student";
        resetForm();
        document.body.classList.add("modal-open");
    }
    function hideStudentModal() {
        document.getElementById("studentModal").classList.add("hidden");
        resetForm();
        document.body.classList.remove("modal-open");
    }

    // Add Student button (sidebar and top)
    document
        .getElementById("addStudentBtn")
        .addEventListener("click", showStudentModal);
    const addTop = document.getElementById("addStudentBtnTop");
    if (addTop) {
        addTop.addEventListener("click", showStudentModal);
    }
    document
        .getElementById("closeStudentModal")
        .addEventListener("click", hideStudentModal);
    document
        .getElementById("cancelBtn")
        .addEventListener("click", hideStudentModal);

    // Submit (Add/Edit)
    const form = document.getElementById("studentForm");
    const submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        const id = formData.edit_id;
        delete formData.edit_id;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = isEditing ? "Updating..." : "Saving...";

        try {
            if (isEditing && id) {
                await axios.put(`/api/students/${id}`, formData);
            } else {
                await axios.post("/api/students", formData);
            }
            
            // Success feedback
            alert(isEditing ? "Student updated successfully!" : "Student added successfully!");
            
            form.reset();
            isEditing = false;
            hideStudentModal();
            fetchStudents();
        } catch (error) {
            console.error("Error saving student:", error.response?.data || error);
            
            if (error.response?.status === 401) {
                alert("Authentication error. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/";
            } else if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat().join("\n");
                alert(`Validation errors:\n${errorMessages}`);
            } else {
                alert("Failed to save student. Please try again.");
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = isEditing ? "Update Student" : "Save Student";
        }
    });

    function resetForm() {
        form.reset();
        isEditing = false;
    }

    // Filters & search
    document
        .getElementById("searchInput")
        .addEventListener("input", renderStudents);
    document.getElementById("clearFilters").addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        document.getElementById("departmentFilter").value = "";
        updateCourseFilter();
        document.getElementById("courseFilter").value = "";
        document.getElementById("academicYearFilter").value = "";
        document.getElementById("yearstatusFilter").value = "";
        renderStudents();
    });

    // Initialize
    loadSelectOptions().then(fetchStudents);
}