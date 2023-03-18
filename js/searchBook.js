import { Super } from "./super.js";

export class SearchBook extends Super {
    constructor() {
        super();
        this.searchBook = document.getElementById('search_book');
        this.searchBookFilter = document.getElementById('search_book_filter');
    }

    searchEvent(e) {
        const getId = e.currentTarget.id.slice(7);
        const getBookFocused = document.getElementById(getId);
        getBookFocused.scrollIntoView(true);
        getBookFocused.addEventListener('click', (e) => {
            e.currentTarget.style.boxShadow = "0px 0px 10px 0 rgba(0, 204, 255, 0.8)";
        });
        getBookFocused.click();
        getBookFocused.addEventListener('click', (e) => {
            e.currentTarget.style.boxShadow = "0px 0px 10px 0 rgba(0, 0, 0, 0.3)";
        });
        setTimeout(() => getBookFocused.click(), 2000);
    }

    searchBookList = async () => {
        try {
            const oldData = await this.getBookList();
            for (let item of oldData) {
                const book = document.createElement('section');
                book.setAttribute('class', 'book');
                book.setAttribute('id', `search_${item.id}`);
                book.addEventListener('click', this.searchEvent);
                book.innerHTML = `<ul class="book-text-search">
                                    <li>ID : <span>${item.id}</span></li>
                                    <li>Title : <span>${item.title}</span></li>
                                    <li>Author : <span>${item.author}</span></li>
                                    <li>Year : <span>${item.year}</span></li>
                                </ul>
                                <div class="d-flex">
                                    <p class="text-dark m-0 ms-4">Click to find</p>
                                    <img class="btn-svg" id="btn_move" width="30px" src="../assets/move_icon.svg" alt="edit button">
                                </div>`

                this.searchBook.appendChild(book);
            }
        } catch (err) {
            console.log(err);
        }
    }

    filterBooks = (e) => {
        const searchKey = e.currentTarget.value.toUpperCase();
        const searchList = [].slice.call(this.searchBook.children);
        searchList.shift();

        for (let item of searchList) {
            const targetSpan = item.querySelectorAll('ul li span');
            const arrText = [];
            for (let targetText of targetSpan) {
                const eachText = targetText.textContent.toUpperCase();
                arrText.push(eachText);
            }

            const validKey = [];
            for (let key of arrText) {
                if (key.includes(searchKey)) {
                    validKey.push("valid");
                    break;
                }
            }

            if (validKey.length > 0) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    }

    onKeyUp() {
        this.searchBookFilter.addEventListener('keyup', this.filterBooks);
    }
}