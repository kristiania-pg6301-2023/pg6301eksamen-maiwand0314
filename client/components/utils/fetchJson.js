export async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Can't fetch " + url);
    }
    return await res.json();
  }