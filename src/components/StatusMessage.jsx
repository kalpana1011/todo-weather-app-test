function StatusMessage({ type = "information", children }) {
  return (
    <div
      className={`status-message ${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

export default StatusMessage;
