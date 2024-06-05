// dashboardSelectors.js
export const selectors = {
    login: {
      emailInput: 'input[type="email"]',
      passwordInput: 'input[type="password"]',
      submitButton: 'button[type="submit"]'
    },
    dashboard: {
      tasksTable: '.task', // Adjust based on your actual classes
      firstTaskDeleteButton: '.tasks:first .btn-delete'
    },
    confirmation: {
      deleteTaskModal: 'Delete Task',
      confirmDeleteButton: 'button:contains("Ok")'
    }
  };
  