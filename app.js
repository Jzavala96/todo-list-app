const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


import { initializeApp } from 'firebase/app';
import { doc, getDocs, addDoc, updateDoc, getFirestore, collection } from
"firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAnL_b4IWyVDmQ29TZUd8iIBt3t3mKTXLQ",
    authDomain: "info5146todo.firebaseapp.com",
    projectId: "info5146todo",
    storageBucket: "info5146todo.firebasestorage.app",
    messagingSenderId: "250986112669",
    appId: "1:250986112669:web:54c1ad1e71d8e61913d674"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Add Task
addTaskBtn.addEventListener('click', async () => {
    const task = taskInput.value.trim();
    if (task) {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
    await addTaskToFirestore(taskText);
    renderTasks();
    taskInput.value = "";
    }
    renderTasks();
    }
   });
   async function addTaskToFirestore(taskText) {
    await addDoc(collection(db, "todos"), {
    text: taskText,
    completed: false
    });
    }

    
 //retriving the to-do list 

    async function renderTasks() {
        var tasks = await getTasksFromFirestore();
        taskList.innerHTML = "";
       
        tasks.forEach((task, index) => {
        if(!task.data().completed){
        const taskItem = document.createElement("li");
        taskItem.id = task.id;
        taskItem.textContent = task.data().text;
        taskList.appendChild(taskItem);
        }
        });
        }
       async function getTasksFromFirestore() {
        var data = await getDocs(collection(db, "todos"));
        let userData = [];
        data.forEach((doc) => {
        userData.push(doc);
        });
        return userData;
       }
       
// Remove Task on Click
taskList.addEventListener('click', (e) => {
 if (e.target.tagName === 'LI') {
 e.target.remove();
 }
});

const sw = new URL('service-worker.js', import.meta.url)
if ('serviceWorker' in navigator) {
 const s = navigator.serviceWorker;
 s.register(sw.href, {
 scope: '/todo-list-app/'
 })
 .then(_ => console.log('Service Worker Registered for scope:', sw.href,
'with', import.meta.url))
 .catch(err => console.error('Service Worker Error:', err));
}


