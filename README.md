# Portal de Mitologia Nórdica 🪓

Um portal interativo sobre mitologia nórdica com um Chatbot integrado via IA (Google Gemini).

## 🚀 Como rodar este projeto

Este projeto utiliza uma arquitetura Cliente-Servidor. Você precisa rodar o backend e o frontend.

### Pré-requisitos

- Node.js instalado
- Uma chave de API do Google Gemini

### Passo 1: Configuração

1. Clone o repositório ou baixe os arquivos
2. Abra o terminal na pasta do projeto
3. Instale as dependências:
   ```bash
   npm install
   ```

### Passo 2: Configurar a API Key

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione sua chave do Google Gemini:
   ```
   API_KEY=sua_chave_aqui
   ```

### Passo 3: Executar o projeto

1. Inicie o servidor:
   ```bash
   node server.js
   ```
2. Abra seu navegador e acesse: `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
portal_nordico-principal/
├── index.html                 # Página principal
├── server.js                  # Backend Node.js
├── package.json               # Dependências do projeto
├── .env                       # Variáveis de ambiente (API Keys)
├── .gitignore                 # Arquivos ignorados pelo Git
├── assets/                    # Recursos do projeto
│   ├── css/                   # Estilos modulares
│   │   ├── global.css         # Variáveis e configurações globais
│   │   ├── header.css         # Estilos do cabeçalho e navegação
│   │   ├── sections.css       # Estilos das seções e cards
│   │   ├── chat.css           # Estilos do chat flutuante
│   │   └── responsive.css     # Media queries para mobile
│   ├── js/                    # Scripts JavaScript
│   │   └── script.js          # Funcionalidades do frontend
│   └── img/                   # Imagens do projeto
│       ├── logo2.png
│       ├── Odin.jpg
│       ├── Thor.jpeg
│       └── [outras imagens...]
└── Partials/                  # Conteúdo das seções
    ├── inicio.html            # Seção inicial
    ├── deuses.html            # Seção dos deuses
    ├── mundos.html            # Seção dos nove mundos
    ├── semideuses.html        # Seção dos heróis
    ├── lendas.html            # Seção das lendas
    ├── criaturas.html         # Seção das criaturas
    ├── galeria.html           # Galeria de artefatos
    └── sobre.html             # Informações do projeto
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estruturação semântica do conteúdo
- **CSS3**: Estilização e design responsivo
- **JavaScript**: Interatividade e funcionalidades dinâmicas
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia (Cinzel e Lora)

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express.js**: Framework web para Node.js
- **Google Gemini AI**: Inteligência artificial para o chatbot
- **CORS**: Middleware para requisições cross-origin
- **dotenv**: Gerenciamento de variáveis de ambiente

## 🎨 Funcionalidades

### 📱 Interface Responsiva
- Design adaptável para desktop, tablet e smartphone
- Menu hambúrguer para dispositivos móveis
- Navegação suave entre seções

### 🤖 Chatbot Inteligente
- Integração com Google Gemini AI
- Especializado em mitologia nórdica
- Interface de chat flutuante
- Respostas contextualizadas

### 📚 Conteúdo Educativo
- **Início**: Introdução à mitologia nórdica
- **Deuses**: Æsir e Vanir (Odin, Thor, etc.)
- **Nove Mundos**: Cosmologia nórdica
- **Semideuses**: Heróis lendários
- **Lendas**: Ragnarök e outras sagas
- **Criaturas**: Seres místicos
- **Galeria**: Artefatos e runas
- **Sobre**: Informações do projeto

### 🎯 Recursos Técnicos
- Carregamento dinâmico de conteúdo
- Animações CSS suaves
- Scroll suave entre seções
- Botão "voltar ao topo"
- Otimização para SEO

## 👥 Equipe de Desenvolvimento

- **Gabriel Pereira Sotero** - Desenvolvedor Frontend e Backend
- **Samuel Batista Gonçalves** - Desenvolvedor Frontend e Designer
- **Davi Carvalho Santos** - Desenvolvedor e Pesquisador de Conteúdo

## 🔧 Ferramentas de Desenvolvimento

- **Gemini IA**: Assistente para geração de conteúdo e funcionalidades do chat
- **GitHub Copilot**: Assistente de programação para otimização do código
- **Visual Studio Code**: Editor de código
- **Git**: Controle de versão

## 📝 Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Executar o servidor de desenvolvimento
node server.js

# O projeto estará disponível em http://localhost:3000
```

## 🌐 Deploy

Para fazer deploy do projeto:

1. Configure as variáveis de ambiente no seu provedor de hospedagem
2. Certifique-se de que o Node.js está instalado no servidor
3. Execute `npm install` para instalar as dependências
4. Inicie o servidor com `node server.js`

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico para fins educacionais.

## 🤝 Contribuições

Este é um projeto acadêmico, mas sugestões e melhorias são sempre bem-vindas!

---

**Que as runas guiem sua jornada através deste conhecimento ancestral!** ⚡
