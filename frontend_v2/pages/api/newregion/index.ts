
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const region: Prisma.RegionCreateInput = JSON.parse(req.body);
    // const region: Prisma.RegionCreateInput = req.body
    const savedRegion = await prisma.region.create({ data: region });
    res.status(200).json(savedRegion);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
};