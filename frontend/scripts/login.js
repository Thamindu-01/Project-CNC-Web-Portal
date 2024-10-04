const signInTab = document.getElementById('sign-in-tab');
const signUpTab = document.getElementById('sign-up-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

signInTab.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    signInTab.classList.add('active');
    signUpTab.classList.remove('active');
});

signUpTab.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signInTab.classList.remove('active');
    signUpTab.classList.add('active');
});

// Handle login validation
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    // Example credentials
    const validClientUsername = 'client';
    const validClientPassword = 'password1';

    const validPartnerUsername = 'partner';
    const validPartnerPassword = 'password2';

    const validClient2Username = 'client2';
    const validClient2Password = 'password3';

    // Check credentials and redirect
    if (username === validClientUsername && password === validClientPassword) {
        // Redirect to the client dashboard
        window.location.href = '../pages/dashboard.html';
    } else if (username === validPartnerUsername && password === validPartnerPassword) {
        // Redirect to the partner dashboard
        window.location.href = 'partner.html';
    } else if (username === validClient2Username && password === validClient2Password) {
        // Redirect to the client2 dashboard
        window.location.href = 'client2.html';
    } else {
        alert('Invalid username or password!');
    }
});
