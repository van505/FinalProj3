import axios from "axios";

export function loadFaculty(app) {
    app.innerHTML = `
      <div class="faculty-container p-4">
        <h2 class="text-2xl font-bold mb-4">Faculty</h2>

        <!-- Faculty List -->
        <table class="w-full border-collapse border text-sm mb-8">
          <thead class="bg-gray-100">
            <tr>
              <th class="border p-2">ID</th>
              <th class="border p-2">Faculty ID</th>
              <th class="border p-2">Name</th>
              <th class="border p-2">Email</th>
              <th class="border p-2">Department</th>
              <th class="border p-2">Position</th>
              <th class="border p-2">Status</th>
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
          <select name="department" id="department" class="border p-2 rounded" required>
            <option value="">Select Department</option>
          </select>
          <input type="text" name="position" id="position" placeholder="Position" class="border p-2 rounded">
          <input type="date" name="date_hired" id="date_hired" class="border p-2 rounded">
          <select name="status" id="status" class="border p-2 rounded" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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

    // Load department options from system settings
    async function loadDepartments() {
        try {
            const res = await axios.get("/api/departments");
            const departments = res.data;
            const departmentSelect = document.getElementById("department");
            departmentSelect.innerHTML = `<option value="">Select Department</option>` +
                departments.map(d => `<option value="${d.name}">${d.name}</option>`).join("");
        } catch (error) {
            alert("Failed to load departments.");
        }
    }
    loadDepartments();

    // Load faculty when page opens
    fetchFaculty();

    async function fetchFaculty() {
        try {
            const res = await axios.get("/api/faculty");
            const faculty = res.data;
            const tbody = document.getElementById("facultyList");
            tbody.innerHTML = faculty
                .map(
                    (f) => `
              <tr>
                <td class="border p-2">${f.id}</td>
                <td class="border p-2">${f.faculty_id}</td>
                <td class="border p-2">${f.first_name} ${f.middle_name ? f.middle_name + ' ' : ''}${f.last_name}</td>
                <td class="border p-2">${f.email}</td>
                <td class="border p-2">${f.department || ""}</td>
                <td class="border p-2">${f.position || ""}</td>
                <td class="border p-2">${f.status}</td>
                <td class="border p-2">
                  <button class="text-blue-600 edit-btn" data-id="${f.id}">Edit</button>
                  <button class="text-red-600 delete-btn" data-id="${f.id}">Delete</button>
                </td>
              </tr>
            `
                )
                .join("");

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
                        document.getElementById("department").value = f.department || "";
                        document.getElementById("position").value = f.position || "";
                        document.getElementById("date_hired").value = f.date_hired || "";
                        document.getElementById("status").value = f.status;
                        document.getElementById("submitBtn").textContent = "Update Faculty";
                        document.getElementById("cancelBtn").style.display = "inline-block";
                        isEditing = true;
                    } catch (error) {
                        alert("Failed to fetch faculty data.");
                    }
                });
            });
        } catch (error) {
            console.error("Error fetching faculty:", error);
        }
    }

    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    // Add/Edit faculty
    const form = document.getElementById("facultyForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(form));
        const id = formData.edit_id;
        delete formData.edit_id; // Remove edit_id before sending to API
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
}