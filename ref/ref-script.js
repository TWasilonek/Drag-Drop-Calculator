$(document).ready(function(){
    //Testing the number of entered characters in the calculator input and returning an error if it exeeds 15
  var testNumLength = function(number) {
        if (number.length > 9) {
            totaldiv.text(number.substr(number.length-9,9));
            if (number.length > 15) {
                number = "";
                totaldiv.text("Err - more than 15 digits");
            }
        } 
    };

    //declare variables
    var number = "";
    var newnumber = "";
    var operator = "";
    var totaldiv = $("#total");
    var numbersButtons = $('#numbers').find('a');
    var operatorsButtons = $('#operators').find('a');
    var sideOperatorsButtons = $('#side').find('a');
    var clearButton = $('#clear');
    var clearAllButton = $('#clearall');
    var equalsButton = $('#equals');
    var decimalButton = $('#decimal');
    var sqrtButton = document.getElementById('sqrt');
    var sqButton = document.getElementById('sq');
    var multiplyButton = document.getElementById('multiply');
    var divideButton = document.getElementById('divide');

    //set the default value of the Total field to 0
    totaldiv.text("0");

    //click on numbers
    $(numbersButtons).not('#clear, #clearall').on('click', function(e) {
      //append the new number to the 'number' string
      number += $(this).text();
      //display the 'number' string in the outpu
      totaldiv.text(number);
      //test if the string is not more than 15 characters
      testNumLength(number);
    });

    //click on operators
    operatorsButtons.add(sideOperatorsButtons).not('#equals, #decimal').on('click', function(e){
        //if the operator is square root, run the click event on "=" as it doesn't need the second number
        if (this === sqrtButton) {
            //change the 'newnumber' string to the operator text
            operator = $(this).text();
            //go straight to the sqrt evaluation as it doesn't need a second number
            $('#equals').click();
            return;
        } else {
            //change the 'newnumber' string to the operator text
            operator = $(this).text();
            //assign the current 'number' value to 'newnumber'
            newnumber = number;
            //clear the current value of 'number'
            number = "";
        }
        
    });

    //click on decimal button
    decimalButton.on('click', function(e){
        //check if there are any '.' already
        var numOfDecs = 0;
        for(var i = 0; i < number.length; i++) {
            if(number.indexOf('.') !== -1) {
                numOfDecs ++;
            }
        }
        //if there aren't, add the '.' at the end of the number
        if(numOfDecs === 0) {
            number += $(this).text();
            totaldiv.text(number);
            testNumLength(number);
        }
    });

     //clear button (C) functionality
    clearButton.on('click', function(e){
        clear();
    });
    //clear all button (AC) functionality
    clearAllButton.on('click', function(e){
        clear();
        newnumber = "";
    });

    //equals button (=) functionality
    equalsButton.on('click', function(e) {       
        var result = 0;

        if (operator === "+") {
            result = parseFloat(newnumber, 10) + parseFloat(number, 10);
        } else if (operator === "-") {
            result = parseFloat(newnumber, 10) - parseFloat(number, 10);
        } else if (operator === decodeHtml($(divideButton).text())) {
            result = parseFloat(newnumber, 10) / parseFloat(number, 10);
        } else if (operator === decodeHtml($(multiplyButton).text())) {
            result = parseFloat(newnumber, 10) * parseFloat(number, 10);
        } else if (operator === decodeHtml($(sqrtButton).text())){  
            result = Math.sqrt(parseFloat(number, 10));
        } else if (operator === "an"){
            result = Math.pow(parseFloat(newnumber, 10), parseFloat(number, 10));
        }

        //round off the result
        if (isFloat(result)) {
         result = parseFloat(result.toFixed(14));
        }

        $(totaldiv).text(result);
        testNumLength(result);
        number = "";
        newnumber = "";
    });
    
    //clear the 'number' value and reset the output field
    function clear() {
        number = "";
        $(totaldiv).text('0');
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


    //Keycodes
     $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
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
        } else if (keycode === 190) {
            $("decimal").click(); // not working :(
        } 
    });
  
});