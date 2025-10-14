import axios from "axios";

export async function loadFaculty(app) {
    app.innerHTML = `
      <div class="faculty-container p-4">
        <h2 class="text-2xl font-bold mb-4">Faculty Management</h2>
        <div class="flex flex-wrap gap-2 mb-4 items-center">
          <input type="text" id="searchInput" placeholder="Search faculty..." class="border p-2 rounded flex-1 min-w-[200px]"/>
          <select id="departmentFilter" class="border p-2 rounded">
            <option value="">All Departments</option>
          </select>
          <select id="academicYearFilter" class="border p-2 rounded">
            <option value="">All Academic Years</option>
          </select>
          <select id="yearstatusFilter" class="border p-2 rounded">
            <option value="">All YearStatus</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="retired">Retired</option>
          </select>
          <button id="clearFilters" class="border px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">Clear</button>
        </div>
        <table class="w-full border-collapse border text-sm mb-8 bg-white shadow rounded">
          <thead class="bg-gray-100">
            <tr>
              <th class="border p-2">ID</th>
              <th class="border p-2">Faculty ID</th>
              <th class="border p-2">Name</th>
              <th class="border p-2">Email</th>
              <th class="border p-2">Department</th>
              <th class="border p-2">Academic Year</th>
              <th class="border p-2">YearStatus</th>
              <th class="border p-2">Position</th>
              <th class="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody id="facultyList"></tbody>
        </table>

        <!-- Add/Edit Faculty Form -->
        <form id="facultyForm" class="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow">
          <input type="hidden" name="edit_id" id="edit_id">
          <input type="text" name="faculty_id" id="faculty_id" placeholder="Faculty ID (e.g. F001)" class="border p-2 rounded" required>
          <input type="text" name="first_name" id="first_name" placeholder="First Name" class="border p-2 rounded" required>
          <input type="text" name="middle_name" id="middle_name" placeholder="Middle Name" class="border p-2 rounded">
          <input type="text" name="last_name" id="last_name" placeholder="Last Name" class="border p-2 rounded" required>
          <input type="email" name="email" id="email" placeholder="Email" class="border p-2 rounded" required>
          <input type="text" name="phone" id="phone" placeholder="Phone" class="border p-2 rounded">
          <input type="text" name="address" id="address" placeholder="Address" class="border p-2 rounded">
          <select name="department_id" id="departmentSelect" class="border p-2 rounded" required>
            <option value="">Select Department</option>
          </select>
          <select name="academic_year_id" id="academicYearSelectForm" class="border p-2 rounded" required>
            <option value="">Select Academic Year</option>
          </select>
          <select name="yearstatus" id="yearstatus" class="border p-2 rounded" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="retired">Retired</option>
          </select>
          <input type="text" name="position" id="position" placeholder="Position" class="border p-2 rounded">
          <input type="date" name="date_hired" id="date_hired" class="border p-2 rounded">
          <div class="col-span-2 flex gap-2">
            <button type="submit" class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700" id="submitBtn">
              Add Faculty
            </button>
            <button type="button" class="bg-gray-400 text-white p-2 rounded hover:bg-gray-500" id="cancelBtn" style="display:none;">
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;

    let isEditing = false;
    let allDepartments = [];
    let allAcademicYears = [];
    let allFaculty = [];

    // Load department and academic year options
    async function loadSelectOptions() {
        try {
            const [departmentsRes, yearsRes] = await Promise.all([
                axios.get("/api/departments"),
                axios.get("/api/academic-years")
            ]);
            allDepartments = departmentsRes.data;
            allAcademicYears = yearsRes.data;

            // Filters
            document.getElementById("departmentFilter").innerHTML =
                `<option value="">All Departments</option>` +
                allDepartments.map(d => `<option value="${d.id}">${d.name || d.department_name}</option>`).join("");
            document.getElementById("academicYearFilter").innerHTML =
                `<option value="">All Academic Years</option>` +
                allAcademicYears.map(y => `<option value="${y.id}">${y.year || y.academic_year}</option>`).join("");

            // Form
            document.getElementById("departmentSelect").innerHTML =
                `<option value="">Select Department</option>` +
                allDepartments.map(d => `<option value="${d.id}">${d.name || d.department_name}</option>`).join("");
            document.getElementById("academicYearSelectForm").innerHTML =
                `<option value="">Select Academic Year</option>` +
                allAcademicYears.map(y => `<option value="${y.id}">${y.year || y.academic_year}</option>`).join("");
        } catch (error) {
            alert("Failed to load departments or academic years.");
        }
    }
    await loadSelectOptions();

    // Fetch faculty
    async function fetchFaculty() {
        try {
            const res = await axios.get("/api/faculty");
            allFaculty = res.data;
            renderFaculty();
        } catch (error) {
            console.error("Error fetching faculty:", error);
        }
    }
    await fetchFaculty();

    // Render faculty with filters/search
    function renderFaculty() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const department = document.getElementById("departmentFilter").value;
        const academicYear = document.getElementById("academicYearFilter").value;
        const yearstatus = document.getElementById("yearstatusFilter").value;

        const tbody = document.getElementById("facultyList");
        let filtered = allFaculty.filter(f => {
            let match = true;
            if (search) {
                match = (
                    (f.faculty_id && f.faculty_id.toLowerCase().includes(search)) ||
                    (f.first_name && f.first_name.toLowerCase().includes(search)) ||
                    (f.last_name && f.last_name.toLowerCase().includes(search)) ||
                    (f.email && f.email.toLowerCase().includes(search))
                );
            }
            if (match && department) match = f.department_id == department;
            if (match && academicYear) match = f.academic_year_id == academicYear;
            if (match && yearstatus) match = f.yearstatus == yearstatus;
            return match;
        });

        tbody.innerHTML = filtered.length
            ? filtered.map(f => `
                <tr>
                  <td class="border p-2">${f.id}</td>
                  <td class="border p-2">${f.faculty_id}</td>
                  <td class="border p-2">${f.first_name} ${f.middle_name ? f.middle_name + ' ' : ''}${f.last_name}</td>
                  <td class="border p-2">${f.email}</td>
                  <td class="border p-2">${allDepartments.find(d => d.id == f.department_id)?.name || allDepartments.find(d => d.id == f.department_id)?.department_name || ""}</td>
                  <td class="border p-2">${allAcademicYears.find(y => y.id == f.academic_year_id)?.year || allAcademicYears.find(y => y.id == f.academic_year_id)?.academic_year || ""}</td>
                  <td class="border p-2">${f.yearstatus || ""}</td>
                  <td class="border p-2">${f.position || ""}</td>
                  <td class="border p-2">
                    <button class="text-blue-600 edit-btn" data-id="${f.id}">Edit</button>
                    <button class="text-red-600 delete-btn" data-id="${f.id}">Delete</button>
                  </td>
                </tr>
            `).join("")
            : `<tr><td colspan="9" class="text-center p-4">No faculty found.</td></tr>`;

        // Delete logic
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                if (confirm("Delete this faculty member?")) {
                    await axios.delete(`/api/faculty/${id}`);
                    fetchFaculty();
                    resetForm();
                }
            });
        });

        // Edit logic
        document.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                try {
                    const res = await axios.get(`/api/faculty/${id}`);
                    const f = res.data;
                    document.getElementById("edit_id").value = f.id;
                    document.getElementById("faculty_id").value = f.faculty_id;
                    document.getElementById("first_name").value = f.first_name;
                    document.getElementById("middle_name").value = f.middle_name || "";
                    document.getElementById("last_name").value = f.last_name;
                    document.getElementById("email").value = f.email;
                    document.getElementById("phone").value = f.phone || "";
                    document.getElementById("address").value = f.address || "";
                    document.getElementById("departmentSelect").value = f.department_id || "";
                    document.getElementById("academicYearSelectForm").value = f.academic_year_id || "";
                    document.getElementById("yearstatus").value = f.yearstatus || "active";
                    document.getElementById("position").value = f.position || "";
                    document.getElementById("date_hired").value = f.date_hired || "";
                    document.getElementById("submitBtn").textContent = "Update Faculty";
                    document.getElementById("cancelBtn").style.display = "inline-block";
                    isEditing = true;
                } catch (error) {
                    alert("Failed to fetch faculty data.");
                }
            });
        });
    }

    // Submit (Add/Edit)
    const form = document.getElementById("facultyForm");
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(form));
        const id = formData.edit_id;
        delete formData.edit_id;
        try {
            if (isEditing && id) {
                await axios.put(`/api/faculty/${id}`, formData);
            } else {
                await axios.post("/api/faculty", formData);
            }
            form.reset();
            submitBtn.textContent = "Add Faculty";
            cancelBtn.style.display = "none";
            isEditing = false;
            fetchFaculty();
        } catch (error) {
            console.error("Error saving faculty:", error.response?.data || error);
            alert("Failed to save faculty. Check console for details.");
        }
    });

    // Cancel button logic
    cancelBtn.addEventListener("click", () => {
        form.reset();
        submitBtn.textContent = "Add Faculty";
        cancelBtn.style.display = "none";
        isEditing = false;
    });

    // Filters & search
    document.getElementById("searchInput").addEventListener("input", renderFaculty);
    document.getElementById("departmentFilter").addEventListener("change", renderFaculty);
    document.getElementById("academicYearFilter").addEventListener("change", renderFaculty);
    document.getElementById("yearstatusFilter").addEventListener("change", renderFaculty);
    document.getElementById("clearFilters").addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        document.getElementById("departmentFilter").value = "";
        document.getElementById("academicYearFilter").value = "";
        document.getElementById("yearstatusFilter").value = "";
        renderFaculty();
    });

    function resetForm() {
        form.reset();
        submitBtn.textContent = "Add Faculty";
        cancelBtn.style.display = "none";
        isEditing = false;
    }
}