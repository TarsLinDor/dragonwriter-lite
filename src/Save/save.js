const download = require('downloadjs');

function SaveBook_internally(book, setBook) {
  setBook(book);
  localStorage.book = JSON.stringify(book);
}

function SaveBook_locally(book, setBook) {
  setBook(book);
  localStorage.book = JSON.stringify(book);
  download(JSON.stringify(book), book.BookInfo.Title + '.json', 'json');
}
