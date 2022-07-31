import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { IFeedback, IFeedbackField } from "../models/IFeedback";
import { useValidation } from "./useValidation";

interface IUseForm<IFeedback> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
  isFormError: boolean;
  form: IFeedback;
}

export const useForm = (initialState: IFeedback): IUseForm<IFeedback> => {
  const [form, setFrom] = useState(initialState);
  const [isFormError, setIsFormError] = useState(true);

  const { updateValid } = useValidation();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const errorMessage = updateValid(value, initialState[name as keyof IFeedback].validations) || "";

    const newField: IFeedbackField = {
      value,
      errorMessage,
      validations: form[name as keyof IFeedback].validations
    };

    setFrom((prev) => ({ ...prev, [name]: newField }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFrom(initialState);
    setIsFormError(true);
  };

  useEffect(() => {
    //Есть ли хотябы 1 ошибка
    const localIsFormError = Object.values(form).some((field) => field.errorMessage !== "");
    //Есть ли пустое поле
    const isEmptyFields = Object.values(form).some((field) => field.value === "");

    setIsFormError(localIsFormError || isEmptyFields);
  }, [form]);

  useEffect(() => {
    setIsFormError(true);
  }, []);

  return {
    onChange,
    onSubmit,
    isFormError,
    form
  };
};
