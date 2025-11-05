// Contact Form Handling with SEO-friendly features
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const formMsg = document.getElementById('form-msg');
  formMsg.innerText = 'Thank you! Your message has been received. We will get back to you soon.';
  formMsg.style.color = '#c9a13c';
  formMsg.style.fontWeight = '600';
  form.reset();
  
  // Clear message after 5 seconds
  setTimeout(() => {
    formMsg.innerText = '';
  }, 5000);
});

// Theme Toggle
const toggle = document.createElement('button');
toggle.innerHTML = '<i class="fas fa-moon"></i>';
toggle.className = 'theme-toggle';
toggle.title = 'Toggle Theme';
toggle.setAttribute('aria-label', 'Toggle dark and light mode');
document.body.appendChild(toggle);

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = toggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.className = 'fas fa-sun';
    toggle.title = 'Switch to Light Mode';
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.className = 'fas fa-moon';
    toggle.title = 'Switch to Dark Mode';
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Update URL without page reload for better UX
      history.pushState(null, null, this.getAttribute('href'));
    }
  });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
  
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

// Add loading animation to cards with accessibility
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
  });
});

// Service card interactions for better UX
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    const serviceName = this.querySelector('h3').textContent;
    const serviceSelect = document.getElementById('service');
    const option = Array.from(serviceSelect.options).find(opt => 
      opt.text.toLowerCase().includes(serviceName.toLowerCase())
    );
    if (option) {
      serviceSelect.value = option.value;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Performance optimization: Preload critical images
function preloadCriticalImages() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1604328698692-17d64c72c09a?auto=format&fit=crop&w=800&q=80'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadCriticalImages);
} else {
  preloadCriticalImages();
}

// Add structured data for services
const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Custom Uniforms",
        "description": "Professional uniform manufacturing for schools and businesses in Namibia"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Car Seat Covers",
        "description": "Custom vehicle seat cover manufacturing and installation"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Backpacks",
        "description": "Durable backpack manufacturing for work and outdoor use"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Overalls",
        "description": "Protective workwear and overalls manufacturing"
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Upholstery Repairs",
        "description": "Professional furniture and vehicle upholstery repair services"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Service",
        "name": "Embroidery",
        "description": "Custom embroidery services for branding and personalization"
      }
    }
  ]
};

// Add service structured data to page
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(serviceStructuredData);
document.head.appendChild(script);