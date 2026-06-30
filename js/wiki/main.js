import { initMenuController } from './menuController.js';
import { initContentParser } from './contentParser.js';

document.addEventListener('DOMContentLoaded', async () => {
    const CONFIG_URL = '../wiki-data/config.json';

    try {
        const response = await fetch(CONFIG_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const wikiData = await response.json();

        // Inicializa o leitor primeiro para obter a função de carga
        const contentParser = initContentParser(wikiData);

        // Inicializa o menu passando a função de callback do clique
        initMenuController(wikiData, contentParser.loadMarkdownArticle);

        // Roteamento inicial (URL ou Cache)
        const urlParams = new URLSearchParams(window.location.search);
        const articleFromUrl = urlParams.get('article');
        const articleFromStorage = localStorage.getItem('wiki-last-opened');

        if (articleFromUrl) {
            contentParser.loadMarkdownArticle(articleFromUrl, false);
        } else if (articleFromStorage) {
            contentParser.loadMarkdownArticle(articleFromStorage, true);
        }

    } catch (error) {
        console.error("[Wiki Engine Error]", error);
        document.getElementById('markdown-render-target').innerHTML = `
            <div class="reader-placeholder">
                <h3>Erro ao carregar o mapa de arquivos da Wiki.</h3>
            </div>
        `;
    }
    
    // --- Ouvinte do Botão de Voltar para a Home ---
    const backBtn = document.getElementById('sidebar-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '../index.html'; 
        });
    }
    
    // --- Ouvinte do Botão de Colapso Total (Esquerda e Direita) ---
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const wikiWrapper = document.querySelector('.wiki-wrapper');
    const sidebarEl = document.getElementById('wiki-sidebar-element');
    
    if (toggleBtn && sidebarEl && wikiWrapper) {
        toggleBtn.addEventListener('click', () => {
            // Alterna o estado compacto na esquerda e remove a direita
            sidebarEl.classList.toggle('collapsed');
            wikiWrapper.classList.toggle('sidebar-collapsed');
            wikiWrapper.classList.toggle('toc-collapsed');
        });
    }
});