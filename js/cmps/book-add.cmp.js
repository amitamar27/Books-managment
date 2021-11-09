import { bookService } from "../services/book.service.js"

export default {
    template: `
        <div class="book-filter">
            <label>Search</label>
            <input @change="onSearchBook" v-model="searchBy" type="text" placeholder="Search book from api">
        </div>
    `,
    data() {
        return {
            books: null,
            searchBy: '',
        }
    },
    created() {
       
    }
    ,
    methods:{
        onSearchBook(){
         this.$emit('searchBook', this.searchBy)
        }
    }
}