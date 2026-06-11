const siteNav = document.getElementById('site-nav');

function updateNav() {
    siteNav.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

const revealEls = document.querySelectorAll('.reveal');

const obeserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                obeserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealEls.forEach(el => obeserver.observe(el));

const cards = document.querySelectorAll('.team-card');
const preview = document.getElementById('team-photo-preview');
const previewImg = document.getElementById('team-photo-img');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const photo = card.dataset.photo;
        previewImg.src = photo;
        preview.classList.add('visible');
    });

    card.addEventListener('mouseleave', () => {
        preview.classList.remove('visible');
    });
});

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsWrap = document.getElementById('carousel-dots');
const slides = document.querySelectorAll('.carousel-slide');

let current = 0;

slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
});

function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

const docCards = document.querySelectorAll('.doc-card');
const docsEmpty = document.getElementById('docs-empty');
const docsIFrame = document.getElementById('docs-iframe');
const docsPlaceholder = document.getElementById('docs-placeholder');

if(docCards.length === 0) {
    docsEmpty.style.display = 'block';
}

docCards.forEach(card => {
    card.addEventListener('click', () => {
        docCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const pdf = card.dataset.pdf;
        if(!pdf || pdf.trim() === '') {
            docsIFrame.style.display = 'none';
            docsPlaceholder.style.display = 'none';
            docsEmpty.style.display = 'block';
        } else {
            docsIFrame.src = pdf;
            docsIFrame.style.display = 'block';
            docsPlaceholder.style.display = 'none';
            docsEmpty.style.display = 'none';
        }
    });
});