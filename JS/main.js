import { initCalculator } from "./calculator.js"

class Router {
    constructor() {
        this.routes = {},
            this.currentRoute = null,
            this.init()
    }

    register(path, component) {
        this.routes[path] = component
        return this
    }

    navigate(path) {
        // HISTORY API - Para deploy con URLs limpias (descomenta en prod)
        history.pushState(null, null, path)

        // HASH URLs - Para desarrollo local con Live Server
        // window.location.hash = path

        this.render(path)
    }

    render(path) {
        const app = document.getElementById('app')
        const component = this.routes[path] || this.routes['/404']

        if (component) {
            app.innerHTML = ''
            const element = component()
            if (element) {
                app.appendChild(element)
            }
            this.currentRoute = path

            if (path === '/calculator') initCalculator()
        }
    }

    init() {
        document.addEventListener('click', (event) => {
            if (event.target.matches('[data-link]')) {
                event.preventDefault()
                let path = event.target.getAttribute('href')
                this.navigate(path)
            }
        })

        // HISTORY API - Para deploy con URLs limpias (descomenta en prod)
        window.addEventListener('popstate', () => {
            this.render(window.location.pathname)
        })
        this.render(window.location.pathname)

        // HASH URLs - Para desarrollo local con Live Server
        // window.addEventListener('hashchange', () => {
        //     this.render(window.location.hash.slice(1) || '/')
        // })
        // this.render(window.location.hash.slice(1) || '/')
    }
}

const pages = {
    home: () => {

    },

    calculator: () => {
        const title = document.getElementById('main-title')
        title.textContent = 'Calculator'
        const section = document.createElement('section')
        section.classList.add('calculator')
        section.innerHTML = `
            <!-- Calculator Displays -->
            <input type="text" class="display" id="equation-display" value="" readonly />
            <input type="text" class="display" id="partial-result" value="" readonly />
            <!-- Calculator Utilities -->
            <nav>
                <ul>
                    <li><a href="#history" class="link"><img src="./assets/img/history icon.png" alt='history' width="50%"></a></li>
                    <li><a href="#unitsConverter" class="link"><img src="./assets/img/units icon.png" alt='units converter' width="50%"></a>
                    </li>
                    <li><a href="#cientist" class="link"><img src="./assets/img/scientist icon.png" alt='cientist' width="50%"></a></li>
                    <li><button type="button" class="link" id="delete-btn" data-page="#delete" value=""><img
                                src="./assets/img/delete icon.png" alt='delete' width="35%"></button></li>
                </ul>
            </nav>

            <!-- Operators -->
            <div class="calculator-keys">
                <button type="button" class="key operator" id="clear-btn" value="C">C</button>
                <div class="parentheses-buttons">
                    <button type="button" class="key operator" value="(">(</button>
                    <button type="button" class="key operator" value=")">)</button>
                </div>
                <button type="button" class="key operator" value="%">%</button>
                <button type="button" class="key operator" value="/">&divide;</button>
                <button type="button" class="key operator" value="*">&times;</button>
                <button type="button" class="key operator" value="-">-</button>
                <button type="button" class="key operator" value="+">+</button>
                <button type="button" class="key operator" id="equal-btn" value="=">=</button>

                <!-- Number Keys -->
                <div id="numpad">
                    <button type="button" class="key" value="8">8</button>
                    <button type="button" class="key" value="9">9</button>
                    <button type="button" class="key" value="7">7</button>

                    <button type="button" class="key" value="4">4</button>
                    <button type="button" class="key" value="5">5</button>
                    <button type="button" class="key" value="6">6</button>

                    <button type="button" class="key" value="1">1</button>
                    <button type="button" class="key" value="2">2</button>
                    <button type="button" class="key" value="3">3</button>

                    <button type="button" class="key" value="*-1">+/-</button>
                    <button type="button" class="key" value="0">0</button>
                    <button type="button" class="key" class="decimal" value=".">.</button>
                </div>

            </div>`

        return section
    },

    notes: () => {

    },

    calendar: () => {

    },

    timer: () => {

    },

    notFound: () => {

    }
}

const router = new Router()
    .register('/home', pages.home)
    .register('/calculator', pages.calculator)
    .register('/notes', pages.notes)
    .register('/calendar', pages.calendar)
    .register('/timer', pages.timer)
    .register('/404', pages.notFound);