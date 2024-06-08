AOS.init();
// Sounds
const wrong=new Audio("Wrong.mp3");
const matched=new Audio("matched.mp3");
const mytime=new Audio("mytime1.mp3")
// time
let minute=document.querySelector(".minute");
let second=document.querySelector(".second");

let min=0;
let sec=0
let repeatTime;
// Function of time
function time(){
     mytime.play()
    sec+=1
    if(sec>=60)min+=1,sec=0;
    second.innerHTML=sec<=9?`0${sec}`:sec;
    minute.innerHTML=min<=9?`0${min}`:min;
   
}




// Functions
// Check winners
function win(){
    let winner=document.querySelectorAll(".flip")
    winner.length==20?clearInterval(repeatTime):false
}
// Function of flipcard
function flipcard() {
    if (lock) return;
    console.log(this);
    if (this == firstcard) return;
    this.classList.add("flip");
    if (!hasflipedcard) {
        hasflipedcard = true;
        firstcard = this;
        return;
    }
    secondcard = this;
    check();
}

// Function of check for Matched
function check() {
    let ismatch = firstcard.lastElementChild.firstElementChild.getAttribute("data-name") == secondcard.lastElementChild.firstElementChild.getAttribute("data-name")
    console.log(firstcard.lastElementChild.firstElementChild.getAttribute("data-name"));
    ismatch ? disablecards() : unflipedcard();
}

// Functions disable cards
function disablecards() {
    firstcard.removeEventListener('click', flipcard);
    secondcard.removeEventListener('click', flipcard);
    firstcard.style.opacity=0.5
    secondcard.style.opacity=0.5
    matched.play()
    reset();
    score();
    win()
}

// Function unflipedcard
function unflipedcard() {
    lock = true;
    setTimeout(() => {
        firstcard.classList.remove("flip");
        secondcard.classList.remove("flip");
        reset();
        wrong.play();
    }, 1500);
}

// Function reset
function reset() {
    firstcard = null;
    secondcard = null;
    hasflipedcard = false;
    lock = false;
}

// Function score
function score() {
    score_top.style.left = `${parseInt(score_top.style.left) + 48}px`;
    score_bottom.style.left = (parseInt(score_bottom.style.left) + 48) + "px";
}

// Start game
document.getElementById("start").addEventListener("click", function () {
    document.querySelector(".div").style.top="5px"
    document.querySelector("#restart").style.top="5px"
     repeatTime=setInterval(time,1000)
    document.querySelector("body").classList.add("mohdaking")
    let main = document.querySelector("main");
    main.classList.remove("items-center");
    main.classList.remove("justify-center");
    main.innerHTML = `
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/anaconda.png" data-name="anaconda" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/anaconda.png" data-name="anaconda" alt="">
            </div>
        </div>
        <!-- firs -->
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/bee.png" data-name="bee" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/bee.png" data-name="bee" alt="">
            </div>
        </div>
        <!-- hhh -->
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/chameleon.png" data-name="chameleon" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/chameleon.png" data-name="chameleon" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/cockatoo.png" data-name="cockatoo" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/cockatoo.png" data-name="cockatoo" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/gorilla.png" data-name="gorilla" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/gorilla.png" data-name="gorilla" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/macaw.png" data-name="macaw" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/macaw.png" data-name="macaw" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/monkey.png" data-name="monkey" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/monkey.png" data-name="monkey" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/piranha.png" data-name="piranha" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/piranha.png" data-name="piranha" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/sloth.png" data-name="sloth" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/sloth.png" data-name="sloth" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/tiger.png" data-name="tiger" alt="">
            </div>
        </div>
        <div class="card">
            <div class="front">?</div>
            <div class="back">
                <img src="img/tiger.png" data-name="tiger" alt="">
            </div>
        </div>
    `;

    // Reinitialize cards after updating the HTML
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", flipcard);
        let pos = Math.floor(Math.random() * 20);
        card.style.order = pos;
    });
});

// let cards;
let lock = false;
let firstcard, secondcard;
let hasflipedcard = false;
let score_top = document.getElementById("top");
let score_bottom = document.getElementById("bottom");

// Ensure the initial left style is set
score_top.style.left ="38px";
score_bottom.style.left ="38px";
// Function of shuffle
function shuffle() {
    cards.forEach(card => {
        let pos = Math.floor(Math.random() * 20);
        card.style.order = pos;
    });
}

// // Add events to initial cards
// cards.forEach(card => {
//     card.addEventListener("click", flipcard);
// });

