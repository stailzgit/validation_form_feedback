export interface IValidations {
  isEmpty?: boolean;
  oneSpaceDelim?: boolean;
  isEmail?: boolean;
  isPhone?: boolean;
  minLength?: number;
  maxLength?: number;
  countWords?: number;
  minLengthWords?: number;
  maxLengthWords?: number;
}

export const useValidation = () => {
  const isEmpty: string = "isEmpty";
  const oneSpaceDelim: string = "oneSpaceDelim";
  const isEmail: string = "isEmail";
  const isPhone: string = "isPhone";
  const minLength: string = "minLength";
  const maxLength: string = "maxLength";
  const countWords: string = "countWords";
  const minLengthWords: string = "minLengthWords";
  const maxLengthWords: string = "maxLengthWords";

  const validityCheck = (value: string) => ({
    [isEmpty]: () => {
      return value.length === 0;
    },

    [oneSpaceDelim]: () => {
      const regexOneSpace = /^([a-zа-я0-9_-]+\s?)*\s*$/;
      // const regexOneSpace = /\s*\S+(\s\S+)?\s*/;
      // const regexOneSpace = /(\s{2,})|[^a-zA-Z']/;
      const t = String(value).toLowerCase();

      const localIsError = !regexOneSpace.test(String(value).toLowerCase());
      return localIsError;
    },

    [isEmail]: () => {
      const regexEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      const isErrorEmail = !regexEmail.test(String(value).toLowerCase());
      return isErrorEmail;
    },

    [isPhone]: () => {
      const regexPhone = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      const localIsError = !regexPhone.test(String(value).toLowerCase());
      return localIsError;
    },

    [minLength]: (minLength: number) => value.length < minLength,

    [maxLength]: (maxLength: number) => value.length > maxLength,

    [countWords]: (countWords: number) => value.trim().split(" ").length !== countWords,

    [minLengthWords]: (minLengthWords: number) => {
      const localIsError = !value
        .trim()
        .split(" ")
        .every((word) => word.length >= minLengthWords);
      return localIsError;
    },

    [maxLengthWords]: (maxLengthWords: number) => {
      const localIsError = !value
        .trim()
        .split(" ")
        .every((word) => word.length <= maxLengthWords);
      return localIsError;
    }
  });

  const updateValid = (value: string, validations: IValidations = {}) => {
    const utilsValidation = validityCheck(value);

    const errorsText = {
      [isEmpty]: "The field cannot be empty",
      [oneSpaceDelim]: "Only 1 space between words",
      [isEmail]: "Invalid email",
      [isPhone]: "Invalid phone",
      [minLength]: `Minimum ${validations["minLength"]} characters`,
      [maxLength]: `Max ${validations["maxLength"]} characters`,
      [countWords]: `Enter ${validations["countWords"]} words (name surname)`,
      [minLengthWords]: `Minimum word length ${validations["minLengthWords"]}`,
      [maxLengthWords]: `Max word length ${validations["maxLengthWords"]} characters`
    };

    for (const validation in validations) {
      const param: any = validations[validation as keyof IValidations];
      const isError = utilsValidation[validation](param);
      if (isError) {
        return errorsText[validation];
      }
    }
    return "";
  };

  return { updateValid };
};
