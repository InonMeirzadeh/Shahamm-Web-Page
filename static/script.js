document.addEventListener('DOMContentLoaded', function() {

    // Scroll animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Service cards and project categories animations
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCategories = document.querySelectorAll('.project-category');

    serviceCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });

    projectCategories.forEach((category, index) => {
        category.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.1}s`;
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image gallery lightbox
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryImages.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });

    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // שליחת הטופס באופן תכנותי
        fetch(contactForm.action, {
            method: contactForm.method,
            body: new FormData(contactForm)
        })
        .then(response => {
            if (response.ok) {
                // אם השליחה הצליחה, העבר לדף התודה
                window.location.href = '/thank_you';
            } else {
                // אם יש שגיאה, הצג הודעת שגיאה
                alert('אירעה שגיאה בעת שליחת הטופס. אנא נסו שנית.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('אירעה שגיאה בעת שליחת הטופס. אנא נסו שנית.');
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const text = section.innerText.toLowerCase();
            if (text.includes(searchTerm)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-grid img');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
    }

    setInterval(showNextTestimonial, 5000); // Change testimonial every 5 seconds
});
