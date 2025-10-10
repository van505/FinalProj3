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

        <!-- Add Faculty Form -->
        <form id="facultyForm" class="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow">
          <input type="text" name="faculty_id" placeholder="Faculty ID (e.g. F001)" class="border p-2 rounded" required>
          <input type="text" name="first_name" placeholder="First Name" class="border p-2 rounded" required>
          <input type="text" name="middle_name" placeholder="Middle Name" class="border p-2 rounded">
          <input type="text" name="last_name" placeholder="Last Name" class="border p-2 rounded" required>
          <input type="email" name="email" placeholder="Email" class="border p-2 rounded" required>
          <input type="text" name="phone" placeholder="Phone" class="border p-2 rounded">
          <input type="text" name="address" placeholder="Address" class="border p-2 rounded">
          <input type="text" name="department" placeholder="Department" class="border p-2 rounded">
          <input type="text" name="position" placeholder="Position" class="border p-2 rounded">
          <input type="date" name="date_hired" class="border p-2 rounded">
          <select name="status" class="border p-2 rounded" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit" class="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add Faculty
          </button>
        </form>
      </div>
    `;

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
                    }
                });
            });
        } catch (error) {
            console.error("Error fetching faculty:", error);
        }
    }

    // Add faculty
    const form = document.getElementById("facultyForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        try {
            await axios.post("/api/faculty", formData);
            form.reset();
            fetchFaculty();
        } catch (error) {
            console.error("Error adding faculty:", error.response?.data || error);
            alert("Failed to add faculty. Check console for details.");
        }
    });
}