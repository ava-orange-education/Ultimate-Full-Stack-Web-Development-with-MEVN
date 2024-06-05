import { 
    emailInput, 
    firstNameInput, 
    lastNameInput, 
    passwordInput, 
    submitButton, 
    profileActions, 
    verifyPasswordInput } from './selectors';
import { v4 as uuidv4 } from 'uuid';

fixture`Sign Up`
  .page`http://localhost:5173/signup`;

test('User can sign up', async t => {

  // Generate a random email address
  const randomEmail = `testuser-${uuidv4()}@gmail.com`;
  
  // Perform sign-in actions
  await t
  .typeText(firstNameInput, 'first')
  .typeText(lastNameInput, 'last')
  .typeText(emailInput, randomEmail)
  .typeText(passwordInput, 'tester')
  .typeText(verifyPasswordInput, 'tester')
  .click(submitButton);

   // Wait for 2 seconds before asserting
   await t.wait(2000);

  // Assert that the user is logged in
  await t.expect(profileActions.exists).ok(); 
});