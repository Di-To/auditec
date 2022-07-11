
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tree: Prisma.TreeCreateInput = JSON.parse(req.body);
    const savedTree = await prisma.tree.create({ data: tree });
    res.status(200).json(savedTree);
  } catch (err) {
    res.status(400).json({ message: "something went wrong"});
  }
};