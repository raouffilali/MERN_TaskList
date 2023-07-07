import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
import SignUpModal from "./components/SignUpModel";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();

        setNotes(notes);
      } catch (error) {
        console.log(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(
        notes?.filter((existingNote) => existingNote._id !== note._id) ?? null
      );
    } catch (error) {
      console.log(error);
      alert("Error deleting note");
    }
  }

  const noteGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes?.map((note) => (
        <Col>
          <Note
            key={note._id}
            note={note}
            className={styles.note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <NavBar
        logedInUser={null}
        onSignUpclicked={() => {
          console.log("hi");
        }}
        onLoginUpclicked={() => {
          console.log("hi");
        }}
        onLogOutSuccessful={() => {
          console.log("hi");
        }}
      />
      <Container className={styles.notesPage}>
        <Button
          className={`mt-4 mb-4  ${styleUtils.blockcenter} ${styleUtils.flexCenter}`}
          onClick={() => setshowAddNoteDialog(true)}
          variant="outline-primary"
          size="lg"
        >
          <FaPlus className="me-2" />
          Add Note
        </Button>
        {notesLoading && <Spinner animation="border" variant="priamry" />}
        {showNotesLoadingError && (
          <p>Something went wrong. Please Refreshthe Page</p>
        )}
        {!notesLoading && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? (
              noteGrid
            ) : (
              <p>You do not have any Notes Yet </p>
            )}
          </>
        )}

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
        {noteToEdit && (
          <AddEditNoteDialog
            notToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === updatedNote._id
                    ? updatedNote
                    : existingNote
                )
              );
              setNoteToEdit(null);
            }}
          />
        )}
        {false && (
          <SignUpModal
            onDismiss={() => {
              console.log("hi");
            }}
            onSignUpSuccessful={() => {
              console.log("hi");
            }}
          />
        )}

        {false && (
          <LoginModal
            onDismiss={() => {
              console.log("hi");
            }}
            onLoginSuccessful={() => {
              console.log("hi login successfully ");
            }}
          />
        )}
      </Container>
    </>
  );
}

export default App;
