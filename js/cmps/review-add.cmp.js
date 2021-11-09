export default {
    template: `
        <section class="review-add">
            <form>
                <label>Your name :</label>
                <input v-model="review.name" type="text" placeholder="Books Reader">
                <label>Rating :</label>
                <div class="rating">
                    <input v-model="review.rating" type="range" min="1" max="5">
                    <span>{{review.rating}}</span>
                </div>
                <label>Date :</label>
                <input v-model="review.date" type="date" >
                <label>Review :</label>
                <textarea  v-model="review.text">
                </textarea>
                <button @click.prevent="addReview">Add</button>
            </form>
        </section>
    `,
    data() {
        return {
            review: {
                name: 'Books Reader',
                rating: 1,
                date: Date.now().toLocaleString(),
                text: ''
            }
        }
    },
    methods:{
        addReview(){
            this.$emit('onAdd',{...this.review})
        }
    }
}
