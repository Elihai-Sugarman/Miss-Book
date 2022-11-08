import { bookService } from '../services/book-service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'

export default {
    template: `
    <section class="book-app">
        <book-filter @filter="filter"/>
        <book-list 
            @selected="selectBook" 
            @remove="removeBook" 
            :books="booksToShow"/>
    </section>
    `,
    created() {
        bookService.query().then((books) => (this.books = books))
    },
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: null,
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)

            const idx = this.books.findIndex((book) => book.id === bookId)
            this.books.splice(idx, 1)
        },
        selectBook(book) {
            this.selectedBook = book
        },
        bookSaved(book) {
            this.books.push(book)
        },
        filter(filterBy) {
            console.log(filterBy)
            this.filterBy = filterBy
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const { title, toPrice, fromPrice } = this.filterBy
            const regex = new RegExp(title, 'i')
            return this.books.filter(
                ({ title, listPrice: { amount } }) =>
                    regex.test(title) && amount < toPrice && amount > fromPrice
            )
        },
    },
    components: {
        bookFilter,
        bookList,
    },
}
