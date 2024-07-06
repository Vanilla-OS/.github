import { writeFile } from "fs/promises";

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function fetchContributorsData() {
  const contributors = [];

  try {
    console.log("Fetching organization repositories...");
    const orgReposData = await fetchData(
      "https://api.github.com/orgs/Vanilla-OS/repos"
    );

    for (const repo of orgReposData) {
      console.log(`Getting data for repository ${repo.name}...`);
      const contributorsData = await fetchData(repo.contributors_url);

      for (const contributor of contributorsData) {
        if (!contributors.some((c) => c.login === contributor.login)) {
          console.log(`Getting data for the contributor ${contributor.login}`);
          const userDetails = await fetchData(
            `https://api.github.com/users/${contributor.login}`
          );

          contributors.push({
            id: contributor.id,
            name: userDetails.name || contributor.login,
            login: contributor.login,
          });
        }
      }
    }

    console.log("Writing contributors data to file...");
    await writeFile("contributors.json", JSON.stringify(contributors, null, 2));
    console.log("Script completed successfully! Check contributors.json file.");
  } catch (error) {
    console.error("Error fetching contributors:", error);
  }
}

fetchContributorsData();
