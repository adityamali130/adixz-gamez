import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
serverTimestamp,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

import {
getAuth,
signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyBOgFstOJanpdNzg-2FNzO87AmbKe4hLvo",

authDomain: "aditya-community-room.firebaseapp.com",

projectId: "aditya-community-room",

storageBucket: "aditya-community-room.firebasestorage.app",

messagingSenderId: "899916074499",

appId: "1:899916074499:web:8f779ed8b5f74848294836"

};

const app=initializeApp(firebaseConfig);

const db=getFirestore(app);

const auth=getAuth(app);

signInAnonymously(auth)
.then(()=>{
console.log("login success");
})
.catch((error)=>{
console.log(error);
});

const joinScreen=document.getElementById("joinScreen");

const chatApp=document.getElementById("chatApp");

const joinBtn=document.getElementById("joinBtn");

const usernameInput=document.getElementById("usernameInput");

const sendBtn=document.getElementById("sendBtn");

const messageInput=document.getElementById("messageInput");

const chatBox=document.getElementById("chatBox");

let currentUser="";

joinBtn.addEventListener("click",()=>{

const username=usernameInput.value.trim();

if(username===""){
alert("Please enter your name");
return;
}

currentUser=username;

joinScreen.style.display="none";

chatApp.style.display="flex";

});

sendBtn.addEventListener("click",sendMessage);

messageInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){
sendMessage();
}

});

async function sendMessage(){

const message=messageInput.value.trim();

if(message===""){
return;
}

await addDoc(collection(db,"messages"),{

username:currentUser,

text:message,

createdAt:serverTimestamp()

});

messageInput.value="";

}

const q=query(
collection(db,"messages"),
orderBy("createdAt")
);

onSnapshot(q,(snapshot)=>{

chatBox.innerHTML="";

snapshot.forEach((doc)=>{

const data=doc.data();

const messageDiv=document.createElement("div");

messageDiv.classList.add("message");

messageDiv.innerHTML=`

<div class="username">
${data.username}
</div>

<div>
${data.text}
</div>

`;

chatBox.appendChild(messageDiv);

});

chatBox.scrollTop=chatBox.scrollHeight;

});

setTimeout(()=>{

const welcome=document.getElementById("welcome");

if(welcome){

welcome.style.opacity="0";

setTimeout(()=>{
welcome.style.display="none";
},2000);

}

},3000);
