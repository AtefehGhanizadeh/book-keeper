const addBtn=document.querySelector("#add-btn")
const saveBtn=document.querySelector("#save-btn")
const closeIcon =document.querySelector('.close')
const overlay=document.querySelector("#overlay")
const formContainer=document.querySelector('#form-container')
const form=document.querySelector('#form')
const bookmarksContainer=document.querySelector('#bookmarksContainer')



let bookmarkName=''
let bookmarkUrl=''
let bookmark={bookmarkName:'',bookmarkUrl:''}

addBtn.addEventListener("click",()=>{
    overlay.classList.remove('hidden')

})

function update(){
    if(localStorage.getItem('savedBookmarks')){

        
        const storedBookmarks=JSON.parse(localStorage.getItem("savedBookmarks"));
        storedBookmarks.forEach(bookmark => {
            bookmarkName=bookmark.bookmarkName
            bookmarkUrl=bookmark.bookmarkUrl
            const bookmarkEl=document.createElement("div")
            bookmarkEl.classList.add('bookmark')
            bookmarkEl.innerHTML=`
            <i class="fa fa-times delete" aria-hidden="true"></i>
            <a href="${bookmarkUrl}" target="_blank">${bookmarkName}</a>
            `
            bookmarksContainer.appendChild(bookmarkEl)
        });
    }
}

update()

function updateBookMarks(e){
    e.preventDefault()
    bookmarkName=e.srcElement[0].value
    bookmarkUrl=e.srcElement[1].value
    bookmark.bookmarkName=bookmarkName
    bookmark.bookmarkUrl=bookmarkUrl
    const saved=localStorage.getItem("savedBookmarks")?JSON.parse(localStorage.getItem("savedBookmarks")):[]
    saved.push(bookmark)
    localStorage.setItem("savedBookmarks",JSON.stringify(saved))
    const bookmarkEl=document.createElement("div")
    bookmarkEl.classList.add('bookmark')
    bookmarkEl.innerHTML=`
    <i class="fa fa-times delete" aria-hidden="true"></i>
    <a href="${bookmarkUrl}" target="_blank">${bookmarkName}</a>
    `
    bookmarksContainer.appendChild(bookmarkEl)
    overlay.classList.add('hidden')  
}



form.addEventListener('submit',updateBookMarks)

// deleteIcon.addEventListener('click',()=>{
//     console.log('hi')
// })
closeIcon.addEventListener("click",()=>{
    overlay.classList.add('hidden')  
})

bookmarksContainer.addEventListener('click',e=>{
    if(e.target.classList[2]==='delete'){

        let storedBookmarks=JSON.parse(localStorage.getItem('savedBookmarks'))
        
        storedBookmarks=storedBookmarks.filter(bookmark=>(bookmark.bookmarkName!==e.srcElement.parentNode.children[1].innerText))
        localStorage.setItem('savedBookmarks',JSON.stringify(storedBookmarks))
        e.target.parentNode.remove()
    }   
})


// overlay.addEventListener("click",()=>{
//     overlay.classList.add('hidden')  
// })



