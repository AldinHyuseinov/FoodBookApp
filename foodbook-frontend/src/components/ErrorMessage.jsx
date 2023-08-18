export default function ErrorMessage({ message }) {
  const messageParts = message.split(".");

  return (
    <div>
      {messageParts.map((m, index) => (
        <p key={index} style={{ color: "darkred", padding: 0 }}>
          {m}
        </p>
      ))}
    </div>
  );
}
