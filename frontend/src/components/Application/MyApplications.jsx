import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) return;
    const fetchApplications = async () => {
      try {
        const endpoint =
          user?.role === "Employer"
            ? "employer/getall"
            : "jobseeker/getall";

        const res = await axios.get(
          `http://localhost:4000/api/v1/application/${endpoint}`,
          { withCredentials: true }
        );
        setApplications(res.data.applications || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load applications");
      }
    };
    fetchApplications();
  }, [isAuthorized, user?.role]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  return (
    <section className="my-applications page" style={{ background: "#f9fafb", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container">
        <h1 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "bold" }}>
          {user?.role === "Job Seeker" ? "My Applications" : "Applications from Job Seekers"}
        </h1>

        {applications.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#6b7280" }}>No Applications Found</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {applications.map((element) =>
              user?.role === "Job Seeker" ? (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  key={element._id}
                  element={element}
                  openModal={openModal}
                />
              )
            )}
          </div>
        )}
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={() => setModalOpen(false)} />}
    </section>
  );
};

export default MyApplications;

const cardStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  padding: "20px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div
    style={cardStyle}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <div>
      <InfoRow label="Name" value={element.name} />
      <InfoRow label="Email" value={element.email} />
      <InfoRow label="Phone" value={element.phone} />
      <InfoRow label="Address" value={element.address} />
      <InfoRow label="Cover Letter" value={element.coverLetter} />
    </div>
    <div style={{ textAlign: "center" }}>
      <img
        src={element.resume.url}
        alt="resume"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => openModal(element.resume.url)}
      />
    </div>
    <button
      onClick={() => deleteApplication(element._id)}
      style={{
        background: "#ef4444",
        color: "#fff",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Delete Application
    </button>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div style={cardStyle}>
    <div>
      <InfoRow label="Name" value={element.name} />
      <InfoRow label="Email" value={element.email} />
      <InfoRow label="Phone" value={element.phone} />
      <InfoRow label="Address" value={element.address} />
      <InfoRow label="Cover Letter" value={element.coverLetter} />
    </div>
    <div style={{ textAlign: "center" }}>
      <img
        src={element.resume.url}
        alt="resume"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <p style={{ margin: "6px 0", color: "#374151" }}>
    <strong style={{ color: "#111827" }}>{label}:</strong> {value}
  </p>
);
