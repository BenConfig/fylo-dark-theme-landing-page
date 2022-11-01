/* ------------------------------------------------------ */
/*                       Form Handle                      */
/* ------------------------------------------------------ */
const FORM = document.querySelector('[data-form]');
const EMAIL = document.querySelector('[data-email]');
const BTN = document.querySelector('[data-btn]');

// Fake sending email to api endpoint
const postEmailToDatabase = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

// Options for submit button
const btnOptions = {
    pending: `
        <svg class="form__submit-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M168,40.7a96,96,0,1,1-80,0" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
        Sending ...
    `,
    success: `Thank you! 👍`,
}

// Handle form submit
const handleFormSubmit = async e => {
    e.preventDefault();
    BTN.disabled = true;
    BTN.innerHTML = btnOptions.pending;
    const userInput = EMAIL.value;
    EMAIL.parentElement.style.display = 'none';
    await postEmailToDatabase(userInput);
    BTN.innerHTML = btnOptions.success;
}

FORM.addEventListener('submit', handleFormSubmit);

// On 'input' remove error attributes
EMAIL.addEventListener('input', () => {
    if (EMAIL.classList.contains('show')) {
        EMAIL.classList.remove('show');
        EMAIL.removeAttribute('aria-invalid');
        EMAIL.removeAttribute('aria-describedby');
    }
})

// On 'invalid' add error attributes
EMAIL.addEventListener('invalid', e => {
    e.preventDefault();
    EMAIL.classList.add('show');
    EMAIL.setAttribute('aria-invalid', 'true');
    EMAIL.setAttribute('aria-describedby', 'error');
});

/* ------------------------------------------------------ */
/*                 Intersection Observers                 */
/* ------------------------------------------------------ */

// Change Header styles on scroll
const HEADER = document.querySelector('[data-header]');
const BOUNDARY = document.querySelector('[data-boundary]')

const headerChangeObserver = new IntersectionObserver(entries => {
    HEADER.classList.toggle('scrolled', !entries[0].isIntersecting);
}, { threshold: 1 });

headerChangeObserver.observe(BOUNDARY);

// Fade in selected elements on scroll
const FADE_IN_ELS = document.querySelectorAll('[data-fadeInOnScroll]');

const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fade-in');
        fadeInObserver.unobserve(entry.target);
    });
}, { threshold: .5 });

FADE_IN_ELS.forEach(el => fadeInObserver.observe(el));