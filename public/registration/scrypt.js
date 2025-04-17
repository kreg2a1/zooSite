document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы

        // Получаем значения
        const email = document.getElementById('email').value.trim();
        const login = document.getElementById('login').value.trim();
        const password = document.getElementById('password').value;

        // Очистка предыдущей ошибки
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // Валидация
        if (login.length < 3) {
            errorMessage.textContent = 'Логин должен содержать минимум 3 символа.';
            errorMessage.style.display = 'block';
            return;
        }

        // Проверка email (HTML5 уже проверяет, но можно дополнительную проверку)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Введите корректный email.';
            errorMessage.style.display = 'block';
            return;
        }

        if (password.length < 6) {
            errorMessage.textContent = 'Пароль должен содержать минимум 6 символов.';
            errorMessage.style.display = 'block';
            return;
        }

        // Если все ок — отправляем запрос
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
                window.location.href = '../login/index.html'; // Перенаправляем на страницу входа
            } else {
                // Показываем ошибку от сервера, если есть
                errorMessage.textContent = data.message || 'Ошибка регистрации.';
                errorMessage.style.display = 'block';
                console.error('Ошибка регистрации:', data);
            }
        } catch (error) {
            errorMessage.textContent = 'Ошибка сети. Попробуйте позже.';
            errorMessage.style.display = 'block';
            console.error('Ошибка регистрации:', error);
        }
    });
});
