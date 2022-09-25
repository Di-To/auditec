// import { useForm } from '../node_modules/react-hook-form/dist/useForm';
import { useState } from 'react';


const FormError = ({ errorMessage }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddParkFormProps {
  onSubmit: any;
}

const initialValues = {
  zoneEvaluationId: "",
  parkName: "",
  location: "",
  surface: "",
  latitude: "",
  longitude: ""
}

export default function AddParkForm(props: AddParkFormProps) {
  
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
    const {name, type, value} = e.target;

    setValues (values => {
      const nextValue = {
      ...values}
      switch(type) {
        case 'number':
          nextValue[name] = Number(value);
          break
        default: nextValue[name] = value
      }
      return nextValue
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit(values)
    console.log("yo");
    console.log(values);
  } 

  return (
    // <form className="flex flex-col" onSubmit={onSubmit}>
    <form className="flex flex-col" onSubmit={onSubmit}>

        <input className='rounded p-2 text-xl w-full mb-2' type="number" id="fname" name="zoneEvaluationId" 
        placeholder='zoneEvaluationId' 
        value={values.zoneEvaluationId}
        onChange={handleInputChange}/>
        

        <input className='rounded p-2 text-xl w-full mb-2' placeholder='parkName' 
        type="text" 
        id="fname" 
        name="parkName" 
        value={values.parkName}
        onChange={handleInputChange}/>

        <input className='rounded p-2 text-xl w-full mb-2' placeholder='location' 
        type="text" 
        id="fname" 
        name="location" 
        value={values.location}
        onChange={handleInputChange}/>

        <input className='rounded p-2 text-xl w-full mb-2'  placeholder='surface' 
        type="number" 
        id="fname" 
        name="surface" 
        value={values.surface}
        onChange={handleInputChange}/>

        <input className='rounded p-2 text-xl w-full mb-2' placeholder='latitude' 
        type="number" 
        id="fname" 
        name="latitude" 
        value = {values.latitude}
        onChange={handleInputChange}/>


        <input className='rounded p-2 text-xl w-full mb-2' placeholder='longitude' 
        type="number" 
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