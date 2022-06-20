import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed"})
    }

    const treeData = JSON(req.body)

    const savedTree = await prisma.tree.create({
        data: treeData
    })

    res.json(savedTree)
}