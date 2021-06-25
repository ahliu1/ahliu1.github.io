/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort

// sorts all elements of the provided array from smallest to largest
async function bubbleSort(array){ // async makes function compatible with sleep function
    for (i = 0; i < array.length; i++){ 
        for (j = i + 1; j < array.length; j++){
            if (array[i].value > array[j].value){ // checks if element with lower index is greater than element with higher index 
                swap(array, i, j);
                updateCounter(bubbleCounter); // updates relevant swap counter
                await sleep();  // works with sleep function so that the sorting displays step by step
            }
        }
    }
}



// TODO 3: Implement quickSort

//sorts all elements of the provided array from smallest to largest
async function quickSort(array, left, right){ //left = leftmost index, right = rightmost index
    if (array.length > 1){  // calls partition and quicksort if there are two or more unsorted elements
        var index = await partition(array, left, right);
        if (left < index - 1){
            await quickSort(array, left, index-1);
        }
        if (right > index){
            await quickSort(array, index, right);
        }
    }
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){ //async used for compatibility with sleep function
    var pivot = array[Math.floor((right + left)/2)].value; //determines pivot to decide where other values should go
    while (left < right){ //changes left and right until left is greater than right
        while (array[left].value < pivot){ // runs while the left element's property is less than the pivot
            left = left + 1;
        }
        while (array[right].value > pivot){ // runs while the right element's property is greater than the pivot
            right = right - 1;
        }
        if (left < right){ // checks if left is still less than right; if so, call swap function
            swap(array, left, right);
            updateCounter(quickCounter); // updates relevant swap counter
            await sleep(); // works with sleep function so that sorting updates step by step
        }
    }
    return left + 1; //new index for quickSort, subdivides arrays for future calls to quickSort
}

// TODO 1: Implement swap
// switches two elements of the provided array with indexes i and j
function swap(array, i, j){
    var temp = array[i]; // temporary variable to store array[i] in so the function can run
    array[i] = array[j];
    array[j] = temp;
    drawSwap(array, i, j);
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let shiftIncrement = $(bubbleId).height()/MAX_SQUARES;
    let shiftAmount = (i - j) * shiftIncrement;

    $(element1.id).css("top", parseFloat($(element1.id).css("top")) + shiftAmount + "px");
    $(element2.id).css("top", parseFloat($(element2.id).css("top")) - shiftAmount + "px");
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}