import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Treedetails.module.css'
import trees_data from '../../MockDataFirst';


export default function TreeDetails() {
    
    const router = useRouter()

    const {treeid} = router.query
    
    // if(!router.isReady) {
    //     return <></>;
    // }
    // option 2. Tree id is not set. tips: 

    useEffect(()=>{
        console.log(router.query)
        if (router.query.treeid) {
            setCurrent(allQualifications[treeid][dataLength])
        }
    },[router.query])
    
    

    const [allQualifications, setallQualifications] = useState(trees_data)
    

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
           <div>
                    <img src={allQualifications[treeid][dataLength].src} style={{width:"300px", height:"400px"}}></img>
                    <p>Tree located in: Park {current.treeName}</p>
                    <p>Pic upload: {current.date}</p>
                    <p>Current grade: {current.grade}</p>
                    {
                        
                         avidingByContract ? (
                             <p>Does it comply: YES</p>
                         ) : (
                             <p>Does it comply: NO</p>
                         )
                        
                    }
                    
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