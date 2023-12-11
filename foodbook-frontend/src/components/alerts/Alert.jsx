import { useRef } from "react";
import "../../assets/css/alerts/alerts.css";

export default function Alert({ type, message }) {
  const alertRef = useRef();

  const closeAlert = () => {
    alertRef.current.style.display = "none";
  };

  return (
    <div className={`alert ${type}`} ref={alertRef}>
      {type === "success" ? (
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
          <path
            fill="#158b13"
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 64 512">
          <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
        </svg>
      )}
      <p className="message">{message}</p>

      <svg
        className="close-alert"
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        viewBox="0 0 384 512"
        onClick={closeAlert}
      >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    </div>
  );
}
