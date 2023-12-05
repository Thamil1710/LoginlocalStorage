const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link'); 
const registerlink = document.querySelector('.register-link'); 
const btnpopup = document.querySelector('.btnlogin-popup'); 
const iconclose = document.querySelector('.icon-close'); 


registerlink.addEventListener('click', ()=>{
  wrapper. classList.add('active');
});

loginlink.addEventListener('click', ()=>{
  wrapper. classList.remove('active');
});

btnpopup.addEventListener('click', ()=>{
  wrapper. classList.add('active-popup');
});

iconclose.addEventListener('click', ()=>{
  wrapper. classList.remove('active-popup');
});


// Function to store user registration data in local storage
function storeUserData(username, email, password) {
  const userData = {
    username: username,
    email: email,
    password: password
  };
  // Store data in local storage
  localStorage.setItem('userData', JSON.stringify(userData));
}

// Function to show a registration successful alert
function showRegistrationAlert() {
  alert('Registration successful! You can now log in.'); // You can customize this alert message
}

// Function to check if the provided email and password match the stored data in local storage
function checkLogin(email, password) {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  if (storedData && storedData.email === email && storedData.password === password) {
    return true; // Login successful
  } else {
    return false; // Login failed
  }
}

// Function to print local storage details in a new tab
function printLocalStorageDetails() {
  const newTab = window.open('', '_blank');
  const storedData = JSON.parse(localStorage.getItem('userData'));

  if (storedData) {
    newTab.document.write('<html><head><title>Local Storage Details</title></head><body>');
    newTab.document.write('<h2>Local Storage Details</h2>');
    newTab.document.write('<pre>' + JSON.stringify(storedData, null, 2) + '</pre>');
    newTab.document.write('<button id="logoutButton">Logout</button>');
    newTab.document.write('</body></html>');

    // Add event listener to the logout button in the new tab
    const logoutButton = newTab.document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', function() {
        // Clear local storage and close the new tab
        localStorage.removeItem('userData');
        newTab.close();
      });
    }
  } else {
    newTab.document.write('<html><head><title>Local Storage Details</title></head><body>');
    newTab.document.write('<p>No data stored in local storage.</p>');
    newTab.document.write('</body></html>');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.querySelector('.register form');
  const loginForm = document.querySelector('.login form');
  const loginButton = document.querySelector('.btn');

  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = this.querySelector('.userName').value;
      const email = this.querySelector('.userEmail').value;
      const password = this.querySelector('.userPassword').value;
      storeUserData(username, email, password);
      showRegistrationAlert(); // Show registration successful alert
      this.reset(); // Reset the form after storing data
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = this.querySelector('.userEmail').value;
      const password = this.querySelector('.userPassword').value;
      const loggedIn = checkLogin(email, password);
      if (loggedIn) {
        printLocalStorageDetails(); // Print local storage details in a new tab
      } else {
        alert('Invalid email or password'); // You can replace this with your desired action
      }
      this.reset(); // Reset the form after login attempt
    });
  }

  if (loginButton) {
    loginButton.addEventListener('click', function() {
      const email = document.querySelector('.userEmail').value;
      const password = document.querySelector('.userPassword').value;
      const loggedIn = checkLogin(email, password);
      if (loggedIn) {

        alert('Login successful!!')
        password=""
        printLocalStorageDetails(); // Print local storage details in a new tab
      } else {
        alert('Invalid email or password'); // You can replace this with your desired action
      }
    });
  }
});
