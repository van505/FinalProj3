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
            <th class="border p-2">Student ID</th>
            <th class="border p-2">Name</th>
            <th class="border p-2">Course</th>
            <th class="border p-2">Department</th>
            <th class="border p-2">Year</th>
            <th class="border p-2">Status</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody id="studentList"></tbody>
      </table>

      <!-- Add/Edit Student Form -->
      <form id="studentForm" class="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow">
        <input type="hidden" name="edit_id" id="edit_id">

        <input type="text" name="studID" id="studID" placeholder="Student ID" class="border p-2 rounded" required>
        <input type="text" name="firstname" id="firstname" placeholder="First Name" class="border p-2 rounded" required>
        <input type="text" name="middlename" id="middlename" placeholder="Middle Name" class="border p-2 rounded">
        <input type="text" name="lastname" id="lastname" placeholder="Last Name" class="border p-2 rounded" required>
        <input type="text" name="suffix" id="suffix" placeholder="Suffix" class="border p-2 rounded">
        <input type="email" name="email" id="email" placeholder="Email" class="border p-2 rounded" required>
        <input type="text" name="phone" id="phone" placeholder="Phone" class="border p-2 rounded">
        <input type="date" name="date_of_birth" id="date_of_birth" class="border p-2 rounded">

        <select name="sex" id="sex" class="border p-2 rounded">
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

        <input type="text" name="yearstatus" id="yearstatus" placeholder="Year Status (e.g. 3rd Year)" class="border p-2 rounded">
        <input type="date" name="enrollment_date" id="enrollment_date" class="border p-2 rounded">

        <select name="status" id="status" class="border p-2 rounded" required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div class="col-span-2 flex gap-2">
          <button type="submit" id="submitBtn" class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add Student
          </button>
          <button type="button" id="cancelBtn" class="bg-gray-400 text-white p-2 rounded hover:bg-gray-500" style="display:none;">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `;

  let isEditing = false;

  // Load departments and courses
  async function loadSelectOptions() {
    try {
      const [departmentsRes, coursesRes] = await Promise.all([
        axios.get("/api/departments"),
        axios.get("/api/courses")
      ]);

      const departments = departmentsRes.data;
      const courses = coursesRes.data;

      const departmentSelect = document.getElementById("departmentSelect");
      departmentSelect.innerHTML =
        `<option value="">Select Department</option>` +
        departments.map(d => `<option value="${d.id}">${d.name}</option>`).join("");

      const courseSelect = document.getElementById("courseSelect");
      courseSelect.innerHTML =
        `<option value="">Select Course</option>` +
        courses.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    } catch (error) {
      alert("Failed to load departments or courses.");
    }
  }

  // Fetch students
  async function fetchStudents() {
    try {
      const res = await axios.get("/api/students");
      const students = res.data;
      const tbody = document.getElementById("studentList");

      tbody.innerHTML = students
        .map(
          (s) => `
          <tr>
            <td class="border p-2">${s.id}</td>
            <td class="border p-2">${s.studID}</td>
            <td class="border p-2">${s.firstname} ${s.middlename ? s.middlename + ' ' : ''}${s.lastname}</td>
            <td class="border p-2">${s.course?.name || ""}</td>
            <td class="border p-2">${s.department?.name || ""}</td>
            <td class="border p-2">${s.yearstatus || ""}</td>
            <td class="border p-2">${s.status || "active"}</td>
            <td class="border p-2">
              <button class="text-blue-600 edit-btn" data-id="${s.id}">Edit</button>
              <button class="text-red-600 delete-btn" data-id="${s.id}">Delete</button>
            </td>
          </tr>
        `
        )
        .join("");

      // Delete logic
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          if (confirm("Delete this student?")) {
            await axios.delete(`/api/students/${id}`);
            fetchStudents();
            resetForm();
          }
        });
      });

      // Edit logic
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          try {
            const res = await axios.get(`/api/students/${id}`);
            const s = res.data;

            document.getElementById("edit_id").value = s.id;
            document.getElementById("studID").value = s.studID;
            document.getElementById("firstname").value = s.firstname;
            document.getElementById("middlename").value = s.middlename || "";
            document.getElementById("lastname").value = s.lastname;
            document.getElementById("suffix").value = s.suffix || "";
            document.getElementById("email").value = s.email;
            document.getElementById("phone").value = s.phone || "";
            document.getElementById("date_of_birth").value = s.date_of_birth || "";
            document.getElementById("sex").value = s.sex || "";
            document.getElementById("departmentSelect").value = s.department_id || "";
            document.getElementById("courseSelect").value = s.course_id || "";
            document.getElementById("yearstatus").value = s.yearstatus || "";
            document.getElementById("enrollment_date").value = s.enrollment_date || "";
            document.getElementById("status").value = s.status || "active";

            document.getElementById("submitBtn").textContent = "Update Student";
            document.getElementById("cancelBtn").style.display = "inline-block";
            isEditing = true;
          } catch (error) {
            alert("Failed to fetch student data.");
          }
        });
      });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  // Submit (Add/Edit)
  const form = document.getElementById("studentForm");
  const submitBtn = document.getElementById("submitBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    const id = formData.edit_id;
    delete formData.edit_id;

    try {
      if (isEditing && id) {
        await axios.put(`/api/students/${id}`, formData);
      } else {
        await axios.post("/api/students", formData);
      }
      form.reset();
      submitBtn.textContent = "Add Student";
      cancelBtn.style.display = "none";
      isEditing = false;
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error.response?.data || error);
      alert("Failed to save student. Check console for details.");
    }
  });

  // Cancel button
  cancelBtn.addEventListener("click", () => {
    form.reset();
    submitBtn.textContent = "Add Student";
    cancelBtn.style.display = "none";
    isEditing = false;
  });

  function resetForm() {
    form.reset();
    submitBtn.textContent = "Add Student";
    cancelBtn.style.display = "none";
    isEditing = false;
  }

  // Initialize
  fetchStudents();
  loadSelectOptions();
}
