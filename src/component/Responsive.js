/**
 * Responsive class to handle dynamic styling of a webpage for different screen sizes
 * @class Responsive
 */
class Responsive {
    /**
     * Creates an instance of Responsive.
     *
     * @memberof Responsive
     */
    constructor() {
        /**
         * Mobile media query
         *
         * @type {MediaQueryList}
         * @memberof Responsive
         */
        this.mqMobile = window.matchMedia("(min-width: 320px) and (max-width: 767px)");
        /**
         * Tablet media query
         *
         * @type {MediaQueryList}
         * @memberof Responsive
         */
        this.mqTablet = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
        /**
         * iPhone media query
         *
         * @type {MediaQueryList}
         * @memberof Responsive
         */
        this.mqIphone = window.matchMedia("(min-width: 992px) and (max-width: 1199px)");
        /**
         * iPad media query
         *
         * @type {MediaQueryList}
         * @memberof Responsive
         */
        this.mqIpad = window.matchMedia("(min-width: 1200px) and (max-width: 1279px)")
        /**
         * Web media query
         *
         * @type {MediaQueryList}
         * @memberof Responsive
         */
        this.mqWeb = window.matchMedia("(min-width: 1280px)");
        this.handleMediaChange = this.handleMediaChange.bind(this);
    }

    getDeviceInfo() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|webOS|Windows Phone|Chrome|Firefox|Safari|Opera|MSIE|Edge)/)[1];
    }

    /**
     * Handles the change in media query match
     *
     * @param {MediaQueryList} mq - The current matching media query
     * @memberof Responsive
     */
    handleMediaChange(mq) {
        if (mq.matches) {
            if (mq === this.mqMobile) {
                // adjust styling and scale for mobile
                document.documentElement.style.setProperty("--root-margin", "0px");
                document.documentElement.style.setProperty("--scale", "0.8");
            } else if (mq === this.mqIphone) {
                // adjust styling and scale for iphone
                document.documentElement.style.setProperty("--root-margin", "0px");
                document.documentElement.style.setProperty("--scale", "0.9");
            } else if (mq === this.mqTablet) {
                // adjust styling and scale for tablet
                document.documentElement.style.setProperty("--scale", "1");
            } else if (mq === this.mqIpad) {
                // adjust styling and scale for ipad
                document.documentElement.style.setProperty("--scale", "1.2");
            } else if (mq === this.mqWeb) {
                // adjust styling for web
                document.documentElement.style.setProperty("--scale", "1");
            }
        }
    }

    /**
     * Scales the element to fit the inner width and height of the parent container.
     * @param {Event} event
     */
    scaleElement(event){
        let element = event.target || event.currentTarget;
        if (window.innerWidth <= element.offsetWidth || window.innerHeight <= element.offsetHeight){
            element.style.transform = "scale(0.90)";
        } else {
            element.style.transform = "scale(0.95)";
        }

    }
    /**
     * Initialize the responsive class by adding event listeners for media queries
     *
     * @memberof Responsive
     */
    init() {
        // Add media change event listeners
        this.mqMobile.addEventListener('load', this.handleMediaChange);
        this.mqTablet.addEventListener('load', this.handleMediaChange);
        this.mqIphone.addEventListener('load', this.handleMediaChange);
        this.mqIpad.addEventListener('load', this.handleMediaChange);
        this.mqWeb.addEventListener('load', this.handleMediaChange);
        this.handleMediaChange(this.mqMobile);
        this.handleMediaChange(this.mqTablet);
        this.handleMediaChange(this.mqIphone);
        this.handleMediaChange(this.mqWeb);
    }
}
// const responsive = new Responsive();
// responsive.init();

export default Responsive;