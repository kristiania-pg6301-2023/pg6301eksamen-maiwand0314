import React, { useState,useEffect } from 'react';
import { fetchJson } from '../../utils/fetchJson';

function LoginWithGoogle() {
    const OPENID_DISCOVERY_URL =
  "https://accounts.google.com/.well-known/openid-configuration";
const CLIENT_ID =
  "463082926510-bt138hr51bnht0g20kh7bo48pot202js.apps.googleusercontent.com";
    const [authorizationUrl, setAuthorizationUrl] = useState();
    async function generateAuthorizationUrl() {
      const discoveryDoc = await fetchJson(OPENID_DISCOVERY_URL);
      const parameters = {
        response_type: "token",
        client_id: CLIENT_ID,
        scope: "profile email",
        redirect_uri: window.location.origin + "/login/google",
      };
      setAuthorizationUrl(
        discoveryDoc.authorization_endpoint +
          "?" +
          new URLSearchParams(parameters),
      );
    }
  
    useEffect(() => {
      generateAuthorizationUrl();
    }, []);
  
    return <a className='home__cta' href={authorizationUrl}>Log in with Google</a>;
  }
export default LoginWithGoogle