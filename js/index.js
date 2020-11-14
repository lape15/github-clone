import { REPO_INFO } from "./query";

const token = process.env.API_KEY;
let profile;
let image = document.querySelector("img");
const imgContainer = document.querySelector(".profile-img-con");
const profileName = document.querySelector(".profile-name");
let loading = false;
const URL = "https://api.github.com/graphql";

const fetchRepositories = (url) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      query: REPO_INFO,
    }),
  });
};

const response = fetchRepositories(URL);
loading = true;
response
  .then((response) => response.json())
  .then((response) => {
    loading = false;
    profile = response.data;
    console.log(profile);
    image.src = profile.viewer.avatarUrl;
    profileName.innerText = profile.viewer.name;
  });
