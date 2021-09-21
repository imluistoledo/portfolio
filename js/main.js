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

// ********** Display skill list on each category ********** // NEW
// Gets the common container between all the lists and their display buttons
// The event listener is applied to the whole container, so it needs to be verified
const displaySkillList = document.getElementById('section-info-events')
displaySkillList.addEventListener('click', (e) => {
    // In order to verify which elements needs the actions, it validates:
    /**
     * 1. If there is a target
     * 2. If the target is an <i> tag
     * 3. And if the <i> tag is an arrow down icon
     */
    if (e.target && e.target.tagName === 'I' && e.target.classList.contains('fa-chevron-down')) {
        // It should toggle all the arrow down icons so that does not need validation
        // It will only toggle the selected one
        e.target.classList.toggle('toggled')

        // The validation is for the selected icon
        // That way it will toggle-display the list which the icon is in
        if (e.target.classList.contains('btn1')) {
            document.querySelector('.list1').classList.toggle('active')
        }
        else if (e.target.classList.contains('btn2')) {
            document.querySelector('.list2').classList.toggle('active')
        }
        else if (e.target.classList.contains('btn3')) {
            document.querySelector('.list3').classList.toggle('active')
        }
        else if (e.target.classList.contains('btn4')) {
            document.querySelector('.list4').classList.toggle('active')
        }
    }
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


// ********** Copy-to-clipboard ********** // NEW
// Adds the copied message to the element passed
const showCopiedInfoStatus = (element) => {
    document.querySelector(element).style.display = 'block'
    setTimeout(() => {
        document.querySelector(element).style.display = 'none'
    }, 1500);
}

// Allows using only one event listener for all the three inputs
// instead of one for each input
const contactMe = document.getElementById('contact-me-events')
contactMe.addEventListener('click', (e) => {
    // It validates the identification of the clicked button by:
    /**
     * 1. Verifying there is a target.
     * 2. Avoiding elements which their tag name is not an 'i' (<i></i>).
     * 3. Checking if the target is a clipboard icon
    */
    if (e.target && e.target.tagName === 'I' && e.target.classList.contains('fa-clipboard')) {
        if (e.target.classList.contains('copy-to-clipboard1')) {
            document.querySelector('.copyInfo1').select()
            document.execCommand('copy')
            showCopiedInfoStatus('.copiedInfoStatus1')
        }
        else if (e.target.classList.contains('copy-to-clipboard2')) {
            document.querySelector('.copyInfo2').select()
            document.execCommand('copy')
            showCopiedInfoStatus('.copiedInfoStatus2')
        }
        else if (e.target.classList.contains('copy-to-clipboard3')) {
            document.querySelector('.copyInfo3').select()
            document.execCommand('copy')
            showCopiedInfoStatus('.copiedInfoStatus3')
        }
    }
})
// ********** Copy-to-clipboard ********** //
