import { PrismaClient } from "@prisma/client"
import dataSet from "../../../MockData"

const prisma = new PrismaClient()

async function main() {
  const alltrees = prisma.tree.findMany()
  console.log(alltrees)
}

main()
.catch((e) => {
  throw e
})
. finally(async()=>{
  await prisma.$disconnect()
})

// export default function handler(req, res) {
//     res.status(200).json({ dataSet })
//   }