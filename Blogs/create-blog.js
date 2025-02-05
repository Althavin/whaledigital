document.getElementById('blog-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form data
  const title = document.getElementById('title').value;
  const coverImage = document.getElementById('cover-image').value;
  const metadata = document.getElementById('metadata').value;
  const content = document.getElementById('content').value;

  // Get content images (optional)
  const images = [];
  for (let i = 1; i <= 6; i++) {
    const imageUrl = document.getElementById(`image${i}`).value;
    if (imageUrl) images.push(imageUrl);
  }

  // Create blog object
  const blog = {
    title,
    coverImage,
    metadata,
    content,
    images,
    date: new Date().toISOString().split('T')[0] // Current date
  };

  // Save blog to localStorage (for now, replace with backend later)
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  blogs.push(blog);
  localStorage.setItem('blogs', JSON.stringify(blogs));

  // Redirect to the blog list page
  window.location.href = 'blog.html';
});