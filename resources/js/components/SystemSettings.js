export function loadSystemSettings(app) {
    app.innerHTML = `
        <nav class="sidebar new-sidebar">
            <button class="new-item-btn">+ New Item</button>
            <ul class="sidebar-menu">
                <li><a href="#" data-page="overview"><span>Overview</span></a></li>
                <li><a href="#" data-page="students"><span>Students</span></a></li>
                <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
                <li><a href="#" data-page="archive"><span>Archive</span></a></li>
                <li><a href="#" id="menuReport" data-page="report"><span>Report</span></a></li>
                <li><a href="#" data-page="profile"><span>Profile</span></a></li>
                <li><a href="#" class="active" data-page="settings"><span>System Settings</span></a></li>
            </ul>
        </nav>
        <div class="main new-main">
            <header class="topbar new-topbar">
                <div class="topbar-left">
                    <h1 class="dashboard-title">DashBoard</h1>
                    <span class="system-settings">⚙️ System Settings</span>
                </div>
                <div class="topbar-center">
                    <input type="text" class="search-input" placeholder="Search">
                </div>
                
            </header>
            <section class="settings-section">
                <h2 class="settings-title"><span style="font-size:2rem;">⚙️</span> System Settings</h2>
                <div class="settings-tabs" style="margin-bottom:2rem;">
                    <button class="tab-btn active" data-tab="courses">Courses</button>
                    <button class="tab-btn" data-tab="departments">Departments</button>
                    <button class="tab-btn" data-tab="academic">Academic Years</button>
                    <button class="tab-btn" data-tab="archives">Archives</button>
                </div>
                <div id="tabContent">
                    <!-- Courses tab content will be loaded here by default -->
                </div>
                <div id="settingsMessage"></div>
            </section>
        </div>
    `;

    // --- Tab Content Templates ---
    function getCoursesContent() {
        return `
            <div>
                <h4>Courses List</h4>
                <table style="width:100%;border-collapse:collapse;margin-bottom:1rem;">
                    <thead>
                        <tr style="background:#f3f4f6;">
                            <th style="padding:8px;border:1px solid #e5e7eb;">#</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Course Name</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="coursesTable"></tbody>
                </table>
                <h3>Add / Edit Course</h3>
                <form id="addCourseForm">
                    <input type="hidden" name="edit_course_id" id="edit_course_id" />
                    <input type="text" name="course_name" id="course_name" placeholder="Course Name" required class="input" />
                    <button type="submit" class="btn btn-blue" id="courseSubmitBtn">Add Course</button>
                    <button type="button" class="btn btn-gray" id="cancelCourseEditBtn" style="display:none;">Cancel</button>
                </form>
            </div>
        `;
    }

    function getDepartmentsContent() {
        return `
            <div>
                <h4>Departments List</h4>
                <table style="width:100%;border-collapse:collapse;margin-bottom:1rem;">
                    <thead>
                        <tr style="background:#f3f4f6;">
                            <th style="padding:8px;border:1px solid #e5e7eb;">#</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Department Name</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Head</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="departmentsTable"></tbody>
                </table>
                <h3>Add / Edit Department</h3>
                <form id="addDepartmentForm">
                    <input type="hidden" name="edit_department_id" id="edit_department_id" />
                    <input type="text" name="department_name" id="department_name" placeholder="Department Name" required class="input" />
                    <input type="text" name="department_head" id="department_head" placeholder="Department Head" required class="input" />
                    <button type="submit" class="btn btn-green" id="departmentSubmitBtn">Add Department</button>
                    <button type="button" class="btn btn-gray" id="cancelDepartmentEditBtn" style="display:none;">Cancel</button>
                </form>
            </div>
        `;
    }

    function getAcademicContent() {
        return `
            <div>
                <h4>Academic Years List</h4>
                <table style="width:100%;border-collapse:collapse;margin-bottom:1rem;">
                    <thead>
                        <tr style="background:#f3f4f6;">
                            <th style="padding:8px;border:1px solid #e5e7eb;">#</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Academic Year</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Status</th>
                            <th style="padding:8px;border:1px solid #e5e7eb;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="academicTable"></tbody>
                </table>
                <h3>Add / Edit Academic Year</h3>
                <form id="addAcademicForm">
                    <input type="hidden" id="edit_academic_id">
                    <input type="text" id="academic_year" placeholder="Academic Year (e.g., 2025-2026)" required>
                    <label><input type="checkbox" id="is_active"> Active</label>
                    <button type="submit" id="academicSubmitBtn">Add Academic Year</button>
                    <button type="button" id="cancelAcademicEditBtn" style="display:none;">Cancel</button>
                </form>
            </div>
        `;
    }

    function getArchivesContent() {
        return `
        <div>
            <h4>Archived Data</h4>
            <table style="width:100%;border-collapse:collapse;margin-bottom:1rem;">
                <thead>
                    <tr style="background:#f3f4f6;">
                        <th style="padding:8px;border:1px solid #e5e7eb;">Type</th>
                        <th style="padding:8px;border:1px solid #e5e7eb;">Name/Title</th>
                        <th style="padding:8px;border:1px solid #e5e7eb;">Action</th>
                    </tr>
                </thead>
                <tbody id="archiveTable"></tbody>
            </table>
        </div>
    `;
    }

    async function fetchArchives() {
        const res = await fetch('/api/archives');
        const table = document.getElementById('archiveTable');
        if (res.ok) {
            const data = await res.json();
            let html = '';

            data.courses.forEach(c =>
                html += `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">Course</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${c.name}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;"><button onclick="restoreItem('course',${c.id})">Restore</button></td>
                </tr>`
            );
            data.departments.forEach(d =>
                html += `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">Department</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${d.name}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;"><button onclick="restoreItem('department',${d.id})">Restore</button></td>
                </tr>`
            );
            data.academic_years.forEach(a =>
                html += `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">Academic Year</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${a.year || a.academic_year}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;"><button onclick="restoreItem('academic_year',${a.id})">Restore</button></td>
                </tr>`
            );
            data.faculties.forEach(f =>
                html += `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">Faculty</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${f.first_name || f.firstname} ${f.last_name || f.lastname}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;"><button onclick="restoreItem('faculty',${f.id})">Restore</button></td>
                </tr>`
            );
            data.students.forEach(s =>
                html += `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">Student</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${s.first_name || s.firstname} ${s.last_name || s.lastname}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;"><button onclick="restoreItem('student',${s.id})">Restore</button></td>
                </tr>`
            );

            if (!html) {
                html = `<tr><td colspan="3" style="text-align:center;padding:8px;">No archived data found.</td></tr>`;
            }
            table.innerHTML = html;
        } else {
            table.innerHTML = `<tr><td colspan="3" style="color:red;text-align:center;">Failed to load archives.</td></tr>`;
        }
    }

    // Make restoreItem globally available for inline onclick
    window.restoreItem = async function(type, id) {
        const res = await fetch(`/api/archives/restore/${type}/${id}`, { method: 'POST' });
        if (res.ok) {
            alert(`${type} restored successfully!`);
            fetchArchives();
        } else {
            alert('Failed to restore');
        }
    };

    // --- Tab Switching Logic ---
    const tabContent = document.getElementById("tabContent");
    function showTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
        if (tab === "courses") {
            tabContent.innerHTML = getCoursesContent();
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

    // --- Courses Logic ---
    let editingCourseId = null;
    async function fetchCourses() {
        const res = await fetch('/api/courses');
        const table = document.getElementById('coursesTable');
        if (res.ok) {
            const data = await res.json();
            table.innerHTML = data.length
                ? data.map((c, i) => `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${i + 1}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${c.name}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">
                        <button class="edit-course-btn" data-id="${c.id}" data-name="${c.name}" style="color:#fff;background:#3b82f6;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;margin-right:4px;">Edit</button>
                        <button class="delete-course-btn" data-id="${c.id}" style="color:#fff;background:#ef4444;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;">Delete</button>
                    </td>
                </tr>`).join('')
                : `<tr><td colspan="3" style="text-align:center;padding:8px;">No courses found.</td></tr>`;
            document.querySelectorAll('.delete-course-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    if (confirm('Are you sure you want to delete this course?')) {
                        await fetch(`/api/courses/${btn.dataset.id}`, { method: 'DELETE' });
                        fetchCourses();
                        resetCourseForm();
                    }
                });
            });
            document.querySelectorAll('.edit-course-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    editingCourseId = btn.dataset.id;
                    document.getElementById('edit_course_id').value = editingCourseId;
                    document.getElementById('course_name').value = btn.dataset.name;
                    document.getElementById('courseSubmitBtn').textContent = "Update Course";
                    document.getElementById('cancelCourseEditBtn').style.display = "inline-block";
                });
            });
        } else {
            table.innerHTML = `<tr><td colspan="3" style="color:red;text-align:center;">Failed to load courses.</td></tr>`;
        }
    }
    function setupCourseForm() {
        document.getElementById('addCourseForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const courseName = document.getElementById('course_name').value;
            const editId = document.getElementById('edit_course_id').value;
            const msg = document.getElementById('settingsMessage');
            let res;
            if (editId) {
                res = await fetch(`/api/courses/${editId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ name: courseName })
                });
            } else {
                res = await fetch('/api/courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ name: courseName })
                });
            }
            if (res.ok) {
                msg.textContent = editId ? "Course updated!" : "Course added!";
                fetchCourses();
                resetCourseForm();
            } else {
                msg.textContent = "Failed to save course.";
            }
        });
        document.getElementById('cancelCourseEditBtn').addEventListener('click', resetCourseForm);
    }
    function resetCourseForm() {
        document.getElementById('addCourseForm').reset();
        document.getElementById('edit_course_id').value = "";
        document.getElementById('courseSubmitBtn').textContent = "Add Course";
        document.getElementById('cancelCourseEditBtn').style.display = "none";
        editingCourseId = null;
    }

    // --- Departments Logic ---
    let editingDepartmentId = null;
    async function fetchDepartments() {
        const res = await fetch('/api/departments');
        const table = document.getElementById('departmentsTable');
        if (res.ok) {
            const data = await res.json();
            table.innerHTML = data.length
                ? data.map((d, i) => `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${i + 1}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${d.name}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${d.head}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">
                        <button class="edit-dept-btn" data-id="${d.id}" data-name="${d.name}" data-head="${d.head}" style="color:#fff;background:#3b82f6;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;margin-right:4px;">Edit</button>
                        <button class="delete-dept-btn" data-id="${d.id}" style="color:#fff;background:#ef4444;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;">Delete</button>
                    </td>
                </tr>`).join('')
                : `<tr><td colspan="4" style="text-align:center;padding:8px;">No departments found.</td></tr>`;
            document.querySelectorAll('.delete-dept-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    if (confirm('Are you sure you want to delete this department?')) {
                        await fetch(`/api/departments/${btn.dataset.id}`, { method: 'DELETE' });
                        fetchDepartments();
                        resetDepartmentForm();
                    }
                });
            });
            document.querySelectorAll('.edit-dept-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    editingDepartmentId = btn.dataset.id;
                    document.getElementById('edit_department_id').value = editingDepartmentId;
                    document.getElementById('department_name').value = btn.dataset.name;
                    document.getElementById('department_head').value = btn.dataset.head;
                    document.getElementById('departmentSubmitBtn').textContent = "Update Department";
                    document.getElementById('cancelDepartmentEditBtn').style.display = "inline-block";
                });
            });
        } else {
            table.innerHTML = `<tr><td colspan="4" style="color:red;text-align:center;">Failed to load departments.</td></tr>`;
        }
    }
    function setupDepartmentForm() {
        document.getElementById('addDepartmentForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const departmentName = document.getElementById('department_name').value;
            const departmentHead = document.getElementById('department_head').value;
            const editId = document.getElementById('edit_department_id').value;
            const msg = document.getElementById('settingsMessage');
            let res;
            if (editId) {
                res = await fetch(`/api/departments/${editId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ name: departmentName, head: departmentHead })
                });
            } else {
                res = await fetch('/api/departments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ name: departmentName, head: departmentHead })
                });
            }
            if (res.ok) {
                msg.textContent = editId ? "Department updated!" : "Department added!";
                fetchDepartments();
                resetDepartmentForm();
            } else {
                msg.textContent = "Failed to save department.";
            }
        });
        document.getElementById('cancelDepartmentEditBtn').addEventListener('click', resetDepartmentForm);
    }
    function resetDepartmentForm() {
        document.getElementById('addDepartmentForm').reset();
        document.getElementById('edit_department_id').value = "";
        document.getElementById('departmentSubmitBtn').textContent = "Add Department";
        document.getElementById('cancelDepartmentEditBtn').style.display = "none";
        editingDepartmentId = null;
    }

    // --- Academic Years Logic ---
    let editingAcademicId = null;

    async function fetchAcademicYears() {
        const res = await fetch('/api/academic-years');
        const table = document.getElementById('academicTable');

        if (res.ok) {
            const data = await res.json();
            table.innerHTML = data.length
                ? data.map((a, i) => `<tr>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${i + 1}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${a.year}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">${a.is_active ? 'Active' : 'Inactive'}</td>
                    <td style="padding:8px;border:1px solid #e5e7eb;">
                        <button class="edit-academic-btn" data-id="${a.id}" data-year="${a.year}" data-active="${a.is_active}" style="color:#fff;background:#3b82f6;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;margin-right:4px;">Edit</button>
                        <button class="delete-academic-btn" data-id="${a.id}" style="color:#fff;background:#ef4444;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;">Archive</button>
                    </td>
                </tr>`).join('')
                : `<tr><td colspan="4" style="text-align:center;padding:8px;">No academic years found.</td></tr>`;

            // Delete
            document.querySelectorAll('.delete-academic-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    if (confirm('Are you sure you want to archive this academic year?')) {
                        await fetch(`/api/academic-years/${btn.dataset.id}`, { method: 'DELETE' });
                        fetchAcademicYears();
                        resetAcademicForm();
                    }
                });
            });

            // Edit
            document.querySelectorAll('.edit-academic-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    editingAcademicId = btn.dataset.id;
                    document.getElementById('edit_academic_id').value = editingAcademicId;
                    document.getElementById('academic_year').value = btn.dataset.year;
                    document.getElementById('is_active').checked = btn.dataset.active === "1";
                    document.getElementById('academicSubmitBtn').textContent = "Update Academic Year";
                    document.getElementById('cancelAcademicEditBtn').style.display = "inline-block";
                });
            });
        } else {
            table.innerHTML = `<tr><td colspan="4" style="color:red;text-align:center;">Failed to load academic years.</td></tr>`;
        }
    }

    function setupAcademicForm() {
        document.getElementById('addAcademicForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const year = document.getElementById('academic_year').value;
            const is_active = document.getElementById('is_active').checked ? 1 : 0;
            const editId = document.getElementById('edit_academic_id').value;
            const msg = document.getElementById('settingsMessage');
            let res;

            const bodyData = JSON.stringify({ year, is_active });

            if (editId) {
                res = await fetch(`/api/academic-years/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    credentials: 'include',
                    body: bodyData
                });
            } else {
                res = await fetch('/api/academic-years', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    credentials: 'include',
                    body: bodyData
                });
            }

            if (res.ok) {
                msg.textContent = editId ? "Academic year updated!" : "Academic year added!";
                fetchAcademicYears();
                resetAcademicForm();
            } else {
                msg.textContent = "Failed to save academic year.";
            }
        });

        document.getElementById('cancelAcademicEditBtn').addEventListener('click', resetAcademicForm);
    }

    function resetAcademicForm() {
        document.getElementById('addAcademicForm').reset();
        document.getElementById('edit_academic_id').value = "";
        document.getElementById('academicSubmitBtn').textContent = "Add Academic Year";
        document.getElementById('cancelAcademicEditBtn').style.display = "none";
        editingAcademicId = null;
    }


    async function fetchArchives() {
        const res = await fetch('/api/archives');
        const table = document.getElementById('archiveTable');
        if (res.ok) {
            const data = await res.json();
            let html = '';

            // Courses
            html += '<tr><th colspan="3">Archived Courses</th></tr>';
            html += data.courses.length
                ? data.courses.map(c => `
                    <tr>
                        <td>${c.name}</td>
                        <td>Course</td>
                        <td><button onclick="restoreItem('course', ${c.id})">Restore</button></td>
                    </tr>`).join('')
                : '<tr><td colspan="3">No archived courses</td></tr>';

            // Departments
            html += '<tr><th colspan="3">Archived Departments</th></tr>';
            html += data.departments.length
                ? data.departments.map(d => `
                    <tr>
                        <td>${d.name}</td>
                        <td>Department</td>
                        <td><button onclick="restoreItem('department', ${d.id})">Restore</button></td>
                    </tr>`).join('')
                : '<tr><td colspan="3">No archived departments</td></tr>';

            // Academic Years
            html += '<tr><th colspan="3">Archived Academic Years</th></tr>';
            html += data.academic_years.length
                ? data.academic_years.map(a => `
                    <tr>
                        <td>${a.academic_year}</td>
                        <td>Academic Year</td>
                        <td><button onclick="restoreItem('academic_year', ${a.id})">Restore</button></td>
                    </tr>`).join('')
                : '<tr><td colspan="3">No archived academic years</td></tr>';

            // Faculties
            html += '<tr><th colspan="3">Archived Faculties</th></tr>';
            html += data.faculties.length
                ? data.faculties.map(f => `
                    <tr>
                        <td>${f.firstname} ${f.lastname}</td>
                        <td>Faculty</td>
                        <td><button onclick="restoreItem('faculty', ${f.id})">Restore</button></td>
                    </tr>`).join('')
                : '<tr><td colspan="3">No archived faculties</td></tr>';

            // Students
            html += '<tr><th colspan="3">Archived Students</th></tr>';
            html += data.students.length
                ? data.students.map(s => `
                    <tr>
                        <td>${s.firstname} ${s.lastname}</td>
                        <td>Student</td>
                        <td><button onclick="restoreItem('student', ${s.id})">Restore</button></td>
                    </tr>`).join('')
                : '<tr><td colspan="3">No archived students</td></tr>';

            table.innerHTML = html;
        } else {
            table.innerHTML = '<tr><td colspan="3" style="color:red;">Failed to load archives</td></tr>';
        }   
    }

    async function restoreItem(type, id) {
        const res = await fetch(`/api/archives/restore/${type}/${id}`, { method: 'POST' });
        if (res.ok) {
            alert(`${type} restored successfully!`);
            fetchArchives();
        } else {
            alert('Failed to restore');
        }
    }

    // --- Initial Tab ---
    showTab("courses");

    // Navigation for sidebar (reuse your Dashboard logic if needed)
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page === 'overview') window.location.reload(); // Or call your loadDashboard
            // Add more navigation as needed
        });
    });

    
}