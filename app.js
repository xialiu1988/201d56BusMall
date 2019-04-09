'use strict';
var products=[];
var totalClicks=0;
var pictureShowIndex=[];

var img1=document.getElementById('imgone');
var img2=document.getElementById('imgtwo');
var img3=document.getElementById('imgthree');

function Product(name,src){
  this.name=name;
  this.src=src;
  this.shown=0;
  this.clicked=0;
  products.push(this);
}

function createinstances(){
  new Product('bag','assets/bag.jpg');
  new Product('banana','assets/banana.jpg');
  new Product('bathroom','assets/bathroom.jpg');
  new Product('boots','assets/boots.jpg');
  new Product('breakfast','assets/breakfast.jpg');
  new Product('bubblegum','assets/bubblegum.jpg');
  new Product('chair','assets/chair.jpg');
  new Product('cthulhu','assets/cthulhu.jpg');
  new Product('dog-duck','assets/dog-duck.jpg');
  new Product('dragon','assets/dragon.jpg');
  new Product('pen','assets/pen.jpg');
  new Product('pet-sweep','assets/pet-sweep.jpg');
  new Product('scissors','assets/scissors.jpg');
  new Product('shark','assets/shark.jpg');
  new Product('sweep','assets/sweep.png');
  new Product('tauntaun','assets/tauntaun.jpg');
  new Product('unicorn','assets/unicorn.jpg');
  new Product('usb','assets/usb.gif');
  new Product('water-can','assets/water-can.jpg');
  new Product('wine-glass','assets/wine-glass.jpg');
}

createinstances();

function getRandomIndex(){
  var ranNum=Math.floor(Math.random()*(products.length));
  return ranNum;
}
//generate three unique images
function getUniqueImages(){
  pictureShowIndex=[];
  var picOne=getRandomIndex();
  pictureShowIndex.push(picOne);

  var picTwo=getRandomIndex();
  while(pictureShowIndex.includes(picTwo)){
    picTwo=getRandomIndex();
  }
  pictureShowIndex.push(picTwo);

  var picThree=getRandomIndex();
  while(pictureShowIndex.includes(picThree)){
    picThree=getRandomIndex();
  }
  pictureShowIndex.push(picThree);
  return pictureShowIndex;

}

function render(){
  if(totalClicks===0){
    getUniqueImages();
    img1.name=products[pictureShowIndex[0]].name;
    img1.src=products[pictureShowIndex[0]].src;
    products[pictureShowIndex[0]].shown++;

    img2.name=products[pictureShowIndex[1]].name;
    img2.src=products[pictureShowIndex[1]].src;
    products[pictureShowIndex[1]].shown++;

    img3.name=products[pictureShowIndex[2]].name;
    img3.src=products[pictureShowIndex[2]].src;
    products[pictureShowIndex[2]].shown++;

  }
}

function newset(){
  var previousIndex=pictureShowIndex;
  var newIndex=getUniqueImages();

  while(previousIndex[0]===newIndex[0]||previousIndex[1]===newIndex[0]||previousIndex[2]===newIndex[0]){

    newIndex=getUniqueImages();

  }
  //picture on the leftside
  img1.name=products[newIndex[0]].name;
  img1.src=products[newIndex[0]].src;
  products[newIndex[0]].shown++;

  //picture in the middle
  img2.name=products[newIndex[1]].name;
  img2.src=products[newIndex[1]].src;
  products[newIndex[1]].shown++;

  //picture on the rightside
  img3.name=products[newIndex[2]].name;
  img3.src=products[newIndex[2]].src;
  products[newIndex[2]].shown++;
  pictureShowIndex=newIndex;
}

function clickNumber(event){
  totalClicks++;
  for(var i=0;i<products.length;i++){
    if(event.target.name===products[i].name)
      products[i].clicked++;
  }
  if(totalClicks<25){
    newset();
  }
  else{
    img1.removeEventListener('click',clickNumber,false);
    img2.removeEventListener('click',clickNumber,false);
    img3.removeEventListener('click',clickNumber,false);
    displayChart();
  }
}

//display barchart
function displayChart(){
  var ctx = document.getElementById('chart').getContext('2d');
  var data = {
    labels: [],
    datasets: [
      {
        label: 'Total votes',
        backgroundColor: [
          '#ff8000',
          '#00ffff',
          '#ff0040',
          '#8000ff',
          '#ffb3b3',
          '#ff4dc4',
          '#cc8800',
          '#002966',
          '#1a75ff',
          '#bfff00',
          '#ff3333',
          '#bf00ff',
          '#66ff99',
          '#75a3a3',
          '#0055ff',
          '#ff8080',
          '#999966',
          '#00ff55',
          '#b30000',
          '#4BC0C0'
        ],
        borderColor: [
          '#4BC0C0',
          '#9966C0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966C0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966C0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966C0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        borderWidth: 1,
        data: [],
      }
    ],
  };
  for(var i=0;i<products.length;i++){
    data.labels.push(products[i].name);
    data.datasets[0].data.push(products[i].clicked);
  }
  new Chart(ctx, {
    type: 'bar',
    data: data,
  });
}


img1.addEventListener('click',clickNumber);
img2.addEventListener('click',clickNumber);
img3.addEventListener('click',clickNumber);

render();
