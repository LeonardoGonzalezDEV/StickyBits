const notesContainer = document.getElementById('notes-container');
const addNoteButton = document.getElementById('add-note');

function createNote() {
    const currentDate = new Date().toLocaleString();
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <button class="delete-note">X</button>
        <button class="edit-note">Editar</button>
        <input type="color" class="color-picker">
        <button class="edit-color-button">Cambiar Color</button>
        <div class="note-meta">Creada: ${currentDate}</div>
        <textarea></textarea>
    `;

    notesContainer.appendChild(note);

    const deleteNoteButton = note.querySelector('.delete-note');
    const editNoteButton = note.querySelector('.edit-note');
    const textarea = note.querySelector('textarea');
    const colorPicker = note.querySelector('.color-picker');
    const editColorButton = note.querySelector('.edit-color-button');
    const noteMeta = note.querySelector('.note-meta');

    deleteNoteButton.addEventListener('click', () => {
        notesContainer.removeChild(note);
        saveNotes();
    });

    editNoteButton.addEventListener('click', () => {
        textarea.removeAttribute('readonly');
        textarea.focus();
    });

    colorPicker.addEventListener('input', (e) => {
        note.style.backgroundColor = e.target.value;
        saveNotes();
    });

    editColorButton.addEventListener('click', () => {
        colorPicker.click(); // Abre el selector de colores al hacer clic en el botón
    });

    textarea.addEventListener('input', () => {
        noteMeta.textContent = `Editada: ${new Date().toLocaleString()}`;
        saveNotes();
    });

    textarea.addEventListener('blur', () => {
        textarea.setAttribute('readonly', 'true');
    });
}

function saveNotes() {
    const notes = [];
    const noteElements = document.querySelectorAll('.note');
    
    noteElements.forEach((noteElement) => {
        const textarea = noteElement.querySelector('textarea');
        const metaText = noteElement.querySelector('.note-meta').textContent;
        const color = noteElement.querySelector('.color-picker').value;
        notes.push({
            text: textarea.value,
            meta: metaText,
            color: color,
        });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
        notes.forEach((noteData) => {
            const note = document.createElement('div');
            note.classList.add('note');
            note.innerHTML = `
                <button class="delete-note">X</button>
                <button class="edit-note">Editar</button>
                <input type="color" class="color-picker">
                <button class="edit-color-button">Cambiar Color</button>
                <div class="note-meta">${noteData.meta}</div>
                <textarea readonly>${noteData.text}</textarea>
            `;

            note.style.backgroundColor = noteData.color;

            notesContainer.appendChild(note);

            const deleteNoteButton = note.querySelector('.delete-note');
            const editNoteButton = note.querySelector('.edit-note');
            const textarea = note.querySelector('textarea');
            const colorPicker = note.querySelector('.color-picker');
            const editColorButton = note.querySelector('.edit-color-button');
            const noteMeta = note.querySelector('.note-meta');

            deleteNoteButton.addEventListener('click', () => {
                notesContainer.removeChild(note);
                saveNotes();
            });

            editNoteButton.addEventListener('click', () => {
                textarea.removeAttribute('readonly');
                textarea.focus();
            });

            colorPicker.addEventListener('input', (e) => {
                note.style.backgroundColor = e.target.value;
                saveNotes();
            });

            editColorButton.addEventListener('click', () => {
                colorPicker.click(); // Abre el selector de colores al hacer clic en el botón
            });

            textarea.addEventListener('input', () => {
                noteMeta.textContent = `Editada: ${new Date().toLocaleString()}`;
                saveNotes();
            });

            textarea.addEventListener('blur', () => {
                textarea.setAttribute('readonly', 'true');
            });
        });
    }
}

loadNotes();
addNoteButton.addEventListener('click', createNote);
