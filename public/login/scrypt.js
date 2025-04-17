document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = '/public/main/index.html'; // Перенаправляем на главную страницу
            } else {
                console.error('Ошибка входа:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    });
});
