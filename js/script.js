$(document).ready(function(){
  //declare variables
    var number1 = "";
    var number2 = "";
    var operator = "";
    var currentMemoryState = "";
    var lastResult = "";
    var totaldiv = $("#total");
    var totalSpansAll = totaldiv.find('span');
    var totalNum1 = $('.num1');
    var totalNum2 = $('.num2');
    var totalOperator = $('.operator');
    var numbersButtons = $('#numbers').find('a');
    var operatorsButtons = $('#operatorsTop').find('a');
    var sideOperatorsButtons = $('#side').find('a');
    var bottomOperatorsButtons = $('#operatorsBottom').find('a');
    var backspaceButton = $('#backspace');
    var clearButton = $('#clear');
    var clearAllButton = $('#clearall');
    var equalsButton = $('#equals');
    var decimalButton = $('#decimal');
    var sqrtButton = $('#sqrt');
    var sqButton = $('#sq');
    var sq2Button = $('#sq2');
    var multiplyButton = $('#multiply');
    var divideButton = $('#divide');
    var memoryDisplay = $('#displayActive');
    var clearMemoryButton = $('#clear-memory');
    var restoreMemoryButton = $('#restore-memory');
    var draggablesParent = $('#displayActive');
    var dropzones = $('.dropzone');
    var alertField = $('.alert');

    //set the default value of the Total field to 0
      totalNum1.text("0");
      number1 = "0";

    //click on numbers
      numbersButtons.add(bottomOperatorsButtons).not('#decimal').on('click', function(e) {
        clickOnNumber(this);
      });

    //click on operators
      operatorsButtons.on('click', function(e){
        //if there is already an operator and number2, first run the current operation and add the new opeartor to the result (that's what the user expects)       
        if ( ($(totalOperator).text() !== "") && ($(totalNum2).text() !== "") ) {
          makeOperation();
        }
        clickOnOperator(this); 
      });

    //equals button (=) functionality
      equalsButton.on('click', function(e) {       
        if (number2 !== "") {
          makeOperation();
        } else {
          //show the missing field in the output
          $(totalNum2).addClass('dropzone-revealed').animate({
            opacity: 0.5
          },'400', 'swing', function() {
            $(totalNum2).removeClass('dropzone-revealed').animate({
              opacity: 0
            },'400', 'swing', function(){
              $(totalNum2).css('opacity','1');
            });
          });
        }    
      });

    //backspace button functionality 
      backspaceButton.on('click', function(e){
        //first check if the user is in number1 or number2
        if ($(totalOperator).text() === ""){
          //User is in number 1 - if the current text is not "0", delete the last digit
         if ($(totalNum1).text() !== "0") {
          $(totalNum1).text( $(totalNum1).text().slice(0, -1) );
          number1 = number1.slice(0, -1);
          //if you run out of digits to delete, reset number1 to "0"
          if ( $(totalNum1).text() === "" ){
            $(totalNum1).text('0');
            number1 = "0";
          }
         }
        } else {
          //User is in number 2 - just delete the last digit until there is nothing left to be deleted
          $(totalNum2).text( $(totalNum2).text().slice(0, -1) );
          number2 = number2.slice(0, -1);
        }
      });

    //clear button (C) functionality
      clearButton.on('click', function(e){
        clear();
      });
    
    //clear all button (AC) functionality
      clearAllButton.on('click', function(e){
        clearAll();
      });

    //click on decimal button
      decimalButton.on('click', function(e){
        //check if you are in number 1 or number 2
        if (($(totalNum2).text() === "") && ($(totalOperator).text() === "")) {
          //run the decimalCheck function and update totalNum1 and number1
          totalNum1.text(decimalCheck(totalNum1.text()));
          number1 = totalNum1.text();
        } else {
          //UX - if there are no digits and a decimal is hit add a "0" before it
          if ($(totalNum2).text() === "") {
            $(totalNum2).text("0");
          }
           //run the decimalCheck function and update totalNum2 and number2
          totalNum2.text(decimalCheck(totalNum2.text()));
          number2 = totalNum2.text();
        } 
      }); 

  /* ******** HELPER FUNCTIONS ********* */
    //click on number function
    function clickOnNumber(clickedNumber) {
       //if the previous evaluation ended as a 0, clear it before proceeding
        if ( ($(totalNum1).text() === "0") && ($(totalOperator).text() === "") ){
          $(totalNum1).text("");
          number1 = "";
        }
        //assign the entered number to number1 or number2
        if ($(totalOperator).text() === "") {
          if( $(totalNum1).text() === lastResult ){
            //if totalNum1 still holds the last result value, treat this action as if the user wanted to change totalNum1 and not add new characters at the end of it.
            //in this case first clear number1 and totalNum1
            $(totalNum1).text("");
            number1 = "";
          } 
          //append the new number to the 'number1' string
          number1 += $(clickedNumber).text();
          //check if number1 is more than 15 characters long and if it is, don't add the new digit to it and inform the user about the problem
          if(testNumLength(number1)) {
            number1 = tooLongNumber(number1);
          } 
          //display the 'number1' string in the output
          totalNum1.text(number1);
        } else {
          //append the new number to the 'number2' string
          number2 += $(clickedNumber).text();
          //check if number2 is more than 15 characters long and if it is, don't add the new digit to it and inform the user about the problem
          if(testNumLength(number2)) {
            number2 = tooLongNumber(number2);
          } 
          //display the 'number2' string in the output
          totalNum2.text(number2);
        }
    }

    //click on an opeartor
      function clickOnOperator(operatorId) {
        //change the 'operator' string to the operator text
        operator = $(operatorId).text();
        $(totalOperator).text(operator);
        //if the operator is square root, run the click event on "=" as it doesn't need the second number
        if ($(operatorId).is(sqrtButton)) {
          //go straight to the sqrt evaluation as it doesn't need a second number
          makeOperation();
        } else if ($(operatorId).is(sq2Button)) {
          $(totalOperator).text("^2");
          //go straight to the sqrt evaluation as it doesn't need a second number
          makeOperation();
        } else {
          //display the operator in the 'total' box
          if($(operatorId).is(sqButton)) {
            $(totalOperator).text("^");
          } else {
            $(totalOperator).text(operator);
          }
        }
      }
      

    //make operation and return result
      function makeOperation(){
        var result = 0;

        if (operator === "+") {
            result = parseFloat(number1, 10) + parseFloat(number2, 10);
        } else if (operator === "-") {
            result = parseFloat(number1, 10) - parseFloat(number2, 10);
        } else if (operator === decodeHtml($(divideButton).text())) {
            result = parseFloat(number1, 10) / parseFloat(number2, 10);
        } else if (operator === decodeHtml($(multiplyButton).text())) {
            result = parseFloat(number1, 10) * parseFloat(number2, 10);
        } else if (operator === decodeHtml($(sqrtButton).text())){  
            result = Math.sqrt(parseFloat(number1, 10));
        } else if (operator === "an"){
          //default for not entering number2 = square exponentiation
          if(number2 === "") {
            number2 = number1;
          }
          result = Math.pow(parseFloat(number1, 10), parseFloat(number2, 10));
        }else if (operator === "a2"){
          result = parseFloat(number1, 10) * parseFloat(number1, 10);
        }
        if (isFloat(result)) { 
          //round off the result if it has more than 15 characters
          result = parseFloat(result.toFixed(14));
        }
        //test the result for number of characters
        if(testNumLength(result.toString())) {
            result = tooLongNumber(result.toString());
          }  
        //display everything correctly 
        $(totalNum1).text(result);
        //add the operation to the memory display
        saveAndDisplayOperation(number1, number2, totalOperator.text(), result);  
        //reset variabes
        lastResult = result.toString();
        number1 = result.toString();
        $(totalNum2).text("");
        $(totalOperator).text("");
        number2 = "";
        operator = "";
      }

    //check if assign decimal
      function decimalCheck(number){
        //check if there are any '.' already
        var numOfDecs = 0;
        for(var i = 0; i < number.length; i++) {
          if(number.indexOf('.') !== -1) {
            numOfDecs ++;
          }
        }
        //if there aren't, add the '.' at the end of the number
        if(numOfDecs === 0) {
          number += decimalButton.text();
        } 
        if(testNumLength(number)) {
            number = tooLongNumber(number);
          } 
        return number;
      }

    // Test if the number is more than 15 digits
      var testNumLength = function(number) {
        if (number.length > 9) {
          number.substr(number.length-9,9);
          if (number.length > 15) {
           return true;
          } else {
            return false;
          }
        } 
      };

    // tooLongNumber function 
      function tooLongNumber(number) {
        //do not allow entering more digits (delete the last digit from number)
        number = number.slice(0, -1);
        // Infrom the user that he can't eneter more than 15 digits
        $(alertField).text('Sorry, you can\'t enter more than 15 digits').fadeIn('500');
        setTimeout(function(){
          $(alertField).fadeOut('500', function(){
            $(alertField).text(''); 
          });
        }, 4000);
        return number;
      }

    //function checking if a number is a float
      function isFloat(n) { 
         return n % 1 !== 0;
      }

    //function to decode special characters
      function decodeHtml(html) {
          var txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
      }

    //clear the coorect number's value and reset the output field
      function clear() {
        if($(totalNum2).text() === "") {
          clearAll();
        } else {
          number2 = "";
          $(totalNum2).text("");
        }
      }

    //clear everything
      function clearAll() {
        number1 = "0";
        number2 = "";
        operator = "";
        $(totalNum1).text("0");
        $(totalNum2).text("");
        $(totalOperator).text("");
      }


  /* ******** MAPPING KEY CODES ********* */
    $(document).keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      console.log(keycode);
      if (keycode === 49) {
          $("#one").click();
      } else if (keycode === 50) {
          $("#two").click();
      } else if (keycode === 51) {
          $("#three").click();
      } else if (keycode === 52) {
          $("#four").click();
      } else if (keycode === 53) {
          $("#five").click();
      } else if (keycode === 54) {
          $("#six").click();
      } else if (keycode === 55) {
          $("#seven").click();
      } else if (keycode === 56) {
          $("#eight").click();
      } else if (keycode === 57) {
          $("#nine").click();
      } else if (keycode === 48) {
          $("#zero").click();
      } else if (keycode === 97) {
          clearAllButton.click();
      } else if (keycode === 99) {
          clearButton.click();
      } else if (keycode === 61 || keycode === 13) {
          $("#equals").click();
      } else if (keycode === 43) {
          $("#plus").click();
      } else if (keycode === 45) {
          $("#minus").click();
      } else if (keycode === 42 || keycode === 120) {
          $("#multiply").click();
      } else if (keycode === 47) {
          $("#divide").click();
      } else if (keycode === 46) {
          $("#decimal").click();
      } else if (keycode === 8) { //"8" on a Mac works in Firefox and Safari. Does not work on Chrome
          backspaceButton.click();
      } 
    });

  /* ******** DISPLAY IN MEMORY HANDLING ********* */
    function saveAndDisplayOperation (number1, number2, operator, result) {
      //create new div and data
      var newOperation = $(
        '<div class="memory-operation grid-container">' 
        + '<div class="row"><div class="memory-operation-delete col-12"><button class="delete-button">X</button></span></div>'
        + '<div class="row"><span class="memory-operation-equals col-3">' + '=' + '</span>'
        + '<span class="memory-operation-result draggable col-9" draggable="true">' + result + '</span></div>'
        + '<div class="row"><span class="memory-operation-num draggable col-5" draggable="true">' + number1 + '</span>'
        + '<span class="memory-operation-operator col-2">' + operator + '</span>'
        + '<span class="memory-operation-num draggable col-5" draggable="true">' + number2 + '</span></div>'
        + '</div>'
      ); 
      //add the div to the memory display
      $(newOperation).appendTo(memoryDisplay); 
      //make a snapshot of the current memory state
      currentMemoryState = $(memoryDisplay).html();
    }

    //clear memory button functionality
      clearMemoryButton.on('click', function(e){
        $(memoryDisplay).html("");
      });

    //restore memory button functionality
      restoreMemoryButton.on('click', function(e){
        if($(memoryDisplay).html() !== currentMemoryState) {
          $(memoryDisplay).html(currentMemoryState);
        }
      });
      
    //memory-operation delete button functionality
    draggablesParent.on('click', '.delete-button', function(e){
      $(this).closest('.memory-operation').remove();
    });

    /* DRAG AND DROP functionality */
      //Draggable elements functionalities
      draggablesParent.on('dragstart', '.draggable', function(e){
        // Take the text from the current element
        var value = $(this).text();
        e.dataTransfer = e.originalEvent.dataTransfer;
        e.dataTransfer.setData('text/plain', value);

        // Highlight the possible dropzones
        if ($(totalOperator).text() === "") {
          $(totalNum1).addClass('dropzone-revealed');
        } else {
          $(dropzones).addClass('dropzone-revealed');
        }
      });

      // When the drag action is over, remove the highlight effect from possible dropzones
      draggablesParent.on('dragend', '.draggable', function(e) {
        dropzones.removeClass('dropzone-revealed');
      });

    //Dropzones functionalities
      dropzones.on('dragenter', function(e){
        e.preventDefault();
        $(this).addClass('dropzone-hover');
      });

      dropzones.on('dragleave', function(e){
        e.preventDefault();
        $(this).removeClass('dropzone-hover');
      });

      //cancel the deaful action of the last events dragenter and dragover - this is NEEDED in order to ALLOW THE DROP EVENT
      dropzones.on('dragenter', function(e){ e.preventDefault(); }, false);
      dropzones.on('dragover', function(e){ e.preventDefault(); }, false);

      //call the drop event
      dropzones.on('drop', function(e){
        var thisNumber = $(this);

        e.preventDefault();
        e.dataTransfer = e.originalEvent.dataTransfer;
        thisNumber.text(e.dataTransfer.getData('text/plain'));
        thisNumber.removeClass('dropzone-hover');

        if (totalNum1.is(this)) {
          number1 = thisNumber.text();
        } else if (totalNum2.is(this)) {
          number2 = thisNumber.text();
        }
      });

});