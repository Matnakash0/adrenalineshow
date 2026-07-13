// Копирование номера телефона
document.getElementById('button-copy').addEventListener('click', () => {
    const text = document.getElementById('button-copy').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const notify = document.getElementById('notify');
        notify.style.display = 'block';
        setTimeout(() => notify.style.display = 'none', 1000);
    });
});

// Мобильное бургер-меню
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navigation.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

document.addEventListener('click', (e) => {
    const isClickInsideNav = navigation.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    if (navigation.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
        menuToggle.classList.remove('active');
        navigation.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Затемнение шапки при скролле
const fixedHeader = document.querySelector('.fixed-header');
window.addEventListener('scroll', () => {
    fixedHeader.classList.toggle('scrolled', window.scrollY > 50);
});

// Подсветка активного пункта меню
const sections = document.querySelectorAll('main section, header');
const navLinks = document.querySelectorAll('.navigation_list a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => {
    if (section.id) sectionObserver.observe(section);
});

// Плавное появление блоков при прокрутке
const revealTargets = document.querySelectorAll('.catalog_item, .us-let, .photo-grid .catalog_photo');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// Лайтбокс для галереи
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryImages = document.querySelectorAll('.page_photo_galery img, .catalog_photo img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.classList.add('menu-open');
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('menu-open');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Кнопка "наверх"
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});