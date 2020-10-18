document.addEventListener("DOMContentLoaded", () => {
  // ---------Animation---------
  const ANIMATIONS = document.querySelectorAll(".--animation");

  if (ANIMATIONS.length > 0) {
    window.addEventListener("scroll", animate);

    function animate() {
      Array.from(ANIMATIONS).forEach((item) => {
        const ITEM_HEIGHT = item.offsetHeight, // Height of the element
              ITEM_OFFSET = offset(item), // Position of the element relative to the top
              START = 4; // Coefficient which regulates the start time of the animation

        let animPont = window.innerHeight - ITEM_HEIGHT / START;

        // If the animated item is larger than the browser window height
        if (ITEM_HEIGHT > window.innerHeight) {
          animPont = window.innerHeight - window.innerHeight / START;
        }

        if (
          pageYOffset > ITEM_OFFSET - animPont &&
          pageYOffset < ITEM_OFFSET + ITEM_HEIGHT
        ) {
          item.classList.add("--active");
        } else if (!item.classList.contains("--stop-anim")) {
          item.classList.remove("--active");
        }
      });
    }

    animate();
  }

  // For cross browser scroll height
  function offset(element) {
      const RECT = element.getBoundingClientRect(),
            SCROLL_TOP = window.pageYOffset || document.documentElement.scrollTop;
    
      return RECT.top + SCROLL_TOP;
  }
});