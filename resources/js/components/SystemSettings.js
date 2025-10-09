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
                <div class="settings-forms">
                    <div class="settings-form-card">
                        <h3>Add Course</h3>
                        <form id="addCourseForm">
                            <input type="text" name="course_name" placeholder="Course Name" required class="input" />
                            <button type="submit" class="btn btn-blue">Add Course</button>
                        </form>
                        <div id="coursesList" style="margin-top:1rem;"></div>
                    </div>
                    <div class="settings-form-card">
                        <h3>Add Department</h3>
                        <form id="addDepartmentForm">
                            <input type="text" name="department_name" placeholder="Department Name" required class="input" />
                            <input type="text" name="department_head" placeholder="Department Head" required class="input" />
                            <button type="submit" class="btn btn-green">Add Department</button>
                        </form>
                        <div id="departmentsList" style="margin-top:1rem;"></div>
                    </div>
                </div>
                <div id="settingsMessage"></div>
            </section>
        </div>
    `;

    // Fetch and render courses
    async function fetchCourses() {
        const res = await fetch('/api/courses');
        const list = document.getElementById('coursesList');
        if (res.ok) {
            const data = await res.json();
            list.innerHTML = `<ul>${data.map(c => `<li>${c.name}</li>`).join('')}</ul>`;
        } else {
            list.innerHTML = '<span style="color:red;">Failed to load courses.</span>';
        }
    }

    // Fetch and render departments
    async function fetchDepartments() {
        const res = await fetch('/api/departments');
        const list = document.getElementById('departmentsList');
        if (res.ok) {
            const data = await res.json();
            list.innerHTML = `<ul>${data.map(d => `<li>${d.name} (${d.head})</li>`).join('')}</ul>`;
        } else {
            list.innerHTML = '<span style="color:red;">Failed to load departments.</span>';
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
            fetchCourses(); // Refresh list
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
            fetchDepartments(); // Refresh list
        } else {
            msg.textContent = "Failed to add department.";
        }
    });
}