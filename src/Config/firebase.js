// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCXUwLuR2nhKN1ukfFGx31MptVmSaR4SZ8",
  authDomain: "chat-app-5694b.firebaseapp.com",
  projectId: "chat-app-5694b",
  storageBucket: "chat-app-5694b.appspot.com",
  messagingSenderId: "466013704195",
  appId: "1:466013704195:web:c0ba0db98928859a9b3e36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (username,email,password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"may i help you",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
    } catch(error){
   console.error(error)

   toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
}

const login = async (email,password) => {
  try{

    await signInWithEmailAndPassword(auth,email,password);
  }catch(error){

  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () =>{
    try {
        signOut(auth);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
}

export {signup, login, logout,auth,db} 