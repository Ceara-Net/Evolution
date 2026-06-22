/**
 * GERENCIADOR DA WIKI COM DROPDOWNS E EXTRAÇÃO DE ARQUIVOS E FAIXAS (H2)
 * Caminho dos arquivos: /wiki/Categoria/artigo.md
 * Executado a partir de: /pages/wiki.html
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BANCO DE DADOS LOCAL ESTRUTURADO POR CATEGORIAS
    const wikiData = [
        {
            category: "SVA",
            articles: [
                { id: "SVA01", title: "Sobre o SVA", icon: "Question_Mark", path: "../wiki/SVA - PlayHub/sva-about.md" },
                { id: "SVA02", title: "SVAs PlayHub", icon: "Shopping_Cart", path: "../wiki/SVA - PlayHub/playhub-portifolio.md" },
            ]
        },
    ];

    const menuContainer = document.getElementById('wiki-menu-links');
    const readerTarget = document.getElementById('markdown-render-target');

    // 2. FUNÇÃO: MONTA O MENU LATERAL COM COMPORTAMENTO DROPDOWN
    function renderWikiMenu() {
        menuContainer.innerHTML = "";
        
        wikiData.forEach(group => {
            const categoryBlock = document.createElement('li');
            categoryBlock.classList.add('menu-category-block');
            
            // Estrutura do cabeçalho do Dropdown com ícone indicador de seta
            let htmlContent = `
                <div class="category-toggle">
                    <span class="category-title">${group.category}</span>
                    <span class="material-symbols-rounded arrow-icon">expand_more</span>
                </div>
            `;
            htmlContent += `<ul class="category-sublist">`;
            
            group.articles.forEach(article => {
                htmlContent += `
                    <li class="article-li" data-article-id="${article.id}">
                        <a class="wiki-menu-item" data-id="${article.id}">
                            <span class="material-symbols-rounded">${article.icon}</span>
                            <span class="item-text">${article.title}</span>
                        </a>
                        <ul class="article-anchors-list" id="anchors-${article.id}"></ul>
                    </li>
                `;
            });
            
            htmlContent += `</ul>`;
            categoryBlock.innerHTML = htmlContent;
            menuContainer.appendChild(categoryBlock);
        });

        // Evento de clique para o Efeito Dropdown (Abrir/Fechar Categorias)
        document.querySelectorAll('.category-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const block = e.currentTarget.parentElement;
                block.classList.toggle('open');
            });
        });

        // Evento de clique nos Artigos
        document.querySelectorAll('.wiki-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita conflito com cliques superiores
                const articleId = e.currentTarget.getAttribute('data-id');
                loadMarkdownArticle(articleId);
            });
        });
    }

    // 3. FUNÇÃO: CAPTURA OS "##" (H2) DO HTML GERADO E CRIA AS FAIXAS NO MENU
    function generateArticleAnchors(articleId) {
        // Limpa qualquer lista de faixas aberta anteriormente
        document.querySelectorAll('.article-anchors-list').forEach(list => list.innerHTML = "");
        
        const anchorContainer = document.getElementById(`anchors-${articleId}`);
        if (!anchorContainer) return;

        // Captura todas as tags H2 injetadas no leitor de texto
        const headings = readerTarget.querySelectorAll('h2');
        
        headings.forEach((heading, index) => {
            // Cria um ID único no elemento HTML para servir de âncora de scroll
            const anchorId = `section-${articleId}-${index}`;
            heading.setAttribute('id', anchorId);

            // Cria o link da faixa na barra lateral
            const li = document.createElement('li');
            li.innerHTML = `
                <a class="anchor-link" data-target="${anchorId}">
                    <span class="anchor-bullet">•</span>
                    <span class="anchor-text">${heading.textContent}</span>
                </a>
            `;
            anchorContainer.appendChild(li);
        });

        // Adiciona evento de scroll suave nas faixas
        anchorContainer.querySelectorAll('.anchor-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.currentTarget.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // 4. FUNÇÃO: BUSCA O MARKDOWN E CHAMA O COMPILADOR DE FAIXAS
    async function loadMarkdownArticle(id) {
        let foundArticle = null;
        for (const group of wikiData) {
            const art = group.articles.find(a => a.id === id);
            if (art) { foundArticle = art; break; }
        }

        if (!foundArticle) return;

        // Gerencia classes de estado selecionado (.active)
        document.querySelectorAll('.wiki-menu-item').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.article-li').forEach(li => li.classList.remove('active-article'));
        
        const currentItem = document.querySelector(`[data-id="${id}"]`);
        currentItem.classList.add('active');
        currentItem.parentElement.classList.add('active-article');

        // Garante que a categoria pai se mantenha aberta ao selecionar o item
        currentItem.closest('.menu-category-block').classList.add('open');

        readerTarget.innerHTML = `
            <div class="reader-placeholder">
                <span class="material-symbols-rounded animated-icon" style="animation: syncSpin 1.5s linear infinite;">sync</span>
                <h3>Buscando documentação...</h3>
            </div>
        `;

        try {
            const response = await fetch(foundArticle.path);
            if (!response.ok) throw new Error(`Status ${response.status}`);
            
            const markdownText = await response.text();
            
            // Injeta o HTML convertido pelo Marked.js
            readerTarget.innerHTML = marked.parse(markdownText);

            // GERA AS FAIXAS DO MENU BASEADO NO CONTEÚDO RECÉM-INJETADO
            generateArticleAnchors(id);

        } catch (error) {
            readerTarget.innerHTML = `
                <div class="reader-placeholder" style="color: var(--clr-orange-main);">
                    <span class="material-symbols-rounded" style="font-size: 54px;">menu_book</span>
                    <h3>Artigo em Construção</h3>
                    <p style="margin-top: 8px; color: var(--text-muted);">
                        O arquivo não foi localizado em:<br>
                        <code style="color: var(--clr-orange-light); font-size: 13px;">${foundArticle.path.replace('../', '')}</code>
                    </p>
                </div>
            `;
            console.error(error);
        }
    }

    renderWikiMenu();
    
    if (localStorage.getItem('evolution-theme') === 'light') {
        document.body.classList.add('light-theme');
    }
});
