// Снежинки (анимация)
(function() {
    const canvas = document.getElementById('snowCanvas');
    if(!canvas) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    const SNOW_COUNT = 130;
    
    function initSnow() {
        for(let i = 0; i < SNOW_COUNT; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 4 + 1.2,
                speedY: Math.random() * 1.2 + 0.3,
                speedX: Math.random() * 0.3 - 0.15,
                opacity: Math.random() * 0.6 + 0.3
            });
        }
    }
    
    function drawSnow() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let flake of snowflakes) {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            ctx.fill();
        }
        for(let flake of snowflakes) {
            flake.y += flake.speedY;
            flake.x += flake.speedX;
            if(flake.y > canvas.height) {
                flake.y = -5;
                flake.x = Math.random() * canvas.width;
            }
            if(flake.x > canvas.width) flake.x = 0;
            if(flake.x < 0) flake.x = canvas.width;
        }
        requestAnimationFrame(drawSnow);
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // переинициализация снежинок при ресайзе (опционально)
        snowflakes = [];
        initSnow();
    }
    
    window.addEventListener('resize', resizeCanvas);
    initSnow();
    drawSnow();
})();

// Анимация появления элементов при скролле
const fadeElements = document.querySelectorAll('.feature-card, .parallax-card, .info-section h2, .featured-house, .tilted-photo, .rules-list');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
    if(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.6s ease';
        observer.observe(el);
    }
});

// Дополнительно для карточек особенностей (на всякий случай)
document.querySelectorAll('.feature-card').forEach(card => {
    if(!card.style.opacity || card.style.opacity === '') {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.4s ease';
        observer.observe(card);
    }
});

// Кнопки "Выбрать даты / Узнать цену" - единый обработчик
function showPriceAlert() {
    alert("📅 Для уточнения цен и доступных дат свяжитесь с нами:\n\n📞 +7 906 983-84-54\n💬 MAX мессенджер: https://max.ru/u/f9LHodD0cOLvJxfqiGRA3X2tgoOgcc5QzbjTkeRmu945-AwlddSXX9AKGIw\n\nБронирование от 2-х суток. Залог 10 000 ₽.");
}

const priceBtn = document.getElementById('showPriceBtn');
const priceBtn2 = document.getElementById('showPriceBtn2');
if(priceBtn) priceBtn.addEventListener('click', (e) => { e.preventDefault(); showPriceAlert(); });
if(priceBtn2) priceBtn2.addEventListener('click', (e) => { e.preventDefault(); showPriceAlert(); });

// Улучшение кликабельности для ссылок MAX (открытие в новой вкладке уже есть)
console.log("Коттедж Шерегеш, ул. Кедровая 21/а | 5 спален, баня и чан | Готов к бронированию");