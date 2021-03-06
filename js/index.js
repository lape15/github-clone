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
const statusEmoji = document.querySelector(".profile-emoji");
const emoji = document.querySelector(".emoji");
const message = document.querySelector(".message");

let smallProfileImg = document.querySelector(".small-profile-img");

let smallProfileName = document.querySelector(".small-profile-name");

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
      emoji.innerHTML = profile.viewer.status.emojiHTML;
      message.innerText = profile.viewer.status.message;
      profileName.innerText = profile.viewer.name;
      userName.innerText = profile.viewer.login;
      bio.innerText = profile.viewer.bio;
      var repoCount = document.createElement("SPAN");
      let count = profile.viewer.repositories.nodes.length;
      smallProfileImg.src = profile.viewer.avatarUrl;
      smallProfileName.innerText = profile.viewer.login;
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

// change header class

const headerMenu = document.querySelector(".menu");
const headerForm = document.querySelector("form");
const navMenu = document.querySelector(".nav-right");
let otherMenu = false;

const changeHeaderClass = () => {
  otherMenu = !otherMenu;
  if (otherMenu) {
    headerForm.classList.add("show-menu");
    navMenu.classList.add("show-menu");
  } else {
    headerForm.classList.remove("show-menu");
    navMenu.classList.remove("show-menu");
  }
  // otherMenu = false;
};

console.log(otherMenu);

headerMenu.addEventListener("click", changeHeaderClass);

var tabs = document.querySelector(".tabs");
var header = document.querySelector("header");
var smallProfileCon = document.querySelector(".small-profile-con");

const handler = (entries) => {
  if (entries[0].isIntersecting) {
    tabs.classList.remove("sticky");
  } else {
    tabs.classList.add("sticky");
  }
};

const otherHandler = (entries) => {
  if (entries[0].isIntersecting) {
    smallProfileCon.classList.remove("show-small-profile-con");
  } else {
    smallProfileCon.classList.add("show-small-profile-con");
  }
};
const observer = new window.IntersectionObserver(handler);
const otherObserver = new window.IntersectionObserver(otherHandler);
observer.observe(header);
otherObserver.observe(userName);
