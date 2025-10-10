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
                <div class="settings-forms" style="display:flex;gap:2rem;flex-wrap:wrap;">
                    <div class="settings-form-card" style="flex:1;">
                        <h3>Add Course</h3>
                        <form id="addCourseForm">
                            <input type="text" name="course_name" placeholder="Course Name" required class="input" />
                            <button type="submit" class="btn btn-blue">Add Course</button>
                        </form>
                        <div style="margin-top:2rem;">
                            <h4>Courses List</h4>
                            <table style="width:100%;border-collapse:collapse;margin-top:0.5rem;">
                                <thead>
                                    <tr style="background:#f3f4f6;">
                                        <th style="padding:8px;border:1px solid #e5e7eb;">#</th>
                                        <th style="padding:8px;border:1px solid #e5e7eb;">Course Name</th>
                                        <th style="padding:8px;border:1px solid #e5e7eb;">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="coursesTable"></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="settings-form-card" style="flex:1;">
                        <h3>Add Department</h3>
                        <form id="addDepartmentForm">
                            <input type="text" name="department_name" placeholder="Department Name" required class="input" />
                            <input type="text" name="department_head" placeholder="Department Head" required class="input" />
                            <button type="submit" class="btn btn-green">Add Department</button>
                        </form>
                        <div style="margin-top:2rem;">
                            <h4>Departments List</h4>
                            <table style="width:100%;border-collapse:collapse;margin-top:0.5rem;">
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
                        </div>
                    </div>
                </div>
                <div id="settingsMessage"></div>
            </section>
        </div>
    `;

    // Fetch and render courses
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
                        <button class="delete-course-btn" data-id="${c.id}" style="color:#fff;background:#ef4444;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;">Delete</button>
                    </td>
                </tr>`).join('')
                : `<tr><td colspan="3" style="text-align:center;padding:8px;">No courses found.</td></tr>`;
            // Add delete event listeners
            document.querySelectorAll('.delete-course-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    if (confirm('Are you sure you want to delete this course?')) {
                        await fetch(`/api/courses/${btn.dataset.id}`, { method: 'DELETE' });
                        fetchCourses();
                    }
                });
            });
        } else {
            table.innerHTML = `<tr><td colspan="3" style="color:red;text-align:center;">Failed to load courses.</td></tr>`;
        }
    }

    // Fetch and render departments
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
                        <button class="delete-dept-btn" data-id="${d.id}" style="color:#fff;background:#ef4444;border:none;padding:4px 10px;border-radius:5px;cursor:pointer;">Delete</button>
                    </td>
                </tr>`).join('')
                : `<tr><td colspan="4" style="text-align:center;padding:8px;">No departments found.</td></tr>`;
            // Add delete event listeners
            document.querySelectorAll('.delete-dept-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    if (confirm('Are you sure you want to delete this department?')) {
                        await fetch(`/api/departments/${btn.dataset.id}`, { method: 'DELETE' });
                        fetchDepartments();
                    }
                });
            });
        } else {
            table.innerHTML = `<tr><td colspan="4" style="color:red;text-align:center;">Failed to load departments.</td></tr>`;
        }
    }

    // Initial fetch
    fetchCourses();
    fetchDepartments();

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

    // Add Course
    document.getElementById('addCourseForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const courseName = this.course_name.value;
        const res = await fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name: courseName })
        });
        const msg = document.getElementById('settingsMessage');
        if (res.ok) {
            msg.textContent = "Course added!";
            this.reset();
            fetchCourses(); // Refresh table
        } else {
            msg.textContent = "Failed to add course.";
        }
    });

    // Add Department
    document.getElementById('addDepartmentForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const departmentName = this.department_name.value;
        const departmentHead = this.department_head.value;
        const res = await fetch('/api/departments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name: departmentName, head: departmentHead })
        });
        const msg = document.getElementById('settingsMessage');
        if (res.ok) {
            msg.textContent = "Department added!";
            this.reset();
            fetchDepartments(); // Refresh table
        } else {
            msg.textContent = "Failed to add department.";
        }
    });
}