
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const greenArea: Prisma.GreenAreaCreateInput = JSON.parse(req.body);
    // const greenArea: Prisma.GreenAreaCreateInput = req.body;
    const savedPark = await prisma.greenArea.create({ data: greenArea });
    res.status(200).json(savedPark);
  } catch (err) {
    res.status(400).json({ message: "something went wrong"});
  }
};