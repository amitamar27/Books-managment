export default {
    props: ['description'],
    template: `
        <p @click="isExpand=!isExpand" class="desc"><span>Description: </span>{{textForDisplay}}
            <span v-if="!isExpand">...</span>
        </p>
    `,
    data(){
        return{
            isExpand:false
        }
    },
    created() {
        if (this.description.length < 100) this.isExpand = true
    },
    computed: {
        textForDisplay() {
            if (this.description.length > 100 && !this.isExpand) {
                return this.description.slice(0, 100)
            }
            else if (this.isExpand || this.description < 100) return this.description
        }
    }
}