document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('list-container');
    const noteForm = document.querySelector('.note-form');
  
    const fetchNotes = async () => {
      const response = await fetch('/api/notes');
      const notes = await response.json();
  
      listContainer.innerHTML = '';
  
      notes.forEach((note) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = note.title;
  
        listItem.addEventListener('click', () => loadNoteData(note));
  
        listContainer.appendChild(listItem);
      });
    };
  
    const loadNoteData = (note) => {
      const titleInput = document.querySelector('.note-title');
      const textarea = document.querySelector('.note-textarea');
  
      titleInput.value = note.title;
      textarea.value = note.text;
  
      showNewNoteButton();
    };
  
    const showNewNoteButton = () => {
      const newNoteButton = document.querySelector('.new-note');
      newNoteButton.style.display = 'inline-block';
    };
  
    noteForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const titleInput = document.querySelector('.note-title');
      const textarea = document.querySelector('.note-textarea');
  
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleInput.value,
          text: textarea.value,
        }),
      });
  
      fetchNotes();
  
      titleInput.value = '';
      textarea.value = '';
    });
  
    document.querySelector('.new-note').addEventListener('click', () => {
      const titleInput = document.querySelector('.note-title');
      const textarea = document.querySelector('.note-textarea');
  
      titleInput.value = '';
      textarea.value = '';
  
      document.querySelector('.new-note').style.display = 'none';
    });
  
    fetchNotes();
  });
  