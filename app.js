// **********Books**********
import { books, visitors, cards } from "./arrs.js";

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("header .menu li a");

  for (let i = 0; i < menuItems.length; i++) {
    const href = menuItems[i].getAttribute("href");
    if (window.location.pathname === href.slice(2)) {
      menuItems[i].classList.add("active");
    }
  }
});

const allBooks = document.querySelector(".books tbody");
const newBookButt = document.querySelector(".books .add button");
const modalNewBook = document.querySelector(".books .modalNew");
const modalWindowNewBook = document.querySelector(".books .modalNew .wind");
const modalEditBook = document.querySelector(".books .modalEdit");
const modalWindowEditBook = document.querySelector(".books .modalEdit .wind");
const modalEditButtSave = document.querySelector(
  ".books .modalEdit button.save"
);

// **********Створення таблиці книг**********

function updateBookDisplay() {
  allBooks.innerHTML = "";
  const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;
  if (bookItems.length === 0) {
    const span = document.createElement("span");
    span.className = "matches";
    span.textContent = "There are no books";
    span.style.cssText = `position: absolute; top: 200px; left: 44%; color: red; width: 12%; font-size: 18px;`;
    allBooks.append(span);
  } else {
    bookItems.forEach((el) => {
      const bookItemTr = document.createElement("tr");
      bookItemTr.className = "book-item";
      bookItemTr.innerHTML = `
       <td id = "${el.id}">${el.name}</td>
       <td>${el.author}</td>
       <td>${el.year}</td>
       <td>${el.namePublish}</td>
       <td>${el.numPage}</td>
       <td>${el.numCopy}</td>
      <td class="edit"><img class="editImg" src="./img/edit.png" alt="edit"></td>
       `;
      allBooks.append(bookItemTr);
    });
  }

  localStorage.setItem("bookItems", JSON.stringify(bookItems));
}

if (window.location.pathname === "/books.php") {
  const sortBook = JSON.parse(localStorage.getItem("sortBooks")) || "name";
  document.getElementById("sortBook").value = sortBook;
  allSort();

  updateBookDisplay();

  // ************EDIT BOOK**********
  function edit(item) {
    modalEditBook.style.display = "flex";

    const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;
    document.getElementById("nameE").value =
      item.querySelector("td:first-child").textContent;
    document.getElementById("authE").value =
      item.querySelector("td:nth-child(2)").textContent;
    document.getElementById("yearE").value =
      item.querySelector("td:nth-child(3)").textContent;
    document.getElementById("namePE").value =
      item.querySelector("td:nth-child(4)").textContent;
    document.getElementById("pageE").value =
      item.querySelector("td:nth-child(5)").textContent;
    document.getElementById("copyE").value =
      item.querySelector("td:nth-child(6)").textContent;
    document
      .getElementById("nameE")
      .parentElement.querySelector("label")
      .setAttribute(
        "id",
        item.querySelector("td:first-child").getAttribute("id")
      );
    modalEditButtSave.addEventListener("click", (e) => {
      Array.from(bookItems).map((el) => {
        if (
          el.id ===
          Number(item.querySelector("td:first-child").getAttribute("id"))
        ) {
          el.name = document.getElementById("nameE").value.toUpperCase();
          el.author = document.getElementById("authE").value.toUpperCase();
          el.year = document.getElementById("yearE").value;
          el.namePublish = document.getElementById("namePE").value;
          el.numPage = document.getElementById("pageE").value;
          el.numCopy = document.getElementById("copyE").value;

          localStorage.setItem("bookItems", JSON.stringify(bookItems));
        }
      });
    });

    if (document.querySelector(".search input").value === "") {
      updateBookDisplay();
    } else {
      updateSearchBookDisplay();
    }
  }
  const modalEditButtDel = document.querySelector(
    ".books .modalEdit button.delete"
  );
  modalEditButtDel.addEventListener("click", (event) => {
    const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;
    bookItems.map((el, i) => {
      if (
        el.id ===
        Number(
          event.target.parentElement.parentElement.parentElement
            .querySelector("label")
            .getAttribute("id")
        )
      ) {
        console.log(el.id);
        bookItems.splice(i, 1);
        localStorage.setItem("bookItems", JSON.stringify(bookItems));
        document.querySelector(".search input").value = "";
      }
    });
    modalEditBook.style.display = "none";
    updateBookDisplay();
  });

  const tbody = document.querySelector(".allItems tbody");
  tbody.addEventListener("click", (event) => {
    if (event.target.className === "edit") {
      const item = event.target.parentElement;
      edit(item);
    } else if (event.target.className === "editImg") {
      const item = event.target.parentElement.parentElement;
      edit(item);
    }
  });

  // **********ADD NEW BOOK**********

  const modalExist = document.querySelector(".modalExist");
  const modalExistWind = document.querySelector(".modalExist > div");

  modalWindowNewBook.addEventListener("submit", (e) => {
    const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;

    let item = bookItems.find(
      (item) =>
        item.name.toLowerCase() ===
        document.getElementById("name").value.toLowerCase()
    );
    if (item) {
      e.preventDefault();
      modalExist.style.display = "flex";
    } else {
      bookItems.push({
        id: Date.now(),
        name: document.getElementById("name").value.toUpperCase(),
        author: document.getElementById("auth").value.toUpperCase(),
        year: Number(document.getElementById("year").value),
        namePublish: document.getElementById("nameP").value,
        numPage: Number(document.getElementById("page").value),
        numCopy: Number(document.getElementById("copy").value),
      });

      localStorage.setItem("bookItems", JSON.stringify(bookItems));

      updateBookDisplay();
    }
  });
  function allSort() {
    const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;
    const searchedBook =
      JSON.parse(localStorage.getItem("searchedBook")) || bookItems;

    localStorage.setItem(
      "sortBooks",
      JSON.stringify(document.getElementById("sortBook").value)
    );

    const sortBook = JSON.parse(localStorage.getItem("sortBooks")) || "name";

    if (sortBook === "name") {
      sortByBookName(bookItems);
      sortByBookName(searchedBook);
    } else if (sortBook === "author") {
      sortByAuthor(bookItems);
      sortByAuthor(searchedBook);
    } else if (sortBook === "quantity") {
      sortByNumCopy(bookItems);
      sortByNumCopy(searchedBook);
    }

    localStorage.setItem("bookItems", JSON.stringify(bookItems));
    localStorage.setItem("searchedBook", JSON.stringify(searchedBook));

    if (document.querySelector(".search input").value === "") {
      updateBookDisplay();
    } else {
      updateSearchBookDisplay();
    }
  }
  document.getElementById("sortBook").addEventListener("change", () => {
    allSort();
  });

  // ***********SORTBOOK***********

  function sortByBookName(books) {
    return books.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
  }

  function sortByAuthor(books) {
    return books.sort((a, b) => {
      const authorA = a.author.toUpperCase();
      const authorB = b.author.toUpperCase();
      if (authorA < authorB) {
        return -1;
      }
      if (authorA > authorB) {
        return 1;
      }
      return 0;
    });
  }
  function sortByNumCopy(books) {
    return books.sort((a, b) => {
      return b.numCopy - a.numCopy;
    });
  }

  // **********SEARCH**********
  function searchBooks(query, books) {
    const searchTerm = query.toUpperCase();
    return books.filter((book) => {
      const { name, author, namePublish } = book;
      return (
        name.toUpperCase().includes(searchTerm) ||
        author.toUpperCase().includes(searchTerm) ||
        namePublish.toUpperCase().includes(searchTerm)
      );
    });
  }

  function updateSearchBookDisplay() {
    allBooks.innerHTML = "";
    const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;
    if (
      searchBooks(document.querySelector(".search input").value, bookItems)
        .length !== 0
    ) {
      searchBooks(
        document.querySelector(".search input").value,
        bookItems
      ).forEach((el) => {
        const bookItemTr = document.createElement("tr");
        bookItemTr.className = "book-item";
        bookItemTr.innerHTML = `
     <td id = "${el.id}">${el.name}</td>
     <td>${el.author}</td>
     <td>${el.year}</td>
     <td>${el.namePublish}</td>
     <td>${el.numPage}</td>
     <td>${el.numCopy}</td>
    <td class="edit"><img class="editImg" src="./img/edit.png" alt="edit"></td>
     `;
        allBooks.append(bookItemTr);
      });
    } else {
      const span = document.createElement("span");
      span.className = "matches";
      span.textContent = "There are no matches for your search";
      span.style.cssText = `position: absolute; top: 200px; left: 38%; color: red; width: 24%; font-size: 18px;`;
      allBooks.append(span);
    }

    localStorage.setItem(
      "searchedBook",
      JSON.stringify(
        searchBooks(document.querySelector(".search input").value, bookItems)
      )
    );
  }

  document.querySelector(".search input").addEventListener("input", () => {
    updateSearchBookDisplay();
  });

  // **********MODAL**********

  newBookButt.addEventListener("click", () => {
    modalNewBook.style.display = "flex";
  });
  modalNewBook.addEventListener("click", () => {
    modalNewBook.style.display = "none";
  });
  modalWindowNewBook.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  newBookButt.addEventListener("click", () => {
    modalNewBook.style.display = "flex";
  });
  modalEditBook.addEventListener("click", () => {
    modalEditBook.style.display = "none";
  });
  modalWindowEditBook.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  modalExist.addEventListener("click", () => {
    modalExist.style.display = "none";
  });
  modalExistWind.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// ***********Visitirs**********

const allVisitors = document.querySelector(".visit tbody");
const newVisitButt = document.querySelector(".visit .add button");
const modalNewVisit = document.querySelector(".visit .modalNew");
const modalWindowNewVisit = document.querySelector(".visit .modalNew .wind");
const modalEditVisit = document.querySelector(".visit .modalEdit");
const modalWindowEditVisit = document.querySelector(".visit .modalEdit .wind");
const modalEditButtSaveVisit = document.querySelector(
  ".visit .modalEdit button.save"
);

function updateVisitorsDisplay() {
  allVisitors.innerHTML = "";
  const visitorsItems =
    JSON.parse(localStorage.getItem("visitorsItems")) || visitors;
  if (visitorsItems.length === 0) {
    const span = document.createElement("span");
    span.className = "matches";
    span.textContent = "There are no visitors";
    span.style.cssText = `position: absolute; top: 200px; left: 43.5%; color: red; width: 13%; font-size: 18px;`;
    allVisitors.append(span);
  } else {
    visitorsItems.forEach((el) => {
      const visitItemTr = document.createElement("tr");
      visitItemTr.className = "visit-item";
      visitItemTr.innerHTML = `
    <td id = "${el.id}">${el.id}</td>
     <td>${el.name}</td>
     <td>${el.phone}</td>
    <td class="edit"><img class="editImg" src="./img/edit.png" alt="edit"></td>
     `;
      allVisitors.append(visitItemTr);
    });
  }
  localStorage.setItem("visitorsItems", JSON.stringify(visitorsItems));
}

if (window.location.pathname === "/visitors.php") {
  const sortVisit = JSON.parse(localStorage.getItem("sortVisit")) || "id";
  document.getElementById("sortVisit").value = sortVisit;
  allSort();

  updateVisitorsDisplay();

  function edit(item) {
    modalEditVisit.style.display = "flex";

    const visitorsItems =
      JSON.parse(localStorage.getItem("visitorsItems")) || visitors;

    document.getElementById("nameVisitE").value =
      item.querySelector("td:nth-child(2)").textContent;
    document.getElementById("phoneVisitE").value =
      item.querySelector("td:nth-child(3)").textContent;
    document
      .getElementById("nameVisitE")
      .parentElement.querySelector("label")
      .setAttribute(
        "id",
        item.querySelector("td:first-child").getAttribute("id")
      );

    modalEditButtSaveVisit.addEventListener("click", () => {
      Array.from(visitorsItems).map((el) => {
        if (
          el.id ===
          Number(item.querySelector("td:first-child").getAttribute("id"))
        ) {
          el.name = document.getElementById("nameVisitE").value;
          el.phone = document.getElementById("phoneVisitE").value;

          localStorage.setItem("visitorsItems", JSON.stringify(visitorsItems));
        }
      });
    });

    if (document.querySelector(".search input").value === "") {
      updateVisitorsDisplay();
    } else {
      updateSearchBookDisplay();
    }
  }

  const tbody = document.querySelector(".allItems tbody");
  tbody.addEventListener("click", (event) => {
    if (event.target.className === "edit") {
      const item = event.target.parentElement;
      edit(item);
    } else if (event.target.className === "editImg") {
      const item = event.target.parentElement.parentElement;
      edit(item);
    }
  });

  const modalEditButtDel = document.querySelector(
    ".visit .modalEdit button.delete"
  );

  modalEditButtDel.addEventListener("click", (event) => {
    const visitorsItems =
      JSON.parse(localStorage.getItem("visitorsItems")) || visitors;

    visitorsItems.map((el, i) => {
      if (
        el.id ===
        Number(
          event.target.parentElement.parentElement.parentElement
            .querySelector("label")
            .getAttribute("id")
        )
      ) {
        visitorsItems.splice(i, 1);
        localStorage.setItem("visitorsItems", JSON.stringify(visitorsItems));
        document.querySelector(".search input").value = "";
      }
    });
    modalEditVisit.style.display = "none";
    updateVisitorsDisplay();
  });

  const modalExist = document.querySelector(".modalExist");
  const modalExistWind = document.querySelector(".modalExist > div");

  modalWindowNewVisit.addEventListener("submit", (e) => {
    const visitorsItems =
      JSON.parse(localStorage.getItem("visitorsItems")) || visitors;

    let item = visitorsItems.find(
      (item) =>
        item.name.toLowerCase() ===
        document.getElementById("nameVisit").value.toLowerCase()
    );
    if (item) {
      e.preventDefault();
      modalExist.style.display = "flex";
    } else {
      visitorsItems.push({
        id: Date.now(),
        name: document.getElementById("nameVisit").value,
        phone: document.getElementById("phone").value,
      });

      localStorage.setItem("visitorsItems", JSON.stringify(visitorsItems));

      updateVisitorsDisplay();
    }
  });

  function sortByVisitName(visit) {
    return visit.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
  }

  function sortById(visit) {
    return visit.sort((a, b) => {
      return a.id - b.id;
    });
  }

  function allSort() {
    const visitorsItems =
      JSON.parse(localStorage.getItem("visitorsItems")) || visitors;

    const searchedVisit =
      JSON.parse(localStorage.getItem("searchedVisit")) || visitorsItems;

    localStorage.setItem(
      "sortVisit",
      JSON.stringify(document.getElementById("sortVisit").value)
    );

    const sortVisit = JSON.parse(localStorage.getItem("sortVisit")) || "id";

    if (sortVisit === "id") {
      sortById(visitorsItems);
      sortById(searchedVisit);
    } else if (sortVisit === "name") {
      sortByVisitName(visitorsItems);
      sortByVisitName(searchedVisit);
    }

    localStorage.setItem("visitorsItems", JSON.stringify(visitorsItems));
    localStorage.setItem("searchedVisit", JSON.stringify(searchedVisit));

    if (document.querySelector(".search input").value === "") {
      updateVisitorsDisplay();
    } else {
      updateSearchBookDisplay();
    }
  }

  document.getElementById("sortVisit").addEventListener("change", () => {
    allSort();
  });

  // **********SEARCH**********
  function searchVisit(query, visits) {
    const searchTerm = query.toUpperCase();
    return visits.filter((visit) => {
      const { name, phone } = visit;
      return (
        name.toUpperCase().includes(searchTerm) ||
        phone.toUpperCase().includes(searchTerm)
      );
    });
  }

  function updateSearchBookDisplay() {
    allVisitors.innerHTML = "";
    const visitorsItems =
      JSON.parse(localStorage.getItem("visitorsItems")) || visitors;

    if (
      searchVisit(document.querySelector(".search input").value, visitorsItems)
        .length !== 0
    ) {
      searchVisit(
        document.querySelector(".search input").value,
        visitorsItems
      ).forEach((el) => {
        const bookItemTr = document.createElement("tr");
        bookItemTr.className = "book-item";
        bookItemTr.innerHTML = `
   <td id = "${el.id}">${el.id}</td>
   <td>${el.name}</td>
   <td>${el.phone}</td>
  <td class="edit"><img class="editImg" src="./img/edit.png" alt="edit"></td>
   `;
        allVisitors.append(bookItemTr);
      });
    } else {
      const span = document.createElement("span");
      span.className = "matches";
      span.textContent = "There are no matches for your search";
      span.style.cssText = `position: absolute; top: 200px; left: 38%; color: red; width: 24%; font-size: 18px;`;
      allVisitors.append(span);
    }

    localStorage.setItem(
      "searchedVisit",
      JSON.stringify(
        searchVisit(
          document.querySelector(".search input").value,
          visitorsItems
        )
      )
    );
  }

  document.querySelector(".search input").addEventListener("input", () => {
    updateSearchBookDisplay();
  });

  // **********MODAL**********

  newVisitButt.addEventListener("click", () => {
    modalNewVisit.style.display = "flex";
  });
  modalNewVisit.addEventListener("click", () => {
    modalNewVisit.style.display = "none";
  });
  modalWindowNewVisit.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  newVisitButt.addEventListener("click", () => {
    modalNewVisit.style.display = "flex";
  });
  modalEditVisit.addEventListener("click", () => {
    modalEditVisit.style.display = "none";
  });
  modalWindowEditVisit.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  modalExist.addEventListener("click", () => {
    modalExist.style.display = "none";
  });
  modalExistWind.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// ***********Cards**********

const allCards = document.querySelector(".card tbody");
const newCardButt = document.querySelector(".card .add button");
const modalNewCard = document.querySelector(".card .modalNew");
const modalWindowNewCard = document.querySelector(".card .modalNew .wind");

function updateCardDisplay() {
  allCards.innerHTML = "";
  const cardItems = JSON.parse(localStorage.getItem("cardItems")) || cards;
  cardItems.forEach((el) => {
    const cardItemTr = document.createElement("tr");
    cardItemTr.className = "card-item";
    if (el.retDate !== false) {
      cardItemTr.innerHTML = `
       <td id = "${el.id}">${el.id}</td>
       <td>${el.visitor}</td>
       <td>${el.book}</td>
       <td>${el.borrDate}</td>
       <td>${el.retDate}</td>`;
    } else {
      cardItemTr.innerHTML = `
       <td id = "${el.id}">${el.id}</td>
       <td>${el.visitor}</td>
       <td>${el.book}</td>
       <td>${el.borrDate}</td>
       <td class="edit"><img class="editImg" src="./img/return.png" alt="edit"></td>`;
    }
    allCards.append(cardItemTr);
  });

  localStorage.setItem("cardItems", JSON.stringify(cardItems));
}

if (window.location.pathname === "/cards.php") {
  const selectVisit = document.getElementById("selVisit");
  const selectBook = document.getElementById("selBook");

  updateCardDisplay();

  function retBook(item) {
    const cardItems = JSON.parse(localStorage.getItem("cardItems")) || cards;
    const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;
    Array.from(cardItems).map((el) => {
      if (
        el.id ===
        Number(item.querySelector("td:first-child").getAttribute("id"))
      ) {
        el.retDate = new Date().toLocaleDateString();
        bookItems.map((book) => {
          if (book.name === el.book) {
            book.numCopy = book.numCopy + 1;
          }
        });
        localStorage.setItem("cardItems", JSON.stringify(cardItems));
        localStorage.setItem("bookItems", JSON.stringify(bookItems));
      }
    });
    selectVisit.innerHTML = "";
    selectBook.innerHTML = "";
    updateCardDisplay();
  }

  const tbody = document.querySelector(".allItems tbody");
  tbody.addEventListener("click", (event) => {
    if (event.target.className === "edit") {
      const item = event.target.parentElement;
      retBook(item);
    } else if (event.target.className === "editImg") {
      const item = event.target.parentElement.parentElement;
      retBook(item);
    }
  });

  const visitorsItems =
    JSON.parse(localStorage.getItem("visitorsItems")) || visitors;

  modalWindowNewCard.addEventListener("submit", (e) => {
    const cardItems = JSON.parse(localStorage.getItem("cardItems")) || cards;
    const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;
    bookItems.map((item) => {
      if (item.name === selectBook.value) {
        item.numCopy = item.numCopy - 1;
      }
      localStorage.setItem("bookItems", JSON.stringify(bookItems));
    });
    cardItems.push({
      id: Date.now(),
      book: selectBook.value,
      visitor: selectVisit.value,
      borrDate: new Date().toLocaleDateString(),
      retDate: false,
    });
    localStorage.setItem("cardItems", JSON.stringify(cardItems));

    updateCardDisplay();
  });

  const bookItems = JSON.parse(localStorage.getItem("bookItems")) || books;

  newCardButt.addEventListener("click", () => {
    modalNewCard.style.display = "flex";
    visitorsItems.map((item) => {
      const visitItem = document.createElement("option");
      visitItem.textContent = item.name;
      selectVisit.append(visitItem);
    });
    bookItems.map((item) => {
      if (item.numCopy >= 1) {
        const bookItem = document.createElement("option");
        bookItem.textContent = item.name;
        selectBook.append(bookItem);
      }
    });
  });
  modalNewCard.addEventListener("click", () => {
    modalNewCard.style.display = "none";
    selectVisit.innerHTML = "";
    selectBook.innerHTML = "";
  });
  modalWindowNewCard.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// ***********Statistics**********

const statTop = document.querySelector(".stat tbody");
const statHead = document.querySelector(".stat thead");

function updateStatDisplay() {
  statHead.innerHTML = "";
  statTop.innerHTML = "";
  const cardItems = JSON.parse(localStorage.getItem("cardItems")) || cards;
  if (document.getElementById("sortStat").value === "book") {
    const statItemTr = document.createElement("tr");
    statItemTr.innerHTML = `
    <th>Book</th>
    <th>Quantity how many took</th>
    `;
    statHead.append(statItemTr);
    const bookCount = {};

    cardItems.forEach((card) => {
      const book = card.book;
      bookCount[book] = (bookCount[book] || 0) + 1;
    });

    const bookArray = Object.keys(bookCount).map((book) => {
      return { book: book, count: bookCount[book] };
    });

    const topBooks = bookArray.sort((a, b) => b.count - a.count).slice(0, 5);

    topBooks.map((el) => {
      const statItemTr = document.createElement("tr");
      statItemTr.className = "stat-item";

      statItemTr.innerHTML = `
  <td>${el.book}</td>
  <td>${el.count}</td>
  `;
      statTop.append(statItemTr);
    });
  } else if (document.getElementById("sortStat").value === "visit") {
    const statItemTr = document.createElement("tr");
    statItemTr.innerHTML = `
    <th>Visitor</th>
    <th>The number of books taken</th>
    `;
    statHead.append(statItemTr);
    const visitorCount = {};

    cardItems.forEach((card) => {
      const visitor = card.visitor;
      visitorCount[visitor] = (visitorCount[visitor] || 0) + 1;
    });

    const visitorArray = Object.keys(visitorCount).map((visitor) => {
      return { visitor: visitor, count: visitorCount[visitor] };
    });

    const topVisitors = visitorArray
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    topVisitors.map((el) => {
      const statItemTr = document.createElement("tr");
      statItemTr.className = "stat-item";

      statItemTr.innerHTML = `
  <td>${el.visitor}</td>
  <td>${el.count}</td>
  `;
      statTop.append(statItemTr);
    });
  }
}

if (window.location.pathname === "/statistics.php") {
  document.getElementById("sortStat").addEventListener("change", () => {
    updateStatDisplay();
  });
  updateStatDisplay();
}
