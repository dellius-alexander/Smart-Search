import { Component } from "react";
import parse from "html-react-parser";

class OpenAI extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Send a request to OpenAI API endpoints
   * @param {{prompt: null, layman: false}} options
   * @returns  {ReturnType<typeof domToReact>} JSX element(s), empty array, or string.
   */
  async sendRequest(options = {}) {
    /**
     * Get the contents of the options variable
     */
    let { prompt, layman } = options;
    try {
      if (prompt) {
        console.log("Attempting to send request......");
        return await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: `{"prompt":"${prompt}","instructions":["Talk to me like a 6 year old":"${layman}","Send response inside embedded div tag, do not include html tag in response."]}`,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: false,
            model: "text-davinci-003",
            logprobs: null,
          }),
        })
          .then( (response) => response.json())
          .then( (rawData) => {
            const data = rawData.choices[0].text;
            return parse(data);
          })
          .catch(console.dir);
      }

    } catch (error) {
      this.error= true;
      this.errorMessage= error.message;
      this.loading= false;
    }
  }
}

export {OpenAI};

