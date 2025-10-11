export function loadSystemSettings(app) {
    app.innerHTML = `
        <nav class="sidebar new-sidebar">
            <button class="new-item-btn">+ New Item</button>
            <ul class="sidebar-menu">
                <li><a href="#" data-page="overview"><span>Overview</span></a></li>
                <li><a href="#" data-page="students"><span>Students</span></a></li>
                <li><a href="#" data-page="faculty"><span>Faculty</span></a></li>
                <li><a href="#" data-page="archive"><span>Archive</span></a></li>
                <li><a href="#" data-page="report"><span>Report</span></a></li>
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
                <div class="topbar-right">
                    <span class="user">👤 Balbuena Ivan</span>
                    <button id="logoutBtn" class="logout-btn">Logout</button>
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
                <h4>Academic Years</h4>
                <p style="color:#888;">(You can implement academic year management here.)</p>
            </div>
        `;
    }

    function getArchivesContent() {
        return `
            <div>
                <h4>Archives</h4>
                <p style="color:#888;">(You can implement archive management here.)</p>
            </div>
        `;
    }

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
        } else if (tab === "archives") {
            tabContent.innerHTML = getArchivesContent();
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

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    });
}