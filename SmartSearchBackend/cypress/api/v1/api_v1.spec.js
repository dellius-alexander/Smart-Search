describe('Smart Search API baseurl: /api/v1', () => {
  it('Smart Search API', () => {
    cy.request('/api/v1')
        .then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.message).to.eq('Hello From Smart Search API');
        });
  })
})