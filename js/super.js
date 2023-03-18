export class Super {
    constructor() {
        this.title = document.getElementById('title');
        this.author = document.getElementById('author');
        this.year = document.getElementById('year');
        this.readCheck = document.getElementById('isComplete');
    }

    getBookList() {
        const dataRaw = localStorage.getItem('bookList');
        if (dataRaw === null) localStorage.setItem('bookList', '[]');
        const dataJson = JSON.parse(dataRaw);
        return dataJson;
    }
}