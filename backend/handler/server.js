import 'express';
import'path';
import 'cors';
import { initRoutes } from "./handler.js";

const PORT = "3000";

export function start() {
    const app = express();
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors());
    let r = initRoutes();
    app.use('/api/auth', r);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}



