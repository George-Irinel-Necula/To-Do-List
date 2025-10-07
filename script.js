const title = document.querySelector("#defaultInput")
const description = document.querySelector("#textareaLabel")
const taskList=document.querySelector(".task-list")
const addTaskButton=document.querySelector(".add-task")

function getDate(){
    let dateObj=new Date();
    let day=dateObj.getDate();
    let month=dateObj.getMonth()+1;
    let year=dateObj.getFullYear();
    return day+"-"+month+"-"+year;
}

function addTask(){
    let title_text=title.value
    let description_text=description.value
    const warning=document.querySelector("#error-msg")
    if(title.value==="" || description.value===""){
        warning.classList.add("flex")
        warning.classList.remove("hidden")
    }
    else{
        warning.classList.remove("flex")
        warning.classList.add("hidden")
        taskList.insertAdjacentHTML(`beforeend`,`<div class="task-card w-full bg-base-100 min-h-28 rounded-md py-4 px-2 justify-between wrap-anywhere">
        <div class="flex gap-2 items-top">
            <div class="pl-4 pr-2"><input type="checkbox" class="checkbox checkbox-primary" id="defaultCheckbox1"/>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <h1 class="task-title font-bold text-lg text-white">${title_text}</h1>
                <p class="">${description_text}</p>
                <div class="info flex items-center gap-1 text-xs mt-2 ">
                    <h1 class="min-w-fit info badge badge-primary badge-soft">Date created:${getDate()}</h1>
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
    </div>`)
    }
    
    
    title.value=""
    description.value=""
    saveTasks()
    
}

addTaskButton.addEventListener("click",addTask)

function deleteTask(e){
    let clickedDelete=e.target.closest(".trash")
    let taskCard=e.target.closest(".task-card")
    if(clickedDelete){
        taskCard.remove()
    }
    saveTasks()
}

taskList.addEventListener("click",deleteTask)

function checkTask(e){
    let checkbox=e.target.closest("#defaultCheckbox1")
    let taskCard=e.target.closest(".task-card")
    let status=taskCard.querySelector(".card-status")
    let title=taskCard.querySelector(".task-title")
    let paragraph=taskCard.querySelector("P")
    if(checkbox.checked){
    status.classList.replace("badge-warning","badge-success")
    checkbox.checked=true
    status.textContent="Status:Completed"
    }
    else{
        status.classList.replace("badge-success","badge-warning")
        status.textContent="Status:Pending"
        checkbox.checked=false
    }
      title.classList.toggle("strike")
      paragraph.classList.toggle("strike")
    saveTasks()
}

taskList.addEventListener("click",checkTask)

function editTask(e){
    let edit=e.target.closest(".edit")
    let taskCard=e.target.closest(".task-card")
    let titleCard=taskCard.querySelector(".task-title")
    let descriptionCard=taskCard.querySelector("P")
    
        title.value=titleCard.textContent
        description.value=descriptionCard.textContent
        taskCard.remove()
    
}

taskList.addEventListener("click",editTask)

function saveTasks(){
    localStorage.setItem("storage",taskList.innerHTML)
}

function loadTasks(){
    taskList.innerHTML=localStorage.getItem("storage")

    
}

loadTasks()
