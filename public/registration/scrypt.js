document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы

        const email = document.getElementById('email').value;
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, login, password })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = '/login/index.html'; // Перенаправляем на страницу входа
            } else {
                console.error('Ошибка регистрации:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    });
});
