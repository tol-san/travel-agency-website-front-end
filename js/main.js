

document.addEventListener('DOMContentLoaded', function () {

  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); 

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });



  const testimonials = [
    {
      quote: "Our Bali trip was seamless from start to finish. The local guides knew hidden spots we'd never find alone. Already planning our next adventure!",
      author: "Sarah & Mike T.",
      trip: "Bali Explorer Tour",
      avatar: "../assets/images/TESTIMONIALS-2.png"
    },
    {
      quote: "I'm a solo traveler and safety was my priority. The 24/7 support gave me peace of mind. Best decision I made this year.",
      author: "Priya K.",
      trip: "Japan Solo Journey",
      avatar: "../assets/images/TESTIMONIALS-3.png"
    },
    {
      quote: "The kids talked about the safari for months! Family-friendly, well-paced, and the game drives were incredible.",
      author: "The Anderson Family",
      trip: "South Africa Family Safari",
      avatar: "../assets/images/TESTIMONIALS-4.png"
    },
    {
      quote: "Honestly, I was skeptical about group tours. But the small group size and expert itinerary changed my mind completely.",
      author: "James L.",
      trip: "Peru Adventure Trek",
      avatar: "../assets/images/TESTIMONIALS-5.png"
    }
  ];

  let currentTestimonial = 0;
  const testimonialCard = document.querySelector('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-controls button:first-child');
  const nextBtn = document.querySelector('.testimonial-controls button:last-child');

  function updateTestimonial() {
    if (!testimonialCard) return;

    const t = testimonials[currentTestimonial];
    const quote = testimonialCard.querySelector('.testimonial-quote');
    const author = testimonialCard.querySelector('.testimonial-author');
    const trip = testimonialCard.querySelector('.testimonial-trip');
    const avatar = testimonialCard.querySelector('.testimonial-avatar');

    testimonialCard.style.opacity = '0';

    setTimeout(() => {
      if (quote) quote.textContent = `"${t.quote}"`;
      if (author) author.textContent = t.author;
      if (trip) trip.textContent = t.trip;
      if (avatar) avatar.src = t.avatar;

      testimonialCard.style.opacity = '1';
    }, 200);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function () {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
    });

    nextBtn.addEventListener('click', function () {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial();
    });

    if (testimonialCard) {
      testimonialCard.style.transition = 'opacity 0.2s ease';
    }

    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial();
    }, 6000);
  }

  document.querySelectorAll('.tour-card-wishlist').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const icon = this.querySelector('i');
      if (icon.classList.contains('bi-heart')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        this.style.background = 'var(--color-danger)';
        this.style.color = 'white';
      } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        this.style.background = 'white';
        this.style.color = '';
      }
    });
  });




  const searchForm = document.querySelector('.hero-search-form');

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const destination = document.getElementById('search-destination').value;
      const date = document.getElementById('search-date').value;
      const travelers = document.getElementById('search-travelers').value;
      const budget = document.getElementById('search-budget').value;


      const params = new URLSearchParams();
      if (destination) params.append('destination', destination);
      if (date) params.append('date', date);
      if (travelers) params.append('travelers', travelers);
      if (budget) params.append('budget', budget);

      window.location.href = `tours.html?${params.toString()}`;
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      const button = this.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Subscribed!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        this.reset();
      }, 3000);
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate-hidden');
        entry.target.classList.add('animate-fade-up');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.destination-card, .tour-card, .feature-card').forEach((el, index) => {
    el.classList.add('animate-hidden');
    el.classList.add(`animate-delay-${(index % 4) + 1}`);
    animateOnScroll.observe(el);
  });


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenu'));
      if (offcanvas) {
        offcanvas.hide();
      }
    }
  });

  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (toggle && menu) {
      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const firstItem = menu.querySelector('.dropdown-item');
          if (firstItem) firstItem.focus();
        }
      });
    }
  });

});
