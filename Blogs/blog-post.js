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