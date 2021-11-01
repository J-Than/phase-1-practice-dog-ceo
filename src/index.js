// Declare global JS variables
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const images = document.getElementById("dog-image-container");
const breeds = document.getElementById("dog-breeds");

// GET images from server
fetch(imgUrl)
.then(resp => resp.json())
.then(value => imageHandler(value));

// GET breeds from server
fetch(breedUrl)
.then(resp => resp.json())
.then(value => breedHandler(value));

// Image handler, inserts images into DOM
function imageHandler(value) {
  array = value.message;
  array.forEach(element => {
    const image = document.createElement('img');
    image.src = element;
    images.appendChild(image);
  })
}

// Breed handler, inserts breeds into DOM
function breedHandler(value) {
  objects = value.message;
  for (element in objects) {
    const breed = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = element;
    btn.setAttribute('class', 'btn');
    breed.appendChild(btn);
    breeds.appendChild(breed);
  }
  breedListener();
}

// Function to add event handler to breeds list
function breedListener() {
  const breedArray = document.getElementsByTagName('button');
  for (element of breedArray) {
    element.addEventListener('click', colorChanger);
  }
  sortInitializer();
}

// Changes the text color
function colorChanger(e) {
  e.target.setAttribute('class', 'redBtn');
}

// Adds sorting capability and listener to breeds list
function sortInitializer() {
  option = document.getElementById('breed-dropdown');
  option.addEventListener('input', breedSorter);
}

// Sorts the breeds given a specific letter input
function breedSorter(letter) {
  initLetter = letter.target[letter.target.options.selectedIndex].textContent;
  for (item of document.getElementsByTagName('li')) {
    if (item.firstChild.textContent.charAt(0) === initLetter) {
      item.hidden = false;
    } else {
      item.hidden = true;
    }
  }
}