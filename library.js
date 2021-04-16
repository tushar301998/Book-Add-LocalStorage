console.log("hello");
showData();

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {

    add(book) {
        let tableBody = document.getElementById("tableBody");
         let str =`<tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>`
        tableBody.innerHTML += str;
       // localStorage.setItem(JSON.stringify(book));
    
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    clear() {
        libraryForm.reset();
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let fiction = document.getElementById("fiction");
    let programer = document.getElementById("programmer");
    let web = document.getElementById("web");
    let type;

    if (fiction.checked) {
        type = fiction.value;
    } else if (programer.checked) {
        type = programer.value;
    } else if (web.checked) {
        type = web.value;
    }

    let book = new Book(name, author, type);

    


    let display = new Display();
    if (display.validate(book)) {
       // display.add(book);
        saveLocal(book);
        showData();
        // localStorage.setItem("bookitem",JSON.stringify(book));
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }else{
        display.show('danger', 'Sorry you cannot add this book');
    }


    e.preventDefault();
}

 function saveLocal(book){
     let bookData = localStorage.getItem("bookData");
     if(bookData==null){
         localStorage.setItem('bookData' , '[]');
     }
     let oldData = JSON.parse(localStorage.getItem('bookData'));
     oldData.push(book);

     localStorage.setItem("bookData" , JSON.stringify(oldData));
    //  console.log(oldData);
}

function showData(){
    let bookData = localStorage.getItem("bookData");
    if(bookData==null){
        bookObj = [];
    }else{
        bookObj = JSON.parse(bookData);
    }
    

    let html = "";
    bookObj.forEach(function(element , index) {
        html += `<tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <button type="button" id = "${index}" onclick ="deleteBook(this.id)" class="btn btn-danger">Delete Book</button>
        <hr>
    </tr>`
    

        
    });
    let tableBody = document.getElementById("tableBody");
    if(bookObj.length!=0){
    tableBody.innerHTML = html;
    }

}

function deleteBook(index){
    console.log("I m deleting", index);
    let bookData = localStorage.getItem("bookData");
    if(bookData==null){
        bookObj = [];
    }else{
        bookObj = JSON.parse(bookData);
    }
    bookObj.splice(index, 1);
    localStorage.setItem("bookData", JSON.stringify(bookObj));
    showData();
}