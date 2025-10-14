import axios from "axios";
axios.defaults.headers.common["Accept"] = "application/json";

require("./bootstrap");
import "./bootstrap";

// Import components
import { loadLogin } from "./components/Login";
import { loadRegister } from "./components/Register";
import { loadDashboard } from "./components/Dashboard";

// ✅ Import new components
import { loadSystemSettings } from "./components/SystemSettings";
import { loadProfile } from "./components/Profile";

// Mount app
const app = document.getElementById("app");

if (app) {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (token) {
        // ✅ Add token to every axios request
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // ✅ Determine which page to load
        if (path === "/dashboard") {
            loadDashboard(app);
        } 
        else if (path === "/settings") {
            loadSystemSettings(app); // 👈 Load System Settings page
        }
        else if (path === "/profile") {
            loadProfile(app); // 👈 Load Profile page
        }
        else {
            // ✅ Default to dashboard if no path matches
            window.location.href = "/dashboard";
        }

        // ✅ Listen to in-app navigation (sidebar links)
        document.addEventListener("click", (e) => {
            const link = e.target.closest("a[data-page]");
            if (!link) return;
            e.preventDefault();

            const page = link.dataset.page;
            // Remove active class
            document.querySelectorAll(".sidebar-menu a").forEach(a => a.classList.remove("active"));
            link.classList.add("active");

            // Load appropriate component
            if (page === "overview") {
                loadDashboard(app);
                window.history.pushState({}, "", "/dashboard");
            } 
            else if (page === "settings") {
                loadSystemSettings(app);
                window.history.pushState({}, "", "/settings");
            } 
            else if (page === "profile") {
                loadProfile(app);
                window.history.pushState({}, "", "/profile");
            }
        });

    } else {
        // 🚪 No token = show login/register
        if (path !== "/") {
            window.history.pushState({}, "", "/");
        }
        loadLogin(app, loadRegister);
    }
}
