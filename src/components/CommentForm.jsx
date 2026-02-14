import { useState, useEffect } from "react";
import { getCaptcha, createComment } from "../api/commentsApi";
import { handleApi } from "../api/handleApi";

export default function CommentForm({
  parentId = null,
  compact = false,
  onSuccess,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaSvg, setCaptchaSvg] = useState("");

  const loadCaptcha = async () => {
    try {
      const svg = await getCaptcha();
      setCaptchaSvg(svg);
    } catch (error) {
      console.error("Captcha load error:", error);
    }
  };

  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        const svg = await getCaptcha();
        setCaptchaSvg(svg);
      } catch (err) {
        console.error("Failed to load captcha", err);
      }
    };

    fetchCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("text", text);
    formData.append("captcha", captcha);
    if (parentId) formData.append("parent_id", parentId);
    if (file) formData.append("file", file);

    try {
      await handleApi(createComment(formData), "Creating comment...");
      setUsername("");
      setEmail("");
      setText("");
      setCaptcha("");
      setFile(null);
      loadCaptcha(); // оновлення captcha після submit
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err); 
      loadCaptcha();// оновлення captcha при помилці
    }
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? "compact-form" : ""}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <div className="captcha-container">
        {captchaSvg && (
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaSvg)}`}
            alt="captcha"
          />
        )}
        <input
          type="text"
          placeholder="Enter captcha"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          required
        />
        <button type="button" onClick={loadCaptcha}>
          Refresh
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
