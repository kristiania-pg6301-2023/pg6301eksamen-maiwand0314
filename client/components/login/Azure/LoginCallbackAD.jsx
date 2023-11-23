import { useEffect } from "react";
import { fetchJson } from "../../utils/fetchJson";
import { useNavigate } from "react-router-dom";


export function LoginCallbackAD({ onLogin}) {
  const navigate = useNavigate();
  async function handleCallback() {
    let hash = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1)),
    );
    let { access_token, code } = hash;

    if (!access_token && code) {
        let applicationConfig=await fetchJson('/api/config')
        const { openid_configuration, client_id } = applicationConfig;
      const { token_endpoint } = await fetchJson(`${openid_configuration}?response_type=code`);
      const code_verifier = window.sessionStorage.getItem("code_verifier");
      const redirect_uri = window.location.origin + "/login/azure";

      const payload = new URLSearchParams({
        client_id,
        code,
        code_verifier,
        grant_type: "authorization_code",
        redirect_uri
      });

      const res = await fetch(token_endpoint, {
        method: "POST",
        body: payload
      });

      if(res.ok) {
        const response = await res.json();
        access_token = response.access_token;
      } else {
        console.log("Token exchange failed: " + res.statusText);
        console.log(await res.json());
      }
    }

    if (!access_token) {
      console.log("No access token");
      return;
    }

    const res = await fetch("/api/login/AD", {
      method: "POST",
      body: JSON.stringify({ access_token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Login failed " + res.statusText);
    }
    let userData=await res.json()
    console.log("userData",userData)
    window.sessionStorage.setItem("user",JSON.stringify({name:userData.user.Name,picture:userData.user.picturePath,id:userData.user._id,isEntra:true}))
    navigate("/chat");
  }
  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Please wait while we redirect you ...</div>;
}
