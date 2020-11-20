const createListItem = (repo) => {
  function monthString(a) {
    const months = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    return months[a];
  }

  function timeDiff(curr, prev) {
    const miliDate = new Date(prev).getTime();

    const todaymiliDate = curr.getTime();

    const milliDifference = todaymiliDate - miliDate;

    let miliDiffHour = milliDifference / 3600000;

    const year = 24 * 365;
    const week = 24 * 7;

    if (miliDiffHour < 24) {
      return ` ${miliDiffHour} Hours ago`;
    } else if (miliDiffHour >= 24 && miliDiffHour < 24 * 7) {
      return `${Math.round(miliDiffHour / 24)} days ago`;
    } else if (miliDiffHour >= 24 * 7 && miliDiffHour < 24 * 30.5) {
      return `updated ${Math.round(miliDiffHour / week)} weeks ago`;
    } else if (
      miliDiffHour > 24 * 30.5 &&
      miliDiffHour <= 24 * 365 &&
      miliDiffHour / year < 0.9
    ) {
      return (
        "on" +
        " " +
        monthString(new Date(prev).getMonth() + 1) +
        " " +
        new Date(prev).getDate() +
        " "
      );
    } else {
      return (
        "on" +
        " " +
        monthString(new Date(prev).getMonth()) +
        " " +
        new Date(prev).getDate() +
        ", " +
        new Date(prev).getFullYear() +
        " "
      );
    }
  }

  let li = document.createElement("LI");
  let p = document.createElement("p");
  let h4 = document.createElement("h4");
  let div = document.createElement("div");
  let divLanguage = document.createElement("div");
  let spanLanguage = document.createElement("span");
  let languageColour = document.createElement("span");
  let divStarred = document.createElement("div");
  let svgSpan = document.createElement("span");
  let starredCount = document.createElement("span");
  let divForked = document.createElement("div");
  let forkedCount = document.createElement("span");
  let divUpdated = document.createElement("div");
  let updatedSpan = document.createElement("span");

  //create star-svg

  let svgStar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgStar.setAttribute("viewBox", "0 0 16 16");
  svgStar.setAttribute("width", "16");
  svgStar.setAttribute("height", "16");
  svgStar.setAttribute("fill", "#586069");
  let starPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  starPath.setAttributeNS(null, "fill-rule", "evenodd");
  starPath.setAttributeNS(
    null,
    "d",
    "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
  );

  svgStar.appendChild(starPath);

  //creat forked-svg
  let svgFork = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgFork.setAttribute("viewBox", "0 0 16 16");
  svgFork.setAttribute("width", "14");
  svgFork.setAttribute("height", "14");
  svgFork.setAttribute("fill", "#586069");
  let forkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  forkPath.setAttributeNS(null, "fill-rule", "evenodd");
  forkPath.setAttributeNS(
    null,
    "d",
    "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
  );
  svgFork.appendChild(forkPath);

  h4.textContent = repo.name;
  p.textContent = repo.description ? repo.description : "";
  spanLanguage.textContent = repo.primaryLanguage
    ? repo.primaryLanguage.name
    : "";

  divLanguage.appendChild(languageColour);
  divLanguage.appendChild(spanLanguage);

  if (repo.primaryLanguage !== null) {
    if (repo.primaryLanguage.name === "JavaScript") {
      languageColour.style.backgroundColor = "#f1e05a";
    } else if (repo.primaryLanguage.name === "CSS") {
      languageColour.style.backgroundColor = "#563d7c";
    } else if (repo.primaryLanguage.name === "HTML") {
      languageColour.style.backgroundColor = "#e34c26";
    } else {
      languageColour.style.backgroundColor = "#4F5D95";
    }
  }

  starredCount.textContent = repo.stargazerCount;
  forkedCount.textContent = repo.forkCount;

  let lastUpdated = timeDiff(new Date(), repo.updatedAt);

  updatedSpan.textContent = `Updated  ${lastUpdated}`;

  svgSpan.appendChild(svgStar);
  divStarred.appendChild(svgSpan);
  divStarred.appendChild(starredCount);
  divForked.appendChild(svgFork);
  divForked.appendChild(forkedCount);
  divUpdated.appendChild(updatedSpan);

  // appending to div item

  repo.primaryLanguage ? div.appendChild(divLanguage) : "";
  repo.stargazerCount > 0 ? div.appendChild(divStarred) : "";
  repo.forkCount > 0 ? div.appendChild(divForked) : "";
  div.appendChild(divUpdated);

  //adding css classes

  li.classList.add("list-item");
  div.classList.add("list-item-info");
  divLanguage.classList.add("info-item");
  divStarred.classList.add("info-item");
  divForked.classList.add("info-item");
  divUpdated.classList.add("info-item");
  h4.classList.add("repo-name");
  p.classList.add("repo-info");
  languageColour.classList.add("language-color");
  starredCount.classList.add("starred-count");

  // appending to individual repo

  li.appendChild(h4);
  li.appendChild(p);
  li.appendChild(div);

  return li;
};

export { createListItem };
