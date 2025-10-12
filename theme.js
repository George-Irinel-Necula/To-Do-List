const themeList=document.querySelector(".theme-selector")
function changeTheme (tag){
    const body=document.querySelector("BODY")
    const target=tag.target.closest("A")
    let themeName=target.id
    body.setAttribute("data-theme",themeName)
    console.log(themeName)
    const li=target.closest("LI")
    console.log(li)
    
    unToggleTheme()

    li.classList.toggle("selected")
    target.insertAdjacentHTML(`beforeend`,`<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`)
}

function unToggleTheme (){
    const selectedTheme=document.querySelector(".selected")
    selectedTheme.classList.remove("selected")
    const selectedCheck=document.querySelector(".icon-tabler-check")
    selectedCheck.remove()

}

themeList.addEventListener("click",changeTheme)
