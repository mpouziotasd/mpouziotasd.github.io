document.addEventListener("DOMContentLoaded", function() {
    const contentData = [
        { image: "figs/DimitrisMpouziotas.JPEG", title: "About Me", text: "I am a passionate developer..." },
        { image: "figs/image2.jpg", title: "My Work", text: "Showcasing my latest projects." },
        { image: "figs/image3.jpg", title: "Experience", text: "Years of experience in web development." }
    ];

    contentData.forEach((data, index) => {
        document.getElementById(`img${index + 1}`).src = data.image;
        document.getElementById(`title${index + 1}`).textContent = data.title;
        document.getElementById(`text${index + 1}`).textContent = data.text;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            } else {
                entry.target.classList.remove('fade-in');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});