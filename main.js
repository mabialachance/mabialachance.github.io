// Function to show or hide the "About" section when the button is clicked
function toggleAbout() {
  const aboutSection = document.getElementById('about'); // Get the About section by its ID

  // Toggle display between 'block' and 'none'
  aboutSection.style.display = 
    (aboutSection.style.display === 'none' || aboutSection.style.display === '') 
      ? 'block' 
      : 'none';
}

// Function to show or hide the "Contact" section when the button is clicked
function toggleContact() {
  const contactSection = document.getElementById('contact'); // Get the Contact section by its ID

  // Toggle display between 'block' and 'none'
  contactSection.style.display = 
    (contactSection.style.display === 'none' || contactSection.style.display === '') 
      ? 'block' 
      : 'none';
}

// Function to show one subsection at a time (Education, Careers, or Hobbies)
function toggleSubsection(id) {
  const sections = ['education', 'careers', 'hobbies']; // List of all subsection IDs

  // Loop through each section
  sections.forEach(sec => {
    const el = document.getElementById(sec); // Get the element by its ID

    // Show the selected section and hide the others
    el.style.display = (sec === id) ? 'block' : 'none';
  });
}

// Wait until the DOM is fully loaded before running this initialization
document.addEventListener('DOMContentLoaded', function () {
  // Hide the About section by default
  document.getElementById('about').style.display = 'none';

  // Hide the Contact section by default
  document.getElementById('contact').style.display = 'none';

  // Hide all subsections (Education, Careers, Hobbies) by default
  ['education', 'careers', 'hobbies'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
});