import {bookService} from "../services/book.service.js";

import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from './book-details.cmp.js'

export default {
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter"></book-filter>
            <book-list v-if="!selectedBook"  :books="booksToShow" @selected="selectBook"></book-list>
            <book-details v-if="selectedBook" :book="selectedBook" @close='closeDetails'></book-details>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null
        }
    },
    created() {
        this.loadBooks()
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        selectBook(book) {
            this.selectedBook = book
        },
        setFilter(filterBy){
            this.filterBy = filterBy
        },
        closeDetails(){
            this.selectedBook = null
        }
    },                   
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const { title, toPrice, fromPrice } = this.filterBy
            const searchStr = title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                // console.log(book.title.toLowerCase().includes(searchStr))
                return book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= fromPrice &&
                    (book.listPrice.amount <= toPrice || !toPrice)
            });
            // console.log(booksToShow)
            return booksToShow;
            
        }
    },
    components: {
        bookList,
        bookDetails,
        bookFilter
    }
}