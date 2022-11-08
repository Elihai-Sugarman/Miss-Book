export default {
    template: `
    <form class="review-form" @submit.prevent="saveReview">
        <h2>
            Add a review:
        </h2>
        <label>
            Full Name:
            <input v-model="review.fullname" ref="name" type="text">
        </label>
        <label for="rate">Rate (1-5)</label>
        <select v-model.number="review.rate" id="rate">
            <option v-for="n in 5">{{ n }}</option>
            <!-- <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option> -->
        </select>
        <label>
            Read At:
            <input v-model="review.date" type="date" :value="currDate">
        </label>
        <label>
            Review Content:
            <textArea v-model="review.content"></textArea>
        </label>
        <button >Submit</button>
    </form>
    `,
    data() {
        return {
            review: {
                fullname: 'Books Reader',
                rate: 0,
                date: '',
                content: '',
            },
            currDate: new Date().toISOString().slice(0, 10),
        }
    },
    mounted() {
        this.$refs.name.focus()
    },
    computed: {},
    methods: {
        saveReview(ev) {
            console.log(this.review)
            // this.$emit('reviewed', { ...this.review })
            this.review = {
                fullname: 'Books Reader',
                rate: 0,
                date: '',
                content: '',
            }
        },
    },
}
