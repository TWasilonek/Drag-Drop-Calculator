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
    var clearButton = $('#clear');
    var clearAllButton = $('#clearall');
    var equalsButton = $('#equals');

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
    $(operatorsButtons).not('#equals').on('click', function(e){
        //change the 'newnumber' string to the operator text
        operator = $(this).text();
        //assign the current 'number' value to 'newnumber'
        newnumber = number;
        //clear the current value of 'number'
        number = "";
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
            result = parseInt(newnumber) + parseInt(number);
        } else if (operator === "-") {
            result = parseInt(newnumber) - parseInt(number);
        } else if (operator === "/") {
            result = parseInt(newnumber) / parseInt(number);
        } else if (operator === "*") {
            result = parseInt(newnumber) * parseInt(number);
        }

        //round off the result
        if (isFloat(result)) {
         result = result.toFixed(15);
        }

        $(totaldiv).text(result);
        testNumLength(result);
        number = result.toString();
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
            $("#clearall").click();
        } else if (keycode === 99) {
            $("#clear").click();
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
        } 
    });
  
});