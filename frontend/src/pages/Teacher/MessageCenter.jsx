import { useState } from "react";
import { toast } from "react-toastify";
import api, { errorMessage } from "../../api";
import { PageHeader } from "../../components/portal/UI";

export default function MessageCenter() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.post("/api/messages/send", { message: message.trim() });
      toast.success("Message shared with your class");
      setMessage("");
    } catch (failure) { setError(errorMessage(failure)); }
    finally { setBusy(false); }
  }
  return <><PageHeader eyebrow="Class communication" title="Send a class notice" description="This message will appear on the dashboard of students in your assigned class and section." /><section className="panel" style={{ padding: 24 }}><form onSubmit={submit}><label htmlFor="class-message">Your message</label><textarea id="class-message" rows={7} required maxLength={2000} value={message} disabled={busy} onChange={(event) => setMessage(event.target.value)} style={{ marginTop: 10 }} />{error && <p className="inline-error" role="alert">{error}</p>}<div className="modal-actions"><button className="button" disabled={busy || !message.trim()}>{busy ? "Sending…" : "Send to class"}</button></div></form></section></>;
}
