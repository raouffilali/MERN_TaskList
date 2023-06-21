import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[] | null>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        // use axios to fetch data
        // const response = await fetch("http://localhost:5000/api/notes");
        // const notes = await response.json();
        // setNotes(notes);
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert("Error loading notes");
      }
    }
    loadNotes();
  }, []);

  return (
    <>
      <Container>
        <Row xs={1} md={2} xl={3} className="g-4" >
          {notes?.map((note) => (
            <Col>
            <Note key={note._id} note={note} className={styles.note} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
