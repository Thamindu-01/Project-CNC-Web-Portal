document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const calendar = document.getElementById('interactive-calendar');
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function renderCalendar(month, year) {
        calendar.innerHTML = `
            <div id="calendar-header">
                <button id="prev-month">❮</button>
                <h3>${months[month]} ${year}</h3>
                <button id="next-month">❯</button>
            </div>
            <div id="days">
                <div class="day">Sun</div>
                <div class="day">Mon</div>
                <div class="day">Tue</div>
                <div class="day">Wed</div>
                <div class="day">Thu</div>
                <div class="day">Fri</div>
                <div class="day">Sat</div>
            </div>
        `;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysGrid = calendar.querySelector('#days');

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day');
            daysGrid.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayDiv.classList.add('current-day'); // Highlight today
            }

            // Show event icon
            if (hasEvent(day, month, year)) {
                const eventIcon = document.createElement('i');
                eventIcon.classList.add('fas', 'fa-calendar-alt', 'event-icon');
                dayDiv.appendChild(eventIcon);
            }

            daysGrid.appendChild(dayDiv);
        }

        document.getElementById('prev-month').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById('next-month').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById('go-to-today').addEventListener('click', () => {
            currentMonth = currentDate.getMonth();
            currentYear = currentDate.getFullYear();
            renderCalendar(currentMonth, currentYear);
        });
    }

    function hasEvent(day, month, year) {
        return day === 15 && month === currentDate.getMonth(); // Example event
    }

    renderCalendar(currentMonth, currentYear);
    renderUpcomingEvents();
});

function renderUpcomingEvents() {
    const events = [
        { date: "15th October", time: "2:00 PM", restaurant: "La Fiesta" },
        { date: "20th October", time: "5:00 PM", restaurant: "The Golden Spoon" },
    ];

    const eventsList = document.getElementById('events-list');
    events.forEach(event => {
        const eventItem = document.createElement('li');
        eventItem.innerHTML = `
            <strong>Date:</strong> ${event.date}<br>
            <strong>Time:</strong> ${event.time}<br>
            <strong>Restaurant:</strong> ${event.restaurant}
        `;
        eventsList.appendChild(eventItem);
    });
}
