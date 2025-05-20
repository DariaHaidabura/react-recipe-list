import React, { useState, useEffect } from "react";
import removeIcon from "./remove-icon.svg";
import "./ReadingList.css";

const getInitialBooks = () => {
  const saved = localStorage.getItem("readingBooks");
  return saved
    ? JSON.parse(saved)
    : [{ title: "The Great Gatsby", totalPages: 180, pagesRead: 81 }];
};

const getInitialTheme = () => {
  return localStorage.getItem("readingTheme") || "light";
};

export default function ReadingList() {
  const [allBooks, setAllBooks] = useState(getInitialBooks);
  const [title, setTitle] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [pagesRead, setPagesRead] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("readingBooks", JSON.stringify(allBooks))
    localStorage.setItem("readingTheme", theme)
  }, [allBooks, theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddBook = () => {
    if (!title || !totalPages || !pagesRead) return;

    const newBook = {
      title,
      totalPages: Number(totalPages),
      pagesRead: Number(pagesRead),
    };

    setAllBooks((prev) => [...prev, newBook]);

    setTitle("");
    setTotalPages("");
    setPagesRead("");
  };

  const handleRemove = (indexToRemove) => {
    setAllBooks((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFilterChange = (value) => {
    setCurrentFilter(value);
  };

  // 🔎 Фильтрация происходит прямо перед отображением
  const filteredBooks = allBooks.filter((book) => {
    const matchesFilter =
      currentFilter === "all" ||
      (currentFilter === "read" && book.pagesRead >= book.totalPages) ||
      (currentFilter === "unread" && book.pagesRead < book.totalPages);

    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalPagesAll = allBooks.reduce(
    (sum, book) => sum + book.totalPages,
    0
  );
  const totalPagesRead = allBooks.reduce(
    (sum, book) => sum + book.pagesRead,
    0
  );

  const totalProgressPercent =
    totalPagesAll === 0 ? 0 : (totalPagesRead / totalPagesAll) * 100;

  return (
    <div className={`reading-list ${theme}`}>
      <h2>Reading List</h2>
      <p className="progress-text">
        {totalPagesRead} pages of {totalPagesAll}
      </p>

      <div className="progress-bar" style={{ marginBottom: "20px" }}>
        <div
          className="progress"
          style={{ width: `${totalProgressPercent}%` }}
        ></div>
      </div>

      <div className="top-bar">
        <div className="filter-dropdown">
          <select
            id="filter"
            className="filter-select"
            value={currentFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
        </div>

        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
      <div className="input-row">
        <input
          type="text"
          placeholder="Search book"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="books-no-found">
          {" "}
          <p>No books found.</p>
        </div>
      ) : (
        filteredBooks.map((book, index) => {
          const percent = (book.pagesRead / book.totalPages) * 100;

          return (
            <div className="book" key={index}>
              <div className="book-header">
                <h3>{book.title}</h3>
                <button
                  onClick={() => handleRemove(index)}
                  className="remove-button"
                >
                  <img src={removeIcon} alt="Remove" />
                </button>
              </div>

              <p className="progress-text">
                {book.pagesRead} pages of {book.totalPages}
              </p>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })
      )}

      <div className="input-row">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total pages"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
        />
        <input
          type="number"
          placeholder="Pages read"
          value={pagesRead}
          onChange={(e) => setPagesRead(e.target.value)}
        />
        <button onClick={handleAddBook}>Add</button>
      </div>
    </div>
  );
}
