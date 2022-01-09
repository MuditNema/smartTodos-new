const dash = document.querySelectorAll('.dash');
const healthBox = document.querySelector('.show-health');
let dashArr = Array.prototype.slice.call(dash);
let colorArr = ['red', '#fcc603', 'yellowgreen', 'green'];
let healthResult = ['critical', 'moderate', 'good', 'excellent'];

function fetchTasks(){
    fetch('tasks.json')
    .then(res => res.json())
    .then(data => taskHealth(data))
    .then(index => renderIndex(index))
    .catch(err => console.log(err));
}
fetchTasks();

function taskHealth(tasks){
    let totalTasks = tasks.length;
    let pendingTasks = tasks.filter((task, index) => task.isPending).length;
    let deletedTasks = tasks.filter((task, index) => task.isDeleted).length;
    let pendingAndDeleted = tasks
    .filter((task, index) => task.isDeleted)
    .filter((task, index) => task.isPending)
    .length;
    // console.log(totalTasks);
    // console.log(pendingTasks);
    // console.log(deletedTasks);
    // console.log(pendingAndDeleted);
    let healthIndex = Math.floor(((totalTasks - pendingTasks)/(totalTasks - pendingAndDeleted))*100);
    return new Promise((resolve, reject) => {
        if((healthIndex > 0) && (healthIndex<100)){
            resolve(healthIndex);
        }else{
            reject('invalid data input');
        }
    })
}

function renderIndex(indexValue){
    dashArr.forEach((dash, index) => {
        if((index*25)+1 <= indexValue){
            dash.style.background = colorArr[index];
        }
    })
    healthBox.innerText = `With a task accomplishment percentage of ${indexValue}%, your task health is ${healthResult[Math.floor(indexValue/25)]}`;
    healthBox.style.color = colorArr[Math.floor(indexValue/25)];
}