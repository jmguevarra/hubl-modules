document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.pdx-slider__swiper', {
    loop: true,
    navigation: {
      nextEl: '.pdx-slider__button--next',
      prevEl: '.pdx-slider__button--prev',
    },
    spaceBetween: 30,
    on: {
      init: function () {
        const totalSlides = document.querySelectorAll('.pdx-slider__slide').length;
        document.querySelector('.pdx-slider__total').textContent = totalSlides;
        document.querySelector('.pdx-slider__current').textContent = this.realIndex + 1;
      },

      slideChange: function () {
        document.querySelector('.pdx-slider__current').textContent = this.realIndex + 1;
      }
    }
  });
});
