import Image from "../components/form/AuthImage";
import Form from "../components/form/Form";
import "../assets/css/form/auth-page.css";
import "../assets/css/form/auth-form.css";
import "../assets/css/form/form.css";
import useTitle from "../hooks/useTitle";

export default function LoginPage() {
  useTitle("Sign in to FoodBook");

  return (
    <main>
      <Form title="Log in" buttonLabel="Log in">
        <p>
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="join-link">
            Join now
          </a>
        </p>
      </Form>
      <Image />
    </main>
  );
}
