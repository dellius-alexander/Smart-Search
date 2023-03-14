
const prompt = String("What is the weather in Egypt?");

const urlSearchParams = (prompt) => new URLSearchParams({
    "prompt":`${prompt}`,
    "apiPath":"completions"
})

describe("GET /api/v1/openai", () => {

    it("Query OpenAI GPT3 API completion", () => {
        cy.request({
                url: `https://delliusalexander.com:4443/api/v1/openai?${urlSearchParams(prompt)}`,
                method: "GET"
            })
            .then((resp) => {
                const data = resp.body;
                console.dir(data);
                cy.log(data);
                // let result = String("\n");
                // for (const key of data) {
                //     result += data[key].choices[0].text;
                // }
                // console.dir(result);

                // expect(/text_completion/i.test(text)).to.be.true;

            });
    })
})