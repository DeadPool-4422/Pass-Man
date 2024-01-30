function toggleForm() {
    const formContainer = document.getElementById('passwordFormContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

function onSubmit() {
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    savePassword(website, username, password);
    loadPasswords();
    alert('Password saved!');
    document.getElementById('passwordForm').reset();
}

function loadPasswords() {
    const passwordList = document.getElementById('passwordList');
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwordList.innerHTML = '';

    passwords.forEach((entry, index) => {
        const li = document.createElement('li');
        li.classList.add('password-entry');
        
        const arrowSpan = document.createElement('span');
        arrowSpan.classList.add('arrow', 'down');
        li.appendChild(arrowSpan);

        const textNode = document.createTextNode(` ${entry.website}`);
        li.appendChild(textNode);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.display = 'none'; // Initially hide the delete button
        deleteBtn.onclick = function(e) {
            e.stopPropagation(); // Prevent the li onclick event
            deletePassword(index);
        };

        const details = document.createElement('div');
        details.classList.add('password-details');
        details.innerHTML = `Username: ${entry.username}<br>Password: ${entry.password}`;
        li.appendChild(details);

        li.appendChild(deleteBtn); // Append the delete button after the details div

        li.onclick = function() {
            const detailsVisible = details.style.display === 'block';
            details.style.display = detailsVisible ? 'none' : 'block';
            deleteBtn.style.display = detailsVisible ? 'none' : 'block'; // Toggle delete button visibility
            deleteBtn.classList.add('delete-btn');
            arrowSpan.classList.toggle('down', detailsVisible);
            arrowSpan.classList.toggle('up', !detailsVisible);
        };

        passwordList.appendChild(li);
    });
}

function savePassword(website, username, password) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push({ website, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

function deletePassword(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1); // Remove the password at the specified index
    localStorage.setItem('passwords', JSON.stringify(passwords));
    loadPasswords(); // Refresh the list after deletion
}

// Expose functions to the global scope
window.toggleForm = toggleForm;
window.onSubmit = onSubmit;
window.loadPasswords = loadPasswords;
window.savePassword = savePassword;

// Load passwords on initial page load
window.addEventListener('DOMContentLoaded', loadPasswords);
deleteBtn.style.display = detailsVisible ? 'none' : 'inline-block'; // Toggle delete button visibility
