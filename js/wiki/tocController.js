let activeIntersectionObserver = null;

export function updateTableOfContents(articleId, readerTarget) {
    const tocLinksContainer = document.getElementById('article-toc-links');
    if (!tocLinksContainer) return;

    tocLinksContainer.innerHTML = "";
    if (activeIntersectionObserver) activeIntersectionObserver.disconnect();

    const headings = readerTarget.querySelectorAll('h2');

    if (headings.length === 0) {
        tocLinksContainer.innerHTML = `<li class="toc-empty-state">Geral</li>`;
        return;
    }

    headings.forEach((heading, index) => {
        const anchorId = `hash-${articleId}-${index}`;
        heading.setAttribute('id', anchorId);

        const li = document.createElement('li');
        li.innerHTML = `
            <a class="toc-anchor-link" data-target="${anchorId}">
                ${heading.textContent}
            </a>
        `;
        tocLinksContainer.appendChild(li);
    });

    // Scroll Suave ao clicar em um item da direita
    tocLinksContainer.querySelectorAll('.toc-anchor-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(e.currentTarget.getAttribute('data-target'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Monitor do Scrollspy
    const observerOptions = { root: null, rootMargin: '-40px 0px -70% 0px', threshold: 0 };
    activeIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinksContainer.querySelectorAll('.toc-anchor-link').forEach(link => {
                    if (link.getAttribute('data-target') === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    headings.forEach(heading => activeIntersectionObserver.observe(heading));
}