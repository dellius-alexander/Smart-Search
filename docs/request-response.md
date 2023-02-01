# API Requests and Response

---

## OpenAI GPT-3

OpenAI Chat GPT-3 is a natural language processing (NLP) model developed by OpenAI, a research lab based in San Francisco. It is a transformer-based language model that uses deep learning to generate human-like text. GPT-3 has been trained on a massive dataset of over 45TB of text, and is capable of generating human-like text when given a prompt. It has been used to create chatbots, generate news articles, and even write code. GPT-3 is the most advanced natural language processing system to date.

### Request

```javascript
fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${"API-KEY"}`
    },
    body: JSON.stringify({
        prompt: `{"prompt":"${prompt}","instructions":["Talk to me like a 6 year old":"${layman}","Send response inside embedded div tag, do not include html tag in response."]}`,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false,
        model: "text-davinci-003",
        logprobs: null
    })
}).then(response => response.json()).then(rawData => {
    const data = rawData.choices[0].text;
    return (0, html_react_parser__WEBPACK_IMPORTED_MODULE_0__["default"])(data);
}).catch(console.dir);
```

### Response

```json
{
    "id": "cmpl-6eZDuqP9GaeliWjHDqZPKLtEyvZh8",
    "object": "text_completion",
    "created": 1675126538,
    "model": "text-davinci-003",
    "choices": [
        {
            "text": "\n\n<div>Hi there! What do you want to talk about?</div>",
            "index": 0,
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 35,
        "completion_tokens": 19,
        "total_tokens": 54
    }
}
```

---
