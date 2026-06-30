export function initMenuController(wikiData, onArticleClickCallback) {
    const menuContainer = document.getElementById('wiki-menu-links');
    if (!menuContainer) return;

    menuContainer.innerHTML = "";
    
    wikiData.categories.forEach(group => {
        const categoryBlock = document.createElement('li');
        categoryBlock.classList.add('menu-category-block');
        categoryBlock.setAttribute('data-category-id', group.id);
        
        let htmlContent = `
            <div class="category-toggle">
                <div class="category-title-wrapper">
                    <span class="material-symbols-rounded category-icon">${group.icon || 'folder'}</span>
                    <span class="category-title">${group.title}</span>
                </div>
                <span class="material-symbols-rounded arrow-icon">expand_more</span>
            </div>
            <ul class="category-sublist">
        `;
        
        group.articles.forEach(article => {
            htmlContent += `
                <li>
                    <a class="wiki-menu-item" data-id="${article.id}" href="#">
                        <span class="item-text">${article.title}</span>
                    </a>
                </li>
            `;
        });
        
        htmlContent += `</ul>`;
        categoryBlock.innerHTML = htmlContent;
        menuContainer.appendChild(categoryBlock);
    });

    // Controle do Accordion (Sanfona)
    const toggles = menuContainer.querySelectorAll('.category-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const currentBlock = e.currentTarget.parentElement;
            const isOpen = currentBlock.classList.contains('open');

            // Fecha outros blocos abertos para manter a interface limpa
            menuContainer.querySelectorAll('.menu-category-block').forEach(block => {
                block.classList.remove('open');
            });

            if (!isOpen) {
                currentBlock.classList.add('open');
            }
        });
    });

    // Escuta ativa de cliques nos artigos para carregar o Markdown
    const menuItems = menuContainer.querySelectorAll('.wiki-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const articleId = e.currentTarget.getAttribute('data-id');
            if (typeof onArticleClickCallback === 'function') {
                onArticleClickCallback(articleId, true);
            }
        });
    });
}