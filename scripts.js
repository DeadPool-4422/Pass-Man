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
    let isHoveringOverNotes = false; // Flag to prevent collapsing when hovering over notes

    passwords.forEach((entry, index) => {
        const li = document.createElement('li');
        li.classList.add('password-entry');

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

        // Container for the note elements
        const noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');
        noteContainer.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling to the li element
        });
  
          const noteDiv = document.createElement('div');
          noteDiv.classList.add('note-div');
          const noteSpan = document.createElement('span');
          noteSpan.textContent = entry.note ? entry.note : 'No note added';
          noteSpan.classList.add('note-text');
          noteDiv.appendChild(noteSpan);
  
          // Note input field
          const noteInput = document.createElement('input');
          noteInput.type = 'text';
          noteInput.value = entry.note || '';
          noteInput.style.display = 'none';
          noteInput.onclick = function(e) {
              e.stopPropagation();
          };
          noteDiv.appendChild(noteInput);
  
// Save note button
const saveNoteBtn = document.createElement('button');
saveNoteBtn.textContent = 'Save';
saveNoteBtn.classList.add('save-note-btn');
saveNoteBtn.style.display = 'none';
saveNoteBtn.onclick = function(e) {
    e.stopPropagation();
    updatePasswordNote(index, noteInput.value);

    // Update the displayed note text directly
    noteSpan.textContent = noteInput.value || 'No note added';
    toggleNoteEditMode(false);

    // Maintain the expanded state of the entry
    if (li.expanded) {
        details.style.display = 'block';
    }

    // Manage the visibility of elements
    noteInput.style.display = 'none';
    saveNoteBtn.style.display = 'none';
    editNoteBtn.style.display = 'inline-block';
    copyNoteBtn.style.display = 'inline-block';

    // No need to refresh the entire password list
    // Also, explicitly set the details section to be displayed
    details.style.display = 'block';
};
noteDiv.appendChild(saveNoteBtn);

          // Edit note button
          const editNoteBtn = document.createElement('button');
          editNoteBtn.textContent = 'Edit Note';
          editNoteBtn.classList.add('edit-note-btn');
          editNoteBtn.onclick = function(e) {
              e.stopPropagation();
              toggleNoteEditMode(true);
          };
          noteDiv.appendChild(editNoteBtn);
  
          // Copy note button
          const copyNoteBtn = document.createElement('button');
          copyNoteBtn.textContent = 'Copy';
          copyNoteBtn.classList.add('copy-btn');
          copyNoteBtn.style.display = 'none';
          copyNoteBtn.onclick = function(e) {
              e.stopPropagation();
              navigator.clipboard.writeText(noteSpan.textContent);
              alert('Note copied!');
          };
          noteDiv.appendChild(copyNoteBtn);
  
          // Append noteDiv to noteContainer
          noteContainer.appendChild(noteDiv);
  
          // Append noteContainer to details
          details.appendChild(noteContainer);
  
          // Append details to the list item
          li.appendChild(details);
  
          // Function to toggle note edit mode
          function toggleNoteEditMode(editMode) {
              noteSpan.style.display = editMode ? 'none' : 'inline';
              noteInput.style.display = editMode ? 'inline' : 'none';
              saveNoteBtn.style.display = editMode ? 'inline' : 'none';
              editNoteBtn.style.display = editMode ? 'none' : 'inline';
              copyNoteBtn.style.display = editMode ? 'none' : 'inline';
          } 

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.style.display = 'none';
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            deletePassword(index);
        };
        li.appendChild(deleteBtn);
        li.expanded = false;
        li.onclick = function() {
            const detailsVisible = details.style.display === 'block';
            details.style.display = detailsVisible ? 'none' : 'block';
            noteInput.style.display = detailsVisible ? 'none' : 'none';
            saveNoteBtn.style.display = detailsVisible ? 'none' : 'none';
            copyUsernameBtn.style.display = detailsVisible ? 'none' : 'inline-block';
            copyPasswordBtn.style.display = detailsVisible ? 'none' : 'inline-block';
            copyNoteBtn.style.display = detailsVisible ? 'none' : 'inline-block';
            deleteBtn.style.display = detailsVisible ? 'none' : 'inline-block';
            arrowSpan.classList.toggle('down', detailsVisible);
            arrowSpan.classList.toggle('up', !detailsVisible);
        };

        passwordList.appendChild(li);
    });
}

function updatePasswordNote(index, note) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    if (passwords[index]) {
        passwords[index].note = note;
        localStorage.setItem('passwords', JSON.stringify(passwords));
        // No call to loadPasswords here
    }
}

function deletePassword(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    loadPasswords();
}

// Expose functions to the global scope if they are used by inline event handlers
window.loadPasswords = loadPasswords;
window.updatePasswordNote = updatePasswordNote;
window.deletePassword = deletePassword;

// Initial load of passwords
document.addEventListener('DOMContentLoaded', loadPasswords);

function updatePasswordNote(index, note) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    if (passwords[index]) {
        passwords[index].note = note;
        localStorage.setItem('passwords', JSON.stringify(passwords));
        loadPasswords(); // Refresh the list after updating the note
    }
}

function refreshPasswordsKeepingState(passwordList) {
    const expandedIndices = Array.from(passwordList.children)
                                 .map((li, index) => li.expanded ? index : -1)
                                 .filter(index => index !== -1);

    loadPasswords(); // Reload all passwords

    // Re-expand the previously expanded entries
    expandedIndices.forEach(index => {
        const li = passwordList.children[index];
        if (li) {
            li.expanded = true;
            const details = li.querySelector('.password-details');
            if (details) {
                details.style.display = 'block';
            }
        }
    });
}

function savePassword(website, username, password, note = '') {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push({ website, username, password, note });
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
