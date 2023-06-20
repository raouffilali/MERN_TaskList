import { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[] | null>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        // // use axios to fetch data
        // const response = await fetch("/api/notes");
        // const notes = await response.json();
        // setNotes(notes);
        const response = await fetch("/api/notes", {
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

  return <>{JSON.stringify(notes)}</>;
}

export default App;
