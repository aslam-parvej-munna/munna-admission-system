import {
    db,
    collection,
    getDocs,
    deleteDoc,
    doc
} from "./firebase.js";

const table = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const search = document.getElementById("search");

let students = [];

// =========================
// Load Students
// =========================

async function loadStudents() {

    table.innerHTML = "";

    const snapshot = await getDocs(collection(db, "students"));

    students = [];

    let sl = 1;

    snapshot.forEach((student) => {

        const data = student.data();

        students.push({
            id: student.id,
            ...data
        });

        table.innerHTML += `
        <tr>

        <td>${sl++}</td>

        <td>${data.name || ""}</td>

        <td>${data.mobile || ""}</td>

        <td>${data.course || ""}</td>

        <td>${data.createdAt ?
        data.createdAt.toDate().toLocaleDateString()
        : "-"}</td>

        <td>

        <button class="view-btn">
        View
        </button>

        <button
        class="delete-btn"
        onclick="deleteStudent('${student.id}')">

        Delete

        </button>

        </td>

        </tr>
        `;

    });

    totalStudents.innerText = students.length;

}

loadStudents();


// =========================
// Delete Student
// =========================

window.deleteStudent = async function(id){

    if(confirm("Delete this student?")){

        await deleteDoc(doc(db,"students",id));

        loadStudents();

    }

}


// =========================
// Search
// =========================

search.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

const rows=document.querySelectorAll("#studentTable tr");

rows.forEach(row=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(keyword)
? ""
: "none";

});

});
