document.addEventListener('DOMContentLoaded', function(){
   //Drag and drop with filter
  function initiate2(){
    var images=document.querySelectorAll('#picturesbox2 > img');
    for(var i=0; i<images.length; i++){
      images[i].addEventListener('dragstart', dragged, false);
    }

    drop=document.getElementById('dropbox2');
    drop.addEventListener('dragenter', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('dragover', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('drop', dropped, false);
  }
  function dragged(e){
    elem=e.target;
    e.dataTransfer.setData('Text', elem.getAttribute('id'));
  }
  function dropped(e){
    e.preventDefault();
    var id=e.dataTransfer.getData('Text');
    if(id!="image4"){
    var src=document.getElementById(id).src;
      drop.innerHTML='<img src="'+src+'">';
    } else {
      drop.innerHTML='not admitted';
    }
  }

  window.addEventListener('load', initiate2, false);
});

