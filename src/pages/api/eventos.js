import { PrismaClient } from '@prisma/client';

// Inicializa o cliente Prisma para acesso ao banco de dados
const prisma = new PrismaClient();

// Função para lidar com as requisições POST para cadastrar um novo evento
export default async function handler(req, res) {
    // Verifica se o método da requisição é POST
    if (req.method === 'POST') {
        try {
            // Extrai os dados da requisição
            const { nome, descricao, data, local } = req.body;

            // Cria um novo evento no banco de dados usando o Prisma
            const novoEvento = await prisma.evento.create({
                data: {
                    nome,
                    descricao,
                    data: new Date(data),
                    local,
                },
            });

            // Retorna uma resposta de sucesso com o evento cadastrado
            res.status(201).json({ message: 'Evento cadastrado com sucesso!', evento: novoEvento });
        } catch (error) {
            // Retorna uma resposta de erro caso ocorra uma exceção
            console.error('Erro ao cadastrar evento:', error.message);
            res.status(500).json({ error: 'Erro ao cadastrar evento', message: error.message });
        }
    } else {
        if (req.method === "GET") {
            const data = await prisma.evento.findMany({});
            return res.status(200).json(data)
        }
    }
}
