/**
 * CONTROLO DE TEMA DINÂMICO (DARK / LIGHT MODE)
 * Ceará Net Evolution - Portal do Funcionário
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('.material-symbols-rounded');
    const bodyElement = document.body;

    // Verifica se o funcionário já tinha uma preferência salva anteriormente
    const savedTheme = localStorage.getItem('evolution-theme');

    // Aplica o tema salvo ou mantém o Escuro como padrão do sistema
    if (savedTheme === 'light') {
        bodyElement.classList.add('light-theme');
        themeIcon.textContent = 'dark_mode'; // Altera o ícone para Lua se estiver claro
    } else {
        bodyElement.classList.remove('light-theme');
        themeIcon.textContent = 'light_mode'; // Altera o ícone para Sol se estiver escuro
    }

    // Escuta o clique no botão seletor
    themeToggleBtn.addEventListener('click', () => {
        // Rotaciona o ícone elegantemente durante o clique
        themeIcon.style.transform = 'rotate(360deg)';
        
        // Alterna a classe no Body
        const isLightTheme = bodyElement.classList.toggle('light-theme');

        // Altera os estados visuais e salva a nova escolha
        if (isLightTheme) {
            themeIcon.textContent = 'dark_mode'; // Transforma em Lua
            localStorage.setItem('evolution-theme', 'light');
        } else {
            themeIcon.textContent = 'light_mode'; // Transforma em Sol
            localStorage.setItem('evolution-theme', 'dark');
        }

        // Reseta a rotação após o término da animação para futuros cliques
        setTimeout(() => {
            themeIcon.style.transform = 'none';
        }, 500);
    });
});

/**
 * INTEGRAÇÃO DE ROTEAMENTO SEGURO (FRONT-END SEM BACK-END)
 * Ceará Net Evolution
 */

document.addEventListener('DOMContentLoaded', () => {
    // Intercepta todos os cliques em links locais da aplicação
    document.addEventListener('click', async (event) => {
        const targetLink = event.target.closest('a');
        
        // Se não for um link ou se for um link externo (HTTP/HTTPS para fora), ignora
        if (!targetLink || targetLink.href.startsWith('http') && !targetLink.href.includes(window.location.host)) {
            return;
        }

        // Se o link for um "target_blank" (como SGP ou ISPro), deixa o navegador abrir normalmente
        if (targetLink.target === '_blank') {
            return;
        }

        // Previne o clique temporariamente para validar se o arquivo existe
        event.preventDefault();
        const destinationUrl = targetLink.href;

        try {
            // Faz uma requisição rápida apenas para ler o cabeçalho do arquivo (método HEAD)
            const response = await fetch(destinationUrl, { method: 'HEAD' });
            
            if (response.ok) {
                // Se o arquivo existe (Status 200), prossegue com a navegação normal
                window.location.href = destinationUrl;
            } else if (response.status === 404) {
                // Se o servidor estático responder 404 (Not Found), redireciona para nossa tela tratada
                // Se estivermos na raiz, o caminho para a página de erro é './pages/error.html'
                // Ajustamos dinamicamente o caminho baseado em onde o usuário está
                const isInPagesFolder = window.location.pathname.includes('/pages/');
                const errorPagePath = isInPagesFolder ? 'error.html' : './pages/error.html';
                
                const errorDescription = encodeURIComponent("A página operacional que você tentou acessar não foi localizada ou ainda está em desenvolvimento interno.");
                window.location.href = `${errorPagePath}?code=404&desc=${errorDescription}`;
            }
        } catch (error) {
            // Caso ocorra um erro de rede ou violação de segurança (como o CSP do console)
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            const errorPagePath = isInPagesFolder ? 'error.html' : './pages/error.html';
            
            const errorDescription = encodeURIComponent("Ocorreu um erro de segurança ou restrição de rede ao tentar carregar este módulo.");
            window.location.href = `${errorPagePath}?code=500&desc=${errorDescription}`;
        }
    });

    // Sincroniza o tema global na inicialização de qualquer página
    const activeTheme = localStorage.getItem('evolution-theme');
    if (activeTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});