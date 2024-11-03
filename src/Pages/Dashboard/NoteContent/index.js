import React, { useState } from 'react';
import { Card, Button, Input, List, Comment } from 'antd';
import { useNotesContext } from 'Context/NotesContext';

const Notes = () => {
  const { notes, addNote, addComment } = useNotesContext();
  const [newNote, setNewNote] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleAddNote = () => {
    if (newNote) {
      addNote({ id: Date.now(), content: newNote, comments: [] });
      setNewNote('');
    }
  };

  const handleAddComment = (noteId) => {
    if (newComment) {
      addComment(noteId, newComment);
      setNewComment('');
      setSelectedNoteId(null); // Deselect the note after commenting
    }
  };

  return (
    <div>
      <Card title="Add a New Note" style={{ marginBottom: 20 }}>
        <Input.TextArea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note"
          rows={4}
        />
        <Button type="primary" onClick={handleAddNote} style={{ marginTop: 10 }}>
          Add Note
        </Button>
      </Card>

      <List
        itemLayout="horizontal"
        dataSource={notes}
        renderItem={(note) => (
          <List.Item
            actions={[
              <Button onClick={() => setSelectedNoteId(note.id)}>Comment</Button>
            ]}
          >
            <List.Item.Meta title={note.content} />
            <div>
              {note.comments.map((comment, index) => (
                <Comment key={index} content={comment} />
              ))}
              {selectedNoteId === note.id && (
                <div>
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  />
                  <Button type="primary" onClick={() => handleAddComment(note.id)}>
                    Add Comment
                  </Button>
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notes;
