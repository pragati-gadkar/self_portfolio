/* =====================================================
   PRAGATI GADKAR - PORTFOLIO JAVASCRIPT
   Smooth Scrolling, Animations, Interactivity
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initScrollReveal();
    initTypingEffect();
    initSmoothScroll();
    initActiveNavHighlight();
    initContactForm();
});

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* =====================================================
   SCROLL REVEAL ANIMATIONS
   ===================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/* =====================================================
   TYPING EFFECT
   ===================================================== */
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const titles = [
        'AI Developer',
        'ML Engineer',
        'Deep Learning Enthusiast',
        'Python Developer',
        'GenAI Specialist'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after initial animation completes
    setTimeout(type, 2000);
}

/* =====================================================
   SMOOTH SCROLLING
   ===================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   ACTIVE NAVIGATION HIGHLIGHT
   ===================================================== */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const highlightCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const highlightObserver = new IntersectionObserver(highlightCallback, highlightOptions);

    sections.forEach(section => {
        highlightObserver.observe(section);
    });
}

/* =====================================================
   PARALLAX EFFECT (Optional Enhancement)
   ===================================================== */
function initParallax() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (hero) {
            hero.style.backgroundPositionY = `${rate}px`;
        }
    });
}

/* =====================================================
   CURSOR EFFECT (Optional Enhancement)
   ===================================================== */
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'custom-cursor-follower';

        // Only add custom cursor on desktop
        if (window.innerWidth > 768) {
            // document.body.appendChild(this.cursor);
            // document.body.appendChild(this.cursorFollower);
            // this.init();
        }
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;

            setTimeout(() => {
                this.cursorFollower.style.left = `${e.clientX}px`;
                this.cursorFollower.style.top = `${e.clientY}px`;
            }, 100);
        });

        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('active');
                this.cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('active');
                this.cursorFollower.classList.remove('active');
            });
        });
    }
}

// Initialize custom cursor (uncomment if needed)
// new CustomCursor();

/* =====================================================
   SKILL PROGRESS ANIMATION (Optional)
   ===================================================== */
function initSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.dataset.progress;
                bar.style.width = `${progress}%`;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

/* =====================================================
   LAZY LOADING IMAGES
   ===================================================== */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/* =====================================================
   THEME TOGGLE (Optional - for future enhancement)
   ===================================================== */
class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.toggle = document.getElementById('theme-toggle');

        if (this.toggle) {
            this.init();
        }
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);

        this.toggle.addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', this.theme);
            localStorage.setItem('theme', this.theme);
        });
    }
}

// Initialize theme toggle (uncomment if needed)
// new ThemeToggle();

/* =====================================================
   FORM VALIDATION (For future contact form)
   ===================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const btn = form.querySelector('.send-btn');
        const originalContent = btn.innerHTML;

        // Change button state
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        // Service ID and Template ID (Replace with your actual IDs)
        const serviceID = 'service_2s2koii';
        const templateID = 'template_437n9nw';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerHTML = '<span>Message Sent!</span>';
                btn.style.backgroundColor = '#10b981'; // Success green
                showNotification('Message sent successfully!', 'success');
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, (err) => {
                btn.innerHTML = '<span>Failed</span>';
                btn.style.backgroundColor = '#ef4444'; // Error red
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('EmailJS Error:', err); // Log error for debugging

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* =====================================================
   PRELOADER (Optional)
   ===================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Console Easter Egg
console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%cThis portfolio was crafted with ❤️ by Pragati Gadkar', 'font-size: 14px; color: #a78bfa;');
console.log('%cInterested in collaborating? Reach out!', 'font-size: 12px; color: #6b6b7b;');
