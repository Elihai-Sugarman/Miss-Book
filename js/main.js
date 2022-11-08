const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

import bookApp from './views/book-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'

import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

const options = {
    template: `
        <section>
            <app-header />
            <router-view/>
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        appFooter,
    },
}

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage,
        },
        {
            path: '/about',
            component: aboutPage,
        },
        {
            path: '/book',
            component: bookApp,
        },
        {
            path: '/book/:id',
            component: bookDetails,
        },
    ],
}
const app = createApp(options)
const router = createRouter(routerOptions)

app.use(router)
app.mount('#app')
