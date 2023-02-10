# OpenAI API Requests Templates using Fetch

```javascript
// 1. Set up your API Key and Organization ID:
// Set up your API Key and Organization ID
const apiKey = 'Your API Key';
const organizationId = 'Your Organization ID';

// 2. Fetch the GPT Chat API:
// Fetch the GPT Chat API
const gptChatApiUrl = 'https://api.gpt.chat/v1/';
fetch(gptChatApiUrl, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'organizationId': organizationId
  },
}).then(response => response.json())
  .then(data => {
     console.log(data);
  }).catch(error => console.log(error));

// 3. Fetch the GPT Chat Conversation API:
// Fetch the GPT Chat Conversation API
const gptChatConversationApiUrl = 'https://api.gpt.chat/v1/conversations';
fetch(gptChatConversationApiUrl, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'organizationId': organizationId
  },
}).then(response => response.json())
  .then(data => {
     console.log(data);
  }).catch(error => console.log(error));

// 4. Fetch the GPT Chat Message API:
// Fetch the GPT Chat Message API
const gptChatMessageApiUrl = 'https://api.gpt.chat/v1/messages';
fetch(gptChatMessageApiUrl, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'organizationId': organizationId
  },
}).then(response => response.json())
  .then(data => {
     console.log(data);
  }).catch(error => console.log(error));

// 5. Fetch the GPT Chat User API:
// Fetch the GPT Chat User API
const gptChatUserApiUrl = 'https://api.gpt.chat/v1/users';
fetch(gptChatUserApiUrl, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'organizationId': organizationId
  },
}).then(response => response.json())
  .then(data => {
     console.log(data);
  }).catch(error => console.log(error));

// 6. quick QA
fetch("https://api.openai.com/v1/completions?organization_id=<ORGANIZATION_ID>", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'organizationId': organizationId
        
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Where is the Valley of Kings?\nA:",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"]
    })
});

// 7. Create a Stripe token using the users credit card
fetch("https://api.openai.com/v1/completions?organization_id=<ORGANIZATION_ID>", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'organizationId': organizationId
    },
    body: JSON.stringify({
        model: "code-davinci-002",
        prompt: "\"\"\"\nUtil exposes the following:\n\nutil.stripe() -> authenticates & returns the stripe module; usable as stripe.Charge.create etc\n\"\"\"\nimport util\n\"\"\"\nCreate a Stripe token using the users credit card: 5555-4444-3333-2222, expiration date 12 / 28, cvc 521\n\"\"\"",
        temperature: 0,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""]
    })
});

3.
fetch("https://api.openai.com/v1/completions?organization_id=<ORGANIZATION_ID>", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'organizationId': organizationId
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "def foo(n, k):\naccum = 0\nfor i in range(n):\n    for l in range(k):\n        accum += i\nreturn accum\n\"\"\"\nThe time complexity of this function is",
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"]
    })
});

```

