const addMovieModal = document.getElementById('add-modal');
const firstAddBtn = document.querySelector('header button');
// const firstAddBtn = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
const cancelBtn = addMovieModal.querySelector('.btn--passive');
const addBtn = addMovieModal.querySelector('.btn--success');
// const addBtn = cancelBtn.nextElementSibling
const userInputs = addMovieModal.querySelectorAll('input');
const entrySection = document.getElementById('entry-text');
const deleteModal = document.getElementById('delete-modal');

const movies = [];

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const closeMovieModal = () => addMovieModal.classList.remove('visible');

const toggleBackdrop = () => backdrop.classList.toggle('visible');

const clearInputs = () => {
  for (const input of userInputs) {
    input.value = '';
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    entrySection.style.display = 'block';
  } else {
    entrySection.style.display = 'none';
  }
};

const renderMoviesList = ({ id, title, image, rating }) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${image} alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>
    ${title}
    <p>
    ${rating}/5 stars
    </p>
    </h2>
  </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
  const movieList = document.getElementById('movie-list');
  movieList.append(newMovieElement);
};

const cancelDeletion = () => {
  toggleBackdrop();
  deleteModal.classList.remove('visible');
};

// HANDLERS

const closeBackdropHandler = () => {
  closeMovieModal();
  cancelDeletion();
};

const closeAddMovieHandler = () => {
  closeMovieModal();
  clearInputs();
};

const addMovieHandler = () => {
  const title = userInputs[0].value;
  const imageURL = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === '' ||
    imageURL.trim() === '' ||
    rating.trim() === '' ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert('Invalid information. Please review the given information');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: title,
    image: imageURL,
    rating: rating,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
  renderMoviesList(newMovie);
  updateUI();
};

const deleteMovieHandler = id => {
  let idIndex = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    idIndex++;
  }
  movies.splice(idIndex, 1);
  const movieList = document.getElementById('movie-list');
  movieList.children[idIndex].remove();
};

const startDeleteMovieHandler = id => {
  deleteModal.classList.add('visible');
  toggleBackdrop();
  const cancelDelBtn = deleteModal.querySelector('.btn--passive');
  const confirmDelBtn = deleteModal.querySelector('.btn--danger');

  cancelDelBtn.addEventListener('click', cancelDeletion);
  confirmDelBtn.addEventListener('click', deleteMovieHandler.bind(null, id));
  deleteMovie(id);
};

// HANDLERS

firstAddBtn.addEventListener('click', showMovieModal);

backdrop.addEventListener('click', closeBackdropHandler);

cancelBtn.addEventListener('click', closeAddMovieHandler);

addBtn.addEventListener('click', addMovieHandler);
