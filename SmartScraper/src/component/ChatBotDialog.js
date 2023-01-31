import { Component, useState } from "react";
import { Responsive } from "./Responsive";
import { AIFactory } from "./AIFactory/AIFactory";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../static/scss/form.scss";

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
      layman: "",
      currentResponse: "",
      responses: [],
      responseCount: 0,
      checkboxStatus: false,
      mediaQuery: new Responsive(this)
    };
    /* state functions */
    this.setState = this.setState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkboxStatus = this.checkboxStatus.bind(this);
    this.checkResponseModal = this.checkResponseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponseSelection = this.handleResponseSelection.bind(this);
    this.render = this.render.bind(this);
    this.resetForm = this.resetForm.bind(this);
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

  handleInputChange(event) {
    this.setState({
      prompt: event.target.value,
      loading: false
    });
    this.resizeTextarea(event);
  }

  checkboxStatus(event) {
    const checkboxStatus = event.target.checked;
    if (checkboxStatus) {
      console.log("Checkbox is checked");
      this.setState({
        checkboxStatus: checkboxStatus,
        layman: "Talk to me like i'm a six year old,",
      });
    } else {
      this.setState({
        checkboxStatus: checkboxStatus,
        layman: "Tell me in great detail,",
      });
    }
  }

  checkResponseModal(event) {
    const { responseCount } = this.state;
    if (event.target.style.display === "none" && responseCount === 0) {
      this.setState({
        displayResponseModal: "none",
      });
    } else {
      this.setState({
        displayResponseModal: "block",
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    
    const { prompt, layman } = this.state;

    try {
      if (prompt) {
        const openai = AIFactory.create("openai");
        const data = await openai.sendRequest({prompt, layman});
        
        // const rawData = response.choices[0].text;
        // const data = parse(rawData);
        this.setState((prevState) => {
          if (prevState.responseCount <= 0) {
            return {
              error: false,
              errorMessage: "",
              prompts: [...prevState.prompts, prompt],
              responses: [...prevState.responses, data],
              currentResponse: data,
              responseCount: prevState.responseCount + 1,
              loading: false,
              displayResponseModal: "block",
              responseInput: prompt,
            };
          } else {
            return {
              error: false,
              errorMessage: "",
              prompts: [...prevState.prompts, prompt],
              responses: [...prevState.responses, data],
              currentResponse: data,
              responseCount: prevState.responseCount + 1,
              loading: false,
              displayResponseModal: "block",
              responseInput: prompt,
              index: prevState.index + 1,
            };
          }
        });
      }
      this.setState({ loading: false});
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
      prompt: ""
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
        <div className="chat-container" onLoadStart={() => mediaQuery.init()}>
          <header className="chat-header">
            <h1 className="chat-gpt-title">Smart Scraper</h1>
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
                  placeholder="Ask Smart Scraper..."
                  value={prompt}
                  onChange={this.handleInputChange}
                  disabled={loading}
                  style={{
                    minWidth: "80%",
                    maxWidth: "100%",
                    padding: "5px",
                    fontSize: "1.15rem",
                    marginBottom: "10px",
                    borderRadius: "15px",
                  }}
                ></Form.Control>
              </FloatingLabel>
              <Button
                variant="primary"
                type="reset"
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.25rem",
                  backgroundColor: "#10b5ad",
                  color: "#fff",
                  border: "khaki",
                  cursor: "pointer",
                  borderRadius: "15px",
                  marginRight: "20px"
                }}
                onClick={this.resetForm}
                disabled={false}
              >
                  Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.25rem",
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
                  aria-hidden="true"
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
            onLoadStart={this.checkResponseModal}
            style={{
              display: `${displayResponseModal}`,
            }}
            key={index}
          >
            <Modal.Dialog>
              <Modal.Footer>
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
                style={{
                  display: "block",
                  textAlign: "left",
                }}
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

export { ChatBotDialog };
