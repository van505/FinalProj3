import axios from "axios";
axios.defaults.headers.common["Accept"] = "application/json";

require("./bootstrap");
import "./bootstrap";

// Import components
import { loadLogin } from "./components/Login";
import { loadRegister } from "./components/Register";
import { loadDashboard } from "./components/Dashboard";
import { loadStudents } from "./components/Students"; // ✅ plural
import { loadFaculty } from "./components/Faculty";
import { loadReport } from "./components/Report";
import { loadSystemSettings } from "./components/SystemSettings";
import { loadProfile } from "./components/Profile";

// Mount app
const app = document.getElementById("app");

if (app) {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (token) {
        // ✅ Add token to axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // ✅ Handle initial load based on URL
        if (path === "/dashboard") {
            loadDashboard(app);
        } 
        else if (path === "/students") {
            loadStudents(app);
        }
        else if (path === "/faculty") {
            loadFaculty(app);
        }
        else if (path === "/report") {
            loadReport(app);
        }
        else if (path === "/systemsettings") {
            loadSystemSettings(app);
        }
        else if (path === "/profile") {
            loadProfile(app);
        }
        else {
            // default to dashboard
            window.history.pushState({}, "", "/dashboard");
            loadDashboard(app);
        }

        // ✅ Sidebar link navigation (no page refresh)
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a[data-page]");
            if (!link) return;
            e.preventDefault();

            const page = link.dataset.page;

            // remove active class
            document.querySelectorAll(".sidebar-menu a").forEach(a => a.classList.remove("active"));
            link.classList.add("active");

            // ✅ Handle navigation
            if (page === "overview" || page === "dashboard") {
                loadDashboard(app);
                window.history.pushState({}, "", "/dashboard");
            } 
            else if (page === "students") {
                loadStudents(app);
                window.history.pushState({}, "", "/students");
            } 
            else if (page === "faculty") {
                loadFaculty(app);
                window.history.pushState({}, "", "/faculty");
            } 
            else if (page === "report") {
                loadReport(app);
                window.history.pushState({}, "", "/report");
            }
            else if (page === "settings") {
                loadSystemSettings(app);
                window.history.pushState({}, "", "/systemsettings");
            }
            else if (page === "profile") {
                loadProfile(app);
                window.history.pushState({}, "", "/profile");
            }
        });

    } else {
        // 🚪 Not logged in → show login
        if (path !== "/") {
            window.history.pushState({}, "", "/");
        }
        loadLogin(app, loadRegister);
    }
}
