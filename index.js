const dialog = document.querySelector('dialog');
const bookBtn = document.querySelector('button.addbookbtn');
const titleInput =  document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pageInput= document.querySelector('#pages');
const checkInput = document.querySelector('#read_status')
const submitButton = document.querySelector('#submit');
const body = document.querySelector('body')
const removebutton = document.querySelector('.removebutton')
const dombookcontainer=document.querySelector('.dombookcontainer')
let mylib=[]

bookBtn.addEventListener('click', ()=>dialog.show());



submitButton.addEventListener('click',function (event){
    event.preventDefault();
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pageInput.value;
    let check;
  if (checkInput.checked) {
    check = 'Read';
} else {
    check = 'Not Read';
}
    mylib.push(new book(title,author,pages,check));
    dialog.close()
    console.log(mylib)
    renderbook(mylib);
    titleInput.value = '';
    authorInput.value = '';
    pageInput.value = '';
    checkInput.checked = false; // Reset checkbox
})

function book(title,author,pages,check){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.check=check;
}

function renderbook(mylib){
    if (mylib.length==0){
        removedombook()
        return;
    }
    removedombook();
    const div=document.createElement('div');
    div.classList.add('dombookcontainer');
    div.innerHTML=''
    for (let i=0;i<mylib.length;i++){ 
        div.innerHTML+=`
        <div class='dombook $${i}'>
            <span class='titletext'>${mylib[i].title}</span>
            <br>
            <br>
            <span class='bytext'><i>by</i></span>
            <br>
            <br>
            <span class='authortext'><i>${mylib[i].author}</i></span>
            <br>
            <br>
            <span class='pgtext'>${mylib[i].pages} pages</span>
            <br>
            <div class='status'>${mylib[i].check}</div>
            <div class='buttons'>
                <button class='removebutton $${i}'>Remove</button>
                <button class='changestatus $${i}'>Change Read Status</button>           
            </div>
        </div>`;       
    }
    body.appendChild(div)

}

function removedombook(){
    const div =  document.querySelector('.dombookcontainer');
    if (typeof(div) != 'undefined' && div != null)
    {
        body.removeChild(div);
    }
    else{
        return;
    }
}
// Functionality for remove button and change read status button

body.addEventListener('click', function(event) {
    const target = event.target;
    console.log(target);
    if (target.classList.contains('removebutton')) {
        let index = target.classList[1];
        index=index.slice(1)
        mylib.splice(index,1); // Remove book from mylib array
        renderbook(mylib); // Re-render books after removal
    }
    if (target.classList.contains('changestatus')) {
        let index = target.classList[1];
        index=index.slice(1)
        if (mylib[index].check=='Not Read'){ 
            mylib[index].check='Read'; 
            renderbook(mylib);
        }
        else{
            mylib[index].check='Not Read'
            renderbook(mylib)
        }
    }
})
