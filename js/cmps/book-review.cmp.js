

export default {
    props:['review'],
    template: `
        <section class="book-review">
                <button @click="remove(review.id)">X</button>
                <p><strong>user name</strong>:{{review.name}}</p>
                <p><strong>user rate</strong>:{{review.rating}}</p>
                <p><strong>date</strong>:{{review.date}}</p>
                <p><strong>comment</strong>:{{review.text}}</p>
        </section>
    `,
    data(){
        return{

        }
    },
    methods:{
        remove(reviewId){
            this.$emit('removed',reviewId)
        }
    }
}