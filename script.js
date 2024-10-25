'use strict';

// AOT.init();
///////////////////////////////////////
// Modal window
const allLinks = document.querySelectorAll('a');
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navLinks = document.querySelector('.nav__links');
const message = document.createElement('div');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

const navEl = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// old way
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//

// message.classList.add('cookie-message');
// message.innerHTML = `<p>We us cookies for improved functionality and analytics.</p><button class="btn btn--close--cookie">Got it!</button>`;

// header.append(message);

// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

//  document.documentElement
// .style.setProperty('--color-primary', 'orangered');

// allLinks.forEach(link=>link.)

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// allLinks.forEach(function (link) {
//   console.log(link);

//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log(e.target);
//     const href = link.getAttribute('href');
//     if (href === '#') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//     if (href !== '#' && href.startsWith('#')) {
//       // const sectionEl = document.querySelector(href);
//       section1.scrollIntoView({ behavior: 'smooth' });
//     }
//     if (link.classList.contains('main-nav-link')) {
//       header.classList.toggle('nav-open');
//     }
//   });
// });

///

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // this.style.backgroundColor = randomColor();
//   e.target.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.target.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.target.style.backgroundColor = randomColor();
//   // e.stopPropagation();
// });

// bad practise

// document.querySelectorAll('.nav__link').forEach(function (link, i) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = link.getAttribute('href');
//     // const currSection = document.querySelector(`#section--${i + 1}`);
//     // currSection.scrollIntoView({ behavior: 'smooth' });
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//......... delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// creating tabs
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(tb => tb.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation

const handleHover = function (e) {
  // console.log(this);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
navEl.addEventListener('mouseover', handleHover.bind(0.5));
navEl.addEventListener('mouseout', handleHover.bind(1));

/////////////////  old way to make navigation sticky

// window.addEventListener('scroll', function () {
//   const initialCoords = section1.getBoundingClientRect();
//   if (this.window.screenY > initialCoords.top) navEl.classList.add('sticky');
//   else navEl.classList.remove('sticky');
// });

// intersection observer API

const headerEl = document.querySelector('.header');
const navHeight = navEl.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navEl.classList.add('sticky');
  else navEl.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // console.log(entry.target);
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const sections = document.querySelectorAll('.section');

sections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

const imgTargets = document.querySelectorAll(`img[data-src]`);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  const img = entry.target;
  if (!entry.isIntersecting) return;
  img.src = img.dataset.src;
  img.addEventListener('load', function () {
    img.classList.remove('lazy-img');
  });
  observer.unobserve(img);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function (time) {
  const slides = document.querySelectorAll('.slide');
  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
  );
  let currentSlide = 0;
  const maxSlides = slides.length - 1;
  const btnSliderLeft = document.querySelector('.slider__btn--left');
  const btnSliderRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const nextSlide = function () {
    if (currentSlide === maxSlides) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlides;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();
  btnSliderRight.addEventListener('click', nextSlide);
  btnSliderLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset; // destracure as an object
      console.log(slide);
      goToSlide(slide);
      activateDot(slide);
      // e.target.classList.add('dots__dot--active');
      // console.log(e.target);
    }
  });
  setInterval(() => {
    nextSlide();
  }, time);
};
slider(4000);

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(e);
//   console.log(e.target);
// });

// window.addEventListener('load', function (e) {
//   console.log('page fully loaded', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   e.returnValue = '';
// });

/// mobile navigation
const btnMobileNav = document.querySelector('.phone-menu');
btnMobileNav.addEventListener('click', function (e) {
  // navLinks.closest('.nav').classList.toggle('show');
  if (e.target === btnMobileNav) {
    navLinks.closest('.nav').classList.add('show');
  }
});
document.addEventListener('click', function (e) {
  if (e.target !== btnMobileNav)
    navLinks.closest('.nav').classList.remove('show');
});
