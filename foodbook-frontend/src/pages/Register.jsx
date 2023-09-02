import Image from "../components/form/AuthImage";
import Form from "../components/form/Form";
import "../assets/css/form/auth-page.css";
import "../assets/css/form/auth-form.css";
import "../assets/css/form/form.css";
import useTitle from "../hooks/useTitle";

export default function RegisterPage() {
  useTitle("Sign in to FoodBook");

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
