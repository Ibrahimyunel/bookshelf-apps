import { Super } from "./super.js";
import { swalConfig, changeSwalConfig } from './handleSwal.js';

export class AddBook extends Super {
    constructor() {
        super();
        this.addBookForm = document.getElementById('add_book_form');
        this.newDataObj = {};
    }

    setNewBook = async (e) => {
        try {
            e.preventDefault();
            this.newDataObj.id = Date.now();
            this.newDataObj[this.title.id] = this.title.value;
            this.newDataObj[this.author.id] = this.author.value;
            this.newDataObj[this.year.id] = this.year.value;
            this.newDataObj[this.readCheck.id] = this.readCheck.checked;

            const oldData = await super.getBookList();
            oldData.push(this.newDataObj);
            const newDataRaw = JSON.stringify(oldData);
            localStorage.setItem('bookList', newDataRaw);

            const changeSwal = changeSwalConfig('success', 'Yeayy...')
            changeSwal.text = 'Add Data Successfully';
            Swal.fire(changeSwal).then(() => window.location.reload());
        } catch (err) {
            swalConfig.text = 'Add Data failed';
            Swal.fire(swalConfig);
            console.log(err);
        }
    }

    onSubmit() {
        this.addBookForm.addEventListener('submit', this.setNewBook);
    }
}