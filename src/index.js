// import './css/styles.css';
// import Notiflix from 'notiflix';

import axios from 'axios';

// const query = document.querySelector('#search');
// const button = document.querySelector('#button');
// const box = document.querySelector('.box');

// button.addEventListener('click', onclick);

// function onclick { };

// fetch(`${BASE_URL}=cats&image_type=photo`)
//   .then(response => response.json())
//   .then(resultResp => {
//     // console.log(resultResp);
//     const arraOfData = resultResp.hits;
//     const markup = arraOfData.map(
//       ({ previewURL, pageURL, tags, likes, views, comments, downloads }) => {
//         console.log(`
//     <img src="${previewURL}" alt="${tags}" class="webformatURL"/>
//     <img src="${pageURL}" alt="${tags}" class="largeImageURL"/>
//       <h2 class="tags">опис: ${tags}</h2>
//       <p class="likes">кількість лайків: ${likes}</p>
//       <p class="views">кількість переглядів: ${views}</p>
//       <p class="comments">кількість коментарів: ${comments}</p>
//       <p class="downloads">кількість завантажень: ${downloads}</p>`);
//       }
//     );
//   })
//   .catch(e => console.log(e));
// box.insertAdjacentHTML(beforeend, markup);

const config = {
  method: 'get',
  url: 'https://pixabay.com/api/',
  responseType: 'json',
  params: {
    q: 'cats',
    key: '34845397-6a8ea04ff885abb1fbb7f7c21',
  },
};

async function fetchData() {
  const response = await axios.get(config);
  // const data = await response.json();
  // console.log(response);
  // return data;
}
