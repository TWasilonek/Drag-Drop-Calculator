document.addEventListener('DOMContentLoaded', function(){
//Drag and drop a pack of files
  function initiate4(){
    drop=document.getElementById('dropbox4');
    drop.addEventListener('dragenter', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('dragover', function(e){ e.preventDefault(); }, false);
    drop.addEventListener('drop', dropped, false);
  }
  function dropped(e){
    e.preventDefault();
    var files=e.dataTransfer.files;
    var list='';
    for(var f=0;f<files.length;f++){
      list+='File: '+files[f].name+' '+files[f].size+'<br>';
    }
    drop.innerHTML=list;
  }
    
    window.addEventListener('load', initiate4, false);
});