const wordContainer = document.getElementById('word');
const wrongContainer = document.getElementById('wrong');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notification-container');
const figureParts = document.querySelectorAll('.figure-part');
const playAgainBtn = document.getElementById('replay');

const words = ['wizard', 'programming', 'gaming', 'bazinga', 'spaceship'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);
let correctLetters = [];
let wrongLetters = [];

// Display Word Element
function displayWord() {
    wordContainer.innerHTML = `${selectedWord.split('')
        .map(letter =>
            `
        <span class='letter' >
            ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
        ).join('')}
    `;

    const guessedWord = wordContainer.innerText.replace(/\n/g, '');

    if (guessedWord == selectedWord) {
        finalMessage.innerText = 'Congratulations!!! You Won 😄';
        popup.style.display = 'flex';
        console.log(guessedWord);
    }
}

// Update Wrong Letters in DOM
function updateWordLetters() {
    wrongContainer.innerHTML = `
    <h3>Wrong</h3>
    ${wrongLetters.map(letter => `<span id="wrong-letter">${letter}</span>`)}
    `

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none'
        }
    })

    if (wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost.... 🥲';
        popup.style.display = 'flex';
    }
}

// Play again button
playAgainBtn.addEventListener('click', () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];

    correctLetters = [];
    wrongLetters = [];

    displayWord();
    updateWordLetters();
    popup.style.display = 'none';
})


// Show Notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

// Keydown Event Listener
document.addEventListener('keydown', (e) => {
    if (e.key >= 'a' && e.key <= 'z') {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWordLetters();
            }
            else {
                showNotification();
            }
        }
    }
})

displayWord();