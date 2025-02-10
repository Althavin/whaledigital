// Get blog ID from URL
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

// Fetch blogs from localStorage (replace with backend later)
const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

// Find the blog with the matching ID
const blog = blogs.find(b => b.title.replace(/\s+/g, '-').toLowerCase() === blogId);

if (blog) {
  // Populate the blog post
  document.querySelector('.blog-hero img').src = blog.coverImage;
  document.querySelector('.blog-content h2').textContent = blog.title;
  document.querySelector('.blog-content .metadata').innerHTML = `
    <em>Published on: <span id="publish-date">${blog.date}</span></em>
  `;
  document.querySelector('.blog-text').innerHTML = blog.content
    .split('\n')
    .map((paragraph, index) => {
      const image = blog.images[index] ? `<img src="${blog.images[index]}" alt="Image ${index + 1}">` : '';
      return `<p>${paragraph}</p>${image}`;
    })
    .join('');
} else {
  document.querySelector('.blog-content').innerHTML = '<p>Blog not found.</p>';
}
// Close mobile menu when clicking menu items
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.nav-link');

  // Auto-close menu when clicking links (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });

  // Ensure menu is closed on page load (for blog page)
  new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
});

function toggleMenu() {
  var menu = document.getElementById("navbarNav");
  if (menu.style.display === "flex") {
      menu.style.display = "none";
  } else {
      menu.style.display = "flex";
  }
}