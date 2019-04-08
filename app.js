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
  while(picTwo===pictureShowIndex[0]){
    picTwo=getRandomIndex();
  }
  pictureShowIndex.push(picTwo);

  var picThree=getRandomIndex();
  while(picThree===pictureShowIndex[0]||picThree===pictureShowIndex[0]){
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
  img1.name=products[pictureShowIndex[0]].name;
  img1.src=products[pictureShowIndex[0]].src;
  products[pictureShowIndex[0]].shown++;

  //picture in the middle
  img2.name=products[pictureShowIndex[1]].name;
  img2.src=products[pictureShowIndex[1]].src;
  products[pictureShowIndex[1]].shown++;

  //picture on the rightside
  img3.name=products[pictureShowIndex[2]].name;
  img3.src=products[pictureShowIndex[2]].src;
  products[pictureShowIndex[2]].shown++;

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
    displayList();
  }
}

function displayList(){
  var container=document.getElementById('lists');
  for(var ii=0;ii<products.length;ii++){
    var liEl=document.createElement('li');
    liEl.textContent=products[ii].clicked+'  for  '+ products[ii].name;
    container.appendChild(liEl);
  }
}

img1.addEventListener('click',clickNumber);
img2.addEventListener('click',clickNumber);
img3.addEventListener('click',clickNumber);

render();
