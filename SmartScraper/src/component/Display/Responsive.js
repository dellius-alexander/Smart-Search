// import { useState } from "react";
/**
 * Responsive class to handle dynamic styling of a webpage for different screen sizes
 * @class Responsive
 */
class Responsive {
  /**
   * Mobile media query
   *
   * @type {MediaQueryList}
   * @memberof Responsive
   */
  mqMobile = window.matchMedia("(min-width: 320px) and (max-width: 767px)");
  /**
   * Tablet media query
   *
   * @type {MediaQueryList}
   * @memberof Responsive
   */
  mqTablet = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
  /**
   * iPhone media query
   *
   * @type {MediaQueryList}
   * @memberof Responsive
   */
  mqIphone = window.matchMedia("(min-width: 992px) and (max-width: 1199px)");
  /**
   * iPad media query
   *
   * @type {MediaQueryList}
   * @memberof Responsive
   */
  mqIpad = window.matchMedia("(min-width: 1200px) and (max-width: 1279px)");
  /**
   * Web media query
   *
   * @type {MediaQueryList}
   * @memberof Responsive
   */
  mqWeb = window.matchMedia("(min-width: 1280px)");
  /**
   * Creates an instance of Responsive.
   *
   * @memberof Responsive
   */
  constructor(props) {
    this.state = {
      props: props,
      window: window,
      document: window.document
    };

    this.handleMediaChange = this.handleMediaChange.bind(this);
    // console.dir(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getDeviceInfo() {
    return navigator.userAgent.match(
      /(iPhone|iPod|iPad|Android|BlackBerry|webOS|Windows Phone|Chrome|Firefox|Safari|Opera|MSIE|Edge)/
    )[1];
  }

  /**
   * Handles the change in media query match
   *
   * @param {MediaQueryList} mq - The current matching media query
   * @memberof Responsive
   */
  handleMediaChange(mq) {
    let {document} = this.state;
    switch(mq) {
    case this.mqMobile:
      // adjust styling and scale for mobile
      document.documentElement.style.setProperty("--root-margin", "0px");
      document.documentElement.style.setProperty("--scale", "0.8");
      break;
    case this.mqIphone:
      // adjust styling and scale for iphone
      document.documentElement.style.setProperty("--root-margin", "0px");
      document.documentElement.style.setProperty("--scale", "0.9");
      break;
    case this.mqTablet:
      // adjust styling and scale for tablet
      document.documentElement.style.setProperty("--scale", "1");
      break;
    case this.mqIpad:
      // adjust styling and scale for ipad
      document.documentElement.style.setProperty("--scale", "1.2");
      break;
    case this.mqWeb:
      // adjust styling for web
      document.documentElement.style.setProperty("--scale", "1");
      break;
    }
  }

  /**
   * Scales the element to fit the inner width and height of the parent container.
   * @param {Event} event
   */
  // eslint-disable-next-line class-methods-use-this
  scaleElement(event) {
    let {window} = this.state;
    let element = event.target || event.currentTarget;
    if (window.innerWidth <= element.offsetWidth || window.innerHeight <= element.offsetHeight)
    { // scale the element
      element.style.transform = "scale(0.95)";
    } else {
      element.style.transform = "scale(0.99)";
    }
  }
  /**
   * Initialize the responsive class by adding event listeners for media queries
   *
   * @memberof Responsive
   */
  init() {
    // Add media change event listeners
    this.mqMobile.addEventListener(/load|onload/, this.handleMediaChange);
    this.mqTablet.addEventListener(/load|onload/, this.handleMediaChange);
    this.mqIphone.addEventListener(/load|onload/, this.handleMediaChange);
    this.mqIpad.addEventListener(/load|onload/, this.handleMediaChange);
    this.mqWeb.addEventListener(/load|onload/, this.handleMediaChange);
    this.handleMediaChange(this.mqMobile);
    this.handleMediaChange(this.mqTablet);
    this.handleMediaChange(this.mqIphone);
    this.handleMediaChange(this.mqIpad);
    this.handleMediaChange(this.mqWeb);
  }
}

export { Responsive };

// const responsive = new Responsive();
// responsive.init();
