import Image from "../components/AuthImage";
import Form from "../components/Form";
import "../css/auth-page.css";
import "../css/form.css";

export default function RegisterPage() {
  return (
    <main>
      <Form title="Create an account" buttonLabel="Join Now">
        <p>
          Have an account?{" "}
          <a href="/auth/login" className="join-link">
            Log in
          </a>
        </p>
      </Form>
      <Image />
    </main>
  );
}
