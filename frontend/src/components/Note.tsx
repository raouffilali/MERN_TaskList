import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}
function Note({ note, className }: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
    if (updatedAt > createdAt  ) {
        createdUpdatedText = `Updated At: ${formatDate(updatedAt)}`;

    } else {
        createdUpdatedText = `Created At: ${formatDate(createdAt)}`;
    }


  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
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
