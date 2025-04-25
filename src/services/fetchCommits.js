export async function fetchContributionData(selectedOrg, selectedRepo, selectedUser) {
    if (!selectedOrg || !selectedRepo || !selectedUser) {
        console.error("❌ Missing filters: Organization, Repository, or User not selected.");
        return [];
    }

    const TOKEN = process.env.REACT_APP_GITHUB_PAT;
    const baseUrl = `https://api.github.com/repos/${selectedOrg}/${selectedRepo}`;

    try {
        // Step 1: Fetch commits by user
        const commitsRes = await fetch(`${baseUrl}/commits?author=${selectedUser}&per_page=100`, {
            headers: { Authorization: `token ${TOKEN}` },
        });

        if (!commitsRes.ok) {
            console.error(`❌ Failed to fetch commits: ${commitsRes.statusText}`);
            return [];
        }

        const commits = await commitsRes.json();

        // Step 2: Get details for each commit (stats: additions, deletions)
        const detailedCommits = await Promise.all(
            commits.map(async (commit) => {
                const commitUrl = `${baseUrl}/commits/${commit.sha}`;
                const res = await fetch(commitUrl, {
                    headers: { Authorization: `token ${TOKEN}` },
                });

                if (!res.ok) {
                    console.warn(`⚠️ Skipping commit ${commit.sha} — ${res.statusText}`);
                    return null;
                }

                const detail = await res.json();
                return {
                    sha: detail.sha,
                    date: detail.commit.author.date,
                    message: detail.commit.message,
                    additions: detail.stats.additions,
                    deletions: detail.stats.deletions
                };
            })
        );

        // Step 3: Clean nulls and aggregate
        const validCommits = detailedCommits.filter(Boolean);
        const totalAdditions = validCommits.reduce((sum, c) => sum + c.additions, 0);
        const totalDeletions = validCommits.reduce((sum, c) => sum + c.deletions, 0);

        return [{
            user: selectedUser,
            repo: selectedRepo,
            commits: validCommits.length,
            additions: totalAdditions,
            deletions: totalDeletions
        }];

    } catch (error) {
        console.error(`❌ Error in fetchContributionData:`, error);
        return [];
    }
}
