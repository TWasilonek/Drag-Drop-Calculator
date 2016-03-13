$(document).ready(function(){
  var bigScreen = window.matchMedia("(min-width: 1200px)");
  var normalScreen = window.matchMedia("(max-width: 900px)");
  var tabletScreen = window.matchMedia("(max-width: 768px)");
  var mobileScreen = window.matchMedia("(max-width: 480px)");

  var totaldiv = $("#total");
  var totalSpansAll = totaldiv.find('span');
  var totalNum1 = $('.num1');
  var totalNum2 = $('.num2');
  var totalOperator = $('.operator');
  var numbersButtons = $('#numbers').find('a');
  var operatorsButtons = $('#operatorsTop').find('a');
  var sideOperatorsButtons = $('#side').find('a');
  var bottomOperatorsButtons = $('#operatorsBottom').find('a');
  var clearButton = $('#clear');
  var clearAllButton = $('#clearall');
  var equalsButton = $('#equals');
  var decimalButton = $('#decimal');
  var sqrtButton = $('#sqrt');
  var sqButton = $('#sq');
  var multiplyButton = $('#multiply');
  var divideButton = $('#divide');
  var memoryDisplay = $('#displayActive');
  var memoryDisplayOperators = $('.memory-operation').find('row:nth-child(2) span');
  var clearMemoryButton = $('#clear-memory');
  var restoreMemoryButton = $('#restore-memory');
  var draggablesParent = $('#displayActive');
  var dropzones = $('.dropzone');
  var alertField = $('.alert');


  //check screen size when page loads
  checkWindowSize();

  //check screen size when the window is being resized
  $(window).on('resize', function(e){
    checkWindowSize();  
    console.log('resized');
  });

  function checkWindowSize() {
    var longOperators = [];
    memoryDisplayOperators = $('.memory-operation').find('.row:nth-child(3) span');
    if (bigScreen.matches) {
      $(memoryDisplayOperators).each(function(index, element){
        if($(element).text().length > 7){
          longOperators.push(element);
          longOperators.push($(element).siblings());
        }
        for(i = 0; i < longOperators.length; i++) {
          $(longOperators[i]).addClass('memory-operation-oneLine');
        }
      });   
    } else if (normalScreen.matches) {
       $(memoryDisplayOperators).each(function(index, element){
        if($(element).text().length > 6){
          longOperators.push(element);
          longOperators.push($(element).siblings());
        }
        for(i = 0; i < longOperators.length; i++) {
          $(longOperators[i]).addClass('memory-operation-oneLine');
        }
      });   
    }
  }

});