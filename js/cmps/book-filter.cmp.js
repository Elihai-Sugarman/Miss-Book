export default {
    template: `
        <section class="book-filter">
            <h2>Filters:</h2>
            <label class="text-filter">
                Key letters:
                <input v-model="filterBy.title" @input="filter"  type="text" placeholder="Search key letters">
            </label>
            <label class="minPrice-filter">
                From price:
                <input v-model="filterBy.fromPrice" @input="filter"  type="number" placeholder="From price:">
            </label>
            <label class="maxPrice-filter">
                To price:
                <input v-model="filterBy.toPrice"  @input="filter" type="number" placeholder="To price:">
            </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: -Infinity,
                toPrice: Infinity,
            },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', { ...this.filterBy })
        },
    },
}
