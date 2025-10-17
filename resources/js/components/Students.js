import axios from "axios";

export function loadStudents(app) {
  app.innerHTML = `
    <div class="students-page">
      <aside class="students-sidebar">
        <h2 class="sidebar-title">Menu</h2>
        <button class="primary-btn full-width" id="addStudentBtn">+ Add Student</button>
        <ul class="sidebar-menu">
          <li><a href="#" data-page="overview">Overview</a></li>
          <li><a href="#" class="active" data-page="students">Students</a></li>
          <li><a href="#" data-page="faculty">Faculty</a></li>
          <li><a href="#" id="menuReport" data-page="report">Report</a></li>
          <li><a href="#" data-page="profile">Profile</a></li>
          <li><a href="#" data-page="settings">System Settings</a></li>
        </ul>
      </aside>

      <main class="students-main">
        <header class="students-header">
          <h1>Students Management</h1>
          <button id="addStudentBtnTop" class="primary-btn">+ Add Student</button>
        </header>

        <section class="students-filters">
          <input type="text" id="searchInput" placeholder="Search students..." />
          <select id="departmentFilter"><option value="">All Departments</option></select>
          <select id="courseFilter"><option value="">All Courses</option></select>
          <select id="academicYearFilter"><option value="">All Academic Years</option></select>
          <select id="yearstatusFilter">
            <option value="">All Year Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
          <button id="clearFilters" class="secondary-btn">Clear Filters</button>
        </section>

        <section class="students-table-card">
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
        </section>
      </main>

      <div id="studentModal" class="modal hidden" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="modal-content" role="document">
          <button id="closeStudentModal" class="modal-close" aria-label="Close">&times;</button>
          <h3 id="studentModalTitle">Add New Student</h3>

          <form id="studentForm" class="student-form" autocomplete="on" novalidate>
            <input type="hidden" name="edit_id" id="edit_id" />

            <label for="studID">Student ID</label>
            <input type="text" name="studID" id="studID" placeholder="e.g. STU000123" required />

            <label for="firstname">First Name</label>
            <input type="text" name="firstname" id="firstname" placeholder="First Name" required />

            <label for="middlename">Middle Name</label>
            <input type="text" name="middlename" id="middlename" placeholder="Middle Name" />

            <label for="lastname">Last Name</label>
            <input type="text" name="lastname" id="lastname" placeholder="Last Name" required />

            <label for="suffix">Suffix</label>
            <input type="text" name="suffix" id="suffix" placeholder="Suffix" />

            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="you@example.com" required />

            <label for="phone">Phone</label>
            <input type="text" name="phone" id="phone" placeholder="+123456789" />

            <label for="date_of_birth">Date of Birth</label>
            <input type="date" name="date_of_birth" id="date_of_birth" />

            <label for="sex">Sex</label>
            <select name="sex" id="sex">
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label for="departmentSelect">Department</label>
            <select name="department_id" id="departmentSelect" required>
              <option value="">Select Department</option>
            </select>

            <label for="courseSelect">Course</label>
            <select name="course_id" id="courseSelect" required>
              <option value="">Select Course</option>
            </select>

            <label for="academicYearSelectForm">Academic Year</label>
            <select name="academic_year_id" id="academicYearSelectForm" required>
              <option value="">Select Academic Year</option>
            </select>

            <label for="yearstatus">Year Status</label>
            <select name="yearstatus" id="yearstatus" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>

            <label for="enrollment_date">Enrollment Date</label>
            <input type="date" name="enrollment_date" id="enrollment_date" />

            <div class="form-actions">
              <button type="button" id="cancelBtn" class="secondary-btn">Cancel</button>
              <button type="submit" id="submitBtn" class="primary-btn">Save Student</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  let isEditing = false;
  let allStudents = [];
  let allDepartments = [];
  let allCourses = [];
  let allAcademicYears = [];

  // Load departments, courses, academic years for filters and form
  async function loadSelectOptions() {
    const [departmentsRes, coursesRes, yearsRes] = await Promise.all([
        axios.get("/api/departments"),
        axios.get("/api/courses"),
        axios.get("/api/academic-years")
    ]);
    allDepartments = departmentsRes.data;
    allCourses = coursesRes.data;
    allAcademicYears = yearsRes.data;

    // Department filter
    document.getElementById("departmentFilter").innerHTML =
        `<option value="">All Departments</option>` +
        allDepartments.map(d => `<option value="${d.id}">${d.name}</option>`).join("");

    // Course filter (initially all)
    updateCourseFilter();

    // Academic year filter
    document.getElementById("academicYearFilter").innerHTML =
        `<option value="">All Academic Years</option>` +
        allAcademicYears.map(y => `<option value="${y.id}">${y.year || y.academic_year}</option>`).join("");

    // Department select (form)
    document.getElementById("departmentSelect").innerHTML =
        `<option value="">Select Department</option>` +
        allDepartments.map(d => `<option value="${d.id}">${d.name}</option>`).join("");

    // Academic year select (form)
    document.getElementById("academicYearSelectForm").innerHTML =
        `<option value="">Select Academic Year</option>` +
        allAcademicYears.map(y => `<option value="${y.id}">${y.year || y.academic_year}</option>`).join("");

    // Course select (form, initially all)
    updateCourseSelect();
  }

  // --- FILTER LOGIC ---

  // When department filter changes, update course filter options
  document.addEventListener("change", function(e) {
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
      ? allCourses.filter(c => c.department_id == deptId)
      : allCourses;
    courseFilter.innerHTML =
      `<option value="">All Courses</option>` +
      filteredCourses.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  }

  // --- FORM LOGIC ---

  // When department select (form) changes, update course select (form)
  document.addEventListener("change", function(e) {
    if (e.target && e.target.id === "departmentSelect") {
      updateCourseSelect();
    }
  });

  function updateCourseSelect() {
    const deptId = document.getElementById("departmentSelect").value;
    const courseSelect = document.getElementById("courseSelect");
    let filteredCourses = deptId
      ? allCourses.filter(c => c.department_id == deptId)
      : allCourses;
    courseSelect.innerHTML =
      `<option value="">Select Course</option>` +
      filteredCourses.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  }

  // --- REST OF YOUR LOGIC (fetchStudents, renderStudents, form submit, etc.) ---

  // Fetch students
  async function fetchStudents() {
    try {
      const res = await axios.get("/api/students");
      allStudents = res.data;
      renderStudents();
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  // Render students with filters/search
  function renderStudents() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const department = document.getElementById("departmentFilter").value;
    const course = document.getElementById("courseFilter").value;
    const academicYear = document.getElementById("academicYearFilter").value;
    const yearstatus = document.getElementById("yearstatusFilter").value;

    const tbody = document.getElementById("studentList");
    let filtered = allStudents.filter(s => {
      let match = true;
      if (search) {
        match = (
          (s.studID && s.studID.toLowerCase().includes(search)) ||
          (s.firstname && s.firstname.toLowerCase().includes(search)) ||
          (s.lastname && s.lastname.toLowerCase().includes(search)) ||
          (s.email && s.email.toLowerCase().includes(search))
        );
      }
      if (match && department) match = s.department_id == department;
      if (match && course) match = s.course_id == course;
      if (match && academicYear) match = s.academic_year_id == academicYear;
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
              <td>${s.firstname} ${s.middlename ? s.middlename + ' ' : ''}${s.lastname}</td>
              <td>${allCourses.find(c => c.id == s.course_id)?.name || allCourses.find(c => c.id == s.course_id)?.course_name || ""}</td>
              <td>${allDepartments.find(d => d.id == s.department_id)?.name || allDepartments.find(d => d.id == s.department_id)?.department_name || ""}</td>
              <td>${allAcademicYears.find(y => y.id == s.academic_year_id)?.year || allAcademicYears.find(y => y.id == s.academic_year_id)?.academic_year || ""}</td>
              <td>
                <span class="status-badge ${s.yearstatus === 'active' ? 'active' : s.yearstatus === 'graduated' ? 'graduated' : 'inactive'}">
                  ${s.yearstatus || "active"}
                </span>
              </td>
              <td>
                <button class="action-btn edit edit-btn" data-id="${s.id}" title="Edit">Edit</button>
                <button class="action-btn delete delete-btn" data-id="${s.id}" title="Delete">Delete</button>
              </td>
            </tr>
          `
          )
          .join("")
      : `<tr><td colspan="8" class="text-center p-4">No students found.</td></tr>`;

    // Delete logic
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (confirm("Delete this student?")) {
          await axios.delete(`/api/students/${id}`);
          fetchStudents();
          resetForm();
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
          document.getElementById("middlename").value = s.middlename || "";
          document.getElementById("lastname").value = s.lastname;
          document.getElementById("suffix").value = s.suffix || "";
          document.getElementById("email").value = s.email;
          document.getElementById("phone").value = s.phone || "";
          document.getElementById("date_of_birth").value = s.date_of_birth || "";
          document.getElementById("sex").value = s.sex || "";
          document.getElementById("departmentSelect").value = s.department_id || "";
          updateCourseSelect();
          document.getElementById("courseSelect").value = s.course_id || "";
          document.getElementById("academicYearSelectForm").value = s.academic_year_id || "";
          document.getElementById("yearstatus").value = s.yearstatus || "";
          document.getElementById("enrollment_date").value = s.enrollment_date || "";

          document.getElementById("studentModal").classList.remove("hidden");
          document.getElementById("studentModalTitle").textContent = "Edit Student";
          document.getElementById("submitBtn").textContent = "Update Student";
          document.getElementById("cancelBtn").style.display = "inline-block";
          isEditing = true;
        } catch (error) {
          alert("Failed to fetch student data.");
        }
      });
    });
  }

  // Modal logic
  function showStudentModal() {
    document.getElementById("studentModal").classList.remove("hidden");
    document.getElementById("studentModalTitle").textContent = "Add New Student";
    document.getElementById("submitBtn").textContent = "Save Student";
    resetForm();
  }
  function hideStudentModal() {
    document.getElementById("studentModal").classList.add("hidden");
    resetForm();
  }

  // Add Student button (sidebar and top)
  document.getElementById("addStudentBtn").addEventListener("click", showStudentModal);
  document.getElementById("addStudentBtnTop").addEventListener("click", showStudentModal);
  document.getElementById("closeStudentModal").addEventListener("click", hideStudentModal);
  document.getElementById("cancelBtn").addEventListener("click", hideStudentModal);

  // Submit (Add/Edit)
  const form = document.getElementById("studentForm");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    const id = formData.edit_id;
    delete formData.edit_id;

    try {
      if (isEditing && id) {
        await axios.put(`/api/students/${id}`, formData);
      } else {
        await axios.post("/api/students", formData);
      }
      form.reset();
      isEditing = false;
      hideStudentModal();
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error.response?.data || error);
      alert("Failed to save student. Check console for details.");
    }
  });

  function resetForm() {
    form.reset();
    isEditing = false;
    document.getElementById("cancelBtn").style.display = "none";
  }

  // Filters & search
  document.getElementById("searchInput").addEventListener("input", renderStudents);
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
