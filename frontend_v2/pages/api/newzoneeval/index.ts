
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const municipality: Prisma.MunicipalityCreateInput = JSON.parse(req.body);
    const zoneEval: Prisma.ZoneEvaluationCreateInput = req.body;
    const savedZoneEval = await prisma.zoneEvaluation.create({ data: zoneEval });
    res.status(200).json(savedZoneEval);
  } catch (err) {
    res.status(400).json({ message: "something went wrong"});
  }
};