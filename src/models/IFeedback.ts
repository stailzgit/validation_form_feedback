import { IValidations } from "../HOOKS/useValidation";

export type IFeedback = {
  name: IFeedbackField;
  email: IFeedbackField;
  phone: IFeedbackField;
  dateOfBirth: IFeedbackField;
  message: IFeedbackField;
};

export type IFeedbackField = {
  value: string;
  errorMessage: string;
  validations: IValidations;
};
