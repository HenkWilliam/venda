import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const categorias = await prisma.categoriaIngresso.findMany();
            res.status(200).json(categorias);
        } catch (error) {
            console.error('Erro ao carregar categorias de ingresso:', error);
            res.status(500).json({ error: 'Erro ao carregar categorias de ingresso' });
        }
    } else if (req.method === 'POST') {
        try {
            const { nome, descricao } = req.body;

            const novaCategoria = await prisma.categoriaIngresso.create({
                data: {
                    nome,
                    descricao,
                },
            });

            res.status(201).json(novaCategoria);
        } catch (error) {
            console.error('Erro ao cadastrar categoria de ingresso:', error);
            res.status(500).json({ error: 'Erro ao cadastrar categoria de ingresso' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
