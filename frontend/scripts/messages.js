document.addEventListener("DOMContentLoaded", function () {
    // Function to show pop-up
    function showPopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.style.display = "flex"; // Make the popup visible
    }

    // Function to close pop-up
    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.style.display = "none"; // Hide the popup
    }

    // Trigger for view message pop-up
    window.viewMessage = function () {
        showPopup('viewMessagePopup');
    };

    // Trigger for reply message pop-up
    window.replyMessage = function () {
        showPopup('replyMessagePopup');
    };

    // Trigger for delete message confirmation
    window.deleteMessage = function () {
        if (confirm("Are you sure you want to delete this message?")) {
            alert("Message deleted!");
            // Add your delete message functionality here
        }
    };

    // Assign the close button functionality to hide the pop-up
    document.querySelectorAll('.close-btn').forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            const popup = this.closest('.popup');
            popup.style.display = "none"; // Hide the closest pop-up
        });
    });
});
