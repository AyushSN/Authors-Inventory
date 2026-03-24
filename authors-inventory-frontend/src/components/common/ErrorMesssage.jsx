const ErrorMessage = ({ message }) =>
    message ? <p className="error-msg">{message}</p> : null;

export default ErrorMessage;