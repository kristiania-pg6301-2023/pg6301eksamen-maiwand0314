import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function CallbackGoogle() {
  const navigate = useNavigate();
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)),
  );

  async function handleCallback() {
    const { access_token } = callbackParameters;
    const res = await fetch("/api/login/accessToken", {
      method: "POST",
      body: JSON.stringify({ access_token }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to POST access token");
    }
    let userData=await res.json()
    console.log("userData",userData)
    window.sessionStorage.setItem("user",JSON.stringify({name:userData.user.Name,picture:userData.user.picturePath,id:userData.user._id,isEntra:false}))
    navigate("/chat");
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <>
      <div>Please wait while we redirect you...</div>
    </>
  );
}
