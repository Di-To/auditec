import { PrismaClient } from '@prisma/client'
import React, { useEffect } from 'react'

const prisma = new PrismaClient()

export async function getServerSideProps(){
  // 
  const trees = await prisma.tree.findMany({
    include: {
      details: true,
    }
  });

  return {
    props: {
      everyTree: JSON.parse(JSON.stringify(trees))
    }
  }
}


export default function stats({everyTree}) {
  
  useEffect(() => {
    console.log(everyTree)
  })
  
  return (
    <div>stats</div>
  )
}
