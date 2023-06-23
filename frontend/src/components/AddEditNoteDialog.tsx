import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

export interface AddEditNoteDialogProps {
  notToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

function AddEditNoteDialog({
  notToEdit: noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  // onSubmit function
  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;

      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert("Error saving note");
    }
  }

  return (
    <>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>{noteToEdit?"Edit Note":"Add Note"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title", { required: "Title is Required" })}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter a text Here !!"
                {...register("text")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
            Save Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEditNoteDialog;
