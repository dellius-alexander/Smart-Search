import { Component, useState } from 'react';
import { Responsive } from './Responsive';
import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import '../static/scss/form.scss';


class ChatBotDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            responseInput: '',
            inputs: [],
            index: 0,
            width: 0,
            height: 0,
            errorMessage: '',
            displayResponseModal: 'none',
            loading: false,
            layman: '',
            currentResponse: '',
            responses: [],
            responseCount: 0,
            checkboxStatus: false,
            mediaQuery: new Responsive(this)

        };
        this.setState = this.setState.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkboxStatus = this.checkboxStatus.bind(this);
        this.checkResponseModal = this.checkResponseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponseSelection = this.handleResponseSelection.bind(this);
        this.render = this.render.bind(this);
    }
    // eslint-disable-next-line class-methods-use-this
    resizeTextarea(event) {
        const inputText = event.target.value;
        event.target.style.height = 'auto';
        event.target.style.height = (event.target.scrollHeight)+'px';
        // shrink textarea it is empty
        if (inputText.length === 0) {
            event.target.style.height = '50px';
        }
    }

    handleInputChange(event) {
        this.setState({
            input: event.target.value
        });
        this.resizeTextarea(event);
    }

    checkboxStatus(event){
        const checkboxStatus = event.target.checked;
        if(checkboxStatus){
            console.log('Checkbox is checked');
            this.setState({
                checkboxStatus: checkboxStatus,
                layman: 'Talk to me like i\'m a six year old,'
            });
        } else {
            this.setState({
                checkboxStatus: checkboxStatus,
                layman: 'Tell me in great detail,'
            });
        }
    }

    checkResponseModal(event) {
        const { responseCount } = this.state;
        if (event.target.style.display === 'none' && responseCount === 0) {
            this.setState({
                displayResponseModal: 'none'
            });
        } else {
            this.setState({
                displayResponseModal: 'block'
            });
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        const { input, layman} = this.state;
        try {
            if (input) {
                const response = await fetch('https://api.openai.com/v1/completions',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                        },
                        body: JSON.stringify({
                            prompt: `<prompt>${input}</prompt><instructions>'${layman}','Send response inside embedded div tag, do not include html tag in response.']</instructions>`,
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
                    if (prevState.responseCount <= 0){
                        return {
                            error: false,
                            errorMessage: '',
                            inputs: [...prevState.inputs, input],
                            responses: [...prevState.responses, parse(data)],
                            currentResponse: parse(data),
                            responseCount: prevState.responseCount + 1,
                            loading: false,
                            displayResponseModal: 'block',
                            responseInput: input
                        };
                    } else {
                        return {
                            error: false,
                            errorMessage: '',
                            inputs: [...prevState.inputs, input],
                            responses: [...prevState.responses, parse(data)],
                            currentResponse: parse(data),
                            responseCount: prevState.responseCount + 1,
                            loading: false,
                            displayResponseModal: 'block',
                            index: prevState.index + 1,
                            responseInput: input
                        };
                    }

                });
            }

        } catch (error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                loading: false
            });
        }
    }

    handleResponseSelection(event){
        let { responses, inputs } = this.state;
        if (event.target.value === 'Previous') {
            
            this.setState((state) => {
                let prevIndex = state.index === 0 ? 0 : state.index - 1;
                return {
                    index: prevIndex,
                    responseInput: inputs[prevIndex],
                    currentResponse: responses[prevIndex]
                };
            });
        } else if (event.target.value === 'Next') {
            this.setState((state) => {
                let nextIndex = state.index === responses.length - 1 ? responses.length - 1 : state.index + 1;
                return {
                    index: nextIndex,
                    responseInput: inputs[nextIndex],
                    currentResponse: responses[nextIndex]
                };
            });
        }
    }
    /**************************************************************************/
    render() {
        let { input, index, loading, layman, mediaQuery, displayResponseModal, currentResponse, responseInput } = this.state;

        return (

            <>
                <div
                    className="chat-container"
                    onLoadStart={() => mediaQuery.init()}
                >
                    <header
                        className="chat-header"
                    >
                        <h1 className="chat-gpt-title">Smart Scraper</h1>
                    </header>
                    <Form
                        className="chat-form-body"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group
                            className="chat-input-group"
                        >
                            <FloatingLabel
                                controlId="floatingTextarea"
                                className="mb-3"
                                label=""
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ask Smart Scraper..."
                                    value={input}
                                    onChange={this.handleInputChange}
                                    disabled={loading}
                                    style={{
                                        minWidth: '80%',
                                        maxWidth: '100%',
                                        padding: '5px',
                                        fontSize: '1.15rem',
                                        marginBottom: '10px',
                                        borderRadius: '15px',
                                    }}
                                >

                                </Form.Control>
                            </FloatingLabel>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{
                                    padding: '1rem 2rem',
                                    fontSize: '1.25rem',
                                    backgroundColor: '#00b5ad',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '15px'
                                }}
                                disabled={loading}
                            >
                                <Spinner
                                    as="span"
                                    animation="grow 1s linear infinite"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                        </Form.Group>
                        <br/>
                        <div
                            className="checkbox-input"
                            style={{
                                display: 'block',
                                margin: '10px auto',
                            }}
                        >
                            <input type="checkbox" name="layman" value={layman} onClick={this.checkboxStatus} />Talk to me like a six year old.
                        </div>
                        <div
                            className="device-info"
                            style={{
                                display: 'block',
                                margin: '0 auto',
                            }}
                        >
                            <GlowingDiv
                                props={`Device Info: ${mediaQuery.getDeviceInfo()}`}
                            >
                            </GlowingDiv>
                        </div>

                    </Form>
                    <div
                        id="modal-xl"
                        className="response-modal"
                        activeindex={index}
                        onLoadStart={this.checkResponseModal}
                        style={{
                            display: `${displayResponseModal}`
                        }}
                        key={index}
                    >
                        <Modal.Dialog >
                            <Modal.Header >
                                <Modal.Title
                                    as="h4"
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto',
                                    }}
                                >
                                    {responseInput}
                                </Modal.Title>
                            </Modal.Header>
                            <hr />
                            <Modal.Body
                                style={{
                                    display: 'block',
                                    textAlign: 'left'
                                }}
                            >
                                {currentResponse}
                            </Modal.Body>
                            <hr />
                            <Modal.Footer >
                                <Button variant="secondary">Close</Button>
                                <Button variant="primary">Save changes</Button>
                                <Button
                                    id="prev-btn"
                                    value="Previous"
                                    onClick={this.handleResponseSelection}
                                >
                                    Previous
                                </Button>
                                <Button
                                    id="next-btn"
                                    value="Next"
                                    onClick={this.handleResponseSelection}
                                >
                                    Next
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
            </>
        );
    }
}

const GlowingDiv = (props) => {
    const [isGlowing, setIsGlowing] = useState(false);
    setTimeout(() => {
        setIsGlowing(!isGlowing);
    }, 500);

    return (
        <div
            onLoad={setTimeout}
            className={`d-flex justify-content-center align-items-center ${
                isGlowing ? 'glow' : ''
            }`}
            style={{
                maxWidth: '200px',
                backgroundColor: 'mediumpurple',
                color: 'white',
                borderRadius: '10px',
                margin: '0 auto',
            }}
        >
            <p>{props.props}</p>
        </div>
    );
};





export {ChatBotDialog};