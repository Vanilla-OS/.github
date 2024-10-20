type Repo = {
  name: string;
  contributors_url: string;
};

type Contributor = {
  id: number;
  login: string;
};

type UserDetails = {
  id: number;
  name: string | null;
  login: string;
};

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${Deno.env.get("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function fetchContributorsData(): Promise<void> {
  const contributorsMap: Map<
    string,
    { id: number; name: string; login: string }
  > = new Map();

  try {
    console.log("Fetching organization repositories...");
    const orgReposData = await fetchData<Repo[]>(
      "https://api.github.com/orgs/Vanilla-OS/repos",
    );

    const contributorPromises = orgReposData.map(async (repo) => {
      console.log(`Getting data for repository ${repo.name}...`);
      const contributorsData = await fetchData<Contributor[]>(
        repo.contributors_url,
      );

      const userDetailsPromises = contributorsData.map(async (contributor) => {
        if (!contributorsMap.has(contributor.login)) {
          console.log(`Getting data for the contributor ${contributor.login}`);
          const userDetails = await fetchData<UserDetails>(
            `https://api.github.com/users/${contributor.login}`,
          );

          contributorsMap.set(contributor.login, {
            id: contributor.id,
            name: userDetails.name || contributor.login,
            login: contributor.login,
          });
        }
      });

      await Promise.all(userDetailsPromises);
    });

    await Promise.all(contributorPromises);

    console.log("Writing contributors data to file...");
    const encoder = new TextEncoder();
    const data = encoder.encode(
      JSON.stringify(
        Array.from(contributorsMap.values()).sort((a, b) => a.id - b.id),
        null,
        2,
      ),
    );
    await Deno.writeFile("contributors.json", data);
    console.log("Script completed successfully! Check contributors.json file.");
  } catch (error) {
    console.error("Error fetching contributors:", error);
  }
}

fetchContributorsData();
