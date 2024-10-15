    document.addEventListener('DOMContentLoaded', () => {
    const marqueeContent1 = document.querySelector('.gallery_1');
    const marqueeItems1 = document.querySelectorAll('.marquee-item-1');
    const marqueeContent2 = document.querySelector('.gallery_2');
    const marqueeItems2 = document.querySelectorAll('.marquee-item-2');
    const marqueeContent3 = document.querySelector('.gallery_3');
    const marqueeItems3 = document.querySelectorAll('.marquee-item-3');
    const marqueeContent4 = document.querySelector('.gallery_4');
    const marqueeItems4 = document.querySelectorAll('.marquee-item-4');
    const debugElement = document.getElementById('debug');
    const loadingScreen = document.getElementById('loading');

    function debug(message) {
        debugElement.innerHTML += message + '<br>';
    }

    function getTotalHeight(items) {
        return Array.from(items).reduce((sum, item) => sum + item.offsetHeight + 14, 0); // Include margin
    }

    // Gallery 1 (Scroll Up)
    function setupInfiniteScroll1() {
        return new Promise((resolve) => {
            const totalHeight1 = getTotalHeight(marqueeItems1);
            if (marqueeItems1.length === 0) {
                debug('No marquee items found for gallery 1.');
                resolve();
                return;
            }

            let cloneCount1 = Math.ceil(window.innerHeight / marqueeItems1[0].offsetHeight);
            for (let i = 0; i < cloneCount1; i++) {
                marqueeContent1.appendChild(marqueeItems1[i].cloneNode(true));
            }

            gsap.set(marqueeContent1, { y: 0 });
            gsap.to(marqueeContent1, {
                y: -totalHeight1,
                duration: 30,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    y: gsap.utils.unitize(value => (parseFloat(value) % totalHeight1).toFixed(5))
                }
            });
            resolve();  // Resolve after setup is done
        });
    }

    // Gallery 2 (Scroll Down)
    function setupInfiniteScroll2() {
        return new Promise((resolve) => {
            const totalHeight2 = getTotalHeight(marqueeItems2);
            if (marqueeItems2.length === 0) {
                debug('No marquee items found for gallery 2.');
                resolve();
                return;
            }

            let cloneCount2 = Math.ceil(window.innerHeight / marqueeItems2[0].offsetHeight);
            for (let i = 0; i < cloneCount2; i++) {
                marqueeContent2.appendChild(marqueeItems2[i].cloneNode(true));
            }

            gsap.set(marqueeContent2, { y: -totalHeight2 });

            gsap.to(marqueeContent2, {
                y: 0,
                duration: 30,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    y: gsap.utils.unitize(value => (parseFloat(value) % totalHeight2).toFixed(5))
                }
            });
            resolve();  // Resolve after setup is done
        });
    }

    // Gallery 3 (Scroll Up)
    function setupInfiniteScroll3() {
        return new Promise((resolve) => {
            const totalHeight3 = getTotalHeight(marqueeItems3);
            if (marqueeItems3.length === 0) {
                debug('No marquee items found for gallery 3.');
                resolve();
                return;
            }

            let cloneCount3 = Math.ceil(window.innerHeight / marqueeItems3[0].offsetHeight);
            for (let i = 0; i < cloneCount3; i++) {
                marqueeContent3.appendChild(marqueeItems3[i].cloneNode(true));
            }

            gsap.set(marqueeContent3, { y: 0 });
            gsap.to(marqueeContent3, {
                y: -totalHeight3,
                duration: 30,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    y: gsap.utils.unitize(value => (parseFloat(value) % totalHeight3).toFixed(5))
                }
            });
            resolve();  // Resolve after setup is done
        });
    }

    // Gallery 4 (Scroll Down)
    function setupInfiniteScroll4() {
        return new Promise((resolve) => {
            const totalHeight4 = getTotalHeight(marqueeItems4);
            if (marqueeItems4.length === 0) {
                debug('No marquee items found for gallery 4.');
                resolve();
                return;
            }

            let cloneCount4 = Math.ceil(window.innerHeight / marqueeItems4[0].offsetHeight);
            for (let i = 0; i < cloneCount4; i++) {
                marqueeContent4.appendChild(marqueeItems4[i].cloneNode(true));
            }

            gsap.set(marqueeContent4, { y: -totalHeight4 });

            gsap.to(marqueeContent4, {
                y: 0,
                duration: 30,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    y: gsap.utils.unitize(value => (parseFloat(value) % totalHeight4).toFixed(5))
                }
            });
            resolve();  // Resolve after setup is done
        });
    }

    // Initialize all marquees after images are preloaded
    function initMarquee1() {
        return setupInfiniteScroll1().then(() => debug('Marquee 1 animation started'));
    }

    function initMarquee2() {
        return setupInfiniteScroll2().then(() => debug('Marquee 2 animation started'));
    }

    function initMarquee3() {
        return setupInfiniteScroll3().then(() => debug('Marquee 3 animation started'));
    }

    function initMarquee4() {
        return setupInfiniteScroll4().then(() => debug('Marquee 4 animation started'));
    }

    // Preload images before starting animations
    Promise.all(Array.from(document.images).map(img => {
        if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
        return new Promise(resolve => {
            img.onload = img.onerror = () => resolve(true);
        });
    })).then(() => {
        debug('All images loaded');
        Promise.all([initMarquee1(), initMarquee2(), initMarquee3(), initMarquee4()])
            .then(() => {
                loadingScreen.classList.add('fade-out');  // Fade out loading screen after all marquees are initialized
            });
    });
});