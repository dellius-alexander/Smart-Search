import React, { Component, useState } from "react";
import { Responsive } from "../Display/Responsive.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../../static/css/chat-bot-dialog.css";
import { ClientStrategy } from "../Strategy/ClientStrategy.js";
import parse from "html-react-parser";
import {Context} from "../Strategy/Context.ts";

/**
 * Takes a html element or text, wraps with a div and renders a glow element.
 * @param {Element|string} props
 * @return {JSX.Element}
 * @constructor
 */
const GlowingDiv = (props) => {
  const [isGlowing, setIsGlowing] = useState(false);
  setTimeout(() => {
    setIsGlowing(!isGlowing);
  }, 500);

  return (
    <div
      onLoad={setTimeout}
      className={`d-flex justify-content-center align-items-center ${
        isGlowing ? "glow" : ""
      }`}
      style={{
        maxWidth: "200px",
        backgroundColor: "mediumpurple",
        color: "white",
        borderRadius: "10px",
        margin: "0 auto",
      }}
    >
      <div>{props.props}</div>
    </div>
  );
};

/**
 * Chat Bot UI Dialog class
 * @class {ChatBotDialog}
 * @extends {Component}
 */
class ChatBotDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: "",
      responseInput: "",
      prompts: [],
      index: 0,
      width: 0,
      height: 0,
      errorMessage: "",
      displayResponseModal: "none",
      loading: false,
      layman: false,
      currentResponse: "",
      responses: [],
      responseCount: 0,
      checkboxStatus: false,
      // create a new responsive object used to update the width and height on window/modal resize/change
      // by initializing the responsive object at the top of your modal,
      // also it automates the resizing of the window/modal process using onLoadStart = {mediaQuery.init}.
      mediaQuery: new Responsive(this),
      // create a new client strategy implementation object
      strategy: new ClientStrategy()
    };
    // initialize the mediaQuery object
    this.state.mediaQuery.init();
    /* state functions */
    this.setState = this.setState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkboxStatus = this.checkboxStatus.bind(this);
    this.checkResponseBody = this.checkResponseBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponseSelection = this.handleResponseSelection.bind(this);
    this.render = this.render.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);
    // console.dir(this);
  }
  // eslint-disable-next-line class-methods-use-this
  resizeTextarea(event) {
    const inputText = event.target.value;
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    // shrink textarea it is empty
    if (inputText.length === 0) {
      event.target.style.height = "50px";
    }
  }

  /**
   * Handles user input persistence
   * @param {Event} event
   */
  handleInputChange(event) {
    this.setState({
      prompt: event.target.value,
      loading: false
    });
    this.resizeTextarea(event);
  }

  handleResponseChange(event) {
    this.setState({
      currentResponse: event.target.value
    });
    this.resizeTextarea(event);
  }

  checkboxStatus(event) {
    const checkboxStatus = event.target.checked;
    if (checkboxStatus) {
      this.setState({
        checkboxStatus: checkboxStatus,
        layman: true,
      });
    } else {
      this.setState({
        checkboxStatus: checkboxStatus,
        layman: false,
      });
    }
  }

  /**
   * Checks the response modal, removes it if no response model is found.
   * @param {Event} event
   */
  checkResponseBody(event) {
    const { currentResponse } = this.state;
    const modal_body = document.getElementById("modal-body");
    if (event.target.style.display === "none" && currentResponse.length === 0 && modal_body.innerText.length === 0) {
      this.setState({
        displayResponseModal: "none",
      });
    } else {
      this.setState({
        displayResponseModal: "block",
      });
    }
  }

  /**
   * Handles form submission
   * @param {Event} event
   * @return {Promise<void>}
   */
  async handleSubmit(event) {
    try {
      event.preventDefault();
      // freeze the state of the input textarea while we fulfill the users request
      this.setState((prevState) => {
        return {loading: true, displayResponseModal: "block", responseInput: prevState.prompt, currentResponse: ""};
      });
      // console.log(this.state);
      // get user input prompts and layman options
      const { prompt, layman, strategy } = this.state;

      // check for a prompt
      if (prompt) {

        // get a model context to execute the strategy
        const context: Context = await strategy.createContext("openai");
        console.log(context);
        // execute the strategy using the model context and return the response
        let currentResponse = "";
        currentResponse += await context.execute({prompt, layman}, {element: document.getElementById("modal-body")});

        // for await (const data of context.executeStrategy({prompt, layman}, {element: document.getElementById("modal-body")})){
        //   // update the state with the response
        this.setState((prevState) => {
          if (prevState.responseCount <= 0) {
            return {
              error: false,
              errorMessage: "",
              prompts: [...prevState.prompts, prompt],
              responses: [...prevState.responses,  <>{parse(currentResponse)}</>],
              currentResponse:  <>{parse(currentResponse)}</>,
              responseCount: prevState.responseCount + 1,
              loading: false,
              responseInput: prompt,
            };
          } else {
            return {
              error: false,
              errorMessage: "",
              prompts: [...prevState.prompts, prompt],
              responses: [...prevState.responses, <>{parse(currentResponse)}</>],
              currentResponse: <>{parse(currentResponse)}</>,
              responseCount: prevState.responseCount + 1,
              loading: false,
              responseInput: prompt,

            };
          }
        });
        // }
      }
      // unfreeze and reset the state of the input textarea
      this.setState((prevState) => {
        if (prevState.currentResponse) {
          return {
            loading: false,
            prompt: "",
          };
        } else {
          return {
            loading: false
          };
        }
      });

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
        loading: false,
      });
    }
  }

  handleResponseSelection(event) {
    let { responses, prompts } = this.state;
    if (event.target.value === "Previous") {
      this.setState((state) => {
        let prevIndex = state.index === 0 ? 0 : state.index - 1;
        return {
          index: prevIndex,
          responseInput: prompts[prevIndex],
          currentResponse: responses[prevIndex],
        };
      });
    } else if (event.target.value === "Next") {
      this.setState((state) => {
        let nextIndex =
          state.index === responses.length - 1
            ? responses.length - 1
            : state.index + 1;
        return {
          index: nextIndex,
          responseInput: prompts[nextIndex],
          currentResponse: responses[nextIndex],
        };
      });
    }
  }
  resetForm() {
    this.setState({
      prompt: "",
      loading: false,
    });
  }

  /**************************************************************************/
  render() {
    const {
      prompt,
      index,
      loading,
      layman,
      mediaQuery,
      displayResponseModal,
      currentResponse,
      responseInput,
    } = this.state;

    return (
      <>
        <div className="chat-container" onLoadStart={mediaQuery.init}>
          <header className="chat-header">
            <h1 className="chat-gpt-title">Smart Search</h1>
          </header>
          <Form className="chat-form-body" onSubmit={this.handleSubmit}>
            <Form.Group className="chat-input-group">
              <FloatingLabel
                controlId="floatingTextarea"
                className="mb-3"
                label=""
              >
                <Form.Control
                  as="textarea"
                  placeholder="Greetings! You could ask me anything you want to know. Like,
                  what is the price of tea in Hong Kong? Or like, Question: What is a qubit? Answer: Include website references."
                  value={prompt}
                  onChange={this.handleInputChange}
                  onLoad={this.resizeTextarea}
                  disabled={loading}
                  style={{
                    width: "98%",
                    padding: "10px",
                    fontSize: "1.15rem",
                    marginBottom: "10px",
                    marginTop: "10px",
                    borderRadius: "10px",
                  }}
                ></Form.Control>
              </FloatingLabel>
              <Button
                variant="primary"
                type="reset"
                style={{
                  padding: "5px",
                  fontSize: "1.15rem",
                  backgroundColor: "#10b5ad",
                  color: "#fff",
                  border: "khaki",
                  cursor: "pointer",
                  borderRadius: "15px",
                  marginRight: "20px"
                }}
                onClick={this.resetForm}
                disabled={loading}
              >
                  Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  padding: "5px",
                  fontSize: "1.15rem",
                  backgroundColor: "#00b5ad",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "15px",
                }}
                disabled={loading}
              >
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-disabled={!loading}
                />
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Form.Group>
            <br/>
            <div
              className="checkbox-input"
              style={{
                display: "block",
                margin: "10px auto",
              }}
            >
              <input
                type="checkbox"
                name="layman"
                value={layman}
                onClick={this.checkboxStatus}
                style={{
                  cursor: "pointer",
                }}
              />
                Talk to me like a six year old.
            </div>
            <div
              className="device-info"
              style={{
                display: "block",
                margin: "0 auto",
              }}
            >
              <GlowingDiv
                props={`Device Info: ${mediaQuery.getDeviceInfo()}`}
              ></GlowingDiv>
            </div>
          </Form>
          <div
            id="modal-xl"
            className="response-modal"
            activeindex={index}
            style={{
              display: `${displayResponseModal}`,
            }}
            key={index}
          >
            <Modal.Dialog>
              <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Share|Save</Button>
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
              <hr/>
              <Modal.Header>
                <Modal.Title
                  as="h4"
                  style={{
                    display: "block",
                    textAlign: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {responseInput}
                </Modal.Title>
              </Modal.Header>
              <hr/>
              <Modal.Body
                id="modal-body"
                style={{
                  display: "block",
                  textAlign: "left",
                }}
                onChange={this.handleResponseChange}
              >
                {currentResponse}
              </Modal.Body>
              <hr/>
            </Modal.Dialog>
          </div>
        </div>
      </>
    );
  }
}


export {ChatBotDialog};