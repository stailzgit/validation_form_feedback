import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import FieldForm from "./components/fieldForm";
import { useForm } from "./HOOKS/useForm";
import { IFeedback } from "./models/IFeedback";
import { FormEvent } from "react";
import { useFetching } from "./HOOKS/useFetching";
import FeedbackService from "./api/FeedbackService";

const initialFormState: IFeedback = {
  name: {
    value: "",
    errorMessage: "",
    validations: { oneSpaceDelim: true, countWords: 2, minLengthWords: 3, maxLengthWords: 30 }
  },
  email: { value: "", errorMessage: "", validations: { isEmpty: true, isEmail: true } },
  phone: { value: "", errorMessage: "", validations: { isEmpty: true, isPhone: true } },
  dateOfBirth: { value: "", errorMessage: "", validations: { isEmpty: true } },
  message: { value: "", errorMessage: "", validations: { isEmpty: true, minLength: 10, maxLength: 300 } }
};

function App() {
  const { onChange, onSubmit, form, isFormError } = useForm(initialFormState);
  const [successFeedback, setSuccessFeedback] = useState("");

  const { name, email, phone, dateOfBirth, message } = form;

  const [fetchFeedback, isSentLoading, sentError] = useFetching(async (form) => {
    const { status, message } = await FeedbackService.sentFeedback(form);
    if (status === "success") {
      setSuccessFeedback(message);
    } else if (status === "error") {
    }

    setTimeout(() => {
      setSuccessFeedback("");
    }, 4000);
  });

  const sentFeedback = (e: FormEvent<Element>) => {
    onSubmit(e);
    fetchFeedback(form);
  };

  const isDisableButton = isFormError || (!isFormError && isSentLoading);

  return (
    <div className="App">
      <form className="form" id="form" onSubmit={sentFeedback}>
        <h1>Feedback form</h1>

        <FieldForm
          name="name"
          value={name.value}
          error={name.errorMessage}
          placeholder="Your name surname"
          className="form__name"
          onChange={onChange}
        />
        <FieldForm
          name="email"
          value={email.value}
          error={email.errorMessage}
          placeholder="Your email"
          onChange={onChange}
        />
        <FieldForm
          name="phone"
          type="phone"
          value={phone.value}
          error={phone.errorMessage}
          placeholder="Your phone +7(000)0000000"
          onChange={onChange}
        />

        <FieldForm
          type="date"
          name="dateOfBirth"
          error={dateOfBirth.errorMessage}
          value={dateOfBirth.value}
          placeholder="Your date of birth dd.mm.yyyy"
          onChange={onChange}
        />
        <FieldForm
          type="textarea"
          name="message"
          value={message.value}
          error={message.errorMessage}
          className="form__message"
          placeholder="Your message"
          onChange={onChange}
        />

        {isSentLoading ? (
          <div className="fetch-loader"></div>
        ) : (
          <button disabled={isDisableButton} type="submit" className="form__btn">
            Sent feedback
          </button>
        )}

        {sentError && !isSentLoading && <div style={{ color: "red", fontWeight: 700 }}>{sentError}</div>}
        {successFeedback && <div style={{ color: "green", fontWeight: 700 }}>{successFeedback}</div>}
      </form>
    </div>
  );
}

export default App;
