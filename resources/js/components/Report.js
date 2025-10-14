export function loadReport(app) {
        // Render the report page inside the given app/mainContent element
        app.innerHTML = `
        <div class="report-container">
        <h2 class="report-title">📊 Report</h2>
        <div class="report-filters">
            <select id="courseSelect"><option value="">All Courses</option></select>
            <select id="departmentSelect"><option value="">All Departments</option></select>
            <select id="academicYearSelect"><option value="">All Academic Years</option></select>
            <button id="filterBtn">Filter</button>
        </div>
        <table class="report-table">
            <thead>
            <tr>
                <th>Faculty</th>
                <th>Course</th>
                <th>Department</th>
                <th>Table Title</th>
            </tr>
            </thead>
            <tbody id="reportTableBody">
            <tr><td colspan="4" class="no-data">Loading...</td></tr>
            </tbody>
        </table>
        <div class="make-report">
            <h3>📝 Make a Report</h3>
            <input type="text" id="reportTitle" placeholder="Title" />
            <select id="reportSubject">
            <option value="">Choose Subject</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
            </select>
            <textarea id="reportContent" placeholder="Report content..."></textarea>
            <button class="send-report-btn">Send Report</button>
        </div>
        </div>
    `;

    // Fetch dropdown data
    fetchDropdowns();
    // Fetch default table
    fetchReport();

    // Button & Select events
    document.getElementById("filterBtn").addEventListener("click", fetchReport);

    async function fetchDropdowns() {
        try {
            const [courseRes, deptRes, yearRes] = await Promise.all([
                fetch("/api/courses"),
                fetch("/api/departments"),
                fetch("/api/academic-years")
            ]);

            const [courses, departments, years] = await Promise.all([
                courseRes.json(),
                deptRes.json(),
                yearRes.json()
            ]);

            const courseSelect = document.getElementById("courseSelect");
            const deptSelect = document.getElementById("departmentSelect");
            const yearSelect = document.getElementById("academicYearSelect");

            courses.forEach(c => {
                courseSelect.innerHTML += `<option value="${c.id}">${c.name || c.course_name}</option>`;
            });
            departments.forEach(d => {
                deptSelect.innerHTML += `<option value="${d.id}">${d.name || d.department_name}</option>`;
            });
            years.forEach(y => {
                yearSelect.innerHTML += `<option value="${y.id}">${y.year || y.academic_year}</option>`;
            });
        } catch (err) {
            console.error("Error loading dropdowns:", err);
        }
    }

    async function fetchReport() {
        const course = document.getElementById("courseSelect").value;
        const department = document.getElementById("departmentSelect").value;
        const year = document.getElementById("academicYearSelect").value;
        const tbody = document.getElementById("reportTableBody");

        try {
            const params = new URLSearchParams({
                course_id: course,
                department_id: department,
                academic_year_id: year
            });
            const res = await fetch(`/api/reports/faculty?${params}`);
            const data = await res.json();

            if (!data.length) {
                tbody.innerHTML = `<tr><td colspan="4" class="no-data">No records found</td></tr>`;
                return;
            }

            tbody.innerHTML = data.map(f => `
                <tr>
                    <td>${f.firstname || f.first_name} ${f.lastname || f.last_name}</td>
                    <td>${f.course?.name || f.course?.course_name || "N/A"}</td>
                    <td>${f.department?.name || f.department?.department_name || "N/A"}</td>
                    <td><span class="status-badge active">Active</span></td>
                </tr>
            `).join("");
        } catch (err) {
            console.error("Error fetching report:", err);
            tbody.innerHTML = `<tr><td colspan="4" class="no-data">Error loading data</td></tr>`;
        }
    }
}
