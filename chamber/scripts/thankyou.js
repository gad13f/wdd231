document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'organization',
        'timestamp'
    ];

    requiredFields.forEach((fieldId) => {
        const targetSpan = document.getElementById(fieldId);
        if (targetSpan) {
            targetSpan.textContent = params.get(fieldId) || 'Not provided';
        }
    });
});