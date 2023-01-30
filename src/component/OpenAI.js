import { Component } from 'react';
import '../static/css/openai.css';
import { Responsive } from './Responsive';
import {LightBoxSlider} from './LightBoxSlider';

/**
 * OpenAI class used to access OpenAI API completions.
 */
class OpenAI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaQuery: new Responsive(),
            input: '',
            responses: [],
            error: false,
            errorMessage: '',
            loading: false,
            simplify: '',
            sliderItems: [],
            currentSlide: 0,
            totalSlides: 0
        };
        this.setState = this.setState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkboxStatus = this.checkboxStatus.bind(this);
        this.resizeTextarea = this.resizeTextarea.bind(this);
        this.sliderStatus = this.sliderStatus.bind(this);
        this.changeResponse = this.changeResponse.bind(this);
        this.setActiveSlide = this.setActiveSlide.bind(this);
        // this.checkForLaTeX = this.checkForLaTeX.bind(this);
    }

    handleChange(event) {
        this.setState({ input: event.target.value });
        this.resizeTextarea(event.target);
    }

    // eslint-disable-next-line class-methods-use-this
    // checkForLaTeX(text) {
    //     const parser = new LatexParser(text);
    //     return parser.checkSyntax(text);
    // }

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

    checkboxStatus(event){
        const checkboxStatus = event.target.checked;
        if(checkboxStatus){
            console.log('Checkbox is checked');
            this.setState({
                simplify: 'Talk to me like i\'m a six year old,'
            });
        } else {
            this.setState({
                simplify: 'Tell me in great detail,'
            });
        }
    }

    sliderStatus(event){
        event.preventDefault();
        const sliderContainer = document.querySelector('.slider-container');
        const slider = document.querySelector('#slider');
        this.setState({
            sliderItems: document.querySelectorAll('.slider-item'),
            currentSlide: parseInt(slider.dataset.sliderMin),
            totalSlides: parseInt(slider.dataset.sliderMax)

        });

        sliderContainer.addEventListener('click', function(event) {
            const { totalSlides } = this.state;
            let value = parseInt(event.target.dataset.sliderValue);

            if (value >= 0 && value <= totalSlides) {
                this.state.currentSlide = value;
                this.setActiveSlide();
            }
        });


    }

    setActiveSlide() {
        const { sliderItems, currentSlide } = this.state;
        sliderItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    changeResponse(event) {
        // Get the value from the data attribute
        let value = parseInt(event.target.dataset.sliderValue);

        if (value >= 0 && value <= this.totalSlides) {
            this.currentSlide = value;
            this.setActiveSlide();
        }
    }



    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        const { input, simplify } = this.state;

        try {
            const response = await fetch('https://api.openai.com/v1/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        prompt: `<prompt>${input}</prompt><instructions>'${simplify}','Send response inside embedded div and css, do not include html tag in response.']/instructions>`,
                        temperature: 0.9,
                        max_tokens: 256,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                        stream: false,
                        model: 'text-davinci-003',
                        logprobs: null,
                    })
                })
                .then((response) => response.json())
                .then((data) => data);

            const data = response.choices[0].text;
            this.setState((prevState) => {
                return {
                    error: false,
                    errorMessage: '',
                    responses: [...prevState.responses, data],
                    loading: false
                };
            });

        } catch (error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                loading: false
            });
        }
    }


    render() {
        const {input, responses, error, errorMessage, loading, simplify, mediaQuery} = this.state;
        document.addEventListener('resize', mediaQuery.init, false);
        return (
            <>

                <div
                    className="chat-gpt-container"
                    onLoad={mediaQuery.init()}
                >
                    <header className="chat-gpt-header">
                        <h1 className="chat-gpt-title">Smart Scraper</h1>
                    </header>

                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <div
                            className="input-group"
                        >
                            <textarea
                                id="chat-gpt-input-textarea"
                                placeholder="Ask Smart Scraper..."
                                className="form-check-input"
                                disabled={loading}
                                value={input}
                                onChange={this.handleChange}
                                onLoad={mediaQuery.scaleElement}
                            />
                        </div>
                        <br/>
                        <div className="button-container ">
                            <button type="submit" className="chat-gpt-button" disabled={loading} >
                                {loading ? 'Loading...' : 'Submit'}
                            </button>
                            <br/>
                            <p className="checkbox-input">
                                <input type="checkbox" name="simplify" value={simplify} onClick={this.checkboxStatus} />Talk to me like a six year old.
                            </p>
                        </div>
                        <div>
                            <p>Device Info: {mediaQuery.getDeviceInfo()}</p>
                        </div>
                    </form>

                    <div className="error">
                        {error && <p >{errorMessage}</p>}
                    </div>
                    <br/>
                    <div className='lightbox-slider'>
                        {responses &&  (
                            <LightBoxSlider responses={responses} />
                        )}
                    </div>
                </div>
            </>
        );

    }

}

export {OpenAI};