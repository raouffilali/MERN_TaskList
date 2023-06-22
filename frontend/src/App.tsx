import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[] | null>([]);

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        // use axios to fetch data
        // const response = await fetch("http://localhost:5000/api/notes");
        // const notes = await response.json();
        // setNotes(notes);
        const notes = await NotesApi.fetchNotes();

        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert("Error loading notes");
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes?.filter((n) => n._id !== note._id) ?? null);
    } catch (error) {
      console.log(error);
      alert("Error deleting note");
    }
  }

  return (
    <>
      <Container>
        <Button
          className={`mt-4 mb-4  ${styleUtils.blockcenter} ${styleUtils.flexCenter}`}
          onClick={() => setshowAddNoteDialog(true)}
          variant="outline-primary"
          size="lg"
        >
          <FaPlus className="me-2" />
          Add Note
        </Button>
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes?.map((note) => (
            <Col>
              <Note
                key={note._id}
                note={note}
                className={styles.note}
                onDeleteNoteClicked={deleteNote}
              />
            </Col>
          ))}
        </Row>
        {showAddNoteDialog && (
          <AddEditNoteDialog
            onDismiss={() => {
              setshowAddNoteDialog(false);
            }}
            onNoteSaved={(newNote) => {
              setNotes([...notes!, newNote]);
              setshowAddNoteDialog(false);
            }}
          />
        )}
      </Container>
    </>
  );
}

export default App;
