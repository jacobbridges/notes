import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import styled from 'styled-components'

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({theme})=> theme.primaryDark};
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginWindow = styled.div`
  width: 100%;
  max-width: 400px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
`

export function Login(props: any) {
  return (
  <Wrap>
    <LoginWindow>
      <h1>Notes App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </LoginWindow>
  </Wrap>);
}

export default Login