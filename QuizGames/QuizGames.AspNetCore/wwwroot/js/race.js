
function move(id1, id2) {
  var elem = id1;
  var img = id2;
  var width2 = 1;
  var width = Number(elem.style.width.replace(/[^\d\.\-]/g, ''));
  var name = elem.name;
  if (width < 90){
  width+= 10; 
  elem.style.width = width + '%'; 
  img.style.left = width  + '%';
  }
  else {
  alert("Game over!");
  Camelbar1.style.width = 5 + '%';
  Camelbar2.style.width = 5 + '%';
  Camelbar3.style.width = 5 + '%';
  Camelbar4.style.width = 5 + '%';
  img1.style.left = 5 + '%';
  img2.style.left = 5 + '%';
  img3.style.left = 5 + '%';
  img4.style.left = 5 + '%';
  }
}