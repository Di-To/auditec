
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(1)
    
    const country: Prisma.CountryCreateInput = JSON.parse(req.body);
    // const country: Prisma.CountryCreateInput = req.body
    console.log(2)
    const savedCountry = await prisma.country.create({ data: country });
    console.log(3)
    res.status(200).json(savedCountry);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
};