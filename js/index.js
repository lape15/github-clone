import { REPO_INFO } from "./query";
import { createListItem } from "./listItem";

const token = process.env.API_KEY;
let profile = null;
let image = document.querySelector(".img");
const imgContainer = document.querySelector(".profile-img-con");
const profileName = document.querySelector(".profile-name");
let loading = false;
const userName = document.querySelector(".user-name");
const bio = document.querySelector(".bio");
const URL = "https://api.github.com/graphql";
const activeTab = document.querySelector(".active");
const repoTitle = document.querySelector(".repo-title");
const repositoryContainer = document.querySelector(".repo-container");
const avatar = document.querySelector(".avatar");

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
    if (!loading && profile !== null) {
      avatar.src = profile.viewer.avatarUrl;
      avatar.alt = profile.viewer.login;
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
      repositories.forEach((repository) => {
        let list = createListItem(repository);
        repositoryContainer.appendChild(list);
      });
    }
  });

var tabs = document.querySelector(".tabs");
var options = {
  root: null,
  rootMargin: "0px",
  threshold: [0, 1],
};
var observer = new IntersectionObserver((enteries) => {
  enteries.forEach((entry) => {
    if (entry.intersectionRatio === 0) {
      console.log(entry);
      entry.target.classList.add("hide");
      observer.unobserve(entry.target);
    } else if (entry.intersectionRatio === 1) {
      console.log(entry);
      entry.target.classList.remove("hide");
    }
  });
}, options);
observer.observe(tabs);

// const listenScrollEvent = (e) => {
//   if (window.scrollY >= 400) {
//     console.log("Heyyy");
//   } else if (window.scrollY < 400) {
//     console.log("Hi");
//   }
// };

// window.addEventListener("scroll", listenScrollEvent);
