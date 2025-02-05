<!-- JavaScript for Form Submission -->
<script>
    document.getElementById('feedbackForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your feedback! We will get back to you soon.');
        e.target.reset(); // Reset the form
    });
</script>