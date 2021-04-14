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

let nameArr = [];
let votesArr = [];
let timesDisplayedArr = [];

function Product(name, source) {
  this.name = name;
  nameArr.push(name);
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

function randomIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

function getPrevValues() {
  let prevStorage = JSON.parse(localStorage.getItem('Products'));
  if (prevStorage) {
    for (let i = 0; i < prevStorage.length; i++) {
      Product.allProducts[i]['timesDisplayed'] = prevStorage[i].timesDisplayed;
      Product.allProducts[i]['votes'] = prevStorage[i].votes;
    }
  }
}
getPrevValues();
function renderImages() {
  let prevImagesArr = [leftImageIndex, middleImageIndex, rightImageIndex];

  leftImageIndex = randomIndex();
  middleImageIndex = randomIndex();
  rightImageIndex = randomIndex();

  while (
    leftImageIndex === middleImageIndex ||
    leftImageIndex === rightImageIndex ||
    middleImageIndex === rightImageIndex ||
    prevImagesArr.includes(leftImageIndex) ||
    prevImagesArr.includes(middleImageIndex) ||
    prevImagesArr.includes(rightImageIndex)
  ) {
    leftImageIndex = randomIndex();
    middleImageIndex = randomIndex();
    rightImageIndex = randomIndex();
  }

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

function clickImagesHandler(event) {
  if (event.currentTarget !== event.target) {
    userTriesCounter++;

    let userTriesCounterSpan = document.getElementById('userTriesCounter');

    if (maxTries - userTriesCounter === 0) {
      let buttonDiv = document.getElementById('button');

      showResultButton = document.createElement('button');
      buttonDiv.appendChild(showResultButton);
      showResultButton.textContent = 'Show Result';

      showResultButton.addEventListener('click', showResultHandler);
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

let showHide = true;
let callOnce = 0;
function showResultHandler() {
  localStorage.setItem('Products', JSON.stringify(Product.allProducts));

  let list = document.getElementById('results-list');

  let Result;

  let ctx = document.getElementById('myChart');

  if (showHide) {
    for (let i = 0; i < Product.allProducts.length; i++) {
      Result = document.createElement('li');
      list.appendChild(Result);

      Result.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].timesDisplayed} times.`;

      timesDisplayedArr.push(Product.allProducts[i].timesDisplayed);

      votesArr.push(Product.allProducts[i].votes);

      //push all of the final values into arrays
    }
    showHide = false;
    showResultButton.textContent = 'Hide Result';

    ctx.style.visibility = 'visible';

    if (callOnce === 0) {
      resultsBarChart();
      callOnce++;
    }
  } else {
    let list = document.getElementById('results-list');
    list.textContent = '';
    showHide = true;
    showResultButton.textContent = 'Show Result';

    ctx.style.visibility = 'hidden';
  }
}

function resultsBarChart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  const labels = nameArr;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Votes',
        data: votesArr,
        backgroundColor: ['rgba(255, 99, 132, 0.7)'],
        borderColor: ['rgb(255, 99, 132)'],
        borderWidth: 1,
      },
      {
        label: 'Times Displayed',
        data: timesDisplayedArr,
        backgroundColor: ['rgba(46, 91, 175,0.7)'],
        borderColor: ['rgb(46, 91, 175)'],
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  new Chart(ctx, config);
}
