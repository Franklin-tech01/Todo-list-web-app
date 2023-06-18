// app.test.js

const { JSDOM } = require('jsdom');

// Mock the DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
global.document = dom.window.document;

// Import the login function to be tested
const { login } = require('./app');

// Test the login function
describe('login', () => {
  beforeEach(() => {
    // Set up the initial DOM state
    document.body.innerHTML = `
      <input type="text" id="username" value="">
      <input type="password" id="password" value="">
    `;
  });

  it('should store the username in local storage and redirect to Todo.html if valid credentials are provided', () => {
    // Set up the input values
    document.getElementById('username').value = 'testuser';
    document.getElementById('password').value = 'testpassword';

    // Spy on the `localStorage.setItem` function
    jest.spyOn(localStorage, 'setItem');

    // Invoke the login function
    login();

    // Check if the username is stored in local storage
    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'testuser');

    // Check if the page is redirected to Todo.html
    expect(window.location.href).toBe('http://localhost/Todo.html');
  });

  it('should show an alert if invalid credentials are provided', () => {
    // Spy on the `alert` function
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Invoke the login function
    login();

    // Check if the alert is shown
    expect(window.alert).toHaveBeenCalledWith('Invalid username or password!');
  });
});
