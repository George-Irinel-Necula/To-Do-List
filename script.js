const title_input = document.querySelector("#defaultInput")
const task_input=document.querySelector("#textareaLabel")
const add_task=document.querySelector(".add-task")
const task_list=document.querySelector(".task-list")


function addTask(){
    let title=title_input.value
    let description=task_input.value

    task_list.innerHTML+=`<div class="task-card w-full bg-base-100 min-h-28 rounded-md py-4 px-2 justify-between wrap-anywhere">
        <div class="flex gap-2 items-top">
            <div class="pl-4 pr-2"><input type="checkbox" class="checkbox checkbox-primary" id="defaultCheckbox1" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <h1 class="task-title font-bold text-lg text-white">${title}</h1>
                <p class="">${description}</p>
                <div class="info flex items-center gap-1 text-xs mt-2 ">
                    <h1 class="min-w-fit info badge badge-primary badge-soft">Date created:${getFullDate()}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="currentColor" class="icon icon-tabler icons-tabler-filled size-3 icon-tabler-point hidden sm:flex">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                    </svg>
                    <h1 class="min-w-fit info badge badge-soft badge-warning card-status">Status: Pending</h1>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <button class="p-1 trash">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
                <button class="p-1 edit"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg></button>
            </div>
        </div>
    </div>`

    title_input.value="";
    task_input.value="";
    saveLocal()
}

function getFullDate(){
    let date=new Date()
    let day=date.getDate()
    let month=date.getMonth()+1
    let year=date.getFullYear()
    let fullDate=day+"-"+month+"-"+year
    return fullDate
}

function saveLocal(){
    localStorage.setItem("storage", task_list.innerHTML)
}

function loadLocal(){
    task_list.innerHTML=localStorage.getItem("storage")
}

task_list.addEventListener("click", function(e) {
    let taskCard = e.target.closest(".task-card");

    if (!taskCard) return; 
    
    let title = taskCard.querySelector(".task-title");
    let description = taskCard.querySelector("p");
    let status=taskCard.querySelector(".card-status")

    if (e.target.closest(".trash")) {
        taskCard.remove();
        saveLocal()
    }

    if (e.target.tagName==="INPUT") {
        title.classList.toggle("strike",e.target.checked);
        description.classList.toggle("strike",e.target.checked);
        status.classList.toggle("badge-success",e.target.checked)
        status.classList.toggle("badge-warning",!e.target.checked)
        
        if(e.target.checked===true){
            status.textContent="Status:Completed"
        }
        else
            status.textContent="Status:Pending"
        
        saveLocal() 
    }
});

add_task.addEventListener("click", addTask);

loadLocal();