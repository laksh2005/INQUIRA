import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgKfQny99YECTNcTbRBmDmVB3WXYG4XtI",
  authDomain: "galbot-16748.firebaseapp.com",
  projectId: "galbot-16748",
  storageBucket: "galbot-16748.appspot.com",
  messagingSenderId: "739757605471",
  appId: "1:739757605471:web:1a465ea80b44eff04951ea"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;