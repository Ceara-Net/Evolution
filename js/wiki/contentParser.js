import { updateTableOfContents } from './tocController.js';

export function initContentParser(wikiData) {
    const readerTarget = document.getElementById('markdown-render-target');

    async function loadMarkdownArticle(id, updateHistory = false) {
        if (!readerTarget) return;

        let foundArticle = null;
        for (const group of wikiData.categories) {
            const art = group.articles.find(a => a.id === id);
            if (art) { foundArticle = art; break; }
        }

        if (!foundArticle) return;

        localStorage.setItem('wiki-last-opened', id);

        if (updateHistory) {
            const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?article=${id}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }

        // Atualiza a classe ativa visual na sidebar
        document.querySelectorAll('.wiki-menu-item').forEach(item => item.classList.remove('active'));
        const currentItem = document.querySelector(`[data-id="${id}"]`);
        if (currentItem) {
            currentItem.classList.add('active');
            const targetBlock = currentItem.closest('.menu-category-block');
            if (targetBlock) targetBlock.classList.add('open');
        }

        readerTarget.innerHTML = `
            <div class="reader-placeholder">
                <span class="material-symbols-rounded" style="animation: syncSpin 1.5s linear infinite; font-size: 36px;">sync</span>
                <h3>Carregando...</h3>
            </div>
        `;

        try {
            const response = await fetch(foundArticle.path);
            if (!response.ok) throw new Error(`HTTP: ${response.status}`);
            
            const markdownText = await response.text();
            readerTarget.innerHTML = marked.parse(markdownText);

            // Atualiza a terceira coluna (TOC) baseada no novo conteúdo carregado
            updateTableOfContents(id, readerTarget);

        } catch (error) {
            console.error(error);
            readerTarget.innerHTML = `
                <div class="reader-placeholder">
                    <h3>Artigo não encontrado ou em desenvolvimento.</h3>
                </div>
            `;
        }
    }

    return { loadMarkdownArticle };
}