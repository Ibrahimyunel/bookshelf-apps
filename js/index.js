import { AddBook } from "./addBook.js";
import { Bookshelf } from "./bookshelf.js";
import { SearchBook } from "./searchBook.js";

const addBookObj = new AddBook();
addBookObj.onSubmit();

const bookshelfObj = new Bookshelf();
bookshelfObj.displayBook();

const searchBookObj = new SearchBook();
searchBookObj.searchBookList();
searchBookObj.onKeyUp();