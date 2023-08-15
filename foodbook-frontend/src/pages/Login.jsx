import Image from "../components/AuthImage";
import Form from "../components/Form";
import "../css/auth-page.css";
import "../css/form.css";

export default function LoginPage() {
  return (
    <main>
      <Form title="Log in" buttonLabel="Log in">
        <p>
          Don't have an account?{" "}
          <a href="/auth/register" className="join-link">
            Join now
          </a>
        </p>
      </Form>
      <Image />
    </main>
  );
}
