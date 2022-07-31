import { useEffect, useState, memo, ChangeEvent, Dispatch, SetStateAction, FocusEventHandler } from "react";
import { useValidation, IValidations } from "../HOOKS/useValidation";

type FieldFormProps = {
  type?: string;
  error: string;
  value: string;
  [x: string]: any;
};

const FieldForm = (props: FieldFormProps) => {
  const { type, value, error, ...inputProps } = props;

  // const { mainError } = useValidation(value, validations);
  const [isDirty, setDirty] = useState(false);

  const onBlur = () => {
    setDirty(true);
  };

  // useEffect(() => {
  //   setIsError(mainError);
  // }, [mainError]);

  return (
    <>
      {type === "textarea" ? (
        <textarea value={value} onBlur={onBlur} {...inputProps} />
      ) : (
        <input value={value} onBlur={onBlur} type={type ?? "text"} {...inputProps} />
      )}

      {isDirty && error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};

export default memo(FieldForm);
