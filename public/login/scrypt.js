document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.createElement('div');
    errorMessage.style.color = '#e53e3e'; // красный цвет
    errorMessage.style.fontSize = '14px';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.fontWeight = '600';
    errorMessage.style.display = 'none';
    loginForm.appendChild(errorMessage);

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы

        // Получаем значения и обрезаем пробелы
        const login = document.getElementById('login').value.trim();
        const password = document.getElementById('password').value;

        // Скрываем предыдущее сообщение об ошибке
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // Валидация
        if (login.length < 3) {
            errorMessage.textContent = 'Логин должен содержать минимум 3 символа.';
            errorMessage.style.display = 'block';
            return;
        }

        if (password.length === 0) {
            errorMessage.textContent = 'Введите пароль.';
            errorMessage.style.display = 'block';
            return;
        }

        // Отправляем запрос на сервер
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
                // Успешный вход — перенаправляем
                window.location.href = '/public/main/index.html';
            } else {
                // Показываем ошибку от сервера, если есть
                errorMessage.textContent = data.message || 'Ошибка входа. Проверьте логин и пароль.';
                errorMessage.style.display = 'block';
                console.error('Ошибка входа:', data);
            }
        } catch (error) {
            errorMessage.textContent = 'Неверный пароль.';
            errorMessage.style.display = 'block';
            console.error('Ошибка входа:', error);
        }
    });
});
