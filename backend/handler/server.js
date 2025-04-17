import express from 'express';
import path from 'path';
import cors from 'cors';
import { initRoutes } from "../handler/handler.js";

const PORT = 3000;

export function start() {
    try {
        const app = express();
        app.use(express.json());
        app.use(express.static(path.join('../', 'public')));
        app.use(cors());
        let r = initRoutes();
        app.use('/api/auth', r);
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch(err){
        console.log("-",err)
    }
}



