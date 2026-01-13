
document.addEventListener('DOMContentLoaded', function () {
    const zoomables = document.querySelectorAll('img.zoomable');

    function openLightbox(img) {
        // Vérifie que la source est définie
        if (!img || !img.src) return;

        const overlay = document.createElement('div');
        overlay.className = 'image-lightbox';

        const bigImg = document.createElement('img');
        bigImg.src = img.currentSrc || img.src; // évite les sources bizarres
        bigImg.alt = img.alt || '';

        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);

        function close() {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            document.removeEventListener('keydown', escHandler);
        }

        function escHandler(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                close();
            }
        }

        overlay.addEventListener('click', close);
        document.addEventListener('keydown', escHandler, { passive: true });
    }

    zoomables.forEach(function (img) {
        img.addEventListener('click', function () {
            openLightbox(img);
        });
    });
});
