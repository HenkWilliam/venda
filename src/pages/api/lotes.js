import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const lotes = await prisma.loteIngresso.findMany();
            res.status(200).json(lotes);
        } catch (error) {
            console.error('Erro ao carregar lotes de ingresso:', error);
            res.status(500).json({ error: 'Erro ao carregar lotes de ingresso' });
        }
    } else if (req.method === 'POST') {
        try {
            const { nome, descricao, quantidade, valor } = req.body;

            const novoLote = await prisma.loteIngresso.create({
                data: {
                    nome,
                    descricao,
                    quantidade: parseInt(quantidade),
                    valor: parseFloat(valor),
                },
            });

            res.status(201).json(novoLote);
        } catch (error) {
            console.error('Erro ao cadastrar lote de ingresso:', error);
            res.status(500).json({ error: 'Erro ao cadastrar lote de ingresso' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
