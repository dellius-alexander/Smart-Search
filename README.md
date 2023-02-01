# Smart Scraper

This repository is a demo web scraper search engine powered by 
multiple AI engine APIs. Our approach here consist of using an AI 
AIFactory pattern to aggregate all AI APIs within the AIFactory to create 
a selection, pre-processing and post-processing pipeline utilizing the 
power of each APIs to query and validate before delivering the final result.

[GPT-3](https://chat.openai.com) has become the first of many AI models added 
to the factory. Next will be [wolframalpha](https://www.wolframalpha.com) and 
so on.

Our ambition it to build in phases and learn new ways to leverage the power of 
AI within each applicable domain. The use of logic models can 
help solve computation problems, though weak when it comes to natural language. 
A natural language model can help solve problems in the domain of language or linguistics. 
In this way we can extend the capabilities of our Scraper leveraging teh power of AI.

Lastly, we have adopted [Cordova](https://github.com/dellius-alexander/Cordova-React-App.git) 
to help build a multiplatform architecture maintaining `one` code base.