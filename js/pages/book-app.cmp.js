import {bookService} from "../services/book.service.js";

import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookAdd from "../cmps/book-add.cmp.js";

export default {
    template: `
        <section class="book-app">
            <book-add @searchBook="onSearchBook"></book-add>
            <ul class="google-book-list">
                <li class="google-book-preview" v-for="book in googleBooks.slice(0, 5)">{{book.volumeInfo.title}}
                <button @click="addGoogleBook(book)">+</button>
                </li>
                
            </ul>
            <book-filter @filtered="setFilter"></book-filter>
            <book-list v-if="!selectedBook"  :books="booksToShow" @selected="selectBook"></book-list>
            <book-details v-if="selectedBook" :book="selectedBook" @close='closeDetails'></book-details>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null,
            googleBooks: []
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
        },
        onSearchBook(searchBy) {    
            console.log('searchBy', searchBy);
            bookService.getBookFromApi(searchBy)
                .then(googleBooks => this.googleBooks = googleBooks)
        },
        addGoogleBook(book){
            console.log(book)
            bookService.addGoogleBook(book)
                .then((newBook)=>{
                    console.log('add succefully',newBook)
                    this.loadBooks()
                })
                
            // bookService.addGoogleBook()
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
        bookFilter,
        bookAdd
    }
}