'use strict';

let imagesElement = document.getElementById('images');

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');

let maxTries = 25;
let userTriesCounter = 0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.timesDisplayed = 0;
  Product.allProducts.push(this);
}
Product.allProducts = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');
console.log(Product.allProducts);

function randomIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

function renderImages() {
  leftImageIndex = randomIndex();
  middleImageIndex = randomIndex();
  rightImageIndex = randomIndex();

  while (
    leftImageIndex === middleImageIndex ||
    leftImageIndex === rightImageIndex ||
    middleImageIndex === rightImageIndex
  ) {
    leftImageIndex = randomIndex();
    middleImageIndex = randomIndex();
  }

  console.log(leftImageIndex, middleImageIndex, rightImageIndex);

  leftImageElement.src = Product.allProducts[leftImageIndex].source;
  middleImageElement.src = Product.allProducts[middleImageIndex].source;
  rightImageElement.src = Product.allProducts[rightImageIndex].source;

  leftImageElement.alt = Product.allProducts[leftImageIndex].name;
  middleImageElement.alt = Product.allProducts[middleImageIndex].name;
  rightImageElement.alt = Product.allProducts[rightImageIndex].name;

  Product.allProducts[leftImageIndex]['timesDisplayed'] += 1;
  Product.allProducts[middleImageIndex]['timesDisplayed'] += 1;
  Product.allProducts[rightImageIndex]['timesDisplayed'] += 1;
}
renderImages();

imagesElement.addEventListener('click', clickImagesHandler);

let showResultButton;
let hideResultButton;

function clickImagesHandler(event) {
  if (event.currentTarget !== event.target) {
    userTriesCounter++;

    let userTriesCounterSpan = document.getElementById('userTriesCounter');

    if (maxTries - userTriesCounter === 0) {
      let buttonDiv = document.getElementById('button');

      showResultButton = document.createElement('button');
      buttonDiv.appendChild(showResultButton);
      showResultButton.textContent = 'Show Result';

      hideResultButton = document.createElement('button');
      buttonDiv.appendChild(hideResultButton);
      hideResultButton.textContent = 'Hide Result';

      showResultButton.addEventListener('click', showResultHandler);
      hideResultButton.addEventListener('click', hideResultHandler);
    }

    if (maxTries - userTriesCounter >= 0) {
      userTriesCounterSpan.textContent = maxTries - userTriesCounter;
    } else {
      userTriesCounterSpan.textContent = 0;
    }

    if (userTriesCounter <= maxTries) {
      if (event.target.id === 'left-image') {
        Product.allProducts[leftImageIndex].votes++;
      } else if (event.target.id === 'right-image') {
        Product.allProducts[rightImageIndex].votes++;
      } else if (event.target.id === 'middle-image') {
        Product.allProducts[middleImageIndex].votes++;
      }

      renderImages();
    } else {
      imagesElement.removeEventListener('click', clickImagesHandler);
    }
  }
}

function showResultHandler() {
  let list = document.getElementById('results-list');

  let Result;

  for (let i = 0; i < Product.allProducts.length; i++) {
    Result = document.createElement('li');
    list.appendChild(Result);

    Result.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].timesDisplayed} times.`;
  }
}

function hideResultHandler() {
  let list = document.getElementById('results-list');
  list.textContent = '';
}
