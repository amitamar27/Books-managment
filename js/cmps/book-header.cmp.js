export default {
    template: `
        <header class="book-header">
            <div class="logo">
                <h3>Books Store</h3>
            </div>
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
            
        </header>
    `,
}