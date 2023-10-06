const notesContainer = document.getElementById('notes-container');
const addNoteButton = document.getElementById('add-note');

function createNote() {
    const currentDate = new Date().toLocaleString();
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <button class="delete-note">X</button>
        <button class="edit-note">Editar</button>
        <button class="share-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M 20 0 C 17.789063 0 16 1.789063 16 4 C 16 4.277344 16.039063 4.550781 16.09375 4.8125 L 7 9.375 C 6.265625 8.535156 5.203125 8 4 8 C 1.789063 8 0 9.789063 0 12 C 0 14.210938 1.789063 16 4 16 C 5.203125 16 6.265625 15.464844 7 14.625 L 16.09375 19.1875 C 16.039063 19.449219 16 19.722656 16 20 C 16 22.210938 17.789063 24 20 24 C 22.210938 24 24 22.210938 24 20 C 24 17.789063 22.210938 16 20 16 C 18.796875 16 17.734375 16.535156 17 17.375 L 7.90625 12.8125 C 7.960938 12.550781 8 12.277344 8 12 C 8 11.722656 7.960938 11.449219 7.90625 11.1875 L 17 6.625 C 17.734375 7.464844 18.796875 8 20 8 C 22.210938 8 24 6.210938 24 4 C 24 1.789063 22.210938 0 20 0 Z"></path>
            </svg>
        </button>
        <input type="color" class="color-picker">
        <button class="edit-color-button">Cambiar Color</button>
        <div class="note-meta">Creada: ${currentDate}</div>
        <textarea></textarea>
        <div class="toast">Texto copiado al portapapeles</div>
    `;

    notesContainer.appendChild(note);

    const deleteNoteButton = note.querySelector('.delete-note');
    const editNoteButton = note.querySelector('.edit-note');
    const textarea = note.querySelector('textarea');
    const colorPicker = note.querySelector('.color-picker');
    const editColorButton = note.querySelector('.edit-color-button');
    const shareButton = note.querySelector('.share-note');
    const toast = note.querySelector('.toast');
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
        colorPicker.click();
    });

    shareButton.addEventListener('click', () => {
        const noteText = textarea.value;
        copyToClipboard(noteText);
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
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
                <button class="share-note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M 20 0 C 17.789063 0 16 1.789063 16 4 C 16 4.277344 16.039063 4.550781 16.09375 4.8125 L 7 9.375 C 6.265625 8.535156 5.203125 8 4 8 C 1.789063 8 0 9.789063 0 12 C 0 14.210938 1.789063 16 4 16 C 5.203125 16 6.265625 15.464844 7 14.625 L 16.09375 19.1875 C 16.039063 19.449219 16 19.722656 16 20 C 16 22.210938 17.789063 24 20 24 C 22.210938 24 24 22.210938 24 20 C 24 17.789063 22.210938 16 20 16 C 18.796875 16 17.734375 16.535156 17 17.375 L 7.90625 12.8125 C 7.960938 12.550781 8 12.277344 8 12 C 8 11.722656 7.960938 11.449219 7.90625 11.1875 L 17 6.625 C 17.734375 7.464844 18.796875 8 20 8 C 22.210938 8 24 6.210938 24 4 C 24 1.789063 22.210938 0 20 0 Z"></path>
                    </svg>
                </button>
                <input type="color" class="color-picker">
                <button class="edit-color-button">Cambiar Color</button>
                <div class="note-meta">${noteData.meta}</div>
                <textarea readonly>${noteData.text}</textarea>
                <div class="toast">Texto copiado al portapapeles</div>
            `;

            note.style.backgroundColor = noteData.color;

            notesContainer.appendChild(note);

            const deleteNoteButton = note.querySelector('.delete-note');
            const editNoteButton = note.querySelector('.edit-note');
            const textarea = note.querySelector('textarea');
            const colorPicker = note.querySelector('.color-picker');
            const editColorButton = note.querySelector('.edit-color-button');
            const shareButton = note.querySelector('.share-note');
            const toast = note.querySelector('.toast');
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
                colorPicker.click();
            });

            shareButton.addEventListener('click', () => {
                const noteText = textarea.value;
                copyToClipboard(noteText);
                toast.style.display = 'block';
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 2000);
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

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

loadNotes();
addNoteButton.addEventListener('click', createNote);
