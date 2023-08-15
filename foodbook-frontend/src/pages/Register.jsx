import Image from "../components/AuthImage";
import Form from "../components/Form";
import "../css/auth-page.css";
import "../css/form.css";

export default function RegisterPage() {
  return (
    <main>
      <Form title="Create an account" buttonLabel="Join Now" />
      <Image />
    </main>
  );
}
