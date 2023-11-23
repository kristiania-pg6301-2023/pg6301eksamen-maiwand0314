export async function fetchJson(url, params) {
    const res = await fetch(url, params);
    if (!res.ok) {
      throw new Error("Can't fetch " + url);
    }
    return await res.json();
  }