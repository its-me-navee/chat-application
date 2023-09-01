const socket = io('http://localhost:8000');

const form  = document.getElementById('send-container')
const messageInput =document.getElementById('messageInp')
const messageContainer =document.querySelector(".container")

const append = (message,position) =>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})

const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name)

socket.on('receive',data=>{
    append(`${data.name}: ${data.message} `, 'left' )
})
socket.on('user-joined',name=>{
    append(`${name} joined the chat`, 'right' )
})
socket.on('left', name=>{
    append(`${name} left the chat`,'left');
})
function boldText(){
    var target = document.getElementById("messageInp");
    if( target.style.fontWeight == "bolder" ) {
        target.style.fontWeight = "normal";
    } else {
        target.style.fontWeight = "bolder";
    }
}

function italicText(){
    var target = document.getElementById("messageInp");
    if( target.style.fontStyle == "italic" ) {
        target.style.fontStyle = "normal";
    } else {
        target.style.fontStyle = "italic";
    }
}

function underlineText(){
    var target = document.getElementById("messageInp");
    if( target.style.textDecoration == "underline" ) {
        target.style.textDecoration = "none";
    } else {
        target.style.textDecoration = "underline";
    }
}
