import axios from "axios";

const BACKEND_API = "https://ctp-hack-wjfg.vercel.app/api/chat";
const QUESIONARE_API = "https://ctp-hack-wjfg.vercel.app/api/questionare";

class chatService {
  sendMessage(message) {
    return axios.post(BACKEND_API, { message: message });
  }

  getQuestionare(questionData) {
    return axios.post(QUESIONARE_API, { questionData: questionData });
  }
}

export default new chatService();
