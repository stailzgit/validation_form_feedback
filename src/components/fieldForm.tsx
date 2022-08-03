import { useState, memo } from "react";

type FieldFormProps = {
  type?: string;
  error: string;
  value: string;
  [x: string]: any;
};

const FieldForm = (props: FieldFormProps) => {
  const { type, value, error, className, ...fieldProps } = props;

  const fieldClass = "form__field " + className;

  const [isDirty, setDirty] = useState(false);

  const onBlur = () => {
    setDirty(true);
  };

  return (
    <div className="form__field-wrap">
      {type === "textarea" ? (
        <textarea className={fieldClass} value={value} onBlur={onBlur} {...fieldProps} />
      ) : (
        <input className={fieldClass} value={value} onBlur={onBlur} type={type ?? "text"} {...fieldProps} />
      )}
      {isDirty && error && <div className="field-error">{error}</div>}
    </div>
  );
};

export default memo(FieldForm);
