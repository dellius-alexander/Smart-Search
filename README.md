# Smart Scraper

This repository is a demo web scraper search engine powered by 
multiple AI engine APIs. Our approach here consist of using an AI 
Strategy pattern to aggregate all AI APIs within the Strategy to create 
a selection, pre-processing and post-processing pipeline utilizing the 
power of each APIs to query and validate before delivering the final result.

[GPT-3](https://chat.openai.com) has become the first of many AI models added 
to the factory. Next will be [wolframalpha](https://www.wolframalpha.com) and 
so on.

Our ambition it to build in phases and learn new ways to leverage the power of 
AI within each applicable domain. The use of logic models can 
help solve computation problems, though weak when it comes to natural language. 
A natural language model can help solve problems in the domain of language or linguistics. 
In this way we can extend the capabilities of our Scraper leveraging the power of AI.

Lastly, we have adopted [Cordova](https://github.com/dellius-alexander/Cordova-React-App.git) 
to help build a multiplatform architecture maintaining `one` code base.

---

##  Selecting a Design Pattern

Several design pattern would fulfill the initial use case of building a simple AI pipeline, 
but would fail to quickly adapt to changing business needs and market trends. Due to the behavior 
of trends and market shifts to different emerging technologies we chose 
to use `Strategy Behavior Pattern`. A pattern most suited for this use case. We can define 
a family of algorithms and models, as well as make them interchangeable. Figure 1 is the initial 
implementation of the Strategy Behavior Pattern. We will be adding and updating as an 
ongoing process.

---

[![AI Strategy Behavior Pattern](./docs/images/ai-clientstrategy-pattern.png)](./docs/images/ai-clientstrategy-pattern.png)

Figure 1:`Initial Implementation Strategy`

---

---
