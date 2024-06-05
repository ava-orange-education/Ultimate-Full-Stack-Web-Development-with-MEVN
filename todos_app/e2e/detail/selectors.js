// selectors.ts
export const selectors = {
    loginPage: {
      emailInput: 'input[type="email"]',
      passwordInput: 'input[type="password"]',
      submitButton: 'button[type="submit"]'
    },
    dashboardPage: {
      firstTask: '.task:first-child',
      detailsSection: '.details-section'
    },
    taskDetails: {
      id: '.detail-item:has(span.detail-label:has-text("Id:"))',
      task: '.detail-item:has(span.detail-label:has-text("Task:"))',
      description: '.detail-item:has(span.detail-label:has-text("Description:"))',
      status: '.detail-item:has(span.detail-label:has-text("Status:"))',
      assignee: '.detail-item:has(span.detail-label:has-text("Assignee:"))',
      createdBy: '.detail-item:has(span.detail-label:has-text("Created By:"))',
      createdDate: '.detail-item:has(span.detail-label:has-text("Created Date:"))'
    }
  };  