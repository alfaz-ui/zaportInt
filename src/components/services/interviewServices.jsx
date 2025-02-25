import http from "./httpService";

function getQuestion(data) {
  return http.post("/candidate/conversation", data);
}

const exportObject = {
  getQuestion,
};

export default exportObject;
