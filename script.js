
const jsConfetti = new JSConfetti();

// Sounds
const wrong = new Audio("Wrong.mp3");
const matched = new Audio("matched.mp3");
const mytime = new Audio("mytime1.mp3");
const winning= new Audio("win.mp3")
mytime.volume = 0.1;
wrong.volume = 0.2;
// rulles
let rule=document.querySelector("section");

// Time elements
let minute = document.querySelector(".minute");
let second = document.querySelector(".second");

let min = 0;
let sec = 0;
let repeatTime;

// Time function
function time() {
    mytime.play();
    sec += 1;
    if (sec >= 60) {
        min += 1;
        sec = 0;
    }
    second.innerHTML = sec <= 9 ? `0${sec}` : sec;
    minute.innerHTML = min <= 9 ? `0${min}` : min;
}

// Check winners
function win() {
    let winner = document.querySelectorAll(".flip");
    if (winner.length === 20) {
        clearInterval(repeatTime);
        let main = document.querySelector("main");
        
        main.classList.add("items-center", "justify-center");
        main.innerHTML = `
        <p class="text-[40px] font-[900] text-[#FDD8A8]">Congratution!😎🎉🎉</p>
        <p class=" text-white text-[30px] font-bold">Time: ${minute.innerHTML}:${second.innerHTML}</p>`;
        setInterval(()=>{
            jsConfetti.addConfetti();
        },1000)
        winning.play();
    }
}

// Flip card
let lock = false;
let hasFlipedCard = false;
let firstCard, secondCard;

function flipcard() {
    if (lock) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    check();
}

// Check for matched cards
function check() {
    let isMatch = firstCard.querySelector("img").dataset.name === secondCard.querySelector("img").dataset.name;
    isMatch ? disablecards() : unflipedcard();
}

// Disable matched cards
function disablecards() {
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);
    firstCard.style.opacity = 0.5;
    secondCard.style.opacity = 0.5;
    matched.play();
    reset();
    score();
    win();
}

// Unflip unmatched cards
function unflipedcard() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
        wrong.play();
    }, 1500);
}

// Reset card states
function reset() {
    [hasFlipedCard, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Score function
let scoreTop = document.getElementById("top");
let scoreBottom = document.getElementById("bottom");
scoreTop.style.left = "38px";
scoreBottom.style.left = "38px";

function score() {
    scoreTop.style.left = `${parseInt(scoreTop.style.left) + 48}px`;
    scoreBottom.style.left = `${parseInt(scoreBottom.style.left) + 48}px`;
}

// Start game
document.getElementById("start").addEventListener("click", function () {
    lock = true;
    document.querySelector(".div").style.top = "5px";
    document.querySelector("#restart").style.top = "5px";
    document.querySelector("#rules").style.top = "5px";
    
    repeatTime = setInterval(time, 1000);
    document.querySelector("body").classList.add("mohdaking");

    let main = document.querySelector("main");
    main.classList.remove("items-center", "justify-center");
    main.innerHTML = generateCardsHtml();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", flipcard);
        let pos = Math.floor(Math.random() * 20);
        card.style.order = pos;
    });

    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove("flip");
            lock = false;
        });
    }, 4000);
});

// Generate card HTML
function generateCardsHtml() {
    const animals = ["anaconda", "bee", "chameleon", "cockatoo", "gorilla", "macaw", "monkey", "piranha", "sloth", "tiger"];
    let cardsHtml = "";
    animals.forEach(animal => {
        cardsHtml += `
            <div class="card flip">
                <div class="front">?</div>
                <div class="back">
                    <img src="img/${animal}.png" data-name="${animal}" alt="">
                </div>
            </div>
            <div class="card flip">
                <div class="front">?</div>
                <div class="back">
                    <img src="img/${animal}.png" data-name="${animal}" alt="">
                </div>
            </div>`;
    });
    return cardsHtml;
}

// Rules button
document.querySelector("#rules").addEventListener("click", function () {
    rule.style.top = "20px";
    document.body.classList.add("filter");
    document.querySelector("header").style.filter = "blur(8px)";
    document.querySelector("main").style.filter = "blur(8px)";
});

// Close rules button
document.querySelector(".close").addEventListener("click", function () {
    rule.style.top = "-100%";
    document.body.classList.remove("filter");
    document.querySelector("header").style.filter = "blur(0px)";
    document.querySelector("main").style.filter = "blur(0px)";
});
