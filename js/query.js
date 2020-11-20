const REPO_INFO = `
query {
    viewer {
      login
      name
      bio
      avatarUrl
      status {
        emoji
        emojiHTML
        message
      }
      repositories(first: 20) {
        nodes {
          name
          forkCount
          description
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
