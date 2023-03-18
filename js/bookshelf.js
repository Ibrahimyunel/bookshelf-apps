import { swalConfig } from "./handleSwal.js";
import { Super } from "./super.js";

export class Bookshelf extends Super {
    constructor() {
        super();
        this.bookAsRead = document.getElementById('book_as_read');
        this.bookAsUnread = document.getElementById('book_as_unread');
        this.getBtnEdit = document.getElementById('btn_edit');
        this.bookData = [];
    }

    displayBook = async () => {
        try {
            const oldData = await super.getBookList();
            for (let item of oldData) {
                const book = document.createElement('section');
                book.setAttribute('class', 'book');
                book.setAttribute('id', item.id);
                book.innerHTML = `<ul class="book-text">
                                    <li><p>ID: </p><textarea readonly>${item.id}</textarea></li>
                                    <li><p>Title: </p><textarea readonly>${item.title}</textarea></li>
                                    <li><p>Author: </p><textarea readonly>${item.author}</textarea></li>
                                    <li><p>Year: </p><textarea readonly>${item.year}</textarea></li>
                                </ul>`;
                const divBtn = document.createElement('div');
                divBtn.setAttribute('class', 'd-flex');

                const moveBook = document.createElement('img');
                moveBook.setAttribute('class', 'btn-svg');
                moveBook.setAttribute('id', 'btn_move_book');
                moveBook.setAttribute('width', '30px');
                moveBook.setAttribute('src', '../assets/btn_move_book.svg');
                moveBook.setAttribute('alt', 'Move button');
                moveBook.addEventListener('click', this.switchShelf);
                divBtn.appendChild(moveBook);

                const btnRm = document.createElement('img');
                btnRm.setAttribute('class', 'btn-svg');
                btnRm.setAttribute('id', 'btn_rm');
                btnRm.setAttribute('width', '30px');
                btnRm.setAttribute('src', '../assets/btn_rm.svg');
                btnRm.setAttribute('alt', 'remove button');
                btnRm.addEventListener('click', this.deleteBook);
                divBtn.appendChild(btnRm);

                const btnEdit = document.createElement('img');
                btnEdit.setAttribute('class', 'btn-svg');
                btnEdit.setAttribute('id', 'btn_edit');
                btnEdit.setAttribute('width', '30px');
                btnEdit.setAttribute('src', '../assets/btn_edit.svg');
                btnEdit.setAttribute('alt', 'Edit button');
                btnEdit.addEventListener('click', this.editBook);
                divBtn.appendChild(btnEdit);

                book.appendChild(divBtn);

                if (item.isComplete) {
                    this.bookAsRead.appendChild(book);
                } else {
                    this.bookAsUnread.appendChild(book);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    confirmDelete = async () => {
        swalConfig.showCancelButton = true;
        swalConfig.text = 'Is it ok to remove this book?'
        const swalRes = await Swal.fire(swalConfig);
        if (swalRes.isConfirmed) {
            return true;
        } else {
            return false;
        }
    }

    deleteBook = async (e) => {
        try {
            const swalValue = await this.confirmDelete();
            if (swalValue) {
                const oldData = await this.getBookList();
                const bookId = await e.target.parentNode.parentNode.id;
                const targetBook = await oldData.findIndex((item) => item.id == bookId);
                oldData.splice(targetBook, 1);
                const newDataRaw = JSON.stringify(oldData);
                localStorage.setItem('bookList', newDataRaw);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    editBook = async (e) => {
        try {
            e.target.style.display = 'none';

            const editCancel = document.createElement('img');
            editCancel.setAttribute('class', 'btn-svg');
            editCancel.setAttribute('id', 'btn_edit_cancel');
            editCancel.setAttribute('width', '30px');
            editCancel.setAttribute('src', '../assets/btn_cancel.svg');
            editCancel.setAttribute('alt', 'cancel edit button');
            editCancel.addEventListener('click', () => e.target.style.display = 'block');
            editCancel.addEventListener('click', this.editDoneOrCancel);
            e.target.parentNode.appendChild(editCancel);

            const editApprove = document.createElement('img');
            editApprove.setAttribute('class', 'btn-svg');
            editApprove.setAttribute('id', 'btn_edit_approve');
            editApprove.setAttribute('width', '30px');
            editApprove.setAttribute('src', '../assets/btn_approve.svg');
            editApprove.setAttribute('alt', 'Approve edit button');
            editApprove.addEventListener('click', () => e.target.style.display = 'block');
            editApprove.addEventListener('click', this.editDoneOrCancel);
            e.target.parentNode.appendChild(editApprove);

            this.accessBookData(e);

            for (let i = 1; i < this.bookData.length; i++) {
                this.bookData[i].removeAttribute('readonly');
            }
            this.bookData[1].focus();

        } catch (err) {
            console.log(err);
        }
    }

    editDoneOrCancel = async (e) => {
        try {
            e.target.style.display = 'none';
            this.accessBookData(e);
            for (let item of this.bookData) {
                item.setAttribute('readonly', true);
            }
            if (e.target.previousElementSibling.id === "btn_edit_cancel") {
                e.target.previousElementSibling.style.display = 'none';

                const targetId = e.target.parentNode.parentNode.id;
                const oldData = await super.getBookList();
                const targetData = await oldData.find((item) => item.id == targetId);

                for (let item of this.bookData) {
                    const getValue = item.value;
                    const getKey = item.previousElementSibling.textContent.slice(0, -2).toLowerCase();
                    targetData[getKey] = getValue;
                }

                const newDataRaw = JSON.stringify(oldData);
                localStorage.setItem('bookList', newDataRaw);

            } else {
                e.target.nextElementSibling.style.display = 'none';
            }
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    accessBookData = (e) => {
        const targetBook = e.target.parentNode.previousElementSibling;
        this.bookData = targetBook.querySelectorAll('li textarea');
    }

    switchShelf = async (e) => {
        try {
            const oldData = await super.getBookList();
            const targetId = e.target.parentNode.parentNode.id;
            const targetData = await oldData.find((item) => item.id == targetId);
            targetData.isComplete = !targetData.isComplete;
            const newDataRaw = JSON.stringify(oldData);
            localStorage.setItem('bookList', newDataRaw);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

}