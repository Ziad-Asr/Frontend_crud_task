import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://sendmail.iconsjo.space/REST/ppl",
});

export default baseURL;
