import bookHeader from './cmps/book-header.cmp.js'
import bookFooter from './cmps/book-footer.cmp.js'
import bookApp from './pages/book-app.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

import {router} from './routes.js'







const options = {
    el: '#app',
    router,
    template: `
        <section>
            <user-msg/>
            <book-header />
            <router-view/>
            <book-footer />
        </section>
    `,
    components: {
        bookHeader,
        bookFooter,
        bookApp,
        userMsg

    }
};

new Vue(options);