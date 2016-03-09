document.addEventListener('DOMContentLoaded', function(){
  //Drag and drop with setDragImage() method
  function initiate3(){
    var images=document.querySelectorAll('#picturesbox3 > img');
    for(var i=0; i<images.length; i++){
      images[i].addEventListener('dragstart', dragged, false);
      images[i].addEventListener('dragend', ending, false);
    }
    drop=document.getElementById('canvas');
    canvas=drop.getContext('2d');
    drop.addEventListener('dragenter', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('dragover', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('drop', dropped, false);
  }
  function ending(e){
    elem=e.target;
    elem.style.visibility='hidden';
  }
  function dragged(e){
    elem=e.target;
    e.dataTransfer.setData('Text', elem.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, 0, 0);
  }
  function dropped(e){
    e.preventDefault();
    var id=e.dataTransfer.getData('Text');
    var elem=document.getElementById(id);
    var posx=e.pageX-drop.offsetLeft;
    var posy=e.pageY-drop.offsetTop;
    canvas.drawImage(elem,posx,posy);
  }


  window.addEventListener('load', initiate3, false);
});