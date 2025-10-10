import axios from "axios";

export function loadStudents(app) {
    app.innerHTML = `
      <div class="students-container p-4">
        <h2 class="text-2xl font-bold mb-4">Students</h2>

        <!-- Student List -->
        <table class="w-full border-collapse border text-sm mb-8">
          <thead class="bg-gray-100">
            <tr>
              <th class="border p-2">ID</th>
              <th class="border p-2">Name</th>
              <th class="border p-2">Course</th>
              <th class="border p-2">Department</th>
              <th class="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody id="studentList"></tbody>
        </table>

        <!-- Add Student Form -->
        <form id="studentForm" class="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow">
          <input type="text" name="studID" placeholder="Student ID" class="border p-2 rounded" required>
          <input type="text" name="firstname" placeholder="First Name" class="border p-2 rounded" required>
          <input type="text" name="middlename" placeholder="Middle Name" class="border p-2 rounded">
          <input type="text" name="lastname" placeholder="Last Name" class="border p-2 rounded" required>
          <input type="text" name="suffix" placeholder="Suffix" class="border p-2 rounded">
          <input type="email" name="email" placeholder="Email" class="border p-2 rounded" required>
          <input type="text" name="phone" placeholder="Phone" class="border p-2 rounded">
          <input type="date" name="date_of_birth" class="border p-2 rounded">
          <select name="sex" class="border p-2 rounded">
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select name="department_id" id="departmentSelect" class="border p-2 rounded" required>
            <option value="">Select Department</option>
          </select>
          <select name="course_id" id="courseSelect" class="border p-2 rounded" required>
            <option value="">Select Course</option>
          </select>
          <input type="text" name="yearstatus" placeholder="Year Status (e.g. 3rd Year)" class="border p-2 rounded">
          <input type="date" name="enrollment_date" class="border p-2 rounded">
          <button type="submit" class="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add Student
          </button>
        </form>
      </div>
    `;

    // Load departments and courses for select options
    async function loadSelectOptions() {
        try {
            const [departmentsRes, coursesRes] = await Promise.all([
                axios.get("/api/departments"),
                axios.get("/api/courses")
            ]);
            const departments = departmentsRes.data;
            const courses = coursesRes.data;

            const departmentSelect = document.getElementById("departmentSelect");
            departmentSelect.innerHTML = `<option value="">Select Department</option>` +
                departments.map(d => `<option value="${d.id}">${d.name}</option>`).join("");

            const courseSelect = document.getElementById("courseSelect");
            courseSelect.innerHTML = `<option value="">Select Course</option>` +
                courses.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
        } catch (error) {
            alert("Failed to load departments or courses.");
        }
    }

    // Load students when page opens
    fetchStudents();
    loadSelectOptions();

    async function fetchStudents() {
        try {
            const res = await axios.get("/api/students");
            const students = res.data;
            const tbody = document.getElementById("studentList");
            tbody.innerHTML = students
                .map(
                    (s) => `
              <tr>
                <td class="border p-2">${s.studID}</td>
                <td class="border p-2">${s.firstname} ${s.lastname}</td>
                <td class="border p-2">${s.course?.name || ""}</td>
                <td class="border p-2">${s.department?.name || ""}</td>
                <td class="border p-2">
                  <button class="text-red-600 delete-btn" data-id="${s.id}">Delete</button>
                </td>
              </tr>
            `
                )
                .join("");

            document.querySelectorAll(".delete-btn").forEach((btn) => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.id;
                    if (confirm("Delete this student?")) {
                        await axios.delete(`/api/students/${id}`);
                        fetchStudents();
                    }
                });
            });
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    }

    // Add student
    const form = document.getElementById("studentForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        try {
            await axios.post("/api/students", formData);
            form.reset();
            fetchStudents();
        } catch (error) {
            console.error("Error adding student:", error.response?.data || error);
            alert("Failed to add student. Check console for details.");
        }
    });
}
