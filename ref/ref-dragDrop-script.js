$(document).ready(function(){
  
  // elemental code for a drag and drop operation
  function initiate(){
    source1 = document.getElementById('image');
    source1.addEventListener('dragstart', dragged, false);
    source1.addEventListener('dragend', ending, false);

    drop = document.getElementById('dropbox');
    drop.addEventListener('dragenter', entering, false);
    drop.addEventListener('dragleave', leaving, false); 
    drop.addEventListener('dragenter', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('dragover', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('drop', dropped, false);
  }
  function entering(e){
    e.preventDefault();
    drop.style.background='rgba(0,150,0,.2)';
  }
  function leaving(e){
    e.preventDefault();
    drop.style.background='#FFFFFF';
  }
  function ending(e){
    elem=e.target;
    elem.style.visibility='hidden';
  }
  function dragged(e){
    var code='<img src="'+source1.getAttribute('src')+'">';
    e.dataTransfer.setData('Text', code);
  }
  function dropped(e){
    e.preventDefault();
    drop.innerHTML=e.dataTransfer.getData('Text');
  }

  //calling initiate functions
    window.addEventListener('load', initiate, false);
  
    
});