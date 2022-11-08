import { bookService } from '../services/book-service.js'

export default {
    template: `
        <section class="book-edit">
            <h1>Book Edit</h1>
            <form @submit.prevent="save">
                <input type="text" v-model="bookToEdit.title">
                <input type="number" v-model="bookToEdit.listPrice">
                <!-- <input type="number" v-model.number="bookToEdit.price"> -->
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptyBook(),
        }
    },
    methods: {
        save() {
            const book = bookService.save(this.bookToEdit)
            this.$emit('saved', book)
            this.bookToEdit = bookService.getEmptyBook()
        },
    },
}
