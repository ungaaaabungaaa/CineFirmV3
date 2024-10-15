document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );
  
    const sliderImages = document.querySelector(".slider-images");
    const counter = document.querySelector(".counter");
    const titles = document.querySelector(".slider-title-wrapper");
    const indicators = document.querySelectorAll(".slider-indicators p");
    const prevSlides = document.querySelectorAll(".slider-preview .preview");
    const slidePreview = document.querySelector(".slider-preview");
  
    let currentImg = 1;
    const totalSlides = 5;
    let indicatorRotation = 0;
  
    function updateCounterAndTitlePosition() {
      const counterY = -20 * (currentImg - 1);
      const titleY = -60 * (currentImg - 1);
  
      gsap.to(counter, {
        y: counterY,
        duration: 1,
        ease: "hop",
      });
  
      gsap.to(titles, {
        y: titleY,
        duration: 1,
        ease: "hop",
      });
    }
  
    function updateActiveSlidePreview() {
      prevSlides.forEach((prev) => prev.classList.remove("active"));
      prevSlides[currentImg - 1].classList.add("active");
    }
  
    function animateSlide(direction) {
      const currentSlide =
        document.querySelectorAll(".img")[
          document.querySelectorAll(".img").length - 1
        ];
  
      const slideImg = document.createElement("div");
      slideImg.classList.add("img");
  
      const slideImgElem = document.createElement("img");
      slideImgElem.src = `./assets/img${currentImg}.webp`;
      gsap.set(slideImgElem, { x: direction === "left" ? -500 : 500 });
  
      slideImg.appendChild(slideImgElem);
      sliderImages.appendChild(slideImg);
  
      gsap.to(currentSlide.querySelector("img"), {
        x: direction === "left" ? 500 : -500,
        duration: 1.5,
        ease: "hop",
      });
  
      gsap.fromTo(
        slideImg,
        {
          clipPath:
            direction === "left"
              ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
              : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "hop",
        }
      );
      gsap.to(slideImgElem, {
        x: 0,
        duration: 1.5,
        ease: "hop",
      });
  
      cleanupSlides();
  
      indicatorRotation += direction === "left" ? -90 : 90;
      gsap.to(indicators, {
        rotate: indicatorRotation,
        duration: 1,
        ease: "hop",
      });
    }
  
    document.addEventListener("click", (event) => {
      const sliderWidth = document.querySelector(".slider").clientWidth;
      const clickPosition = event.clientX;
  
      if (slidePreview.contains(event.target)) {
        const clickedPrev = event.target.closest(".preview");
  
        if (clickedPrev) {
          const clickedIndex = Array.from(prevSlides).indexOf(clickedPrev) + 1;
  
          if (clickedIndex !== currentImg) {
            if (clickedIndex < currentImg) {
              currentImg = clickedIndex;
              animateSlide("left");
            } else {
              currentImg = clickedIndex;
              animateSlide("right");
            }
            updateActiveSlidePreview();
            updateCounterAndTitlePosition();
          }
        }
        return;
      }
  
      if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
        currentImg--;
        animateSlide("left");
      } else if (clickPosition > sliderWidth / 2 && currentImg !== totalSlides) {
        currentImg++;
        animateSlide("right");
      }
  
      updateActiveSlidePreview();
      updateCounterAndTitlePosition();
    });
  
    function cleanupSlides() {
      const imgElements = document.querySelectorAll(".slider-images .img");
      if (imgElements.length > totalSlides) {
        imgElements[0].remove();
      }
    }
  });