// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilterNoBackground(reddify);
    applyFilterNoBackground(decreaseBlue);
    applyFilterNoBackground(increaseGreenByBlue);

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
/*/ general function that applies filter to the image using
filter functions in parameter below
/*/
function applyFilter(filterFunction){
    for (var i = 0; i < image.length; i++){ 
        for (var j = 0; j < image[i].length; j++){
            //nested loop to loop and apply over pixels
            var rgbString = image[i][j];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[i][j] = rgbString; // stores string back into image array
        }
    };
}

// TODO 5: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction){
    //applies filter to all pixels except the bg gray pixels
    for (var i = 0; i < image.length; i++){
        for (var j = 0; j < image[i].length; j++){
            var rgbString = image[i][j];
            var rgbNumbers = rgbStringToArray(rgbString);
            var bgColor = image[1][1] // bg color gray
            var bgColorNum = rgbStringToArray(bgColor);
            // maintains bg color for bg pixels
            if (rgbNumbers[BLUE] === bgColorNum[BLUE] &&
                rgbNumbers[RED] === bgColorNum[RED] &&
                rgbNumbers[GREEN] === bgColorNum[GREEN]) {
                    rgbString = rgbArrayToString(rgbNumbers);
                    image[i][j] = rgbString;
             } else {
                 // applies filter for non-bg pixels
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[i][j] = rgbString;
             }
        }
    }
}

// TODO 2 & 4: Create filter functions
 function reddify(array){
     array[RED] = 255; // sets red value to max
 } 

 function decreaseBlue(array){
     array[BLUE] = array[BLUE] - 30; // subtracts at least 30 from the blue value
     array[BLUE] = Math.max(array[BLUE], 0); // ensures blue value does not go below 0, uses larger value
 }

 function increaseGreenByBlue(array){
     array[GREEN] = array[GREEN] + array[BLUE]; // increases green value by blue value
     array[GREEN] = Math.min(array[GREEN], 255); // ensures green value does not exceed 225, uses smaller value
}

// CHALLENGE code goes below here
