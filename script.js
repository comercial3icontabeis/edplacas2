const root = document.documentElement;

const updateScrollState = () => {
  root.style.setProperty('--page-scroll', `${window.scrollY}px`);
};

updateScrollState();
window.addEventListener('scroll', updateScrollState, { passive: true });

const splitTextBlocks = document.querySelectorAll('.split-text');
splitTextBlocks.forEach((element) => {
  const text = element.textContent;
  element.textContent = '';

  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'split-character';
    span.style.setProperty('--character-index', index);
    span.textContent = char === ' ' ? '\u00A0' : char;
    element.appendChild(span);
  });
});

const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const processTrack = document.querySelector('.process-track');
if (processTrack) {
  const processObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  processObserver.observe(processTrack);
}

const comparisonFrame = document.querySelector('.comparison-frame');
const comparisonRange = document.querySelector('.comparison-range');

if (comparisonFrame && comparisonRange) {
  const setComparisonPosition = (value) => {
    comparisonFrame.style.setProperty('--comparison-position', `${value}%`);
  };

  setComparisonPosition(comparisonRange.value);

  comparisonRange.addEventListener('input', (event) => {
    setComparisonPosition(event.target.value);
  });
}
