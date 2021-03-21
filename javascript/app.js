showNotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click",function(e){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");

    if(notes==null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj = {
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    //console.log(notesObj);
    showNotes();
})


//funcion to show yout element in localstorage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index){
        html +=`
        <div class="card my-3 mx-3 noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete note</button>
                    <button id="${index}" onclick="impNots()" class="btn btn-primary mx-2">Important</button>
                </div>
            </div>
        `;

    });

    let noteselm = document.getElementById('notes');
    if(notesObj.length!=0){
        noteselm.innerHTML=html;
    }
    else{
        noteselm.innerHTML=`Please click "Add Note" button to the add notes`;
    }
}

// function to delete note

function deleteNote(index){
    //.log('delete');

    let notes = localStorage.getItem("notes");

    if(notes==null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

// search function 

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})


// important note

function impNote(e){
    document.getElementById("card").style.backgroundColor="red";
}