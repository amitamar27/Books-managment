import longText from '../cmps/long-text.cmp.js'
import { bookService } from '../services/book.service.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import bookReview from '../cmps/book-review.cmp.js'
import { eventBus } from '../services/event-bus.js'

export default {
    template: `
        <main class="book-details app-main">
            <div class="book-inner-details" >
                <router-link to="/book">
                    <button>X</button>
                </router-link> 
                <img class="book-desc-img" :src="book.thumbnail">
                <h3>Book name : {{book.title}}</h3>
                <h3>Author :{{book.authors[0]}}</h3>
                <ul>
                    genre
                    <li v-for="genre in book.categories">{{genre}} </li>
                </ul>
                <h3>language : {{book.language}}</h3>
                <h3>publish date : {{publishedDate}}</h3>
                <h3>{{pageCount}} </h3>
                <h3 :class="colorPrice">Price: {{bookPrice}}{{currencyIcon}} <span class="red">{{isOnSale}}</span>  </h3>
                <long-text :description="book.description"></long-text>
            </div>
            <div class="review-details">
                <h2>Users Comments</h2>
                <ul>
                    <li v-for="review in book.reviews">
                        <book-review @removed="removeReview(book.id,$event)" :review="review"></book-review>
                    </li>
                </ul>
            </div>
            <div class="add-review">
                <review-Add @onAdd="addReview"></review-Add>
            </div>
        </main>
          
            
      
    `,
    data(){
        return {
            book:null
        }
    },
    created(){
        this.loadBook()
    },
    methods:{
        loadBook() {
            const { bookId } = this.$route.params;
            bookService.getBookById(bookId)
                .then(book => {
                    this.book = book
                })
        },
        addReview(review){
            bookService.addReview(this.book.id,review)
                .then(()=>{
                    const msg ={
                        txt:'Added Succesfully',
                        type:'success'
                    }
                    eventBus.$emit('showMsg',msg)
                    this.loadBook()
                })
                
                
        },
        removeReview(bookId,reviewId){
            bookService.removeReview(bookId,reviewId)
                .then(()=>{
                    const msg ={
                        txt:'Deleted Succesfully',
                        type:'success'
                    }
                    eventBus.$emit('showMsg',msg)
                    this.loadBook()
                    console.log('removed!')
                })
                .catch(()=>{
                    const msg ={
                        txt:'Error. Please try later',
                        type:'error'
                    }
                    eventBus.$emit('showMsg',msg)
                })
        }
          
    },
    computed: {
        pageCount() {
            const pageCount = this.book.pageCount
            if (pageCount > 500) {
                return `${pageCount} pages - Long reading`
            } else if (pageCount > 200) {
                return `${pageCount} pages - Decent Reading`
            } else {
                return `${pageCount} pages - Light Reading`
            }

        },
        publishedDate() {
            var published = this.book.publishedDate
            var year = new Date().getFullYear()
            if ((year - published) >= 10) {
                return `${published} - Veteran Book`
            } else if ((year - published) <= 1) {
                return `${published} - New!`
            } else {
                return published
            }
        },
        bookPrice() {
            const bookPrice = this.book.listPrice.amount
            return bookPrice
        },
        colorPrice() {
            const bookPrice = this.book.listPrice.amount
            if (bookPrice > 150) {
                return 'red'
            } else if (bookPrice < 20) return 'green'
        },
        isOnSale() {
            var bookSale = this.book.listPrice.isOnSale
            if (bookSale) return 'SALE'
            else return ''
        },
        currencyIcon() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪';
            else if (this.book.listPrice.currencyCode === 'EUR') return '€';
            else if (this.book.listPrice.currencyCode === 'USD') return '$';
        },
        // shortDesc(){
        //     var description = book.description
        //     return description.slice(0,99)
        // }      
    },
    components: {
        longText,
        reviewAdd,
        bookReview,
        
       
    }

}