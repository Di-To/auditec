
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const municipality: Prisma.MunicipalityCreateInput = JSON.parse(req.body);
    const zone: Prisma.ZoneCreateInput = req.body;
    const savedZone = await prisma.zone.create({ data: zone });
    res.status(200).json(savedZone);
  } catch (err) {
    res.status(400).json({ message: "something went wrong"});
  }
};