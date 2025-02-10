document.addEventListener('DOMContentLoaded', () => {
    // Your existing JavaScript code here

// script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Banner Section
// Function to animate the counters
function animateCounters() {
    const counters = document.querySelectorAll('.banner-number');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count'); // Get target number
        const start = +counter.innerText; // Get starting number
        const duration = 3000; // Animation duration in milliseconds (3 seconds)
        const increment = (target - start) / (duration / 16); // Calculate increment per frame

        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Check if this is the High Satisfaction Score section
                if (counter.closest('.banner-item').querySelector('.banner-title').textContent === 'High Satisfaction Score') {
                    counter.innerText = target + '%'; // Add "%" for the second section
                } else {
                    counter.innerText = target + '+'; // Add "+" for other sections
                }
            }
        };

        updateCounter();
    });
}


// Trigger the animation when the page loads
window.addEventListener('load', animateCounters);

// Testimonials Slider
const slider = document.querySelector('.testimonials-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

const testimonials = [
    // Example testimonials (replace with dynamic data from the server)
    { name: "Angela Mbugua", comment: "Great service! Highly recommended.", rating: 5, picture: "assets/images/placeholder1.jpg" },
    { name: "Kelvin Kiragu", comment: "They built an amazing website for our organization. The customer service was also amazing experience with Whale Digital Studios.", rating: 4, picture: "assets/images/placeholder2.jpg" },
    { name: "Mohammed Katana", comment: "Very professional and creative team. I would recommend them.", rating: 5, picture: "assets/images/placeholder3.jpg" }, 
    { name: "Kitsao Charo", comment: "The team developed our inventory system at my shop and so far it is working perfectly as they had designed it. They also respond quickly to any maintenance issues.", rating: 5, picture: "assets/images/placeholder4.jpg" },
    { name: "Mwanaisha Ahmed", comment: "Highly skilled team with great attention to detail.", rating: 4, picture: "assets/images/placeholder5.jpg" },
    { name: "David Ouma", comment: "I had a great engagement with the team while building a mobile app. I appreciate the fantastic communication and support throughout the project.", rating: 5, picture: "assets/images/placeholder6.jpg" },
    // Add more testimonials as needed
];

// MODIFIED RENDER FUNCTION
function renderTestimonials() {
    const isMobile = window.innerWidth <= 768;
    const itemsPerView = isMobile ? 2 : 4; // Detect mobile vs desktop
    
    // Ensure we always show complete pairs/pages
    currentIndex = Math.min(currentIndex, testimonials.length - itemsPerView);

    slider.innerHTML = testimonials.slice(currentIndex, currentIndex + itemsPerView).map(testimonial => `
        <div class="testimonial-card">
            <img src="${testimonial.picture || 'assets/images/placeholder.png'}" alt="${testimonial.name}">
            <h3>${testimonial.name}</h3>
            <p>${testimonial.comment}</p>
            <div class="star-rating">
                ${'&#9733;'.repeat(testimonial.rating)}
            </div>
        </div>
    `).join('');
}



// Render testimonials on page load
renderTestimonials();


prevBtn.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    currentIndex = Math.max(0, currentIndex - (isMobile ? 2 : 4));
    renderTestimonials();
  });
  
  nextBtn.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    currentIndex = Math.min(
      testimonials.length - (isMobile ? 2 : 4), 
      currentIndex + (isMobile ? 2 : 4)
    );
    renderTestimonials();
  });


// Star Rating in Feedback Form
const stars = document.querySelectorAll('.star-rating .star');
const ratingInput = document.getElementById('rating');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = star.getAttribute('data-value');
        ratingInput.value = value;
        stars.forEach((s, index) => {
            s.classList.toggle('active', index < value);
        });
    });
});

// Feedback Form Submission
document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedback = {
        name: formData.get('name'),
        comment: formData.get('comment'),
        picture: formData.get('picture'),
        rating: formData.get('rating')
    };
    testimonials.unshift(feedback); // Add new feedback to the beginning
    renderTestimonials();
    e.target.reset(); // Reset the form
});

/*Add EventListernto Newsletter Form Submission */
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    // Add logic to handle the email (e.g., send to a server)
    alert(`Thank you for subscribing! We'll send updates to ${email}.`);
    e.target.reset();
});

/*Add validation for the file input*/
const pictureInput = document.getElementById('picture');
pictureInput.addEventListener('change', () => {
    const file = pictureInput.files[0];
    if (file && !file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        pictureInput.value = ''; // Clear the input
    }
});
});