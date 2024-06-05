import { emailInput, passwordInput, submitButton, profileActions } from './selectors';

fixture`Sign In`
  .page`http://localhost:5173`;

test('User can sign in', async t => {
  // Perform sign-in actions
  await t
    .typeText(emailInput, 'abc123@gmail.com')
    .typeText(passwordInput, 'tester')
    .click(submitButton);

  // Wait for 2 seconds before asserting
  await t.wait(2000);

  // Assert that the user is logged in
  await t.expect(profileActions.exists).ok(); 
});

