import React from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Error } from "@/components";

type InputProps = {
  input_type: string;
  input_placeholder: string;
  label: string;
  required: boolean;
  name: string;
};

const Input: FC<InputProps> = ({
  input_type,
  input_placeholder,
  label,
  required,
  name,
}) => {
  /**
   * Component States
   */
  const {
    register,
    formState: { errors },
  } = useForm();

  console.log("errors", errors);

  return (
    <section>
      {input_type != "text" ? (
        <div className="relative">
          <textarea
            {...register(name, { required: true, maxLength: 150 })}
            className="input peer"
            placeholder={input_placeholder}
            rows={1}
            // cols={}
          ></textarea>
          <label className="input_label">{label}</label>
        </div>
      ) : (
        <div className="relative">
          <input
            type={input_type}
            className="input peer"
            placeholder={input_placeholder}
            {...register(name, { required: true })}
          />
          <label className="input_label">{label}</label>

          {errors[name] && <Error error_message="Required." />}
        </div>
      )}
    </section>
  );
};

export default Input;
