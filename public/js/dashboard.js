/******/ (() => { // webpackBootstrap
/*!**********************************************!*\
  !*** ./resources/js/components/dashboard.js ***!
  \**********************************************/
document.addEventListener("DOMContentLoaded", function () {
  var app = document.getElementById("app");

  // Dashboard layout
  app.innerHTML = "\n    <div class=\"dashboard\">\n      <aside class=\"sidebar\">\n        <div class=\"logo\">MySystem</div>\n        <nav>\n          <ul>\n            <li><a href=\"#\" class=\"active\">Overview</a></li>\n            <li><a href=\"#\">Students</a></li>\n            <li><a href=\"#\">Faculty</a></li>\n            <li><a href=\"#\">Archive</a></li>\n            <li><a href=\"#\">Report</a></li>\n            <li><a href=\"#\">Profile</a></li>\n          </ul>\n        </nav>\n      </aside>\n\n      <main class=\"content\">\n        <header class=\"topbar\">\n          <h1>Dashboard</h1>\n          <div class=\"user\">\n            <span>\uD83D\uDC64</span>\n            <p>Welcome, User</p>\n          </div>\n        </header>\n\n        <section class=\"cards\">\n          <div class=\"card\">\n            <h3>Total Students</h3>\n            <p id=\"studentCount\">0</p>\n          </div>\n          <div class=\"card\">\n            <h3>Courses</h3>\n            <p id=\"courseCount\">0</p>\n          </div>\n          <div class=\"card\">\n            <h3>Departments</h3>\n            <p id=\"departmentCount\">0</p>\n          </div>\n          <div class=\"card\">\n            <h3>Academic Year</h3>\n            <p>2024 - 2025</p>\n          </div>\n        </section>\n\n        <section class=\"chart-section\">\n          <h2>Students per Course</h2>\n          <canvas id=\"barChart\"></canvas>\n        </section>\n      </main>\n    </div>\n  ";

  // Example stats (replace later with API)
  var stats = {
    students: 12437,
    courses: 136,
    departments: 9,
    perCourse: {
      CSP: 5000,
      Criminology: 2000,
      Engineering: 1800,
      Nursing: 1500,
      Accountancy: 1200
    }
  };

  // Populate cards
  document.getElementById("studentCount").textContent = stats.students;
  document.getElementById("courseCount").textContent = stats.courses;
  document.getElementById("departmentCount").textContent = stats.departments;

  // Chart
  var ctx = document.getElementById("barChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(stats.perCourse),
      datasets: [{
        label: "Students",
        data: Object.values(stats.perCourse),
        backgroundColor: "#3b82f6"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
/******/ })()
;