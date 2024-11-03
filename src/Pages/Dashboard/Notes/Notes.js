import React, { useState, useEffect } from 'react';
import { Card, Button, Input, List, Form, Modal } from 'antd';
import { PlusOutlined, CommentOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from 'Context/AuthContext';
import { firestore } from 'config/firebase';

export default function Notes() {
  const { user } = useAuthContext(); // Get the logged-in user
  const [notes, setNotes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', subject: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const notesCollectionRef = collection(firestore, 'notes');
  const commentsCollectionRef = collection(firestore, 'comments');
  const usersCollectionRef = collection(firestore, 'users'); // Assume each user has a document in `users` with their full name.

  useEffect(() => {
    // Fetch notes in real-time
    const unsubscribeNotes = onSnapshot(notesCollectionRef, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    });

    // Fetch comments in real-time
    const unsubscribeComments = onSnapshot(commentsCollectionRef, async (snapshot) => {
      const commentsData = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const comment = { id: docSnapshot.id, ...docSnapshot.data() };
          const userDoc = await getDoc(doc(usersCollectionRef, comment.userId));
          return { ...comment, userFullName: userDoc.exists() ? userDoc.data().fullName : 'Unknown User' };
        })
      );
      setComments(commentsData);
    });

    return () => {
      unsubscribeNotes();
      unsubscribeComments();
    };
  }, []);

  // Add new note to Firestore
  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content || !newNote.subject) return;
    
    await addDoc(notesCollectionRef, {
      ...newNote,
      createdBy: user.uid,
      lastEditedBy: user.uid,
      lastEditedAt: new Date(),
      createdAt: new Date(),
      collaborators: [user.uid]
    });

    setNewNote({ title: '', content: '', subject: '' });
    setIsModalOpen(false);
  };

  // Open modal to edit note
  const handleEditNote = (note) => {
    setEditingNote(note);
    setNewNote({ title: note.title, content: note.content, subject: note.subject });
    setIsEditModalOpen(true);
  };

  // Update the note in Firestore
  const handleUpdateNote = async () => {
    if (!newNote.title || !newNote.content || !newNote.subject || !editingNote) return;

    const noteRef = doc(firestore, 'notes', editingNote.id);
    await updateDoc(noteRef, {
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject,
      lastEditedBy: user.uid,
      lastEditedAt: new Date()
    });

    setNewNote({ title: '', content: '', subject: '' });
    setEditingNote(null);
    setIsEditModalOpen(false);
  };

  // Delete a note from Firestore
  const handleDeleteNote = async (noteId) => {
    const noteRef = doc(firestore, 'notes', noteId);
    await deleteDoc(noteRef);
  };

  // Open modal to add comments
  const handleAddComment = (noteId) => {
    setSelectedNoteId(noteId);
    setCommentText('');
  };

  // Submit comment to Firestore
  const handleSubmitComment = async () => {
    if (!commentText) return;

    await addDoc(commentsCollectionRef, {
      text: commentText,
      createdAt: new Date(),
      userId: user.uid,
      noteId: selectedNoteId
    });

    setCommentText('');
    setSelectedNoteId(null);
  };

  return (
    <div>
      {/* Add New Note Card */}
      <Card
        onClick={() => setIsModalOpen(true)}
        style={{
          cursor: 'pointer',
          marginBottom: '16px',
          padding: '20px',
          textAlign: 'center',
          fontSize: '18px'
        }}
      >
        <PlusOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <p>Add a New Note</p>
      </Card>

      {/* List of Notes */}
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={notes}
        renderItem={(note) => (
          <List.Item>
            <Card
              title={note.title}
              extra={
                <div>
                  <EditOutlined onClick={() => handleEditNote(note)} style={{ marginRight: '8px', cursor: 'pointer' }} />
                  <DeleteOutlined onClick={() => handleDeleteNote(note.id)} style={{ cursor: 'pointer' }} />
                  <CommentOutlined onClick={() => handleAddComment(note.id)} style={{ marginLeft: '8px', cursor: 'pointer' }} />
                </div>
              }
            >
              <p>{note.content}</p>
              <p><strong>Subject:</strong> {note.subject}</p>
              
              {/* Comments Section */}
              <List
                dataSource={comments.filter(comment => comment.noteId === note.id)}
                renderItem={(comment) => (
                  <List.Item>
                    <p><strong>{comment.userId}</strong>: {comment.text}</p>
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />

      {/* Modal for Adding New Note */}
      <Modal
        title="Add New Note"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddNote}>
            Add Note
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
          </Form.Item>
          <Form.Item label="Subject">
            <Input value={newNote.subject} onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Editing Note */}
      <Modal
        title="Edit Note"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateNote}>
            Save Changes
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
          </Form.Item>
          <Form.Item label="Subject">
            <Input value={newNote.subject} onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Comment Modal */}
      <Modal
        title="Add Comment"
        visible={selectedNoteId !== null}
        onCancel={() => setSelectedNoteId(null)}
        footer={[
          <Button key="cancel" onClick={() => setSelectedNoteId(null)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitComment}>
            Submit Comment
          </Button>
        ]}
      >
        <Form.Item label="Comment">
          <Input.TextArea value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        </Form.Item>
      </Modal>
    </div>
  );
}
