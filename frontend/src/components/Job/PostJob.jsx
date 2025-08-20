import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    salaryType: "default",
  });

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();

    const payload =
      formData.salaryType === "Fixed Salary"
        ? { ...formData, salaryFrom: "", salaryTo: "" }
        : formData.salaryType === "Ranged Salary"
        ? { ...formData, fixedSalary: "" }
        : { ...formData, salaryFrom: "", salaryTo: "", fixedSalary: "" };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFormData({
        title: "",
        description: "",
        category: "",
        country: "",
        city: "",
        location: "",
        salaryFrom: "",
        salaryTo: "",
        fixedSalary: "",
        salaryType: "default",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div className="job_post page" style={{ padding: "2rem 0" }}>
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem", textAlign: "center" }}>Post a New Job!</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
            Fill out the details given below.
          </p>

          <form onSubmit={handleJobPost} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Job Title & Category */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Job Title *"
                required
                style={inputStyle}
              />
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">Select Category *</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Frontend Web Development">Frontend Web Development</option>
                <option value="Business Development Executive">Business Development Executive</option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">MEAN Stack Development</option>
                <option value="MERN Stack Development">MERN Stack Development</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>

            {/* Country & City */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Country *"
                required
                style={inputStyle}
              />
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City *"
                required
                style={inputStyle}
              />
            </div>

            {/* Location */}
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Full Address / Location"
              style={inputStyle}
            />

            {/* Salary Type & Values */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <select
                value={formData.salaryType}
                onChange={(e) => handleChange("salaryType", e.target.value)}
                required
                style={inputStyle}
              >
                <option value="default">Select Salary Type *</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>

              {formData.salaryType === "Fixed Salary" && (
                <input
                  type="number"
                  placeholder="Fixed Salary"
                  value={formData.fixedSalary}
                  onChange={(e) => handleChange("fixedSalary", e.target.value)}
                  required
                  style={inputStyle}
                />
              )}

              {formData.salaryType === "Ranged Salary" && (
                <>
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={formData.salaryFrom}
                    onChange={(e) => handleChange("salaryFrom", e.target.value)}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={formData.salaryTo}
                    onChange={(e) => handleChange("salaryTo", e.target.value)}
                    required
                    style={inputStyle}
                  />
                </>
              )}
            </div>

            {/* Description */}
            <textarea
              rows="6"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Job Description *"
              required
              style={{ ...inputStyle, resize: "none" }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                background: "#1976d2",
                color: "#fff",
                padding: "0.75rem",
                border: "none",
                borderRadius: "4px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1565c0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
            >
              Create Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  flex: 1,
  padding: "0.6rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
};

export default PostJob;
