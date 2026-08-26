document.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.getElementById('get-started-btn');
  const backBtn = document.getElementById('back-btn');
  const landingPage = document.getElementById('landing-page');
  const languagesPage = document.getElementById('languages-page');

  // Navigate from Landing Page to Languages Page
  getStartedBtn.addEventListener('click', () => {
    landingPage.classList.remove('active');
    languagesPage.classList.add('active');
  });

  // Navigate back to Landing Page
  backBtn.addEventListener('click', () => {
    languagesPage.classList.remove('active');
    landingPage.classList.add('active');
  });

  // Add click events to language buttons
  
});