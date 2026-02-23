import { useState, useEffect } from "react";
import { getCaptcha, createComment } from "../api/commentsApi";
import { handleApi } from "../api/handleApi";

const API_URL = import.meta.env.VITE_API_URL;

export default function CommentForm({ parentId = null, compact = false, onSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const [captcha, setCaptcha] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState("");

  // ===========================
  // REFRESH CAPTCHA
  // ===========================
  const refreshCaptcha = async () => {
    try {
      const data = await getCaptcha();
      setCaptchaId(data.captchaId);
      setCaptcha("");
      setCaptchaUrl(`${API_URL}/captcha/image/${data.captchaId}?t=${Date.now()}`);
    } catch (error) {
      console.error("Captcha load error:", error);
    }
  };

  // ===========================
  // INITIAL CAPTCHA LOAD
  // ===========================
  useEffect(() => {
    let isMounted = true;

    const initCaptcha = async () => {
      try {
        const data = await getCaptcha();
        if (!isMounted) return;
        setCaptchaId(data.captchaId);
        setCaptchaUrl(`${API_URL}/captcha/image/${data.captchaId}?t=${Date.now()}`);
      } catch (error) {
        console.error("Captcha init error:", error);
      }
    };

    initCaptcha();
    return () => { isMounted = false; };
  }, []);

  // ===========================
  // SUBMIT
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("text", text);
    formData.append("captcha", captcha);
    formData.append("captchaId", captchaId);
    if (parentId) formData.append("parent_id", parentId);
    if (file) formData.append("file", file);

    try {
      const newComment = await handleApi(createComment(formData), "Creating comment...");

      // Очистка форми
      setUsername("");
      setEmail("");
      setText("");
      setCaptcha("");
      setFile(null);

      await refreshCaptcha();

      // Передаємо новий коментар у батьківський компонент
      if (onSuccess) onSuccess(newComment);
    } catch (err) {
      console.error(err);
      await refreshCaptcha();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? "compact-form" : ""}>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <textarea placeholder="Comment" value={text} onChange={e => setText(e.target.value)} required />
      <input type="file" onChange={e => setFile(e.target.files[0] || null)} />

      <div className="captcha-container" style={{ marginTop: "10px" }}>
        {captchaUrl && <img src={captchaUrl} alt="Captcha" width={150} height={50} style={{ display: "block", marginBottom: "5px", border: "1px solid #ccc" }} />}
        <input type="text" placeholder="Enter captcha" value={captcha} onChange={e => setCaptcha(e.target.value)} required style={{ marginRight: "5px" }} />
        <button type="button" onClick={refreshCaptcha}>Refresh</button>
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>Submit</button>
    </form>
  );
}