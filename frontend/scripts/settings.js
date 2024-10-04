document.addEventListener("DOMContentLoaded", function () {
    // Function to update profile picture preview
    const profilePictureInput = document.getElementById('profile-picture');
    const profilePicturePreview = document.getElementById('profile-picture-preview');

    if (profilePictureInput) {
        profilePictureInput.addEventListener('change', function (event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePicturePreview.src = e.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    }
});
