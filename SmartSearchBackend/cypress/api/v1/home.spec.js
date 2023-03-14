describe('Smart Search API The Home Page: /', () => {
    it('successfully loads', () => {

        cy.request('/')
        .then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body.message).to.eq('Hello From Smart Search API');
        });
    })
})