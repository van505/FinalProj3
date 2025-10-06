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
    // Always start at login when loading the site
    loadLogin(app, loadRegister);
}
