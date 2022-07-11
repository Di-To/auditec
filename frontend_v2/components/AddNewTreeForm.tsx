// import { useForm } from '../node_modules/react-hook-form/dist/useForm';
import { useState } from 'react';


const FormError = ({ errorMessage }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddTreeFormProps {
  onSubmit: any;
}

const initialValues = {
  region: "",
  municipality: "",
  park: "",
  latitude: "",
  longitude: ""
}

export default function AddTreeForm(props: AddTreeFormProps) {
  
  const [initialPosition, setInitialPosition] = useState({lat:undefined, lng:undefined})

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {              
            lat: position.coords.latitude,
            lng: position.coords.longitude
        } 
        
        if(newPos) {
            setInitialPosition(newPos);
            console.log(initialPosition)
        }
    }
  )}
  
  const [values, setValues] = useState(initialValues)

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setValues ({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit(values)
    console.log(values);
  } 

  return (
    // <form className="flex flex-col" onSubmit={onSubmit}>
    <form className="flex flex-col" onSubmit={onSubmit}>

        <input className='rounded p-2 text-xl w-full mb-2' type="text" id="fname" name="region" placeholder='region' 
        value={values.region}
        onChange={handleInputChange}/>
        

        <input className='rounded p-2 text-xl w-full mb-2' placeholder='municipality' 
        type="text" 
        id="fname" 
        name="municipality" 
        value={values.municipality}
        onChange={handleInputChange}/>

        <input className='rounded p-2 text-xl w-full mb-2' placeholder='park' 
        type="text" 
        id="fname" 
        name="park" 
        value={values.park}
        onChange={handleInputChange}/>

        {/* <input className='rounded p-2 text-xl w-full mb-2'  placeholder='picture' 
        type="text" 
        id="fname" 
        name="picture" 
        value={values.picture}
        onChange={handleInputChange}/> */}

        <input className='rounded p-2 text-xl w-full mb-2' placeholder='latitude' 
        type="text" 
        id="fname" 
        name="latitude" 
        value = {values.latitude}
        onChange={handleInputChange}/>


        <input className='rounded p-2 text-xl w-full mb-2' placeholder='longitude' 
        type="text" 
        id="fname" 
        name="longitude" 
        value={values.longitude}
        onChange={handleInputChange}/>

      
      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Submit
      </button>
      {/* <button className='border-solid border-2 border-black' onClick={() => {setLocation()}}>Set coordinates</button> */}
    </form>
  );
}