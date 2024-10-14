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

    if (username === validClientUsername && password === validClientPassword) {
        // Redirect to the client dashboard
        window.location.href = 'pages/dashboard.html';
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


// Handle calender

// Functional Calender

const calendarDays = document.getElementById('calendarDays');
const monthYear = document.getElementById('monthYear');
const eventList = document.getElementById('eventList');

let currentDate = new Date();
let selectedDate = new Date(currentDate);

const events = [
    { date: '2024-09-15', title: 'Team Meeting' },
    { date: '2024-09-20', title: 'Project Deadline' },
    { date: '2024-09-22', title: 'Client Call' }
];

function loadCalendar(year, month) {
    calendarDays.innerHTML = '';
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    monthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

    // Adding empty cells for the days before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date');
        calendarDays.appendChild(emptyCell);
    }

    // Adding day cells
    for (let day = 1; day <= totalDays; day++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');
        dateCell.textContent = day;

        const fullDate = new Date(year, month, day).toISOString().split('T')[0];
        if (fullDate === currentDate.toISOString().split('T')[0]) {
            dateCell.classList.add('current-date');
        }

        dateCell.addEventListener('click', () => {
            selectedDate.setDate(day);
            displayEvents(fullDate);
            highlightActiveDate(dateCell);
        });

        calendarDays.appendChild(dateCell);
    }
}

function displayEvents(date) {
    eventList.innerHTML = '';
    const filteredEvents = events.filter(event => event.date === date);
    filteredEvents.forEach(event => {
        const li = document.createElement('li');
        li.classList.add('event-item');
        li.textContent = `${event.title} - ${new Date(event.date).toLocaleDateString()}`;
        eventList.appendChild(li);
    });
}

function highlightActiveDate(selectedCell) {
    const previousActive = calendarDays.querySelector('.active-date');
    if (previousActive) {
        previousActive.classList.remove('active-date');
    }
    selectedCell.classList.add('active-date');
}

document.getElementById('prevMonth').addEventListener('click', () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    loadCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
});

document.getElementById('nextMonth').addEventListener('click', () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    loadCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
});

// Initial load
loadCalendar(currentDate.getFullYear(), currentDate.getMonth());


