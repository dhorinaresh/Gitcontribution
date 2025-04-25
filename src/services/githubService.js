// List of repositories to fetch data from
const REPOSITORIES = [
  "LobbyClientUI-R1",
  "LobbyAdminServerAPI-R1",
  "LobbyHeartbeatAutomationUI-R1",
  "HubspotIntegrationAPI-R1",
  "LobbyMiddlewareAPI-R1",
  "LobbyAdminPanelUI-R1",
  "LobbyServerAPI-R1",
];

// List of users to track contributions
const USERS = [
  "ArulTEG",
  "ArunPrem_APP",
  "deepesh-tech",
  "Mukul Kumar",
  "suneelkumar02",
];

export async function fetchAllCommits() {
  const GITHUB_PAT = process.env.REACT_APP_GITHUB_PAT;
  const ORG_NAME = process.env.REACT_APP_ORG_NAME;

  let allCommits = [];

  for (const repo of REPOSITORIES) {
    const url = `https://api.github.com/repos/${ORG_NAME}/${repo}/commits`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_PAT}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!response.ok) {
        console.error(
          `Error fetching commits from ${repo}: ${response.status}`
        );
        continue; // Skip this repo if there's an error
      }

      const commits = await response.json();

      // Filter commits by users
      const filteredCommits = commits.filter(
        (commit) => commit.author && USERS.includes(commit.author.login)
      );

      allCommits = [...allCommits, ...filteredCommits];
    } catch (error) {
      console.error(`Error fetching commits from ${repo}:`, error);
    }
  }

  return allCommits;
}
