import { REPO_INFO } from "./query";

const token = process.env.API_KEY;
let profile = null;
let image = document.querySelector("img");
const imgContainer = document.querySelector(".profile-img-con");
const profileName = document.querySelector(".profile-name");
let loading = false;
const userName = document.querySelector(".user-name");
const bio = document.querySelector(".bio");
const URL = "https://api.github.com/graphql";
const activeTab = document.querySelector(".active");

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

    if (!loading && profile !== null) {
      image.src = profile.viewer.avatarUrl;
      profileName.innerText = profile.viewer.name;
      userName.innerText = profile.viewer.login;
      bio.innerText = profile.viewer.bio;
      var repoCount = document.createElement("SPAN");
      let count = profile.viewer.repositories.nodes.length;
      repoCount.innerText = count;
      repoCount.classList.add("count");
      activeTab.appendChild(repoCount);
      let repositories = profile.viewer.repositories.nodes;
      console.log(repositories);
    }
  });
