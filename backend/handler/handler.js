import express from "express";
import auth from "./auth.js";


function initRoutes() {
    //роутер
    const router = express.Router();
    //ручки
    router.post('/register', auth.registerUser);
    router.post('/login', auth.loginUser);

    return router
}
export {initRoutes}


