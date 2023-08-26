import Image from "../components/AuthImage";
import Form from "../components/Form";
import "../css/auth-page.css";
import "../css/auth-form.css";
import "../css/form.css";
import useTitle from "../hooks/useTitle";

export default function LoginPage() {
  useTitle("Sign in to FoodBook");
  
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
