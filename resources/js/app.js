axios.defaults.headers.common["Accept"] = "application/json";

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other helpers. It's a great starting point while
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import "./bootstrap";

// Import components
import { loadLogin } from "./components/Login";
import { loadRegister } from "./components/Register";

// Mount app
const app = document.getElementById("app");

// Default to Login screen
if (app) {
  loadLogin(app, loadRegister);
}
    