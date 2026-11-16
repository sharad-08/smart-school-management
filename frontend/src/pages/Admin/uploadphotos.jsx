import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api, { errorMessage } from "../../api";
import { PageHeader } from "../../components/portal/UI";

export default function UploadPhotos() {
  const [eventType, setEventType] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef(null);
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);
  function chooseFiles(event) {
    const selected = Array.from(event.target.files);
    if (selected.length > 10 || selected.reduce((size, file) => size + file.size, 0) > 4 * 1024 * 1024) {
      setError("Choose up to 10 images with a combined size of 4 MB or less.");
      event.target.value = "";
      setFiles([]);
      return;
    }
    setError("");
    setFiles(selected);
  }
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("eventType", eventType);
      files.forEach((file) => form.append("photos", file));
      await api.post("/api/events/upload", form);
      toast.success("Event photos saved");
      setFiles([]);
      setEventType("");
      fileInput.current.value = "";
    } catch (failure) { setError(errorMessage(failure)); }
    finally { setBusy(false); }
  }
  return <><PageHeader eyebrow="School life" title="Event photos" description="Upload school activity photos to the event collection." /><section className="panel" style={{ padding: 24 }}><form onSubmit={submit}><fieldset disabled={busy}><label htmlFor="event-type">Event category</label><select id="event-type" required value={eventType} onChange={(event) => setEventType(event.target.value)}><option value="">Select an event</option>{["Annual Function", "Library", "Transport", "Art Lab", "Science Lab", "Sports"].map((name) => <option key={name}>{name}</option>)}</select><label htmlFor="event-files" className="block" style={{ marginTop: 24 }}>Event images</label><input ref={fileInput} id="event-files" type="file" multiple required accept="image/png,image/jpeg,image/webp,image/gif" onChange={chooseFiles} /><p className="muted">Up to 10 images · 4 MB combined maximum</p><div className="teacher-grid" style={{ marginTop: 20 }}>{previews.map((url, index) => <img key={url} src={url} alt={files[index]?.name || "Selected event photo"} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }} />)}</div></fieldset>{error && <p className="inline-error" role="alert">{error}</p>}<div className="modal-actions"><button className="button" disabled={busy || !files.length}>{busy ? "Uploading…" : "Upload photos"}</button></div></form></section></>;
}
