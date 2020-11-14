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
const repoTitle = document.querySelector(".repo-title");
const repositoryContainer = document.querySelector(".repo-container");

var svg = document.getElementsByTagName("svg")[1];
console.log(svg);

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

function createList(repo) {
  var li = document.createElement("LI");
  var p = document.createElement("p");
  var h6 = document.createElement("H6");
  var div = document.createElement("div");
  var spanLanguage = document.createElement("span");
  var spanStarred = document.createElement("span");
  var starredCount = document.createElement("span");
  var spanForked = document.createElement("span");
  var spanUpdated = document.createElement("span");

  //create star-svg
  let svgStar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgStar.setAttribute("viewBox", "0 0 16 16");
  svgStar.setAttribute("width", "16");
  svgStar.setAttribute("height", "16");
  svgStar.setAttribute("fill", "grey");
  let starPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  starPath.setAttributeNS(null, "fill-rule", "evenodd");
  starPath.setAttributeNS(
    null,
    "d",
    "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
  );

  svgStar.appendChild(starPath);

  h6.textContent = repo.name;
  p.textContent = repo.description ? repo.description : "";
  spanLanguage.textContent = repo.primaryLanguage
    ? repo.primaryLanguage.name
    : "";
  starredCount.textContent = repo.stargazerCount;

  spanStarred.appendChild(svgStar);
  spanStarred.appendChild(starredCount);

  // appending to div item

  div.appendChild(spanLanguage);
  div.appendChild(spanStarred);

  // appending to individual repo

  li.appendChild(h6);
  li.appendChild(p);
  li.appendChild(div);

  return li;
}
const response = fetchRepositories(URL);
loading = true;
response
  .then((response) => response.json())
  .then((response) => {
    loading = false;
    profile = response.data;
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
      repositories.forEach((repository) => {
        let list = createList(repository);
        repositoryContainer.appendChild(list);
      });
      // console.log(repositories);
    }
  });
