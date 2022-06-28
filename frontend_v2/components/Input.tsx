import { useForm, SubmitHandler } from "react-hook-form";


interface InputProps {
    placeholder: string;
    name: string;
    formRef: any;
  }
  
  export default function Input() {
    const { register, handleSubmit } = useForm<InputProps>();

    return (
      <input
        className="rounded p-2 text-xl w-full mb-2"
        {...register("formRef")}
        // name={props.name}
        placeholder="something"
        // ref={props.formRef}
      />
    );
  }