import axios from "axios";
axios.defaults.headers.common["Accept"] = "application/json";

require("./bootstrap");
import "./bootstrap";

// Import components
import { loadLogin } from "./components/Login";
import { loadRegister } from "./components/Register";
import { loadDashboard } from "./components/Dashboard";

// Mount app
const app = document.getElementById("app");

if (app) {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (token) {
        // ✅ If token exists, stay or go to dashboard
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (path !== "/dashboard") {
            window.location.href = "/dashboard";
        } else {
            loadDashboard(app);
        }
    } else {
        // 🚪 No token = always show login/register
        if (path !== "/") {
            window.history.pushState({}, "", "/");
        }
        loadLogin(app, loadRegister);
    }
}
