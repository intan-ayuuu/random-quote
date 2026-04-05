const localQuotes = [
  { quote: "Done is better than perfect.", author: "Sheryl Sandberg" },
  {
    quote:
      "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  { quote: "I'm not lazy, I'm on energy saving mode.", author: "Unknown" },
  {
    quote: "It's okay to not know. It's not okay to not try.",
    author: "Unknown",
  },
  { quote: "Stop overthinking. Just do it.", author: "Unknown" },
  { quote: "Small steps every day lead to big changes.", author: "Unknown" },
  {
    quote: "You're not behind. You're just on your own timeline.",
    author: "Unknown",
  },

  { quote: "Rest is not lazy. Rest is productive.", author: "Unknown" },
  { quote: "You are enough. You always have been.", author: "Unknown" },
  { quote: "Bad days don't mean bad life.", author: "Unknown" },
  {
    quote: "Healing is not linear. Be patient with yourself.",
    author: "Unknown",
  },
  {
    quote: "Your mental health is more important than your grades.",
    author: "Unknown",
  },
  {
    quote: "It's okay to outgrow people who aren't growing.",
    author: "Unknown",
  },

  { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { quote: "Move fast and break things.", author: "Mark Zuckerberg" },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  { quote: "Code is poetry.", author: "WordPress" },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },

  { quote: "Comparison is the thief of joy.", author: "Theodore Roosevelt" },
  {
    quote: "You can't pour from an empty cup. Take care of yourself first.",
    author: "Unknown",
  },
  { quote: "Progress, not perfection.", author: "Unknown" },
  {
    quote: "The comeback is always stronger than the setback.",
    author: "Unknown",
  },
  {
    quote: "Don't let anyone rent space in your head for free.",
    author: "Unknown",
  },
  {
    quote: "Invest in yourself. It pays the best interest.",
    author: "Benjamin Franklin",
  },
  { quote: "Your vibe attracts your tribe.", author: "Unknown" },
];

let quoteEl = document.getElementById("quoteText");
let authorEl = document.getElementById("quoteAuthor");
let newEl = document.querySelector(".new-btn");
let copyEl = document.querySelector(".copy-btn");
let shareEl = document.querySelector(".share-btn");
let counterEl = document.getElementById("counter");
let toastEl = document.getElementById("toast");
let soundEl = document.getElementById("soundBtn");

async function getQuote() {
  if (Math.random() > 0.5) {
    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    return localQuotes[randomIndex];
  }
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return {
      quote: data.quote,
      author: data.author,
    };
  } catch (err) {
    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    return localQuotes[randomIndex];
  }
}

shareEl.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteEl.innerText} ${authorEl.innerText}`;
  window.open(tweetUrl, "_blank");
});

copyEl.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteEl.innerText} ${authorEl.innerText}`);
  toastEl.classList.add("show");
  setTimeout(function () {
    toastEl.classList.remove("show");
  }, 2000);
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
});

newEl.click();
