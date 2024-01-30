function toggleForm() {
    const formContainer = document.getElementById('passwordFormContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

function onSubmit() {
    const website = document.getElementById('website').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check if any of the fields are empty
    if (!website || !username || !password) {
        alert('Please fill in all fields.');
        return; // Do not proceed with saving
    }

    savePassword(website, username, password);
    loadPasswords();
    alert('Password saved!');
    document.getElementById('passwordForm').reset();
    toggleForm(); // Optionally hide the form after saving
}

function loadPasswords() {
    const passwordList = document.getElementById('passwordList');
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwordList.innerHTML = '';

    passwords.forEach((entry, index) => {
        const li = document.createElement('li');
        li.classList.add('password-entry');

        // Create a container for the entry number, arrow, and website name
        const entryHeader = document.createElement('div');
        entryHeader.classList.add('entry-header');

        const entryNumber = document.createElement('span');
        entryNumber.textContent = `${index + 1}.`;
        entryNumber.style.fontWeight = 'bold';
        entryHeader.appendChild(entryNumber);

        const arrowSpan = document.createElement('span');
        arrowSpan.classList.add('arrow', 'down');
        entryHeader.appendChild(arrowSpan);

        const textNode = document.createTextNode(` ${entry.website}`);
        entryHeader.appendChild(textNode);

        li.appendChild(entryHeader);

        const details = document.createElement('div');
        details.classList.add('password-details');
        details.style.marginTop = '10px';

        // Create username and copy button
        const usernameDiv = document.createElement('div');
        usernameDiv.textContent = `Username: ${entry.username}`;
        const copyUsernameBtn = document.createElement('button');
        copyUsernameBtn.textContent = 'Copy';
        copyUsernameBtn.classList.add('copy-btn');
        copyUsernameBtn.onclick = function(e) {
            e.stopPropagation();
            navigator.clipboard.writeText(entry.username);
            alert('Username copied!');
        };
        usernameDiv.appendChild(copyUsernameBtn);
        details.appendChild(usernameDiv);

        // Create password and copy button
        const passwordDiv = document.createElement('div');
        passwordDiv.textContent = `Password: ${entry.password}`;
        const copyPasswordBtn = document.createElement('button');
        copyPasswordBtn.textContent = 'Copy';
        copyPasswordBtn.classList.add('copy-btn');
        copyPasswordBtn.onclick = function(e) {
            e.stopPropagation();
            navigator.clipboard.writeText(entry.password);
            alert('Password copied!');
        };
        passwordDiv.appendChild(copyPasswordBtn);
        details.appendChild(passwordDiv);

        li.appendChild(details);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.style.display = 'none'; // Initially hide the delete button
        deleteBtn.onclick = function(e) {
            e.stopPropagation(); // Prevent the li onclick event
            deletePassword(index);
        };
        li.appendChild(deleteBtn);

        li.onclick = function() {
            const detailsVisible = details.style.display === 'block';
            details.style.display = detailsVisible ? 'none' : 'block';
            copyUsernameBtn.style.display = detailsVisible ? 'none' : 'inline-block'; // Toggle copy button visibility
            copyPasswordBtn.style.display = detailsVisible ? 'none' : 'inline-block'; // Toggle copy button visibility
            deleteBtn.style.display = detailsVisible ? 'none' : 'inline-block'; // Toggle delete button visibility
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
