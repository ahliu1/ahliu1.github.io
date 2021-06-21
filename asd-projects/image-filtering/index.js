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

function applyFilter(filterFunction){
    for (var i = 0; i < image.length; i++){
        for (var j = 0; j < image[i].length; j++){
            var rgbString = image[i][j];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[i][j] = rgbString;
        }
    };
}

// TODO 5: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction){
    for (var i = 0; i < image.length; i++){
        for (var j = 0; j < image[i].length; j++){
            var rgbString = image[i][j];
            var rgbNumbers = rgbStringToArray(rgbString);
            var bgColor = 150;
            if (rgbNumbers[BLUE] === bgColor &&
                rgbNumbers[RED] === bgColor &&
                rgbNumbers[GREEN] === bgColor) {
                    rgbString = rgbArrayToString(rgbNumbers);
                    image[i][j] = rgbString;
             } else {
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[i][j] = rgbString;
             }
        }
    }
}

// TODO 2 & 4: Create filter functions
 function reddify(array){
     array[RED] = 255;
 }

 function decreaseBlue(array){
     array[BLUE] = array[BLUE] - 30;
     array[BLUE] = Math.max(array[BLUE], 0);
 }

 function increaseGreenByBlue(array){
     array[GREEN] = array[GREEN] + array[BLUE];
     array[GREEN] = Math.min(array[GREEN], 255);
    }

// CHALLENGE code goes below here
