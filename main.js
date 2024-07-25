// select the start game button
document.querySelector(".control-buttons span").onclick = function(){
    // prompt window to ask for name
    let yourName = prompt("What's Your Name?");
    // if name is empty
    if (yourName == null || yourName == "") {
        // set name to unknown
        document.querySelector(".name span").innerHTML = 'Unknown';
        // name is not empty
    } else{
        // set name to your name
        document.querySelector(".name span").innerHTML = yourName;
    }
    // remove splash screen
    document.querySelector(".control-buttons").remove();
}; 
// effect duration
let duration = 1000;
// select blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");
// create array from blocks
let blocks = Array.from(blocksContainer.children);
// create range of keys
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    // add click event
    block.addEventListener('click', function (){
        // trigger the flip block function
        flipBlock(block);
    }) 
});

// flip block function
function flipBlock(selectedBlock){
    // add class is flipped
    selectedBlock.classList.add('is-flipped');
    // collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    // if theres two selected blocks
    if (allFlippedBlocks.length === 2) {
        // stop clicking function
        stopClicking();
        // check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}
// stop stop Clicking
function stopClicking(){
    // add class no clicking on main container
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        // remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}
// check matched block
function checkMatchedBlocks(firstBlock, secondBlock){
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById('success').play();

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);

        document.getElementById('fail').play();
    }
}
// shuffle function
function shuffle(array){
    // settings vars
    let current = array.length, 
        temp,
        random;

    while (current > 0) {
        // get random number
        random = Math.floor(Math.random() * current);
        // decrease length by one
        current--;
        // 1. save current element in stash
        temp = array[current];
        // 2. curreny element = random element
        array[current] = array[random];
        // 3. random element = get element from stash
        array[random] = temp;
    }    
    return array;
}

