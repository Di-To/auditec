import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/Newentry.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'
import AddTreeForm from '../components/AddNewTreeForm'
import { PrismaClient, Tree, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(){
    const trees: Tree[] = await prisma.tree.findMany();

    return {
        props: {
            initialTrees: JSON.parse(JSON.stringify(trees))
        }
    };
}

async function saveTree(tree: Prisma.TreeCreateInput) {
    const response = await fetch('api/newentry', {
        method: 'POST',
        body: JSON.stringify(tree)
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    } else (console.log("nice!"))

    return await response.json();
}

export default function NewTree({initialTree}) {

    const [trees, setTree] = useState(initialTree)

    const formRef = useRef();

    function handleTakePhoto(dataUri) {
        console.log("click");
    }

// REMEMBER TO MOVE TO A COMPONENT LATER

    return (
    <>
        <Link href={'/reactmap'}>
            <button style={{border:'solid black 2px', width:'200px', margin:'20px'}}> Back </button>
        </Link>
        <div className='flex flex-col md:flex-row lg:flex-row w-100 h-100 '>

            <div className='ml-4 p-4'>
                <h2>Info</h2>
                <div>
                
                    <div> 
                        <AddTreeForm 
                            onSubmit={ async (data) => {
                                try {
                                    await saveTree(data);
                                    setTree([...trees, data]);
                                } catch (err) {
                                    console.log(err)
                                }
                            }}/>

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
