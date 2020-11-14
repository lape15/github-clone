const token = process.env.API_KEY;
let profile;
let image = document.querySelector("img");
const imgContainer = document.querySelector(".profile-img-con");

fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  },
  body: JSON.stringify({
    query: `
      query {
          viewer {
            login
            name
            bio
            avatarUrl
            repositories(first: 20) {
              nodes {
                name
                forkCount
                stargazerCount
                primaryLanguage {
                  name
                }
                updatedAt
              }
            }
          }
        }
      `,
  }),
})
  .then((response) => response.json())
  .then((response) => {
    profile = response.data;
    console.log(profile);
    image.src = profile.viewer.avatarUrl;
  });
