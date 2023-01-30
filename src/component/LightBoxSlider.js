import { Component }  from 'react';
import parse from 'html-react-parser';


class LightBoxSlider extends Component {
    /**
     * Response properties
     * @param {Object} responses
     */
    constructor(responses = []) {
        super(responses);
        this.state = {
            index: 0,
            prevBtn: document.querySelector('#prev-btn'),
            nextBtn: document.querySelector('#next-btn'),
            sliderContent: document.querySelector('#slider-content'),
            responses: responses
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.resizeTextarea = this.resizeTextarea.bind(this);
        this.updateSlider = this.updateSlider.bind(this);
    }

    /**
     * Event handler for when the user selects a response
     * @param selectedIndex
     */
    handleSelect(selectedIndex) {

        this.setState({index: selectedIndex});
    }

    updateSlider(event){
        event.preventDefault();
        let {index, prevBtn, nextBtn, sliderContent, responses} = this.state;
        prevBtn.addEventListener('click', function() {
            index--;
            if (index < 0) {
                index = responses.length - 1;
            }
            sliderContent.style.top = -100 * index + '%';
        });

        nextBtn.addEventListener('click', function() {
            index++;
            if (index === responses.length) {
                index = 0;
            }
            sliderContent.style.top = -100 * index + '%';
        });
    }
    /**
     * Resize textarea
     * @param textArea
     */
    // eslint-disable-next-line class-methods-use-this
    resizeTextarea(textArea) {
        const inputText = textArea.value;
        textArea.style.height = 'auto';
        textArea.style.height = (textArea.scrollHeight)+'px';
        // shrink textarea it is empty
        if (inputText.length === 0) {
            textArea.style.height = '50px';
        }
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        let {index, responses} = this.state;

        return (
            <>
                <div
                    className="slider"
                    onClick={this.updateSlider}
                >
                    <div
                        id="slider-content"
                        onSelect={this.handleSelect(index)}
                        className={`activeIndex-${index}`}
                    >
                        {responses && responses.map( (response, i) => {
                            return (
                                <div className="slide" key={i}>
                                    {parse(`<div>${response}</div>`)}
                                </div>
                            );
                        })}
                    </div>
                    <button id="prev-btn">Previous</button>
                    <button id="next-btn">Next</button>
                </div>
            </>
        );
    }
}

export {LightBoxSlider};