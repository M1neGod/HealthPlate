document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ДИНАМІЧНА ДАТА (Футер) ---
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        dateSpan.textContent = new Date().getFullYear();
    }

    // --- 2. ЗМІНА ТЕМИ (Dark Mode) ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Перевіряємо, чи була збережена тема раніше
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        if(themeBtn) themeBtn.textContent = '☀️';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            console.log("Кнопку теми натиснуто"); // Для перевірки
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
            }
        });
    }

    // --- 3. ПІДСВІТКА МЕНЮ ---
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => link.classList.add('hover-highlight'));
        link.addEventListener('mouseleave', () => link.classList.remove('hover-highlight'));
    });

    // --- 4. ЗМІНА ШРИФТУ (Клавіатура) ---
    let fontSize = 16;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            fontSize++;
            document.body.style.fontSize = fontSize + 'px';
        } else if (e.key === 'ArrowDown') {
            fontSize = Math.max(12, fontSize - 1);
            document.body.style.fontSize = fontSize + 'px';
        }
    });

    // --- 5. ВАЛІДАЦІЯ ФОРМИ (Тільки для Support.html) ---
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Скидання стилів помилок
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            document.querySelectorAll('input, textarea, select').forEach(el => el.classList.remove('error'));

            // Перевірка імені
            const nameInput = document.getElementById('fullname');
            if (nameInput && nameInput.value.trim().length < 3) {
                showError(nameInput, "Мінімум 3 символи");
                isValid = false;
            }

            // Перевірка пошти
            const emailInput = document.getElementById('email');
            if (emailInput && (!emailInput.value.includes('@') || !emailInput.value.includes('.'))) {
                showError(emailInput, "Некоректний email");
                isValid = false;
            }

            // Перевірка повідомлення
            const msgInput = document.getElementById('message');
            if (msgInput && msgInput.value.trim().length < 10) {
                showError(msgInput, "Мінімум 10 символів");
                isValid = false;
            }

            if (isValid) {
                const successBox = document.getElementById('formSuccess');
                if(successBox) {
                    successBox.style.display = 'block';
                    successBox.textContent = "Повідомлення надіслано!";
                }
                supportForm.reset();
            }
        });
    }

    // --- 6. АКОРДЕОН (FAQ) ---
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            const hiddenText = document.getElementById('hiddenText');
            if (hiddenText.style.display === 'none' || !hiddenText.style.display) {
                hiddenText.style.display = 'inline';
                this.textContent = 'Згорнути';
            } else {
                hiddenText.style.display = 'none';
                this.textContent = 'Читати більше';
            }
        });
    }

    function showError(input, msg) {
        input.classList.add('error');
        const errSpan = input.nextElementSibling; // припускаємо, що span йде одразу за input
        if (errSpan && errSpan.classList.contains('error-message')) {
            errSpan.textContent = msg;
            errSpan.style.display = 'block';
        }
    }
});