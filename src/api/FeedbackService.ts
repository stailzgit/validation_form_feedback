import { IFeedback } from "../models/IFeedback";

type ISentFeedbackReturn = {
  status: string;
  message: string;
};

export default class FeedbackService {
  static async sentFeedback(form: IFeedback): Promise<ISentFeedbackReturn> {
    return new Promise((res, rej) => {
      setTimeout(() => res({ status: "success", message: "Feedback success received" }), 1000);
      // setTimeout(() => rej({ status: "error", message: "Something error: Feedback not received" }), 1000);
    });
  }
}
