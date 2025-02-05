document.addEventListener("DOMContentLoaded", () => {
    console.log("Services page loaded successfully!");

    const consultButtons = document.querySelectorAll('.consult-button');
    consultButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.closest('.service-box').querySelector('h2').innerText;
            alert(`You clicked on the consult button for ${serviceName}`);
        });
    });

    // Add further interactivity as needed
});