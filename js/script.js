$(document).ready(function(){
  //declare variables
    var number1 = "";
    var number2 = "";
    var operator = "";
    var currentMemoryState = "";
    var totaldiv = $("#total");
    var totalNum1 = $('.num1');
    var totalNum2 = $('.num2');
    var totalOperator = $('.operator');
    var totalCleared = $('.cleared');
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
    var clearMemoryButton = $('#clear-memory');
    var restoreMemoryButton = $('#restore-memory');

    //set the default value of the Total field to 0
      totalCleared.text("0");

    //click on numbers
      numbersButtons.add(bottomOperatorsButtons).not('#decimal').on('click', function(e) {
        //clear the "0" from the display output
        totalCleared.text("");
        //if the previous evaluation ended as a 0, clear it before proceeding
        if (($(totalNum1).text() === "0") && ($(totalOperator).text() === "")) {
          $(totalNum1).text("");
          number1 = "";
        }
        //assign the entered number to number1 or number2
        if ($(totalOperator).text() === "") {
           //append the new number to the 'number1' string
          number1 += $(this).text();
          //display the 'number' string in the output
          totalNum1.text(number1);
          //test if the string is not more than 15 characters long
          number1 = testNumLength(number1);
        } else {
          //append the new number to the 'number2' string
          number2 += $(this).text();
          //display the 'number2' string in the output
          totalNum2.text(number2);
          //test if the string is not more than 15 characters long
          number2 = testNumLength(number2);
        }
        if((number2 === 'Error - more than 15 digits') || (number1 === 'Error - more than 15 digits') ) {
            clearAll();
            $(totalCleared).text('Error - more than 15 digits');
          }
      });

    //click on operators
      operatorsButtons.on('click', function(e){
        var thisBtn = $(this);
        //change the 'operator' string to the operator text
        operator = thisBtn.text();

        //if the operator is square root, run the click event on "=" as it doesn't need the second number
        if (thisBtn[0] === sqrtButton[0]) {
          //go straight to the sqrt evaluation as it doesn't need a second number
          $('#equals').click();
          // return;
        } else {
          //display the operator in the 'total' box
            if(thisBtn[0] === sqButton[0]) {
              $(totalOperator).text("^");
            } else {
               $(totalOperator).text(operator);
            }
        }
      });

    //equals button (=) functionality
      equalsButton.on('click', function(e) {       
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
            result = Math.pow(parseFloat(number1, 10), parseFloat(number2, 10));
        }
        //round off the result
        if (isFloat(result)) {
         result = parseFloat(result.toFixed(14));
        }
        //display everything correctly   
        result = testNumLength(result.toString());
        $(totalNum1).text(result);
        //add the operation to the memory display
        saveAndDisplayOperation(number1, number2, operator, result);  
        //reset variabes
        number1 = result;
        $(totalNum2).text("");
        $(totalOperator).text("");
        number2 = "";
        operator = "";
       
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
        if (($(totalNum2).text() === "") && ($(totalOperator).text() === "")) {
          totalNum1.text(decimalCheck(totalNum1.text()));
          number1 = totalNum1.text();
        } else {
          totalNum2.text(decimalCheck(totalNum2.text()));
          number2 = totalNum2.text();
        } 
      }); 
    
    //clear memory button functionality
      clearMemoryButton.on('click', function(e){
        $(memoryDisplay).html("");
      });

    //restore memory button functionality
      restoreMemoryButton.on('click', function(e){
        if($(memoryDisplay).html() === "") {
          $(memoryDisplay).html(currentMemoryState);
        }
      });

  /* ******** HELPER FUNCTIONS ********* */

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
        number = testNumLength(number);
        return number;
      }

    //Testing the number of entered characters in the calculator input and returning an error if it exeeds 15
      var testNumLength = function(number) {
        if (number.length > 9) {
          number.substr(number.length-9,9);
          if (number.length > 15) {
            number = "";
            return "Error - more than 15 digits";
          } 
        } 
        return number;
      };

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
        number1 = "";
        number2 = "";
        operator = "";
        $(totalNum1).text("");
        $(totalNum2).text("");
        $(totalOperator).text("");
        $(totalCleared).text("0");
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
            $("#decimal").click(); // not working :(
        } 
    });
    
  /* ******** DISPLAY IN MEMORY HANDLING ********* */
    function saveAndDisplayOperation (number1, number2, operator, result) {
      //create new div and data
      var newOperation = $(
        '<div class="memory-operation grid-container">' 
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


});