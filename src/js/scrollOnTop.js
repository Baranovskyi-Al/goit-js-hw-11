export { onScroll, OnTopButtonClick };

const onTopButton = document.querySelector('.on-top-button');

window.addEventListener('scroll', onScroll);
onTopButton.addEventListener('click', OnTopButtonClick);

function onScroll() {
  const scrolled = window.pageYOffset;
  const coordinates = document.documentElement.clientHeight;

  if (scrolled > coordinates) {
    onTopButton.classList.add('on-top-button--visible');
  }
  if (scrolled < coordinates) {
    onTopButton.classList.remove('on-top-button--visible');
  }
}

function OnTopButtonClick() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
