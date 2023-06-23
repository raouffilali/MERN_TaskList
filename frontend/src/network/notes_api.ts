import { Note } from "../models/note";
import { User } from "../models/user";

// Functions to deal with the notes API ERRORS (backend) from the frontend (React)
async function fetchData(input: RequestInfo, init?: RequestInit | undefined) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.message;
    throw new Error(errorMessage);
  }
}

// User Functions (Log /in/ out/ register)
export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users", {
    method: "GET",
  });
  return response.json();
}
// SignUp
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}
export async function signUp(credientials: SignUpCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credientials),
  });
  return response.json();
}
// LOGIN
export interface LogInCredentials {
  username: string;
  password: string;
}

export async function logIn(credientials: LogInCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credientials),
  });
  return response.json();
}

// LOGOUT

export async function logout() {
  await fetchData("http://localhost:5000/api/users/logout", { method: "POST" });
}

// Function to fetch all notes from the backend
export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("http://localhost:5000/api/notes", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}
// function to create notes

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData("http://localhost:5000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    `http://localhost:5000/api/notes/${noteId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function deleteNote(noteId: string): Promise<void> {
  await fetch(`http://localhost:5000/api/notes/${noteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

/*
// Function to fetch a single note from the backend
export async function  fetchNoteById(id: string): Promise<Note> {
    const response = await fetchData(`http://localhost:5000/api/notes/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        return response.json();
}

// Function to create a new note in the backend
export async function  createNote (note: Note): Promise<Note> {
    const response = await fetchData("http://localhost:5000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        return response.json();
}

// Function to update a note in the backend
export async function  updateNote (note: Note): Promise<Note> {
    const response = await fetchData(`http://localhost:5000/api/notes/${note._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        return response.json();
}

// Function to delete a note in the backend
export async function  deleteNote (id: string): Promise<Note> {
    const response = await fetchData(`http://localhost:5000/api/notes/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        return response.json();
}
*/
