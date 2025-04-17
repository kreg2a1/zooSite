import bcrypt from "bcrypt";
import pool from "../repository/database.js"; // <-- импорт pool

// Регистрация пользователя
let registerUser = async (req, res) => {
    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
    } catch(error){
        console.error('Ошибка хеширования пароля', error);
        return res.status(500).send(error.message);
    }

    try {
        const result = await pool.query(
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
    let result;

    try {
        result = await pool.query('SELECT * FROM users WHERE login = $1', [req.body.login]);
    } catch (error){
        console.log("Error with getting user - ", error);
        return res.status(400).send('User not found');
    }

    try {
        const user = result.rows[0];
        if (!user) {
            console.log("User undefined or invalid password");
            return res.status(403).send('User not found');
        } 

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword){
            console.log("Invalid password");
            return res.status(400).send('Invalid password');
        }

        res.status(200).send({ message: 'Login successful', redirect: '/main/index.html' });
    } catch (error) {
        console.log("Error processing login - ", error);
        res.status(400).send('User not found');
    }
};

export default {registerUser, loginUser};
