

export default {
    props : ['book'],
    template: `
        <div class="book-preview ">
            <img class="book-desc-img-prev" :src="book.thumbnail">
            <p><strong>Title</strong> : {{book.title}}</p>
            <p><strong>Price</strong> : {{book.listPrice.amount}}{{currencyIcon}}</p>
        </div>
    `,
    computed:{
        currencyIcon() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪';
            else if (this.book.listPrice.currencyCode === 'EUR') return '€';
            else if (this.book.listPrice.currencyCode === 'USD') return '$';
        },
    }
 
}