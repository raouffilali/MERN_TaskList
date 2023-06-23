import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note:NoteModel)=>void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}


function Note({ note,onNoteClicked, onDeleteNoteClicked, className }: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated At: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created At: ${formatDate(createdAt)}`;
  }

  return (
    <Card
    className={`${styles.noteCard} ${className}`}
    onClick={()=>onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className={`text-muted ms-auto ${styles.deleteIcon}`}
            onClick={(e: any) => {
              console.log("Delete");
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        {/* <Card.Text> Created At: {createdAt}</Card.Text>
        <Card.Text> Updated At: {updatedAt}</Card.Text> */}
      </Card.Body>

      <Card.Footer className="text-muted">
        <small>{createdUpdatedText}</small>
      </Card.Footer>
    </Card>
  );
}

export default Note;
