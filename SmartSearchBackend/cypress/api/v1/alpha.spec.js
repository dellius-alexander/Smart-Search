// require("../../../server/config").config().catch(console.dir);


const urlSearchParams = (prompt) => new URLSearchParams({
    "appid": "96A2G3-Q24J3WVEWY",
    "input": `${prompt}`,
    "includepodid": "Result",
    "format": "plaintext,image,imagemap,sound,wav,cell,mathml", // individual result pods:	"image", "imagemap", "plaintext", "minput", "moutput", "cell", "mathml", "sound", "wav"
    "output": "json",
    "apiPath": "spoken"
})

describe("GET /api/v1/alpha", () => {

    it("Query wolframalpha API", () => {
        cy.request({
            url: `/api/v1/alpha?${urlSearchParams("What is a dog?")}`,
            method: "GET"
        })
        .then((resp) => {
            const text = resp.body;
            cy.log(text);
            expect(/dog/i.test(text)).to.be.true;
        });
    })
})
