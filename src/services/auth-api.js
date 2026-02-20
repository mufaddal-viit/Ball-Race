function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function loginWithUsername({ username }) {
  const cleanUsername = username?.trim();

  await delay(550);

  if (!cleanUsername || cleanUsername.length < 3) {
    throw new Error("Username must contain at least 3 characters.");
  }

  return {
    user: {
      id: `player-${cleanUsername.toLowerCase()}`,
      username: cleanUsername,
      rankTitle: "Rookie Striker",
      favoriteMode: "Precision Sprint",
    },
  };
}
