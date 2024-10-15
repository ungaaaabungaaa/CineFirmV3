document.addEventListener('DOMContentLoaded', () => {
    const marquees = document.querySelectorAll('.marquee-content');
    const loadingScreen = document.getElementById('loading');

    function getTotalHeight(items) {
        return Array.from(items).reduce((sum, item) => sum + item.offsetHeight + 14, 0); // Including margin
    }

    function setupInfiniteScroll(marquee, direction) {
        const items = marquee.children;
        const totalHeight = getTotalHeight(items);

        // Clone items for smooth scrolling
        let cloneCount = Math.ceil(window.innerHeight / items[0].offsetHeight);
        for (let i = 0; i < cloneCount; i++) {
            marquee.appendChild(items[i].cloneNode(true));
        }

        // Setup GSAP animation
        gsap.set(marquee, { y: direction === 'up' ? 0 : -totalHeight });

        gsap.to(marquee, {
            y: direction === 'up' ? -totalHeight : 0,
            duration: 30,
            ease: 'none',
            repeat: -1,
            modifiers: {
                y: gsap.utils.unitize(value => (parseFloat(value) % totalHeight).toFixed(5))
            }
        });
        
        // Fade out loading screen after starting marquee
        loadingScreen.classList.add('fade-out');
    }

    let imagesLoaded = 0;
    const totalImages = document.querySelectorAll('img').length;

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                marquees.forEach(marquee => {
                    const direction = marquee.getAttribute('data-direction');
                    setupInfiniteScroll(marquee, direction);
                });
            }
        });

        img.addEventListener('error', () => {
            console.error(`Image failed to load: ${img.src}`);
        });
    });

    // Fallback mechanism to retry initialization
    setTimeout(() => {
        if (imagesLoaded < totalImages) {
            marquees.forEach(marquee => {
                const direction = marquee.getAttribute('data-direction');
                setupInfiniteScroll(marquee, direction);
            });
        }
    }, 2000); // Adjust delay as necessary
});