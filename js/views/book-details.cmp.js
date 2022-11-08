import { bookService } from '../services/book-service.js'

import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
    template: `
        <section v-if="book" class="book-details">
            <h2>{{ book.title }}</h2>
            <h4>Language: {{ book.language }}</h4>
            <h4>Author</h4>
            <p>
                <span v-for="author in book.authors">{{ author }}, </span>
            </p>
            <h4>Published Date: {{ book.publishedDate }}, {{ publishedDateTitle }} </h4>
            <h4>Pages: {{ book.pageCount }}, {{ lengthTitle }} </h4>
            <h4>Categories:</h4>
            <p>
                <span v-for="categorie in book.categories">{{ categorie }}, </span>
            </p>
            <long-text :txt="book.description" :maxLength="100" />
            <img :src="this.book.thumbnail" alt="">
            <h4 v-if="this.book.listPrice.isOnSale">ON SALE!</h4>
            <h3 :class="priceClass">{{ book.listPrice.amount }} {{ book.listPrice.currencyCode }}</h3>
            <review-add />
            <router-link class=".button" to="/book">Back</router-link>
        </section>
`,
    data() {
        return {
            book: null,
        }
    },
    created() {
        const id = this.$route.params.id
        bookService.get(id).then((book) => (this.book = book))
    },
    computed: {
        lengthTitle() {
            if (this.book.pageCount > 500) return 'Long Reading'
            if (this.book.pageCount > 200) return 'Decent Reading'
            return 'Light Reading'
        },
        publishedDateTitle() {
            if (new Date().getFullYear() - this.book.publishedDate > 10)
                return 'Veteran Book'
            else if (new Date().getFullYear() - this.book.publishedDate <= 1)
                return 'New!'
            return ''
        },
        priceClass() {
            const {
                listPrice: { amount },
            } = this.book
            return {
                'red-color': amount > 150,
                'green-color': amount < 20,
            }
        },
    },
    components: {
        longText,
        reviewAdd,
    },
    methods: {
        addReview(review) {
            bookService.addReview(this.book)
        },
    },
}
