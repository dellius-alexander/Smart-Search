/* This is Android merges/android/static/js/platform.js */

// apply platform specific rules
function platformConstants() {
    // platform specific rules
    return `<h2 >Cordova React Android Application</h2>`;
}

document.addEventListener("deviceready", () => {
    const element = document.createElement('div');
    element.style = 'text-align:center;';
    element.innerHTML = platformConstants();
    document.body.append(element);
},
    false);
