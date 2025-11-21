// Espera o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------- */
    /* --- Menu Mobile Hambúrguer --- */
    /* -------------------------------------- */
    
    // Função para detectar se é dispositivo móvel
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Elementos do menu hambúrguer
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Previne scroll do body quando menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }
    
    // Função para fechar o menu mobile
    function closeMobileMenu() {
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Event listener para o botão hambúrguer
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Event listeners para os links do menu (fecha o menu ao clicar)
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) {
                closeMobileMenu();
            }
        });
    });
    
    // Fecha o menu se clicar fora dele (apenas em mobile)
    document.addEventListener('click', (e) => {
        if (isMobile() && navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Função para ajustar o menu quando redimensiona a tela
    function adjustMobileMenu() {
        if (!isMobile()) {
            // Em telas maiores, garante que o menu está fechado
            closeMobileMenu();
        }
    }
    
    // Reajusta o menu quando a janela é redimensionada
    window.addEventListener('resize', adjustMobileMenu);

    /* -------------------------------------- */
    /* --- Carregamento Dinâmico das Seções --- */
    /* -------------------------------------- */

    /**
     * Função para carregar o conteúdo de um arquivo em uma seção específica.
     * @param {string} sectionId - O ID da tag <section> (ex: "deuses")
     * @param {string} filePath - O caminho para o arquivo HTML (ex: "partials/deuses.html")
     */
    function loadSectionContent(sectionId, filePath) {
        fetch(filePath)
            .then(response => {
                // Verifica se a requisição foi bem-sucedida
                if (!response.ok) {
                    throw new Error(`Erro ao carregar ${filePath}. Status: ${response.status}`);
                }
                // Converte a resposta para texto (HTML)
                return response.text();
            })
            .then(html => {
                // Encontra a seção pelo ID e insere o HTML dentro dela
                const section = document.getElementById(sectionId);
                if (section) {
                    section.innerHTML = html;
                } else {
                    console.warn(`Seção com ID "${sectionId}" não encontrada.`);
                }
            })
            .catch(error => {
                // Em caso de erro, exibe uma mensagem na seção e no console
                console.error('Erro no fetch:', error);
                const section = document.getElementById(sectionId);
                if (section) {
                    section.innerHTML = `<p style="color: #ff8a80;">Erro ao carregar esta seção. Verifique o console.</p>`;
                }
            });
    }

    // Chama a função para carregar CADA seção
    loadSectionContent('inicio', 'Partials/inicio.html');
    loadSectionContent('deuses', 'Partials/deuses.html');
    loadSectionContent('mundos', 'Partials/mundos.html');
    loadSectionContent('semideuses', 'Partials/semideuses.html');
    loadSectionContent('lendas', 'Partials/lendas.html');
    loadSectionContent('criaturas', 'Partials/criaturas.html');
    loadSectionContent('galeria', 'Partials/galeria.html');
    loadSectionContent('sobre', 'Partials/sobre.html');


    /* -------------------------------------- */
    /* --- Lógica do Chat Flutuante --- */
    /* -------------------------------------- */
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChatButton = document.getElementById('close-chat');

    function toggleChat() {
        if (chatWindow.style.display === 'flex') {
            chatWindow.style.display = 'none';
        } else {
            chatWindow.style.display = 'flex';
            
            // Ajusta o chat para dispositivos móveis
            if (isMobile()) {
                chatWindow.classList.add('mobile-chat');
                // Em dispositivos móveis, o chat ocupa mais espaço da tela
                chatWindow.style.width = window.innerWidth <= 480 ? '95vw' : '90vw';
                chatWindow.style.height = window.innerWidth <= 480 ? '80vh' : '70vh';
                chatWindow.style.right = window.innerWidth <= 480 ? '2.5vw' : '5vw';
            } else {
                chatWindow.classList.remove('mobile-chat');
                // Reset para desktop
                chatWindow.style.width = '350px';
                chatWindow.style.height = '500px';
                chatWindow.style.right = '30px';
            }
            
            // Adiciona mensagem inicial quando o chat é aberto
            if (chatBody.children.length === 0) {
                addMessageToChat('bot', 'Saudações, viajante! Pelos poderes de Yggdrasil e pelas runas sagradas, estou aqui para compartilhar o conhecimento dos Nove Mundos. O que deseja saber sobre nossa antiga sabedoria?');
            }
        }
    }

    if (chatButton) chatButton.addEventListener('click', toggleChat);
    if (closeChatButton) closeChatButton.addEventListener('click', toggleChat);

    /* -------------------------------------- */
    /* --- Lógica da API do Chat --- */
    /* -------------------------------------- */

    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');

    // URL do seu backend. 
    const API_URL = 'https://portal-nordico.onrender.com/api/chat';

    if (sendButton) sendButton.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return; // Não envia mensagens vazias

        // 1. Mostra a mensagem do usuário na tela
        addMessageToChat('user', message);

        // Limpa o input
        chatInput.value = '';

        // Mostra um "digitando..."
        addMessageToChat('bot', 'O Oráculo está consultando as runas...');

        // 2. Envia a mensagem para o BACKEND
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }) // Envia a mensagem como JSON
        })
        .then(response => response.json())
        .then(data => {
            // 3. Recebe a resposta do backend e mostra no chat
            
            // Remove o "digitando..."
            removeLastBotMessage(); 

            // Adiciona a resposta real da IA
            addMessageToChat('bot', data.reply);
            
            // Adiciona a mensagem de sugestão após a resposta
            setTimeout(() => {
                addMessageToChat('bot', 'Se as runas despertaram mais curiosidade em sua mente, não hesite em consultar o Oráculo novamente. A sabedoria dos antigos aguarda suas perguntas.');
            }, 1000);
        })
        .catch(error => {
            console.error('Erro ao falar com o backend:', error);

            // Remove o "digitando..."
            removeLastBotMessage(); 

            // Mostra uma mensagem de erro
            addMessageToChat('bot', 'Houve um erro. O Oráculo não pode ser contatado.');
        });
    }

    // Função auxiliar para adicionar mensagens ao chat
    function addMessageToChat(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`; // 'user' ou 'bot'
        messageDiv.innerHTML = `<p>${text}</p>`;

        if (chatBody) {
            chatBody.appendChild(messageDiv);
            // Rola o chat para baixo automaticamente
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Em dispositivos móveis, garante que o scroll funcione corretamente
            if (isMobile()) {
                setTimeout(() => {
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 100);
            }
        }
    }

    // Função para remover a mensagem "digitando..."
    function removeLastBotMessage() {
        const botMessages = chatBody.querySelectorAll('.chat-message.bot');
        if (botMessages.length > 0) {
            botMessages[botMessages.length - 1].remove();
        }
    }


    /* -------------------------------------- */
    /* --- Lógica do Botão Voltar ao Topo --- */
    /* -------------------------------------- */
    const backToTopButton = document.getElementById('back-to-top');

    function checkScroll() {
        const scrollAmount = window.scrollY;
        const triggerPoint = 300; 

        if (backToTopButton) {
            if (scrollAmount > triggerPoint) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        }
    }

    window.addEventListener('scroll', checkScroll);

}); // Fim do 'DOMContentLoaded'
