// Cek apakah user sudah login sebelumnya
const currentUser = localStorage.getItem('ghof_user');
if (currentUser) {
    showChatPage();
    loadMessages();
}

function handleLogin() {
    const number = document.getElementById('login-number').value;
    const pin = document.getElementById('login-pin').value;
    const msg = document.getElementById('login-msg');

    if (!number || !pin) {
        msg.innerText = "Nomor dan PIN harus diisi!";
        msg.style.color = "red";
        return;
    }

    // Simpan data user sederhana (Tanpa API, hanya di browser)
    localStorage.setItem('ghof_user', number);
    localStorage.setItem('ghof_pin_' + number, pin);
    
    msg.innerText = "Login Berhasil!";
    msg.style.color = "green";
    
    setTimeout(() => {
        showChatPage();
    }, 1000);
}

function showChatPage() {
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('chat-page').classList.add('active');
}

function logout() {
    localStorage.removeItem('ghof_user');
    location.reload();
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (!message) return;

    // Simpan pesan ke LocalStorage
    const user = localStorage.getItem('ghof_user');
    const chatKey = 'ghof_chat_' + user;
    let chats = JSON.parse(localStorage.getItem(chatKey) || '[]');
    
    chats.push({ text: message, type: 'sent', time: new Date().toLocaleTimeString() });
    localStorage.setItem(chatKey, JSON.stringify(chats));

    input.value = '';
    loadMessages();
}

function loadMessages() {
    const user = localStorage.getItem('ghof_user');
    const chatKey = 'ghof_chat_' + user;
    const chats = JSON.parse(localStorage.getItem(chatKey) || '[]');
    const chatBox = document.getElementById('chat-box');
    
    chatBox.innerHTML = '';
    chats.forEach(chat => {
        const div = document.createElement('div');
        div.classList.add('message', chat.type);
        div.innerText = `${chat.text} \n${chat.time}`;
        chatBox.appendChild(div);
    });
    
    chatBox.scrollTop = chatBox.scrollHeight;
}
