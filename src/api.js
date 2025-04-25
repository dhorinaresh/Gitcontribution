// src/api.js
export async function fetchContributions(repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contributors`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
}
