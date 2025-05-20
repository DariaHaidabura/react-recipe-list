import React, { useState, useRef } from "react";
import HeartFilled from "./heart-filled.svg";
import HeartOutline from "./heart-outline.svg";
import "./Generator.css";

function Generator() {
  const [arr, setArr] = useState([
    { text: "The only way to do great work is to love what you do. – Steve Jobs", tag: "#motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer", tag: "#success" },
    { text: "In the end, we only regret the chances we didn’t take. – Lewis Carroll", tag: "#risk" },
    { text: "Don't watch the clock; do what it does. Keep going. – Sam Levenson", tag: "#time" },
    { text: "Believe you can and you're halfway there. – Theodore Roosevelt", tag: "#belief" }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newQuote, setNewQuote] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [availableIndexes, setAvailableIndexes] = useState([...Array(5).keys()]);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [searchQuote, setSearchQuote] = useState("");
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  const intervalId = useRef(null);

  const currentQuote = arr[currentIndex];
  const isFavorite = favoriteQuotes.some((q) => q.text === currentQuote.text);

  const getRandomQuote = () => {
    if (availableIndexes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      const selectedIndex = availableIndexes[randomIndex];
      setCurrentIndex(selectedIndex);
      setAvailableIndexes((prev) =>
        prev.filter((index) => index !== selectedIndex)
      );
    } else {
      setAvailableIndexes([...Array(arr.length).keys()]);
    }
  };

  const handleSetQuote = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % arr.length);
  };

  const addNewQuote = () => {
    if (newQuote.trim() === "") return;

    const formattedTag = hashtag.trim().startsWith("#")
      ? hashtag.trim()
      : `#${hashtag.trim()}`;

    const newEntry = {
      text: newQuote.trim(),
      tag: formattedTag || "#untagged"
    };

    const updatedArr = [...arr, newEntry];
    setArr(updatedArr);
    setCurrentIndex(updatedArr.length - 1);
    setNewQuote("");
    setHashtag("");
    setAvailableIndexes([...Array(updatedArr.length).keys()]);
  };

  const handleHashtagChange = (e) => {
    setHashtag(e.target.value);
  };

  const getSearchNewQuote = (e) => {
    setSearchQuote(e.target.value);
  };

  const showQuote = () => {
    const normalized = searchQuote.trim().toLowerCase();
    const isFound = arr.some((q) => q.text.toLowerCase() === normalized);
    console.log(isFound ? "includes" : "not includes");
  };

  const handleAutomaticQuotes = () => {
    if (isIntervalActive) {
      clearInterval(intervalId.current);
      setIsIntervalActive(false);
    } else {
      intervalId.current = setInterval(() => {
        getRandomQuote();
      }, 2000);
      setIsIntervalActive(true);
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      setFavoriteQuotes(favoriteQuotes.filter((q) => q.text !== currentQuote.text));
    } else {
      setFavoriteQuotes([...favoriteQuotes, currentQuote]);
    }
  };

  return (
    <div className="quote-container">
      {/* Текущая цитата */}
      <div className="quote-display">
        <div className="quote-wrapper">
          <div className="quote-content">
            <p className="quote-text">{currentQuote.text}</p>
            <h2 className="quote-tag">{currentQuote.tag}</h2>
          </div>
          <img
            src={isFavorite ? HeartFilled : HeartOutline}
            alt="favorite icon"
            width="24"
            height="24"
            className="favorite-icon"
            onClick={handleToggleFavorite}
          />
        </div>
      </div>

      {/* Избранные */}
      {favoriteQuotes.length > 0 && (
        <>
          <h3 className="quote-heading">Favorites</h3>
          <div className="quote-display">
            {favoriteQuotes.map((q, index) => (
              <div className="quote-wrapper" key={index}>
                <div className="quote-content">
                  <p className="quote-text">{q.text}</p>
                  <h2 className="quote-tag">{q.tag}</h2>
                </div>
                <img
                  src={HeartFilled}
                  alt="favorite icon"
                  width="24"
                  height="24"
                  className="favorite-icon"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Кнопка Next */}
      <div className="quote-actions">
        <button onClick={handleSetQuote}>Next Quote</button>
      </div>

      {/* Ввод */}
      <div className="quote-input">
        <input
          onChange={(e) => setNewQuote(e.target.value)}
          type="text"
          placeholder="Add your own quote"
          value={newQuote}
        />
        <input
          onChange={handleHashtagChange}
          type="text"
          placeholder="Add hashtag"
          value={hashtag}
        />
        <input
          onChange={getSearchNewQuote}
          type="text"
          placeholder="Find your own quote"
          value={searchQuote}
        />
        <button className="btn-hashtag" onClick={addNewQuote}>
          Add Hashtag
        </button>
        <button className="btn-add" onClick={addNewQuote}>
          Add Quote
        </button>
        <button className="btn-random" onClick={getRandomQuote}>
          Random Quote
        </button>
        <button className="btn-toggle" onClick={handleAutomaticQuotes}>
          {isIntervalActive ? "Stop Random Quotes" : "Start Random Quotes"}
        </button>
        <button className="btn-search" onClick={showQuote}>
          Search Quote
        </button>
      </div>
    </div>
  );
}

export default Generator;
