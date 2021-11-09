import bookPreview from './book-preview.cmp.js'


export default {
    props: ['books'],
    template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id">
            <router-link :to="'/book/'+book.id">
                <book-preview :book="book"/>
            </router-link>
            </li>
            
        </ul>
    `,
    methods: {
        onSelectBook(bookId) {
            console.log('From book-list, bookId', bookId);
            this.$emit('selected', bookId)
        }
    },
    components: {
        bookPreview
    }
}