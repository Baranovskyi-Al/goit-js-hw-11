import Notiflix from 'notiflix';

export { ifImagesFoundAlert, ifNoImagesFoundAlert, ifEndOfSearchAlert, ifNoEmptySearchAlert };

function ifImagesFoundAlert(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function ifNoImagesFoundAlert() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

function ifEndOfSearchAlert() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}

function ifNoEmptySearchAlert() {
  Notiflix.Notify.failure('The search string is empty. Please insert your search query.');
}
