
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const municipality: Prisma.MunicipalityCreateInput = JSON.parse(req.body);
    const municipality: Prisma.MunicipalityCreateInput = req.body;
    const savedMuni = await prisma.municipality.create({ data: municipality });
    res.status(200).json(savedMuni);
  } catch (err) {
    res.status(400).json({ message: "something went wrong"});
  }
};