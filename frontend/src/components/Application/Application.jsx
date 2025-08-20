import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    coverLetter: "",
    phone: "",
    address: "",
  });
  const [resume, setResume] = useState(null);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // File validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");

    if (!file) {
      setResume(null);
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please select PNG, JPEG, or WEBP format.");
      setResume(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size must be less than 2MB.");
      setResume(null);
      return;
    }

    setResume(file);
  };

  // Submit form
  const handleApplication = async (e) => {
    e.preventDefault();

    if (!Object.values(form).every((field) => field.trim())) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!resume) {
      setFileError("Please upload your resume.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message);
      setForm({ name: "", email: "", coverLetter: "", phone: "", address: "" });
      setResume(null);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section
      style={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
          Application Form
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6c757d",
            marginBottom: "25px",
            fontSize: "15px",
          }}
        >
          Fill out the form below to apply for this position.
        </p>

        <form onSubmit={handleApplication} style={{ display: "grid", gap: "15px" }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            name="phone"
            placeholder="Your Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={form.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="coverLetter"
            placeholder="Cover Letter..."
            value={form.coverLetter}
            onChange={handleChange}
            required
            rows="4"
            style={{ ...inputStyle, resize: "none" }}
          />
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>
              Upload Resume
              <span style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}>
                (PNG, JPEG, WEBP, Max 2MB)
              </span>
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
              style={{ ...inputStyle, padding: "8px" }}
            />
            {fileError && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {fileError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#6c757d" : "#007bff",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 2px 8px rgba(0, 123, 255, 0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.background = "#0056b3";
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.background = "#007bff";
            }}
          >
            {loading ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

const inputStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

export default Application;
