document.addEventListener("DOMContentLoaded", function () {
    // Get all 'View' buttons and modal elements
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('partnerModal');
    const closeModal = document.querySelector('.close');
    
    // Partner details elements in the modal
    const partnerLogo = document.getElementById('partnerLogo');
    const partnerName = document.getElementById('partnerName');
    const partnerAddress = document.getElementById('partnerAddress');
    const partnerEmail = document.getElementById('partnerEmail');
    const partnerPhone = document.getElementById('partnerPhone');
    const partnerStatus = document.getElementById('partnerStatus');

    // Function to open modal and display partner details
    function openModal(partnerData) {
        partnerLogo.src = partnerData.image;
        partnerName.textContent = partnerData.name;
        partnerAddress.textContent = partnerData.location;
        partnerEmail.textContent = partnerData.email;
        partnerPhone.textContent = partnerData.phone;
        partnerStatus.textContent = partnerData.status;

        modal.style.display = 'flex';
    }

    // Close modal functionality
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Attach event listeners to 'View' buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            const partnerData = JSON.parse(this.closest('tr').dataset.partner);
            openModal(partnerData);
        });
    });

    // Close modal when clicking outside of content
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
