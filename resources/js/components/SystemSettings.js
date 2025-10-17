export function loadSystemSettings(app) {
  app.innerHTML = `
    <div class="dashboard-container">
      <nav class="sidebar new-sidebar">
        <div class="sidebar-inner">
          <div class="sidebar-brand">
            <img src="/images/logo.png" alt="EDUTrack" class="sidebar-logo" />
            <div class="brand-title">EDUTrack</div>
          </div>

          <button class="new-item-btn">+ New Item</button>

          <ul class="sidebar-menu">
            <li><a href="#" data-page="overview"><span>Overview</span></a></li>
            <li><a href="#" data-page="students"><span>Students</span></a></li>
            <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
            <li><a href="#" id="menuReport" data-page="report"><span>Report</span></a></li>
            <li><a href="#" data-page="profile"><span>Profile</span></a></li>
            <li><a href="#" class="active" data-page="settings"><span>System Settings</span></a></li>
          </ul>
        </div>

        <div class="sidebar-footer">v1.0.0</div>
      </nav>

      <div class="main new-main">
        <header class="topbar new-topbar">
          <div class="topbar-left">
            <h1 class="dashboard-title">Dashboard</h1>
            <span class="system-settings">⚙️ System Settings</span>
          </div>
          <div class="topbar-center">
            <input type="text" class="search-input" placeholder="Search">
          </div>
        </header>

        <section class="settings-section">
          <div class="settings-header">
            <h2 class="settings-title">⚙️ System Settings</h2>
            <div id="settingsMessage" class="settings-message" aria-live="polite"></div>
          </div>

          <div class="settings-tabs">
            <button class="tab-btn active" data-tab="courses">Courses</button>
            <button class="tab-btn" data-tab="departments">Departments</button>
            <button class="tab-btn" data-tab="academic">Academic Years</button>
            <button class="tab-btn" data-tab="archives">Archives</button>
          </div>

          <div id="tabContent" class="settings-content"></div>
        </section>
      </div>
    </div>
  `;

  /* ---------------- Tab templates (UI only, no inline styles) ---------------- */
  function getCoursesContent() {
    return `
      <div class="settings-panel">
        <div class="panel-top">
          <h3 class="panel-title">Courses</h3>
          <p class="panel-sub">Manage courses and assign to departments</p>
        </div>

        <div class="table-card">
          <table class="settings-table">
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

        <form id="addCourseForm" class="settings-form">
          <input type="hidden" id="edit_course_id" name="edit_course_id" />
          <div class="form-row">
            <input type="text" id="course_name" name="course_name" class="input" placeholder="Course Name" required />
            <select id="course_department_id" name="department_id" class="input" required>
              <option value="">Select Department</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" id="courseSubmitBtn" class="btn btn-blue">Add Course</button>
            <button type="button" id="cancelCourseEditBtn" class="btn btn-gray hidden">Cancel</button>
          </div>
        </form>
      </div>
    `;
  }

  function getDepartmentsContent() {
    return `
      <div class="settings-panel">
        <div class="panel-top">
          <h3 class="panel-title">Departments</h3>
          <p class="panel-sub">Create and manage departments</p>
        </div>

        <div class="table-card">
          <table class="settings-table">
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

        <form id="addDepartmentForm" class="settings-form">
          <input type="hidden" id="edit_department_id" name="edit_department_id" />
          <div class="form-row">
            <input type="text" id="department_name" name="department_name" class="input" placeholder="Department Name" required />
            <input type="text" id="department_head" name="department_head" class="input" placeholder="Department Head" required />
          </div>
          <div class="form-actions">
            <button type="submit" id="departmentSubmitBtn" class="btn btn-green">Add Department</button>
            <button type="button" id="cancelDepartmentEditBtn" class="btn btn-gray hidden">Cancel</button>
          </div>
        </form>
      </div>
    `;
  }

  function getAcademicContent() {
    return `
      <div class="settings-panel">
        <div class="panel-top">
          <h3 class="panel-title">Academic Years</h3>
          <p class="panel-sub">Add academic year ranges and set active</p>
        </div>

        <div class="table-card">
          <table class="settings-table">
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

        <form id="addAcademicForm" class="settings-form">
          <input type="hidden" id="edit_academic_id" />
          <div class="form-row">
            <input type="text" id="academic_year" class="input" placeholder="Academic Year (e.g., 2025-2026)" required />
            <label class="checkbox-wrap"><input type="checkbox" id="is_active" /> Active</label>
          </div>
          <div class="form-actions">
            <button type="submit" id="academicSubmitBtn" class="btn btn-blue">Add Academic Year</button>
            <button type="button" id="cancelAcademicEditBtn" class="btn btn-gray hidden">Cancel</button>
          </div>
        </form>
      </div>
    `;
  }

  function getArchivesContent() {
    return `
      <div class="settings-panel">
        <div class="panel-top">
          <h3 class="panel-title">Archives</h3>
          <p class="panel-sub">Restore archived items</p>
        </div>

        <div class="table-card">
          <table class="settings-table">
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

  /* ---------------- Tab switching ---------------- */
  const tabContent = document.getElementById("tabContent");
  async function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');

    if (tab === "courses") {
      tabContent.innerHTML = getCoursesContent();
      await populateCourseDepartments();
      fetchCourses();
      setupCourseForm();
    } else if (tab === "departments") {
      tabContent.innerHTML = getDepartmentsContent();
      fetchDepartments();
      setupDepartmentForm();
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

  /* ---------------- Courses (logic preserved, UI cleaned) ---------------- */
  let editingCourseId = null;
  async function fetchCourses() {
    const res = await fetch('/api/courses', { credentials: 'include' });
    const table = document.getElementById('coursesTable');
    if (!table) return;
    if (res.ok) {
      const data = await res.json();
      table.innerHTML = data.length
        ? data.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${c.name}</td>
              <td>${c.department?.name || ''}</td>
              <td>
                <button class="btn btn-small btn-edit-course" data-id="${c.id}" data-name="${c.name}" data-department="${c.department_id}">Edit</button>
                <button class="btn btn-small btn-danger btn-delete-course" data-id="${c.id}">Delete</button>
              </td>
            </tr>
          `).join('')
        : `<tr><td colspan="4" class="text-muted">No courses found.</td></tr>`;

      // attach handlers
      document.querySelectorAll('.btn-delete-course').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Are you sure you want to delete this course?')) return;
          await fetch(`/api/courses/${btn.dataset.id}`, { method: 'DELETE', credentials: 'include' });
          fetchCourses();
          resetCourseForm();
        });
      });
      document.querySelectorAll('.btn-edit-course').forEach(btn => {
        btn.addEventListener('click', () => {
          editingCourseId = btn.dataset.id;
          document.getElementById('edit_course_id').value = editingCourseId;
          document.getElementById('course_name').value = btn.dataset.name;
          document.getElementById('course_department_id').value = btn.dataset.department;
          document.getElementById('courseSubmitBtn').textContent = "Update Course";
          document.getElementById('cancelCourseEditBtn').classList.remove('hidden');
        });
      });
    } else {
      table.innerHTML = `<tr><td colspan="4" class="text-error">Failed to load courses.</td></tr>`;
    }
  }

  function setupCourseForm() {
    const form = document.getElementById('addCourseForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const courseName = document.getElementById('course_name').value;
      const departmentId = document.getElementById('course_department_id').value;
      const editId = document.getElementById('edit_course_id').value;
      const msg = document.getElementById('settingsMessage');
      let res;
      const body = JSON.stringify({ name: courseName, department_id: departmentId });

      if (editId) {
        res = await fetch(`/api/courses/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
      } else {
        res = await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
      }
      msg.textContent = res.ok ? (editId ? "Course updated!" : "Course added!") : "Failed to save course.";
      fetchCourses();
      resetCourseForm();
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
  async function fetchDepartments() {
    const res = await fetch('/api/departments', { credentials: 'include' });
    const table = document.getElementById('departmentsTable');
    if (!table) return;
    if (res.ok) {
      const data = await res.json();
      table.innerHTML = data.length
        ? data.map((d, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${d.name}</td>
              <td>${d.head}</td>
              <td>
                <button class="btn btn-small btn-edit-dept" data-id="${d.id}" data-name="${d.name}" data-head="${d.head}">Edit</button>
                <button class="btn btn-small btn-danger btn-delete-dept" data-id="${d.id}">Delete</button>
              </td>
            </tr>
          `).join('')
        : `<tr><td colspan="4" class="text-muted">No departments found.</td></tr>`;

      document.querySelectorAll('.btn-delete-dept').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Are you sure you want to delete this department?')) return;
          await fetch(`/api/departments/${btn.dataset.id}`, { method: 'DELETE', credentials: 'include' });
          fetchDepartments();
          resetDepartmentForm();
        });
      });
      document.querySelectorAll('.btn-edit-dept').forEach(btn => {
        btn.addEventListener('click', () => {
          editingDepartmentId = btn.dataset.id;
          document.getElementById('edit_department_id').value = editingDepartmentId;
          document.getElementById('department_name').value = btn.dataset.name;
          document.getElementById('department_head').value = btn.dataset.head;
          document.getElementById('departmentSubmitBtn').textContent = "Update Department";
          document.getElementById('cancelDepartmentEditBtn').classList.remove('hidden');
        });
      });
    } else {
      table.innerHTML = `<tr><td colspan="4" class="text-error">Failed to load departments.</td></tr>`;
    }
  }

  function setupDepartmentForm() {
    const form = document.getElementById('addDepartmentForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const departmentName = document.getElementById('department_name').value;
      const departmentHead = document.getElementById('department_head').value;
      const editId = document.getElementById('edit_department_id').value;
      const msg = document.getElementById('settingsMessage');
      let res;
      const body = JSON.stringify({ name: departmentName, head: departmentHead });

      if (editId) {
        res = await fetch(`/api/departments/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
      } else {
        res = await fetch('/api/departments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
      }
      msg.textContent = res.ok ? (editId ? "Department updated!" : "Department added!") : "Failed to save department.";
      fetchDepartments();
      resetDepartmentForm();
    });
    document.getElementById('cancelDepartmentEditBtn').addEventListener('click', resetDepartmentForm);
  }

  function resetDepartmentForm() {
    const form = document.getElementById('addDepartmentForm');
    if (!form) return;
    form.reset();
    document.getElementById('edit_department_id').value = "";
    document.getElementById('departmentSubmitBtn').textContent = "Add Department";
    document.getElementById('cancelDepartmentEditBtn').classList.add('hidden');
    editingDepartmentId = null;
  }

  /* ---------------- Academic Years ---------------- */
  let editingAcademicId = null;
  async function fetchAcademicYears() {
    const res = await fetch('/api/academic-years', { credentials: 'include' });
    const table = document.getElementById('academicTable');
    if (!table) return;
    if (res.ok) {
      const data = await res.json();
      table.innerHTML = data.length
        ? data.map((a, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${a.year || a.academic_year}</td>
              <td>${a.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                <button class="btn btn-small btn-edit-academic" data-id="${a.id}" data-year="${a.year || a.academic_year}" data-active="${a.is_active ? 1 : 0}">Edit</button>
                <button class="btn btn-small btn-danger btn-delete-academic" data-id="${a.id}">Archive</button>
              </td>
            </tr>
          `).join('')
        : `<tr><td colspan="4" class="text-muted">No academic years found.</td></tr>`;

      document.querySelectorAll('.btn-delete-academic').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Are you sure you want to archive this academic year?')) return;
          await fetch(`/api/academic-years/${btn.dataset.id}`, { method: 'DELETE', credentials: 'include' });
          fetchAcademicYears();
          resetAcademicForm();
        });
      });
      document.querySelectorAll('.btn-edit-academic').forEach(btn => {
        btn.addEventListener('click', () => {
          editingAcademicId = btn.dataset.id;
          document.getElementById('edit_academic_id').value = editingAcademicId;
          document.getElementById('academic_year').value = btn.dataset.year;
          document.getElementById('is_active').checked = btn.dataset.active === "1";
          document.getElementById('academicSubmitBtn').textContent = "Update Academic Year";
          document.getElementById('cancelAcademicEditBtn').classList.remove('hidden');
        });
      });
    } else {
      table.innerHTML = `<tr><td colspan="4" class="text-error">Failed to load academic years.</td></tr>`;
    }
  }

  function setupAcademicForm() {
    const form = document.getElementById('addAcademicForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const year = document.getElementById('academic_year').value;
      const is_active = document.getElementById('is_active').checked ? 1 : 0;
      const editId = document.getElementById('edit_academic_id').value;
      const msg = document.getElementById('settingsMessage');
      const body = JSON.stringify({ year, is_active });
      let res;

      if (editId) {
        res = await fetch(`/api/academic-years/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
      } else {
        res = await fetch('/api/academic-years', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body });
      }
      msg.textContent = res.ok ? (editId ? "Academic year updated!" : "Academic year added!") : "Failed to save academic year.";
      fetchAcademicYears();
      resetAcademicForm();
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
  async function fetchArchives() {
    const res = await fetch('/api/archives', { credentials: 'include' });
    const table = document.getElementById('archiveTable');
    if (!table) return;
    if (res.ok) {
      const data = await res.json();
      let rows = [];

      (data.courses || []).forEach(c => rows.push({ type: 'Course', name: c.name, id: c.id }));
      (data.departments || []).forEach(d => rows.push({ type: 'Department', name: d.name, id: d.id }));
      (data.academic_years || []).forEach(a => rows.push({ type: 'Academic Year', name: a.year || a.academic_year, id: a.id }));
      (data.faculties || []).forEach(f => rows.push({ type: 'Faculty', name: (f.first_name||f.firstname)+' '+(f.last_name||f.lastname), id: f.id }));
      (data.students || []).forEach(s => rows.push({ type: 'Student', name: (s.first_name||s.firstname)+' '+(s.last_name||s.lastname), id: s.id }));

      table.innerHTML = rows.length
        ? rows.map(r => `
            <tr>
              <td>${r.type}</td>
              <td>${r.name}</td>
              <td><button class="btn btn-small btn-restore" data-type="${r.type.toLowerCase().replace(' ', '_')}" data-id="${r.id}">Restore</button></td>
            </tr>
          `).join('')
        : `<tr><td colspan="3" class="text-muted">No archived data found.</td></tr>`;

      document.querySelectorAll('.btn-restore').forEach(btn => {
        btn.addEventListener('click', async () => {
          const type = btn.dataset.type;
          const id = btn.dataset.id;
          const res = await fetch(`/api/archives/restore/${type}/${id}`, { method: 'POST', credentials: 'include' });
          if (res.ok) {
            alert(`${type} restored successfully!`);
            fetchArchives();
          } else {
            alert('Failed to restore');
          }
        });
      });
    } else {
      table.innerHTML = `<tr><td colspan="3" class="text-error">Failed to load archives.</td></tr>`;
    }
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

  /* ---------------- initialize ---------------- */
  showTab("courses");

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