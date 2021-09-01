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

function createNewBook(Title, setBook) {
  const newBook = require('./newBook.json');
  newBook.BookInfo.Title = Title;
  setBook(newBook);
  download(JSON.stringify(newBook), Title + '.json', 'json');
  localStorage.book = JSON.stringify(newBook);
}

function handleFileSelect(event, setBook) {
  var book;
  var files = event.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; (f = files[i]); i++) {
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        try {
          book = JSON.parse(e.target.result);
          setBook(book);
          localStorage.book = JSON.stringify(book);
          console.log(book.BookInfo.Title + '\nLoaded Successfully!');
        } catch (ex) {
          alert('Failed To load File' + ex);
        }
      };
    })(f);
    reader.readAsText(f);
  }
}
