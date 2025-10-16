import axios from "axios";

export function loadFaculty(app) {
  app.innerHTML = `
    <div class="faculty-page">
      <aside class="faculty-sidebar">
        <h2 class="sidebar-title">Menu</h2>
        <button class="primary-btn full-width" id="addFacultyBtn">+ Add Faculty</button>
        <ul class="sidebar-menu">
          <li><a href="#" data-page="overview">Overview</a></li>
          <li><a href="#" data-page="students">Students</a></li>
          <li><a href="#" class="active" data-page="faculty">Faculty</a></li>
          <li><a href="#" data-page="archive">Archive</a></li>
          <li><a href="#" id="menuReport" data-page="report">Report</a></li>
          <li><a href="#" data-page="profile">Profile</a></li>
          <li><a href="#" data-page="settings">System Settings</a></li>
        </ul>
      </aside>

      <main class="faculty-main">
        <header class="faculty-header">
          <h1>Faculty Management</h1>
          <button id="addFacultyBtnTop" class="primary-btn">+ Add Faculty</button>
        </header>

        <section class="faculty-filters">
          <input type="text" id="searchInput" placeholder="Search faculty..." />
          <select id="departmentFilter"><option value="">All Departments</option></select>
          <select id="academicYearFilter"><option value="">All Academic Years</option></select>
          <select id="yearstatusFilter">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
          <button id="clearFilters" class="secondary-btn">Clear Filters</button>
        </section>

        <section class="faculty-table-card">
          <table class="faculty-table">
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
        </section>
      </main>

      <div id="facultyModal" class="modal hidden">
        <div class="modal-content">
          <button id="closeFacultyModal" class="modal-close">&times;</button>
          <h3 id="facultyModalTitle">Add New Faculty</h3>
          <form id="facultyForm" class="faculty-form">
            <input type="hidden" name="edit_id" id="edit_id" />
            <input type="text" name="faculty_id" id="faculty_id" placeholder="Faculty ID" required />
            <input type="text" name="first_name" id="first_name" placeholder="First Name" required />
            <input type="text" name="middle_name" id="middle_name" placeholder="Middle Name" />
            <input type="text" name="last_name" id="last_name" placeholder="Last Name" required />
            <input type="email" name="email" id="email" placeholder="Email" required />
            <input type="text" name="phone" id="phone" placeholder="Phone" />
            <input type="text" name="address" id="address" placeholder="Address" />
            <input type="text" name="position" id="position" placeholder="Position" />
            <input type="date" name="date_hired" id="date_hired" />
            <select name="department_id" id="departmentSelect" required>
              <option value="">Select Department</option>
            </select>
            <select name="academic_year_id" id="academicYearSelectForm" required>
              <option value="">Select Academic Year</option>
            </select>
            <select name="yearstatus" id="yearstatus" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>

            <div class="form-actions">
              <button type="button" id="cancelBtn" class="secondary-btn">Cancel</button>
              <button type="submit" id="submitBtn" class="primary-btn">Save Faculty</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

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
              <button class="action-btn edit" data-id="${f.id}">✏️</button>
              <button class="action-btn delete" data-id="${f.id}">🗑️</button>
            </td>
          </tr>
        `)
          .join("")
      : `<tr><td colspan="9" class="text-center p-4">No faculty found.</td></tr>`;

    // Attach edit/delete logic
    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", () => openEditModal(btn.dataset.id));
    });
    document.querySelectorAll(".delete").forEach(btn => {
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
  }

  // Modal logic
  document.getElementById("addFacultyBtn").addEventListener("click", showModal);
  document.getElementById("addFacultyBtnTop").addEventListener("click", showModal);
  document.getElementById("closeFacultyModal").addEventListener("click", hideModal);
  document.getElementById("cancelBtn").addEventListener("click", hideModal);

  function showModal() {
    document.getElementById("facultyModal").classList.remove("hidden");
    document.getElementById("facultyModalTitle").textContent = "Add New Faculty";
    document.getElementById("submitBtn").textContent = "Save Faculty";
    resetForm();
  }

  function hideModal() {
    document.getElementById("facultyModal").classList.add("hidden");
    resetForm();
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
  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("departmentFilter").value = "";
    document.getElementById("academicYearFilter").value = "";
    document.getElementById("yearstatusFilter").value = "";
    renderFaculty();
  });

  loadSelectOptions().then(fetchFaculty);
}
