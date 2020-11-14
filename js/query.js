const REPO_INFO = `
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
`;

export { REPO_INFO };
