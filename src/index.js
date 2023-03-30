import './sass/main.css';
import Notiflix from 'notiflix';
import ApiService from './js/api-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import renderCard from './js/markup';

// ============================== Selectors ===================================

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const apiService = new ApiService();
const AMOUNT_OF_PAGES = 40;

// ============================== Search ======================================

form.addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  apiService.resetPage();
  apiService.query = e.currentTarget.elements.searchQuery.value;
  window.addEventListener('scroll', onScroll);
  showCards();
});

// ============================ Load more =====================================

// loadMoreBtn.addEventListener('click', () => {
//   showCards();
// });

// Infinite scroll

function onScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    showCards();
  }
}

// ============================ Add cards =====================================

async function showCards() {
  let cards;
  let totalHits;
  try {
    const response = await apiService.fetchArticles(AMOUNT_OF_PAGES);
    cards = response.data.hits;
    totalHits = response.data.totalHits;
  } catch (error) {
    console.log(error.response.status);
    return;
  }
  // -------------------------- Messages & conditions -------------------------

  const hasResultsOnSecondPage = totalHits > 0 && apiService.page === 2;
  const hasNoCards = cards.length === 0;
  const amountOfPages =
    Math.ceil(totalHits / AMOUNT_OF_PAGES) - apiService.page;
  console.log(Math.ceil(totalHits / AMOUNT_OF_PAGES) - apiService.page);

  const successMessage = `Hooray! We found ${totalHits} images.`;
  const noResultsMessage =
    'Sorry, there are no images matching your search query. Please try again.';
  const endOfResultsMessage =
    "We're sorry, but you've reached the end of search results.";

  if (hasResultsOnSecondPage) {
    Notiflix.Notify.success(successMessage);
  }

  if (hasNoCards) {
    Notiflix.Notify.failure(noResultsMessage);
    return;
  }

  if (amountOfPages === -1) {
    Notiflix.Notify.warning(endOfResultsMessage);
    loadMoreBtn.style.display = 'none';
    window.removeEventListener('scroll', onScroll);
  } else {
    //  uncomment for "Load Butещт"
    // loadMoreBtn.style.display = 'block';
  }

  // ------------------------------ Rebder Cards ------------------------------

  const cardsMarkup = cards.map(renderCard).join('');
  gallery.insertAdjacentHTML('beforeend', cardsMarkup);
  lightbox.refresh();
}

// =========================  SimpleLightbox ==================================

gallery.addEventListener('click', onImageClick);
const lightbox = new SimpleLightbox('.gallery a');
function onImageClick(e) {
  e.preventDefault();
}
