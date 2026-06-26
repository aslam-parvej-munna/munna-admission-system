import {
db,
storage,
collection,
addDoc,
serverTimestamp,
ref,
uploadBytes,
getDownloadURL
} from "./firebase.js";


const form = document.getElementById("admissionForm");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

try{

const photo=document.getElementById("photo").files[0];

let photoURL="";

if(photo){

const photoRef=ref(storage,"photos/"+Date.now()+"_"+photo.name);

await uploadBytes(photoRef,photo);

photoURL=await getDownloadURL(photoRef);

}

await addDoc(collection(db,"students"),{

name:document.getElementById("name").value,

father:document.getElementById("father").value,

mother:document.getElementById("mother").value,

mobile:document.getElementById("mobile").value,

email:document.getElementById("email").value,

course:document.getElementById("course").value,

photo:photoURL,

createdAt:serverTimestamp()

});

alert("Admission Submitted Successfully");

form.reset();

}catch(err){

console.log(err);

alert("Failed!");

}

});
