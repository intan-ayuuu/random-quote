let quoteEl = document.getElementById("quoteText");
let authorEl = document.getElementById("quoteAuthor");
let newEl = document.querySelector(".new-btn");
let copyEl = document.querySelector(".copy-btn");
let shareEl = document.querySelector(".share-btn");
let counterEl = document.getElementById("counter");
let toastEl = document.getElementById("toast");
let soundEl = document.getElementById("soundBtn");

async function getQuote(){
    try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        return {
            quote: data.quote,
            author: data.author,
        };
    } catch (err) {
        return {
            quote: "Something broke. Try again.",
            author: "system"
        };
    }
}

shareEl.addEventListener("click", () =>{
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteEl.innerText} ${authorEl.innerText}`;
    window.open(tweetUrl, "_blank");
})

copyEl.addEventListener("click", () => {
    navigator.clipboard.writeText(`${quoteEl.innerText} ${authorEl.innerText}`);
    toastEl.classList.add('show');
    setTimeout(function(){
        toastEl.classList.remove('show');
    }, 2000)
});

let quoteCount = 0;

newEl.addEventListener("click", async () => {
    quoteEl.innerText = "loading...";
    authorEl.innerText = "";
    let { quote, author } = await getQuote();
    quoteEl.innerText = quote;
    authorEl.innerText = `— ${author}`;

    quoteCount++;
    counterEl.textContent = String(quoteCount).padStart(3, "0");
});

soundEl.addEventListener("click", () => {
    if (quoteCount === 0) return;
    let utterance = new SpeechSynthesisUtterance(`${quoteEl.innerText}`);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
})

newEl.click();
