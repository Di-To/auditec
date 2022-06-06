import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import '../../../MockDataFirst'
import './TreeDetails.css'
import trees_data from '../../../MockDataFirst';
import { Link } from 'react-router-dom';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function TreeDetails() {
    
    const {id} = useParams()

    const dataSelection = id
    
    const [allQualifications, setallQualifications] = useState(trees_data)

    const dataLength = allQualifications.length + 1

    let current = allQualifications[dataSelection][dataLength]

    useEffect( () => {console.log(allQualifications)})
    useEffect( () => {console.log(dataLength)})
    useEffect( () => {console.log(current)})

    const [avidingByContract, setAvidingByContract] = useState(true)

    function evaluateContract(grade) {
        grade > 3 ? (
            setAvidingByContract(true)
         ) : (
            setAvidingByContract(false)
         )
    }


    useEffect( () => {
        evaluateContract(current.grade)
        }, []
    )

    

    return (
        
        <div className='tree-detail-container'>
           
           <div>
                    <img src={allQualifications[dataSelection][dataLength].src} style={{width:"300px", height:"400px"}}></img>
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
             {/* <div className='graph-container' >
                 <div>
                     <LineChart
                        width={400}
                        height={400}
                        data={allQualifications[dataSelection]}
                        margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="date" />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="grade" stroke="#ff7300" yAxisId={0} />
                    </LineChart>
                </div>
                <div>
                    <img src={allQualifications[dataSelection][dataLength].src} style={{width:"300px", height:"400px"}}></img>
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
            </div> */}

            <Link key={id} to={`upload`}> <button className='back-button'> NEW ENTRY </button> </Link>

            <Link to={'/map'}> <button className='back-button'> BACK </button> </Link>
        </div>
      )
}