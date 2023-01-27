import { Component } from 'react';
import '../static/css/openai.css';
import LatexParser from './LatexParser';
import parse from 'html-react-parser'
import Responsive from './Responsive';

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
            simplify: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ input: event.target.value });
        this.resizeTextarea(event.target)
    }

    checkForLaTeX(text) {
        const parser = new LatexParser(text);
        return parser.checkSyntax(text);
    }

    resizeTextarea(textarea) {

        if (textarea.style.height < window.innerHeight){
            textarea.style.height = "auto";
            textarea.style.height = (textarea.scrollHeight)+"px";
        }
        // if (textarea.style.width < window.innerWidth){
        //     textarea.style.width = "auto";
        //     textarea.style.width = (textarea.scrollWidth)+"px";
        // }

    }

    simplifyResponse(event = undefined){
        this.state( (prevState) => {
            return {
                simplify: prevState.simplify && "" || event.target.value || "simplify"
            }
        })
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
                        prompt: `"${input + " " + simplify}" && "Respond using html and embedded css styles."`,
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
                }
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
                        <h1 className="chat-gpt-title">Chat with OpenAI</h1>
                    </header>

                    <form
                        onSubmit={this.handleSubmit}
                        onLoad={mediaQuery.scaleElement}
                    >
                        <div
                            className="chat-gpt-input-parent"
                             onLoad={mediaQuery.scaleElement}
                        >
                            <textarea
                                id="chat-gpt-input-textarea"
                                placeholder="Ask GPT-3 anything"
                                className="chat-gpt-input-textarea"
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
                                <input type="checkbox" name="simplify" value={simplify} onChange={this.simplifyResponse} />Talk to me like a six year old.
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
                    <div
                        className="container-fluid"
                        onLoad={mediaQuery.scaleElement}
                    >
                        {responses && responses.map( (response) => { return (
                        <div
                            className="chat-gpt-response"
                            onLoad={mediaQuery.scaleElement}
                        >
                            <div
                                className="chat-gpt-response-text"
                                onLoad={mediaQuery.scaleElement}
                            >
                                {parse(`${response}`)}
                            </div>
                            <br/>
                        </div>
                        )})}
                    </div>

                </div>
            </>
        );

    }

}

export default OpenAI;