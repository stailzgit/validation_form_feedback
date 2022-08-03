import { useState } from "react";
import { IFeedback } from "../models/IFeedback";

type IFormFetchingCallback = (form: IFeedback) => void;

export const useFetching = (callback: IFormFetchingCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (form: IFeedback) => {
    setError("");
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await callback(form);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsLoading(false);
      }
    }, 200);
  };

  return [fetching, isLoading, error] as const;
};
