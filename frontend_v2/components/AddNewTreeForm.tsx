// import { useForm } from '../node_modules/react-hook-form/dist/useForm';
import {useForm} from 'react-hook-form'
import Input from './Input';
import InputSpacer from './InputSpacer';


const FormError = ({ errorMessage }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddTreeFormProps {
  onSubmit: any;
}

export default function AddTreeForm(props: AddTreeFormProps) {
  const { register, handleSubmit, formState: {errors} } = useForm();
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>

        <Input
          placeholder="Cork"
          name="region"
          formRef={register("Something")}
        />
        {errors.region && (<FormError errorMessage="Region is required" />)}


        <Input
          placeholder="Blarney or sth"
          name="municipality"
          formRef={register("Something")}
        />
        {errors.municipality && <FormError errorMessage="Municipality is required" />}

        <Input
          placeholder="Waterloo"
          name="park"
          formRef={register("Something")}
        />
        {errors.park && <FormError errorMessage="Park is required" />}

        <Input
          placeholder="Image"
          name="image"
          formRef={register("Something")}
        />
        {errors.avatar && <FormError errorMessage="Avatar is required" />}

        <Input
          placeholder="Latitude"
          name="latitude"
          formRef={register("Something")}
        />
        {errors.latitude && <FormError errorMessage="Latitude is required" />}

        <Input
          placeholder="Longitude"
          name="longitude"
          formRef={register("Something")}
        />
        {errors.longitude && <FormError errorMessage="Longitude is required" />}
      
      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}