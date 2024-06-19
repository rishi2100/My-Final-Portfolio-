//toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick= () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

// Scroll sections and activate navigation links with animation
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(section => {
    let top = window.scrollY;
    let offset = section.offsetTop - 100; // Adjust the offset as needed
    let height = section.offsetHeight;
    let id = section.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('href').includes(id)) {
          link.classList.add('active'); // Add active class to the matching link
        }
      });

      // Add animation class to the section
      section.classList.add('animated');
    } else {
      // Remove animation class when out of view
      section.classList.remove('animated');
    }
  });

  // Sticky header functionality
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  //remove toggle icon and navbar when click navbar links scroll

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.bar span');
      bars.forEach((bar) => {
        bar.style.animationPlayState = 'running';
      });
    }
  });
}, { root: null, rootMargin: '0px', threshold: 0.1 });
const skillsSections = document.querySelectorAll('.skills-column');
skillsSections.forEach((section) => observer.observe(section));


/* contact form */
const contactForm = document.querySelector('.contact form');
const inputFields = contactForm.querySelectorAll('.input-field input');
const textarea = contactForm.querySelector('.textarea-field textarea');
const focusElements = contactForm.querySelectorAll('.focus');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Basic validation
  let isValid = true;
  for (const inputField of inputFields) {
    if (inputField.value.trim() === '') {
      isValid = false;
      inputField.focus();
      break;
    }
  }
  if (textarea.value.trim() === '') {
    isValid = false;
    textarea.focus();
  }

  if (!isValid) {
    return;
  }

  // Getting form values
  const name = inputFields[0].value;
  const email = inputFields[1].value;
  const phone = inputFields[2].value;
  const subject = inputFields[3].value;
  const message = textarea.value;

  // Constructing the mailto: URL
  const mailtoURL = `mailto:rishi962002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`)}`;

  // Opening the default email client
  window.open(mailtoURL);

  // Reseting the form
  contactForm.reset();
  focusElements.forEach(focusElement => focusElement.style.width = '0');
});

// Adding focus and blur events for input fields
for (let i = 0; i < inputFields.length; i++) {
  const inputField = inputFields[i];
  const focusElement = focusElements[i];
  inputField.addEventListener('focus', () => {
    focusElement.style.width = '100%';
  });
  inputField.addEventListener('blur', () => {
    if (inputField.value.trim() === '') {
      focusElement.style.width = '0';
    }
  });
}

// Adding focus event for textarea
textarea.addEventListener('focus', () => {
  focusElements[inputFields.length].style.width = '100%';
});
textarea.addEventListener('blur', () => {
  if (textarea.value.trim() === '') {
    focusElements[inputFields.length].style.width = '0';
  }
});



