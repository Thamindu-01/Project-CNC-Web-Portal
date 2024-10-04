document.addEventListener("DOMContentLoaded", function () {
    // Apply fade-in effect after content loads
    let mainContent = document.querySelector('.main-content');
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 100); // Delay for smooth fade-in

    // Chart.js configuration for Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line', // You can use 'bar', 'line', 'pie', etc.
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 3000, 5000, 2000, 30000],
                backgroundColor: 'rgba(51, 178, 225, 0.2)',
                borderColor: 'rgba(51, 178, 225, 1)',
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart.js configuration for Orders Chart
    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    const ordersChart = new Chart(ordersCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Orders',
                data: [50, 100, 150, 200, 250, 300],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Live Clock
    function updateClock() {
        const clockElement = document.getElementById('liveClock');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const currentTime = `${hours}:${minutes}:${seconds}`;
        clockElement.textContent = currentTime;
    }

    // Update the clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to set the time immediately
});
