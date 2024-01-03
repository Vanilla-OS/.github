import { writeFile } from 'fs/promises';

async function fetchContributorsData() {
  let contributors = [];

  const headers = {
    'Authorization': `token ${process.env.token}`
  };

  try {
    console.log('Fetching organization repositories...');
    const orgReposResponse = await fetch('https://api.github.com/orgs/Vanilla-OS/repos', { headers });
    const orgReposData = await orgReposResponse.json();

    for (const repo of orgReposData) {
      console.log(`Getting data for repository ${repo.name}...`);
      const contributorsResponse = await fetch(repo.contributors_url, { headers });
      const contributorsData = await contributorsResponse.json();

      for (const contributor of contributorsData) {
        if (!contributors.some((c) => c.login === contributor.login)) {
          console.log(`Getting data for the contributor ${contributor.login}`);
          const userDetailsResponse = await fetch(`https://api.github.com/users/${contributor.login}`, { headers });
          const userDetails = await userDetailsResponse.json();

          contributors.push({
            id: contributor.id,
            name: userDetails.name || contributor.login,
            login: contributor.login,
            avatar_url: contributor.avatar_url,
            profile_url: contributor.html_url,
          });
        }
      }
    }

    console.log('Writing contributors data to file...');
    await writeFile('contributors.json', JSON.stringify(contributors, null, 2));
    console.log('Script completed successfully! Check contributors.json file.');
  } catch (error) {
    console.error('Error fetching contributors:', error);
  }
}

fetchContributorsData();
