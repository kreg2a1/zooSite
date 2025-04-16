import bcrypt from "bcrypt";
import repo from "../repository/database.js";

// Регистрация пользователя
let registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    } catch(error){
        console.error('Ошибка хеширования пароля', error);
        res.status(500).send(error.message);
    }

    try {
        const result = await repo.query(
            'INSERT INTO users (email, login, password) VALUES ($1, $2, $3) RETURNING *',
            [req.body.email, req.body.login, hashedPassword]
        );
        res.status(200).send({ message: "user created", redirect: '/login/index.html' });
    } catch (error) {
        console.error('Ошибка запроса к бд', error);
        res.status(500).send(error.message);
    }
};

// Авторизация пользователя
let loginUser = async (req, res) => {
    try {
        const result = await repo.query('SELECT * FROM users WHERE login = $1', [req.body.login]);
    } catch (error){
        console.log("Error with getting user - ", error)
        res.status(400).send('User not found -', error);
    }

    try {
        const user = result.rows[0];
        if (!user) {
            console.log("User undefined or invalid password - ", error)
            res.status(400).send('User not found -', error);
        } 
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword){
            console.log("Error with getting user - ", error)
            res.status(400).send('User not found -', error);
        }

        res.status(200).send({ message: 'Login successful', redirect: '/main/index.html' });
    } catch (error) {
        console.log("Error with getting user - ", error)
        res.status(400).send('User not found -', error);
    }
};

export default {registerUser, loginUser}