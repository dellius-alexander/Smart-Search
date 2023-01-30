/* This is browser merges/browser/static/js/platform.js */

/**
 * This is the default platform.js
 */
// apply platform specific rules
function platformConstants() {
    // platform specific rules
    return '<h3 >Thank you for choosing Smart Scraper on the Web!</h3>';
}

document.addEventListener('deviceready', () => {
    const element = document.createElement('div');
    element.style = 'text-align:center;';
    element.innerHTML = platformConstants();
    document.body.append(element);
},
false);




