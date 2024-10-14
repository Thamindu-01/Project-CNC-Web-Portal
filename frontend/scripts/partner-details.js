document.addEventListener("DOMContentLoaded", function () {
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('partnerModal');
    const closeModal = document.querySelectorAll('.close');
    const addNewBtn = document.querySelector('.add-new-btn');
    const newPartnerModal = document.getElementById('newPartnerModal');
    const addPartnerForm = document.getElementById('addPartnerForm');
    
    const partnerLogo = document.getElementById('partnerLogo');
    const partnerName = document.getElementById('partnerName');
    const partnerAddress = document.getElementById('partnerAddress');
    const partnerEmail = document.getElementById('partnerEmail');
    const partnerPhone = document.getElementById('partnerPhone');
    const partnerStatus = document.getElementById('partnerStatus');
    const partnerDescription = document.getElementById('partnerDescription');
    const galleryImage = document.getElementById('galleryImage');
    const menuLink = document.getElementById('menuLink');

    // New Elements for Add Partner Form
    const newPartnerLogoInput = document.getElementById('newPartnerLogo');
    const logoPreview = document.getElementById('logoPreview');
    const newPartnerImagesInput = document.getElementById('newPartnerImages');
    const imagesPreview = document.getElementById('imagesPreview');
    const newPartnerMenuInput = document.getElementById('newPartnerMenu');
    const menuName = document.getElementById('menuName');

    let currentSlideIndex = 0;
    let galleryImages = [];

    function openModal(partnerData) {
        partnerLogo.src = partnerData.image;
        partnerName.textContent = partnerData.name;
        partnerAddress.textContent = partnerData.location;
        partnerEmail.textContent = partnerData.email;
        partnerPhone.textContent = partnerData.phone;
        partnerStatus.textContent = partnerData.status;
        partnerDescription.textContent = partnerData.description;
        menuLink.href = partnerData.menuLink;

        galleryImages = partnerData.gallery; // Load the gallery images
        currentSlideIndex = 0; // Reset to the first image
        showSlide(currentSlideIndex); // Show the first slide
        
        partnerStatus.className = partnerData.status.toLowerCase() === "open" ? "status-indicator open" : "status-indicator closed";

        modal.style.display = 'flex';
    }

    function showSlide(index) {
        if (galleryImages.length > 0) {
            galleryImage.src = galleryImages[index];
        }
    }

    closeModal.forEach(button => {
        button.addEventListener('click', function () {
            modal.style.display = 'none';
            newPartnerModal.style.display = 'none';
            resetAddPartnerForm();
        });
    });

    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            const partnerData = JSON.parse(this.closest('tr').dataset.partner);
            openModal(partnerData);
        });
    });

    document.querySelector('.prev').addEventListener('click', function () {
        currentSlideIndex = (currentSlideIndex === 0) ? galleryImages.length - 1 : currentSlideIndex - 1;
        showSlide(currentSlideIndex);
    });

    document.querySelector('.next').addEventListener('click', function () {
        currentSlideIndex = (currentSlideIndex + 1) % galleryImages.length;
        showSlide(currentSlideIndex);
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal || event.target == newPartnerModal) {
            modal.style.display = 'none';
            newPartnerModal.style.display = 'none';
            resetAddPartnerForm();
        }
    });

    addNewBtn.addEventListener('click', function () {
        newPartnerModal.style.display = 'flex';
    });

    addPartnerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Gather form data
        const name = document.getElementById('newPartnerName').value;
        const description = document.getElementById('newPartnerDescription').value;
        const address = document.getElementById('newPartnerAddress').value;
        const email = document.getElementById('newPartnerEmail').value;
        const phone = document.getElementById('newPartnerPhone').value;
        const status = "Open"; // Default status for new partners

        // Handle logo upload
        const logoFile = newPartnerLogoInput.files[0];
        const logoURL = logoFile ? URL.createObjectURL(logoFile) : '../images/res-logo.jpg';

        // Handle images upload
        const imagesFiles = newPartnerImagesInput.files;
        const imagesURLs = [];
        for (let i = 0; i < imagesFiles.length; i++) {
            imagesURLs.push(URL.createObjectURL(imagesFiles[i]));
        }

        // Handle menu upload
        const menuFile = newPartnerMenuInput.files[0];
        const menuURL = menuFile ? URL.createObjectURL(menuFile) : '#';

        // Create new partner data
        const newPartnerData = {
            name: name,
            location: address,
            email: email,
            phone: phone,
            image: logoURL,
            status: status,
            description: description,
            menuLink: menuURL,
            gallery: imagesURLs
        };

        // Create new table row
        const tableBody = document.querySelector('.partner-list table tbody');
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-partner', JSON.stringify(newPartnerData));
        
        newRow.innerHTML = `
            <td>${name}</td>
            <td class="status-active">Active</td>
            <td>${address}</td>
            <td>${email}</td>
            <td><button class="action-btn view-btn">View</button></td>
        `;

        // Append the new row to the table
        tableBody.appendChild(newRow);

        // Add event listener to the new view button
        newRow.querySelector('.view-btn').addEventListener('click', function () {
            const partnerData = JSON.parse(this.closest('tr').dataset.partner);
            openModal(partnerData);
        });

        // Provide feedback to the user
        alert("Partner added successfully!");

        // Close the modal and reset the form
        newPartnerModal.style.display = 'none';
        resetAddPartnerForm();
    });

    document.querySelector('.discard-btn').addEventListener('click', function () {
        newPartnerModal.style.display = 'none';
        resetAddPartnerForm();
    });

    // Preview for Logo
    newPartnerLogoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            logoPreview.src = URL.createObjectURL(file);
            logoPreview.style.display = 'block';
        } else {
            logoPreview.src = '#';
            logoPreview.style.display = 'none';
        }
    });

    // Preview for Images
    newPartnerImagesInput.addEventListener('change', function () {
        imagesPreview.innerHTML = '';
        const files = this.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(files[i]);
                imagesPreview.appendChild(img);
            }
        }
    });

    // Display Menu File Name
    newPartnerMenuInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            menuName.textContent = `Selected Menu: ${file.name}`;
            menuName.style.display = 'block';
        } else {
            menuName.textContent = '';
            menuName.style.display = 'none';
        }
    });

    function resetAddPartnerForm() {
        addPartnerForm.reset();
        logoPreview.src = '#';
        logoPreview.style.display = 'none';
        imagesPreview.innerHTML = '';
        menuName.textContent = '';
        menuName.style.display = 'none';
    }
});
