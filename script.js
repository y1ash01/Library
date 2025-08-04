const myLibrary = [];

class Book{
    constructor(title,author,pages,read,id){
        this.title = title;
        this.author = author;
        this.pages  = pages;
        this.read = read;
        this.id = id;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function display(){
    let container = document.querySelector('.container');
    container.textContent = '';
    myLibrary.forEach((obj)=>{
        let author = obj.author;
        let title = obj.title;
        let pages = obj.pages;
        let read = obj.read;
        let uuid = obj.id;
        let card = document.createElement('div');
        card.setAttribute('UUID',uuid);
        let semantic = document.createElement('div');
        semantic.classList.add("semantic");
        let deletebtn = document.createElement("button");
        deletebtn.classList.add("deletebtn");
        let togglebtn = document.createElement("button");
        togglebtn.classList.add("togglebtn");
        deletebtn.textContent = "Delete Book";
        togglebtn.textContent = "Toggle Read";
        deletebtn.addEventListener('click',eventDelegate);
        togglebtn.addEventListener("click",eventDelegate);
        card.classList.add('card');
        card.textContent = `Title : ${title}\nAuthor : ${author}\nPages : ${pages}\nRead : ${read?"Yes":"No"}` ;
        semantic.appendChild(deletebtn);
        semantic.appendChild(togglebtn);
        card.appendChild(semantic);
        container.appendChild(card);
    })
}

let addBook = document.querySelector(".add");

addBook.addEventListener("click",(e)=>{
    let dialog = document.querySelector('#dialog');
    dialog.showModal();
});

let form = document.querySelector('#data');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let read = formData.get('read')==="Yes"?true:false;
    addBookToLibrary(title,author,pages,read);
    form.reset();
    dialog.close();
    display();
})

function eventDelegate(e){
    if(e.target.textContent === "Delete Book"){
        const uuid = e.target.parentElement.parentElement.getAttribute("UUID");
        const index = myLibrary.findIndex((book)=>{
            return book.id === uuid;
        });
        myLibrary.splice(index,1);
    }
    else if(e.target.textContent === "Toggle Read"){
        const uuid = e.target.parentElement.parentElement.getAttribute("UUID");
        const index = myLibrary.findIndex((book)=>{
            return book.id === uuid;
        });
        myLibrary[index].read = !myLibrary[index].read
    }
    display();
}

addBookToLibrary('Goosebumps','R.L. Stine',100,false);
addBookToLibrary('Sherlock Holmes','Arthur Conan Doyle',256,true);
display();