const items = document.querySelectorAll('.list');

function activeLink() {
  items.forEach((item) => {
    item.classList.remove('active');
  });
  this.classList.add('active');
}

items.forEach((item) => {
  item.addEventListener(
    'click',
    activeLink,
  );
});