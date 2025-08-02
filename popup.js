function updateList() {
  chrome.storage.local.get(['blockedUsers'], function(result) {
    const users = result.blockedUsers || [];
    const list = document.getElementById('userList');
    list.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user;
      const btn = document.createElement('span');
      btn.textContent = '×';
      btn.className = 'remove';
      btn.onclick = () => removeUser(user);
      li.appendChild(btn);
      list.appendChild(li);
    });
  });
}

function addUser() {
  const input = document.getElementById('username');
  const name = input.value.trim().toLowerCase();
  if (!name) return;
  chrome.storage.local.get(['blockedUsers'], function(result) {
    const users = result.blockedUsers || [];
    if (!users.includes(name)) {
      users.push(name);
      chrome.storage.local.set({ blockedUsers: users }, updateList);
    }
  });
  input.value = '';
}

function removeUser(user) {
  chrome.storage.local.get(['blockedUsers'], function(result) {
    let users = result.blockedUsers || [];
    users = users.filter(u => u !== user);
    chrome.storage.local.set({ blockedUsers: users }, updateList);
  });
}

document.getElementById('addBtn').addEventListener('click', addUser);
document.addEventListener('DOMContentLoaded', updateList);