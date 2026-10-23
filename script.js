// Tailwind Custom Configuration Setup
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            colors: {
                brand: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    cyan: '#06b6d4',
                    purple: '#a855f7',
                },
                dark: {
                    bg: '#090d16',
                    card: '#111827',
                    border: '#1f2937',
                }
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
                    '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.8' },
                }
            }
        }
    }
};

// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    // 1. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIconOpen = document.getElementById("menu-icon-open");
    const menuIconClose = document.getElementById("menu-icon-close");

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            menuIconOpen.classList.toggle("hidden");
            menuIconClose.classList.toggle("hidden");
        });
    }

    // Close Mobile Menu on Nav-Link Click
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuIconOpen.classList.remove("hidden");
            menuIconClose.classList.add("hidden");
        });
    });

    // 2. Typing Effect for Hero Title
    const typedTextElement = document.getElementById("typed-text");
    const words = ["Startups", "SaaS Tools", "E-Commerce", "Visionaries"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedTextElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // 3. Portfolio Filter Tabs Logic
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => {
                b.classList.remove("active", "bg-brand-500", "text-white");
                b.classList.add("text-gray-400");
            });

            btn.classList.add("active", "bg-brand-500", "text-white");
            btn.classList.remove("text-gray-400");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 4. Testimonials Slider Logic
    const testimonials = [
        {
            text: '"AuraCode redesigned our web platform in under 3 weeks. Our Lighthouse performance jumped to 99 and conversion improved dramatically!"',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            name: 'Sarah Jenkins',
            role: 'CEO at SaaSify'
        },
        {
            text: '"The headless store setup by AuraCode was flawless. Our dynamic rendering speeds and international checkout conversions doubled!"',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            name: 'Marcus Vance',
            role: 'Founder at Velour Fashion'
        },
        {
            text: '"Exceptional code quality and UI aesthetics. They translated our complex AI models into an intuitive product that users love."',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
            name: 'Elena Rostova',
            role: 'CTO at Synthetix AI'
        }
    ];

    let currentTestimonial = 0;
    const textEl = document.getElementById("testimonial-text");
    const avatarEl = document.getElementById("testimonial-avatar");
    const nameEl = document.getElementById("testimonial-name");
    const roleEl = document.getElementById("testimonial-role");
    const prevBtn = document.getElementById("prev-testimonial-btn");
    const nextBtn = document.getElementById("next-testimonial-btn");
    const dotsContainer = document.getElementById("testimonial-dots");

    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = "";
        testimonials.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = `w-2.5 h-2.5 rounded-full transition-colors ${i === currentTestimonial ? 'bg-brand-500' : 'bg-gray-700'}`;
            dot.addEventListener("click", () => updateTestimonial(i));
            dotsContainer.appendChild(dot);
        });
    }

    function updateTestimonial(index) {
        currentTestimonial = index;
        const item = testimonials[currentTestimonial];
        
        if (textEl) textEl.textContent = item.text;
        if (avatarEl) avatarEl.src = item.avatar;
        if (nameEl) nameEl.textContent = item.name;
        if (roleEl) roleEl.textContent = item.role;
        
        renderDots();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener("click", () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });
    }

    renderDots();

    // 5. Code Run Preview Button Alert
    const runBtn = document.getElementById("run-code-btn");
    if (runBtn) {
        runBtn.addEventListener("click", () => {
            alert("🚀 AuraEngine Preview Executed Successfully! Web vitals optimal.");
        });
    }
});
