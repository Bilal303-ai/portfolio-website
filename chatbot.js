const chatInput = document.querySelector(".chat-input textarea");
const sendMsgBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");
const chatBot = document.querySelector(".chatbot");
const chatButton = document.querySelector(".chat-btn");
const projectChatButton = document.querySelector(".project-chat-btn");

let inputMessage;
let botMessage;

function showChatBot() {
    chatBot.style.display = 'block';
    chatButton.style.display = 'none';
}

function closeChatBot() {
    chatBot.style.display = 'none';
    chatButton.style.display = 'block';
}

function sendMessage() {
    inputMessage = chatInput.value.trim();
    document.querySelector(".chat-input textarea").value = '';
    if (!inputMessage) return;
    fetch('https://bilalhasan.pythonanywhere.com/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputMessage})
      })
        .then(response => response.json())
        .then(data => {
            displayBotMsg(data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            displayBotMsg("Uh-oh! Looks like we hit a snag. Please try again!");
        });

}


const createListElem = (message, className) => {
    const listElem = document.createElement("li");
    listElem.classList.add(`chat-${className}`);
    let msgContent = className ==="outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    listElem.innerHTML = msgContent;
    return listElem;
}

const displayUserMsg = () => {
    inputMessage = chatInput.value.trim();
    if (!inputMessage) return;
    chatBox.appendChild(createListElem(inputMessage, "outgoing"));
    setTimeout(() => {chatBox.appendChild(createListElem("Thinking...", "incoming"));}, 600);
    scrollToBottom();
}

const displayBotMsg = (response) => {
    let thinkingMessage;
    thinkingMessage = document.querySelector(".chatbox li:last-child p");
    botMessage = response;
    if (!botMessage) return;
    thinkingMessage.textContent = botMessage
    scrollToBottom();
    /*chatBox.appendChild(createListElem(botMessage, "incoming"));*/
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendMsgBtn.addEventListener('click', displayUserMsg);
sendMsgBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        if (!window.matchMedia("(pointer: coarse)").matches) {
            event.preventDefault();  // Prevents new line on desktop
            displayUserMsg();
            sendMessage();
        }
    }
});

chatInput.addEventListener('blur', displayUserMsg);
chatInput.addEventListener('blur', sendMessage);


chatButton.addEventListener('click', (event) => {
    event.stopPropagation();
});

projectChatButton.addEventListener('click', (event) => {
    event.stopPropagation();
});


document.addEventListener('click', (event) => {
    const isClickInside = chatBot.contains(event.target);
    if (!isClickInside) {
        closeChatBot();
    }
});