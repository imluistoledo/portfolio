// ********** Logo animation ********** //
// Gets all the text in the logo (including spaces)
const logoText = document.getElementById("logo")
// Splits the letters into an array containing each letter (including spaces)
const logoLetters = logoText.innerText.split("")
logoText.innerText = ""

// For each letter, creates the required HTML elements
logoLetters.forEach((letter) => {
    let character = letter === ' ' ? '&nbsp;' : letter
    logoText.innerHTML = logoText.innerHTML + `
    <div>
    <span>${character}</span>
    <span class="second-logo">${character}</span>
    </div>
    `
})

// Mouse events for the animation to work
logoText.addEventListener('mouseenter', () => {
    let count = 0
    const animationInterval = setInterval(() => {
        // Creates the actual animation for each element
        /**
         * The conditional is used to go from the very first child to the last one. 
         * That way it will stop when it gets to the last child
         */
        if (count < logoText.children.length) {
            logoText.children[count].classList.add('animation')
            count += 1
        } 
        else {
            clearInterval(animationInterval)
        }
    }, 30)
})

logoText.addEventListener('mouseleave', () => {
    let count = 0
    const animationInterval = setInterval(() => {
        /*
            Same thing here, but it removes the animation so the letters come back down
        */
        if (count < logoText.children.length) {
            logoText.children[count].classList.remove('animation')
            count += 1
        } 
        else {
            clearInterval(animationInterval)
        }
    }, 30)
})
// ********** Logo animation ********** //


// ********** Switches the color scheme mode of the page ********** //
// Selects the switch button and adds the click listener
const switchColorSchemeToggle = document.querySelector('#switchColorScheme')
switchColorSchemeToggle.addEventListener('click', () => {
    /**
     * Toggles the dark-scheme class to the body so other elements can switch the color scheme
     */
    document.body.classList.toggle('dark-scheme')
    switchColorSchemeToggle.classList.toggle('active')
    // Changes the button title
    if (switchColorSchemeToggle.classList.contains('active')) {
        switchColorSchemeToggle.title = 'Presione para desactivar el modo oscuro'
    }
    else {
        switchColorSchemeToggle.title = 'Presione para activar el modo oscuro'
    }
})
// ********** Switches the color scheme mode of the page ********** //


// ********** Scroll reveal on elements ********** //

const revealElements = () => {
    const elements = document.querySelectorAll('.reveal')
    for (let i = 0; i < elements.length; i++) {
        let windowHeight = window.innerHeight
        let revealTop = elements[i].getBoundingClientRect().top
        let revealPoint = 50

        if (revealTop < windowHeight - revealPoint) {
            elements[i].classList.add('active')
        }
        else {
            elements[i].classList.remove('active')
        }
    }
}

window.addEventListener('scroll', revealElements)


/// ********** Scroll reveal on elements ********** //

// ********** Display skill list on each category ********** //
// Gets the list so they can be displayed
const skillListCategory1 = document.querySelector('.list1')
const skillListCategory2 = document.querySelector('.list2')
const skillListCategory3 = document.querySelector('.list3')
const skillListCategory4 = document.querySelector('.list4')

// Gets the buttons that will display the lists
const skillListDisplayButton1 = document.querySelector('.btn1')
const skillListDisplayButton2 = document.querySelector('.btn2')
const skillListDisplayButton3 = document.querySelector('.btn3')
const skillListDisplayButton4 = document.querySelector('.btn4')

// Adding the click events for each button to display their list
/**
 * Toggle() method is used to add/remove something whenever the click is detected.
 * In this case it is after the classList so it add/removes a CSS class.
 */
skillListDisplayButton1.addEventListener('click', () => {
    skillListCategory1.classList.toggle('active')
    skillListDisplayButton1.classList.toggle('toggled')
})
skillListDisplayButton2.addEventListener('click', () => {
    skillListCategory2.classList.toggle('active')
    skillListDisplayButton2.classList.toggle('toggled')
})
skillListDisplayButton3.addEventListener('click', () => {
    skillListCategory3.classList.toggle('active')
    skillListDisplayButton3.classList.toggle('toggled')
})
skillListDisplayButton4.addEventListener('click', () => {
    skillListCategory4.classList.toggle('active')
    skillListDisplayButton4.classList.toggle('toggled')
})
// ********** Display skill list on each category ********** //


// ********** Carousel animation ********** //
// Gets the carousel itself
const row = document.querySelector(".carousel")
// Selects all the elements with the .slide class
const slide = document.querySelectorAll(".slide")

// Gets the buttons to slide sideways
const leftRow = document.getElementById("left-row")
const rightRow = document.getElementById("right-row")


// ********** Click events for sliding both sides ********** //

/**
 * Sliding right
 */
rightRow.addEventListener("click", () => {
    // Scrolls the carousel to the right 100%
    row.scrollLeft += row.offsetWidth
    // Selects the slide indicator
    const activeIndicator = document.querySelector(".indicators .active")
    // Moves the indicator to the next one
    if (activeIndicator.nextSibling) {
        activeIndicator.nextSibling.classList.add("active")
        activeIndicator.nextSibling.style.height = '15px'
        activeIndicator.classList.remove("active")
        activeIndicator.style.height = '10px'
    }
})
/**
 * Sliding left
 */
leftRow.addEventListener("click", () => {
    // Scrolls the carousel to the left 100%
    row.scrollLeft -= row.offsetWidth
    // Selects the slide indicator
    const activeIndicator = document.querySelector(".indicators .active")
    // Moves the indicator to the previous one
    if (activeIndicator.previousSibling) {
        activeIndicator.previousSibling.classList.add("active")
        activeIndicator.previousSibling.style.height = '15px'
        activeIndicator.classList.remove("active")
        activeIndicator.style.height = '10px'
    }
});
// ********** Click events for sliding both sides ********** //

// Calculates the amount of slides using the length (child quantity) of the slider
const pagesNumber = Math.ceil(slide.length) // Rounds it just in case 

// Adding the correct amount of indicators
for (let i = 0; i < pagesNumber; i++) {
    // Creates an indicator according to the pages
    const indicator = document.createElement("button")

    // Adds the styles to the active indicator
    if (i === 0) {
        indicator.classList.add("active")
        indicator.style.height = '15px'
    }

    // Adds the indicators as childs of the element
    /**
     * With createElement("button"), they were just created but not added up
     */
    document.querySelector(".indicators").appendChild(indicator)
    
    // Event for scrolling the slider with the indicator
    indicator.addEventListener("click", (e) => {
        row.scrollLeft = i * row.offsetWidth
        // Removes the style to the previous active indicator
        const active = document.querySelector(".indicators .active")
        active.classList.remove("active")
        active.style.height = '10px'
        // Adds the style to the actual active indicator
        e.target.classList.add("active")
        e.target.style.height = '15px'
    })
}
// ********** Carousel animation ********** //


// ********** Copy-to-clipboard ********** //

// Gets all the copy buttons
const copyToClipboardButton1 = document.querySelector('.copy-to-clipboard1')
const copyToClipboardButton2 = document.querySelector('.copy-to-clipboard2')
const copyToClipboardButton3 = document.querySelector('.copy-to-clipboard3')
// Gets all the information that could be copied
const copyInfoElement1 = document.querySelector('.copyInfo1')
const copyInfoElement2 = document.querySelector('.copyInfo2')
const copyInfoElement3 = document.querySelector('.copyInfo3')

copyToClipboardButton1.addEventListener('click', () => {
    copyInfoElement1.select()
    document.execCommand('copy')

    document.querySelector('.copiedInfoStatus1').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.copiedInfoStatus1').style.display = 'none'
    }, 1500);
})
copyToClipboardButton2.addEventListener('click', () => {
    copyInfoElement2.select()
    document.execCommand('copy')
    
    document.querySelector('.copiedInfoStatus2').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.copiedInfoStatus2').style.display = 'none'
    }, 1500);
})
copyToClipboardButton3.addEventListener('click', () => {
    copyInfoElement3.select()
    document.execCommand('copy')
    
    document.querySelector('.copiedInfoStatus3').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.copiedInfoStatus3').style.display = 'none'
    }, 1500);
})

// ********** Copy-to-clipboard ********** //