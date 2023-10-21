import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    console.log("signing in...");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    console.log("signing in with google...");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    console.log("signing out...");
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser?.email);

  return (
    <div>
      {auth.currentUser && <h1>Hello {auth?.currentUser?.email}</h1>}
      <input
        placeholder="email..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="password..."
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}>Sign In With Google</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Auth;
