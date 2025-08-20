import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/job/getall",
          { withCredentials: true }
        );
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Available Jobs For Career !!
        </h1>
        <div className="banner" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {jobs.jobs && jobs.jobs.length > 0 ? (
            jobs.jobs.map((element) => (
              <div
                className="card"
                key={element._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  flex: "1 1 calc(33% - 20px)",
                  minWidth: "250px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h3 style={{ marginBottom: "8px", fontSize: "1.2rem" }}>
                  {element.title}
                </h3>
                <p style={{ marginBottom: "4px", color: "#666" }}>
                  Category: {element.category}
                </p>
                <p style={{ marginBottom: "12px", color: "#666" }}>
                  Location: {element.country}
                </p>
                <Link
                  to={`/job/${element._id}`}
                  style={{
                    display: "inline-block",
                    padding: "8px 14px",
                    background: "#333",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
