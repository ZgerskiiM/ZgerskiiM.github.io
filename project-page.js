document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail1');
    const prevButton = document.querySelector('.gallery-arrow1.prev');
    const nextButton = document.querySelector('.gallery-arrow1.next');

    let currentIndex = 0;
    const maxIndex = thumbnails.length - 1;

    // Обработка нажатия на миниатюры
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            setActiveImage(index);
        });
    });

    // Обработка нажатия кнопок "Предыдущее" и "Следующее"
    prevButton.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = maxIndex;
        setActiveImage(newIndex);
    });

    nextButton.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex > maxIndex) newIndex = 0;
        setActiveImage(newIndex);
    });

    // Функция для установки активного изображения
    function setActiveImage(index) {
        // Убираем активный класс у всех миниатюр
        thumbnails.forEach(thumb => thumb.classList.remove('active'));

        // Добавляем активный класс текущей миниатюре
        thumbnails[index].classList.add('active');

        // Обновляем главное изображение с эффектом плавного изменения
        mainImage.style.opacity = '0.5';

        setTimeout(() => {
            mainImage.src = thumbnails[index].getAttribute('data-image');
            mainImage.style.opacity = '1';
        }, 300);

        // Обновляем текущий индекс
        currentIndex = index;
    }

    // Добавляем поддержку клавиатуры для навигации
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // Инициализация - установка первого изображения как активного
    setActiveImage(0);

    // Добавляем плавный переход для изображений
    mainImage.style.transition = 'opacity 0.3s ease';
});
