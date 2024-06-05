import { selectors } from './selectors';

describe('Dashboard Tests', () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit('http://localhost:5173');

    // Fill in the login form and submit
    cy.get(selectors.login.emailInput).type('abc123@gmail.com');
    cy.get(selectors.login.passwordInput).type('tester');
    cy.get(selectors.login.submitButton).click();

    // Ensure the URL is correct for the dashboard after login
    cy.url().should('include', 'http://localhost:5173/dashboard');
  });

  it('Verify the tasks table exists', () => {
    cy.wait(1000); // Wait for 1 second for the page to stabilize
    cy.get(selectors.dashboard.tasksTable).should('exist');
  });

  it('Delete the first task found', () => {
    // Intercept the DELETE request
    cy.intercept('DELETE', '/api/tasks/*').as('deleteTask');

    cy.wait(1000); // Wait for potential UI updates
    cy.get(selectors.dashboard.firstTaskDeleteButton).click();
    cy.contains(selectors.confirmation.deleteTaskModal).should('be.visible');
    cy.wait(1000); // Wait for the modal to fully open
    cy.get(selectors.confirmation.confirmDeleteButton).click();

    // Wait for and verify the DELETE request
    cy.wait('@deleteTask').its('response.statusCode').should('eq', 200);
  });
});
