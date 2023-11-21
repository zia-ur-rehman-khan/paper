/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";
import { getDatabase } from "firebase/database";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const firestore = getFirestore(app);
    const dbInstance = collection(firestore, "paperTest");

    try {
      await addDoc(dbInstance, {
        emailName: email,
        idName: password,
      });
      console.log("Document added successfully!");
      alert("wrong email and password");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
        />
        <h1>Login with gmail account</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">Sign In</button>
        </form>
      </header>
    </div>
  );
}
