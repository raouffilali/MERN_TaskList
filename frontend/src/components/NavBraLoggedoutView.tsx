import { Button } from "react-bootstrap";

interface NavBraLoggedoutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}
function NavBraLoggedoutView({
  onSignUpClicked,
  onLoginClicked,
}: NavBraLoggedoutViewProps) {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  );
}

export default NavBraLoggedoutView;
