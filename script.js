// Анимации при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем классы для анимаций
    const sections = document.querySelectorAll('.section-header, .project-card, .service-card, .form-container');

    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Функция для проверки видимости элемента
    function checkVisibility() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const position = element.getBoundingClientRect();

            // Если элемент видим на экране
            if (position.top < windowHeight * 0.9) {
                element.classList.add('appear');

                // Для заголовков секций также добавляем класс appear
                if (element.classList.contains('section-header')) {
                    element.classList.add('appear');
                }
            }
        });
    }

    // Запускаем проверку при загрузке и при прокрутке
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Проверяем при загрузке

    // Анимация для логотипа
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', function() {
        this.classList.add('animate__animated', 'animate__pulse');
    });

    logo.addEventListener('animationend', function() {
        this.classList.remove('animate__animated', 'animate__pulse');
    });

    // Анимация для сервисных карточек
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.animationPlayState = 'running';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.animationPlayState = 'paused';
        });
    });

    // Обработка отправки формы
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Здесь можно добавить код для отправки формы через AJAX
            // Пример анимации успешной отправки:
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Отправляем...';

            // Имитация задержки отправки
            setTimeout(() => {
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.backgroundColor = '#4CAF50';

                // Сброс формы
                contactForm.reset();

                // Возврат к исходному состоянию кнопки
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
});

// Функции для слайдера процесса разработки
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('process-slider');
    const cards = slider.querySelectorAll('.process-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.process-slider-arrow.prev');
    const nextButton = document.querySelector('.process-slider-arrow.next');

    let currentIndex = 0;
    let startX, startScrollLeft, isDragging = false;

    // Обработчики для кнопок
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            goToSlide(currentIndex + 1);
        }
    });

    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Перетаскивание
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag, { passive: true });

    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag, { passive: true });

    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);
    slider.addEventListener('touchend', endDrag);

    // Обработчики перетаскивания для карточек
    cards.forEach(card => {
        card.addEventListener('dragstart', e => e.preventDefault());
    });

    // Функция для перехода к слайду
    function goToSlide(index) {
        const slideWidth = cards[0].offsetWidth;
        slider.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });

        // Обновление активного индикатора
        currentIndex = index;
        updateIndicators();

        // Обновление кнопок
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex === cards.length - 1 ? '0.5' : '1';
    }

    // Обновление индикаторов
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Начало перетаскивания
    function startDrag(e) {
        isDragging = true;
        slider.classList.add('grabbing');

        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startScrollLeft = slider.scrollLeft;
    }

    // Перетаскивание
    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const dist = x - startX;
        slider.scrollLeft = startScrollLeft - dist;
    }

    // Завершение перетаскивания
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove('grabbing');

        // Определение, к какому слайду перейти после перетаскивания
        const slideWidth = cards[0].offsetWidth;
        const newIndex = Math.round(slider.scrollLeft / slideWidth);
        goToSlide(newIndex);
    }

    // Обработка события скролла для обновления активного слайда
    slider.addEventListener('scroll', () => {
        const slideWidth = cards[0].offsetWidth;
        const newIndex = Math.round(slider.scrollLeft / slideWidth);

        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateIndicators();

            // Обновление кнопок
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentIndex === cards.length - 1 ? '0.5' : '1';
        }
    });

    // Инициализация
    goToSlide(0);

    // Добавление перехода через свайп
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 75; // минимальное расстояние для свайпа

        if (touchEndX < touchStartX - threshold) {
            // Свайп влево
            if (currentIndex < cards.length - 1) {
                goToSlide(currentIndex + 1);
            }
        }

        if (touchEndX > touchStartX + threshold) {
            // Свайп вправо
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
    }
});
