import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Treedetails.module.css'
import trees_data from '../../MockDataFirst';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient

export async function getStaticProps({params}) {
    
    
    const uniqueTree = await prisma.tree.findUnique({
        where: {
          id: Number(params.treeid),  
        },
    })

    return {
        props: {
            treeDetails: JSON.parse(JSON.stringify(uniqueTree)),
        },
        
    }
}

export async function getStaticPaths(){
        
    const res = await prisma.tree.findMany();
    
    return {
    paths: res.map((unique) => ({
        params: {
            treeid: unique.id.toString(),
        }
    })),
    fallback: false
    }
}

export default function TreeDetails({treeDetails}) {
    

    const router = useRouter()

    const {treeid} = router.query
    
    // if(!router.isReady) {
    //     return <></>;
    // }
    // option 2. Tree id is not set. tips: 

    useEffect(()=>{
        console.log(treeDetails)
        if (treeDetails) {
            setCurrent(treeDetails)
        }
        console.log(current)
    },[treeDetails])
    
    

    const [allQualifications, setallQualifications] = useState(treeDetails)
    

    const dataLength = allQualifications.length + 1

    // let current = allQualifications[1][dataLength]
    const [current, setCurrent] = useState(null)
    
    // useEffect( () => {console.log(allQualifications)})
    // useEffect( () => {console.log(dataLength)})
    // useEffect( () => {console.log(current)})
    // useEffect( () => {console.log(treeid)})

    const [avidingByContract, setAvidingByContract] = useState(true)

    
    function evaluateContract(grade) {
        grade > 3 ? (
            setAvidingByContract(true)
         ) : (
            setAvidingByContract(false)
         )
    }


    useEffect(() => {
        if (current) {
            evaluateContract(current.grade)
            }
        }, [current]
    )

    if(current == null) {
        return <></>;
    }
    

    return (
        
        <div className={styles.treeDetailContainer}>
           <div className={styles.infoContainer}>
                    {/* <img src={allQualifications[treeid][dataLength].src} style={{width:"300px", height:"400px"}}></img> */}
                    <p>Tree located in: Region {current.region}</p>
                    <p>Id: {current.id}</p>
                    <p>latitude: {current.latitude}</p>
                    <p>longitude: {current.longitude}</p>
                    {/*
                        
                         avidingByContract ? (
                             <p>Does it comply: YES</p>
                         ) : (
                             <p>Does it comply: NO</p>
                         )
                        
                         */}
                    
                </div>
                <button onClick={() => {router.reload()}}>
                    refresh
                </button>
            <Link href={'/reactmap'}> 
                <button className={styles.backButton}> BACK </button> 
            </Link>
        </div>
      )
}