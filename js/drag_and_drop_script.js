$(document).ready(function(){
  var draggablesParent = $('#displayActive');
  var dropzones = $('.dropzone');
  var totalNum1 = $('.num1');
  var totalNum2 = $('.num2');
  var totalOperator = $('.operator');
  var totalCleared = $('.cleared');

   //Draggable elements functionalities
    draggablesParent.on('dragstart', '.draggable', function(e){
      // Take the text from the current element
      var value = $(this).text();
      e.dataTransfer = e.originalEvent.dataTransfer;
      e.dataTransfer.setData('text/plain', value);

      // Highlight the possible dropzones
      if ($(totalCleared).text() !== "" || (($(totalNum1).text() !== "") && ($(totalOperator).text() === "")) ) {
        $(totalCleared).text("");
        $(totalNum1).text("0").addClass('dropzone-revealed');
      } else if ($(totalOperator).text() !== "") {
        $(dropzones).addClass('dropzone-revealed');
      }
    });

    // When the drag action is over, remove the highlight effect from possible dropzones
    draggablesParent.on('dragend', '.draggable', function(e) {
      dropzones.removeClass('dropzone-revealed');
    });
});