// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-lg', 'shadow-black/10');
    } else {
        navbar.classList.remove('shadow-lg', 'shadow-black/10');
    }
});

// Contact form handling (placeholder)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');

        // Store original children
        const originalChildren = Array.from(btn.childNodes).map(n => n.cloneNode(true));

        // Clear and show success state
        while (btn.firstChild) btn.removeChild(btn.firstChild);

        const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkIcon.setAttribute('class', 'w-5 h-5 text-white');
        checkIcon.setAttribute('fill', 'none');
        checkIcon.setAttribute('stroke', 'currentColor');
        checkIcon.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('d', 'M5 13l4 4L19 7');
        checkIcon.appendChild(path);

        const successText = document.createTextNode(' Message Sent!');

        btn.appendChild(checkIcon);
        btn.appendChild(successText);
        btn.classList.add('bg-green-600');
        btn.classList.remove('bg-brand-600', 'hover:bg-brand-500');
        btn.disabled = true;

        setTimeout(() => {
            while (btn.firstChild) btn.removeChild(btn.firstChild);
            originalChildren.forEach(child => btn.appendChild(child));
            btn.classList.remove('bg-green-600');
            btn.classList.add('bg-brand-600', 'hover:bg-brand-500');
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// Smooth reveal animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make hero visible immediately
const heroSection = document.querySelector('section:first-of-type');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}
