// Backend do Oraculo Nordico (CommonJS + import dinamico do SDK ESM)
// Observacao: este projeto usa CommonJS. O pacote @google/genai e ESM;
// por isso usamos import() dentro de uma IIFE para carregar o cliente.
const express = require('express'); // servidor HTTP
const cors = require('cors');       // habilita CORS entre frontend/backend
require('dotenv').config();         // carrega API_KEY do arquivo .env

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(cors());
app.use(express.json());

// Servir os arquivos estaticos do projeto (index.html, css, js)
app.use(express.static(__dirname));

console.log('Verificando a API Key...');
console.log(
  'Sua API Key comeca com:',
  process.env.API_KEY ? process.env.API_KEY.substring(0, 8) + '...' : 'CHAVE NAO ENCONTRADA'
);

// Inicializa o cliente Gemini usando @google/genai (API v1)
(async () => {
  const { GoogleGenAI } = await import('@google/genai');    // importa cliente ESM
  const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY, apiVersion: 'v1' }); // força API v1
  console.log('Usando modelo: gemini-2.0-flash (API v1)');   // modelo suportado na API v1

  // Endpoint chamado pelo frontend (script.js) para conversar com o oraculo
  app.post('/api/chat', async (req, res) => {
    try {
      const userMessage = req.body.message; // mensagem enviada pelo usuario

      // Cria uma sessao de chat com modelo + prompt de sistema no historico
      const chat = genAI.chats.create({
        model: 'gemini-2.0-flash',
        history: [
          {
            role: 'user',
            parts: [
              {
                text:
                  'Voce e um Oraculo Nordico. Responda apenas perguntas relacionadas a mitologia nordica (deuses, lendas, criaturas, runas, etc.). Se a pergunta for sobre outro assunto, recuse educadamente e lembre ao usuario que voce fala sobre os mitos nordicos.',
              },
            ],
          },
          {
            role: 'model',
            parts: [
              {
                text:
                  'Entendido. Eu sou o Oraculo de Midgard. Minha sabedoria se limita aos Nove Mundos. O que voce deseja saber?',
              },
            ],
          },
        ],
      });

      // Envia a mensagem do usuario e extrai apenas o texto da resposta
      const result = await chat.sendMessage({ message: userMessage });
      const text = result.text;
      res.json({ reply: text });
    } catch (error) {
      // Qualquer erro do SDK/HTTP cai aqui
      console.error('Erro na API do Gemini:', error);
      res.status(500).json({
        reply:
          'Desculpe, viajante. As runas estao turvas... nao consigo responder agora.',
      });
    }
  });

  // Sobe o servidor HTTP
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
})().catch((e) => {
  console.error('Falha ao inicializar o cliente Gemini:', e);
  process.exit(1);
});
