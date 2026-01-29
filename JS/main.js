import { initCalculator } from "./calculator.js"
import { initConverter } from "./conversions.js"

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
        if (this.currentRoute === path) return // Prevents unnecesary renders

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
            if (path === '/units-converter') initConverter()
        }
    }

    init() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[data-link]')
            if (!link) return

            event.preventDefault()
            this.navigate(link.getAttribute('href'))
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
        const title = document.getElementById('main-title')
        title.textContent = 'Home'
        const section = document.createElement('section')
        section.innerHTML = '<h2>Welcome to The Assistant</h2>'
        return section
    },

    calculator: () => {
        const title = document.getElementById('main-title')
        title.textContent = 'Calculator'
        const section = document.createElement('section')
        section.classList.add('calculator')
        section.id = 'section-container'
        section.innerHTML = `
            <!-- Calculator Displays -->
            <input type="text" class="display" id="equation-display" value="" readonly />
            <input type="text" class="display" id="partial-result" value="" readonly />
            <!-- Calculator Utilities -->
            <nav>
                <ul>
                    <li><a href="#history" id="history-btn" class="link"><img src="./assets/img/history icon.png" id="history-icon" class="nav-icon" alt='history'></a></li>
                    <li><a href="/units-converter" data-link><img src="./assets/img/units icon.png" class="nav-icon" alt='units converter'></a>
                    </li>
                    <li><a href="#cientist" class="link"><img src="./assets/img/scientist icon.png" class="nav-icon" alt='cientist'></a></li>
                    <li><button type="button" class="link" id="delete-btn" data-page="#delete" value=""><img
                                src="./assets/img/delete icon.png" class="nav-icon" alt='delete'></button></li>
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
                <div id="history-container" style="display: none;"></div>

            </div>`

        return section
    },

    unitsConverter: () => {
        const title = document.getElementById('main-title')
        title.textContent = 'Units Converter'
        const section = document.createElement('section')
        section.classList.add('converter')
        section.id = 'section-container'
        section.innerHTML = `
            <div class="converter-controls">
                <label for="category-select">Select category:</label>
                <select id="category-select">
                    <option value="">-- Choose a category --</option>
                    <option value="length">Length</option>
                    <option value="mass">Mass</option>
                    <option value="volume">Volume</option>
                    <option value="area">Area</option>
                    <option value="temperature">Temperature</option>
                    <option value="data">Data</option>
                    <option value="speed">Speed</option>
                    <option value="time">Time</option>
                    <option value="nauticalUnits">Nautical units</option>
                    <option value="astronomicUnits">Astronomic units</option>
                </select>
            </div>
            <div class="converter-content" id="converter-content">
                <!-- Converter fields will be generated here -->
            </div>
            <div class="back-button">
                <a href="/calculator" data-link>Back to Calculator</a>
            </div>
        `
        return section
    },

    notes: () => {
        const title = document.getElementById('main-title')
        title.textContent = 'Notes'
        const section = document.createElement('section')
        section.innerHTML = '<h2>Notes feature coming soon...</h2>'
        return section
    },

    calendar: () => {
        const title = document.getElementById('main-title')
        title.textContent = 'Calendar'
        const section = document.createElement('section')
        section.innerHTML = '<h2>Calendar feature coming soon...</h2>'
        return section
    },

    timer: () => {
        const title = document.getElementById('main-title')
        title.textContent = 'Timer'
        const section = document.createElement('section')
        section.innerHTML = '<h2>Timer feature coming soon...</h2>'
        return section
    },

    notFound: () => {
        const section = document.createElement('section')
        section.innerHTML = '<h2>404 - Page not found</h2>'
        return section
    }
}

const router = new Router()
    .register('/home', pages.home)
    .register('/calculator', pages.calculator)
    .register('/units-converter', pages.unitsConverter)
    .register('/notes', pages.notes)
    .register('/calendar', pages.calendar)
    .register('/timer', pages.timer)
    .register('/404', pages.notFound);