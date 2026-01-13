// Adds a Back button on project pages if not present. Uses ?from=welcome|terminal or history.back()
(function () {
    function createBackButton(target) {
        const btn = document.createElement('button');
        btn.textContent = '← Retour';
        btn.className = 'project-back-btn';
        btn.addEventListener('click', () => {
            if (target === 'index') {
                // project pages live in /projects/, go up one level to root
                window.location.href = '../index.html';
            } else if (target === 'terminal') {
                window.location.href = '../terminal.html#projects';
            } else {
                history.back();
            }
        });
        return btn;
    }

    function init() {
        // only run on project pages inside /projects/ or filenames that match project pages
        const path = (window.location.pathname || '').toLowerCase();
        if (!/\/projects\//i.test(path) && !/project-/i.test(path) && !/reverse_camera_a9\.html/i.test(path)) return;

        // do not duplicate
        if (document.querySelector('.project-back-btn')) return;

        const params = new URLSearchParams(window.location.search);
        const from = params.get('from');
        
        // Whitelist des valeurs acceptées
        const validFrom = ['index', 'terminal'].includes(from) ? from : null;

        const container = document.body.querySelector('header') || document.body;
        const btn = createBackButton(validFrom);

        // prepend to top of page
        container.insertBefore(btn, container.firstChild);

        // Also adjust the existing "Retour au portfolio" anchor if present
        try {
            const backAnchor = document.querySelector('.back-link a');
            if (backAnchor) {
                if (validFrom === 'index') {
                    backAnchor.setAttribute('href', '../index.html');
                } else if (validFrom === 'terminal') {
                    backAnchor.setAttribute('href', '../terminal.html#projects');
                } else {
                    // default to index projects
                    backAnchor.setAttribute('href', '../terminal.html#projects');
                }
            }
        } catch (e) {
            // noop
        }
    }

    // styles
    const style = document.createElement('style');
    style.textContent = `
    .project-back-btn {
      position: fixed;
      top: 18px;
      left: 18px;
      background: rgba(2,6,23,0.85);
      color: var(--color-teal-300);
      border: 1px solid rgba(50,184,198,0.2);
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      z-index: 2000;
      backdrop-filter: blur(6px);
    }
    .project-back-btn:hover { background: var(--color-teal-300); color: #021018; }
  `;
    document.head.appendChild(style);

    window.addEventListener('load', init);
})();