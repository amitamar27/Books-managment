

export default {
    template: `
        <div class="book-filter">
            
            <label>Search</label>
            <input v-model="filterBy.title" type="text" placeholder="Search by name">
            <label>Price:</label>
            <input v-model="filterBy.fromPrice" type="number" placeholder="from...">
            <input v-model="filterBy.toPrice" type="number" placeholder="To...">
            <button @click.prevent="filter">Filter</button>
        </div>
    `,
    data(){
        return{
            filterBy:{
                title:'',
                fromPrice: '',
                toPrice: ''
            }
        }
    },
    methods:{
        filter(){
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
      
    }
}