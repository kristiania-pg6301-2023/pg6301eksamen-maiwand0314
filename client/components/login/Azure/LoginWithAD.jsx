import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/fetchJson";


export function LoginWithAD() {
  async function loadAuthorizationUrl() {
    let applicationConfig=await fetchJson(window.location.origin + "/api/config")
    const { openid_configuration, client_id } = applicationConfig;
    const { authorization_endpoint } = await fetchJson(openid_configuration);
    const redirect_uri = window.location.origin + "/login/azure";
    const state = randomString(50);
    window.sessionStorage.setItem("state", state);
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);
    setAuthorizationUrl(
      authorization_endpoint +
        "?" +
        new URLSearchParams({
          response_mode: "fragment",
          response_type: "code",
          scope: "profile openid",
          client_id,
          redirect_uri,
          state,
          code_challenge: await sha256(code_verifier),
          code_challenge_method: "S256",
        }),
    );
  }

  const [authorizationUrl, setAuthorizationUrl] = useState();

  useEffect(() => {
    loadAuthorizationUrl();
  }, []);

  return (
    <div>
      <a className='home__cta' href={authorizationUrl}>Log In With AD</a>
    </div>
  );
}

export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

export async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string),
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
