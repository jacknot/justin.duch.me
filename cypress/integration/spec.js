describe('Blog', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('navigates to /about', () => {
		cy.get('nav a').contains('about').click();
		cy.url().should('include', '/about');
	});

	it('navigates to /contact', () => {
		cy.get('nav a').contains('contact').click();
		cy.url().should('include', '/contact');
	});
});
