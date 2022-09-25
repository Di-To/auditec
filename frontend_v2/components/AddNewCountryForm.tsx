// import { useForm } from '../node_modules/react-hook-form/dist/useForm';
import { useState } from 'react';


const FormError = ({ errorMessage }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddCountryFormProps {
  onSubmit: any;
}

const initialValues = {
  countryName: "",
}

export default function AddCountryForm(props: AddCountryFormProps) {
  
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
    console.log("yo");
    console.log(values);
  } 

  return (
    // <form className="flex flex-col" onSubmit={onSubmit}>
    <form className="flex flex-col" onSubmit={onSubmit}>

        <input className='rounded p-2 text-xl w-full mb-2' type="text" id="fname" name="countryName" 
        placeholder='countryName' 
        value={values.countryName}
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