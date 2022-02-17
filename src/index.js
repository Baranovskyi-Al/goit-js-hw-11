import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import { onScroll, OnTopButtonClick } from './js/scrollOnTop';
import {
  ifImagesFoundAlert,
  ifNoImagesFoundAlert,
  ifEndOfSearchAlert,
  ifNoEmptySearchAlert,
} from './js/alerts';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchFormButtonClick);

loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
window.addEventListener('scroll', infinityScroll);

function onSearchFormButtonClick(element) {
  element.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = element.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreButton.classList.add('visualy-hidden');

  if (query === '') {
    ifNoEmptySearchAlert();
    return;
  } else {
    fetchImages(query, page, perPage)
      .then(({ data }) => {
        if (data.totalHits === 0) {
          ifNoImagesFoundAlert();
        } else {
          renderGallery(data.hits);
          simpleLightBox = new SimpleLightbox('.gallery a').refresh();
          ifImagesFoundAlert(data);

          // if (data.totalHits > perPage) {
          //   loadMoreButton.classList.remove('visualy-hidden');
          // }
        }
      })
      .catch(error => console.log(error));
  }
}

function onLoadMoreButtonClick() {
  page += 1;
  onLoadMoreButtonClick;
  simpleLightBox.destroy();

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        loadMoreButton.classList.add('visualy-hidden');
        ifEndOfSearchAlert();
      }
    })
    .catch(error => console.log(error));
}

function infinityScroll() {
  const windowHeight = window.innerHeight;
  const galleryPageHeight = gallery.offsetHeight;
  const yOffset = window.pageYOffset;
  const y = yOffset + windowHeight;

  if (y >= galleryPageHeight) {
    page += 1;
    simpleLightBox.destroy();

    fetchImages(query, page, perPage)
      .then(({ data }) => {
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();

        const totalPages = Math.ceil(data.totalHits / perPage);

        if (page > totalPages) {
          ifEndOfSearchAlert();
        }
      })
      .catch(error => console.log(error));
  }
}
