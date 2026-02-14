document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            alert('Mobile menu clicked! Navigation links would appear here on mobile devices.');
        });
    }

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('.feature-card, .tech-list li, .section-header, .cta-box, .tech-visual, .showcase-content, .showcase-visual, .security-card');
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // Download Counter Logic (Global Realtime via CountAPI)
    const downloadBtns = document.querySelectorAll('.download-btn');
    const counterElements = document.querySelectorAll('.counter-number');
    
    // Config for CountAPI (Free global counter service)
    const namespace = 'vplayer-website-unique-123'; // Unique namespace for your app
    const key = 'downloads';
    
    // Initial fallback logic (Organic growth based on time)
    // Starts at 1248 on Feb 1st, 2026, and grows by ~50 per day
    const startDate = new Date('2026-02-01').getTime();
    const now = new Date().getTime();
    const daysPassed = (now - startDate) / (1000 * 60 * 60 * 24);
    let baseCount = Math.floor(1248 + (daysPassed * 52)); 

    const updateDisplay = (val) => {
        counterElements.forEach(el => {
            el.style.transform = 'scale(1.2)';
            el.style.color = 'var(--emerald)';
            el.textContent = val.toLocaleString();
            
            setTimeout(() => {
                el.style.transform = 'scale(1)';
                el.style.color = 'var(--primary)';
            }, 300);
        });
    };

    // Fetch global count on load
    const fetchGlobalCount = async () => {
        try {
            const response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
            const data = await response.json();
            if (data.value) {
                baseCount = Math.max(baseCount, data.value);
            }
            updateDisplay(baseCount);
        } catch (err) {
            console.warn('CountAPI unavailable, using organic fallback');
            updateDisplay(baseCount);
        }
    };

    fetchGlobalCount();

    downloadBtns.forEach(btn => {
         btn.addEventListener('click', async (e) => {
             // We no longer prevent default so the redirect works
             // but we still trigger the counter logic
             
             baseCount++;
             updateDisplay(baseCount);

            // Attempt to update global counter
            try {
                await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
            } catch (err) {
                console.error('Failed to update global count');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
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
});
