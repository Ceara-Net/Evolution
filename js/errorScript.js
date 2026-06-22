/**
 * GERENCIADOR DINÂMICO DE COMPONENTES DE ERRO
 * Ceará Net Evolution - Portal do Funcionário
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Captura os parâmetros passados através da URL Query String
    const urlParams = new URLSearchParams(window.location.search);
    
    const errorCode = urlParams.get('code');
    const errorDescription = urlParams.get('desc');

    // 2. Mapeia os elementos DOM que receberão o conteúdo
    const codeDisplay = document.getElementById('error-code');
    const descDisplay = document.getElementById('error-desc');

    // 3. Fallbacks de Segurança: Se a página for aberta sem parâmetros, exibe um erro genérico
    const defaultCode = "404";
    const defaultDesc = "A página que você está procurando não foi encontrada ou mudou de endereço no sistema interno.";

    // 4. Função auxiliar simples para higienizar e evitar XSS injetado via URL
    function sanitizeString(str) {
        if (!str) return null;
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // 5. Injeta os dados limpos na tela
    codeDisplay.innerHTML = sanitizeString(errorCode) || defaultCode;
    descDisplay.innerHTML = sanitizeString(errorDescription) || defaultDesc;

    // 6. Sincroniza automaticamente o tema salvo no navegador (Dark / Light)
    const activeTheme = localStorage.getItem('evolution-theme');
    if (activeTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}); 