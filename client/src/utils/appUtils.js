export const buildErrorMessage = (message) => {
    if (message) {
        return <span className="error-message">{message}</span>
    }
}