import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET e POST para ingressos
export default async function handler(req, res) {
    // Verifica o método da requisição
    if (req.method === 'POST') {
        try {
            // Extrai os dados da requisição
            const { quantidade, valor, eventoId, categoriaId, loteId } = req.body;

            // Cria um novo ingresso no banco de dados usando o Prisma
            const novoIngresso = await prisma.ingresso.create({
                data: {
                    quantidade: parseInt(quantidade),
                    valor: parseFloat(valor),
                    eventoId,
                    categoriaId,
                    loteId
                },
            });

            // Retorna uma resposta de sucesso com o ingresso cadastrado
            res.status(201).json({ message: 'Ingresso cadastrado com sucesso!', ingresso: novoIngresso });
        } catch (error) {
            // Retorna uma resposta de erro caso ocorra uma exceção
            console.error('Erro ao cadastrar ingresso:', error.message);
            res.status(500).json({ error: 'Erro ao cadastrar ingresso', message: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            // Busca todos os ingressos no banco de dados usando o Prisma
            const ingressos = await prisma.ingresso.findMany({});
            // Retorna uma resposta com os ingressos encontrados
            res.status(200).json(ingressos);
        } catch (error) {
            // Retorna uma resposta de erro caso ocorra uma exceção
            console.error('Erro ao buscar ingressos:', error.message);
            res.status(500).json({ error: 'Erro ao buscar ingressos', message: error.message });
        }
    } else {
        // Retorna uma resposta de método não permitido para outros métodos de requisição
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
