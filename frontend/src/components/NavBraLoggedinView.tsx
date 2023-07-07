import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBraLoggedinViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}
function NavBraLoggedinView({
  user,
  onLogoutSuccessful,
}: NavBraLoggedinViewProps) {
  async function logout() {
    try {
      await NotesApi.logout;
      onLogoutSuccessful();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text>Signed in as : {user.username}</Navbar.Text>
      <Button onClick={logout}>Log Out</Button>
    </>
  );
}

export default NavBraLoggedinView;
