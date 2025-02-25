import http from "./httpService";

function uploadSkills(data) {
  return http.post("/candidate/submit", data);
}

function feedback(data) {
  return http.post("/candidate/rating", data);
}

function additionalInfo(data) {
  return http.post("candidate/CandidatePreference", data);
}

function talentProfile() {
  return http.get("/candidate/getProfile");
}

const exportObject = {
  uploadSkills,
  feedback,
  additionalInfo,
  talentProfile,
};

export default exportObject;
