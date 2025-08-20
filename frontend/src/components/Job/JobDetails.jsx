import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  const [job, setJob] = useState(null);

  // Redirect if unauthorized
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  // Fetch job details
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => setJob(res.data.job))
      .catch(() => navigate("/notfound"));
  }, [id, navigate]);

  if (!job) {
    return (
      <section className="job-detail page">
        <div className="container">
          <p className="loading-text">Loading job details...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="job-detail page">
      <div className="container">
        <div className="job-card">
          <header className="job-header">
            <h2 className="job-title">{job.title}</h2>
            <p className="job-category">{job.category}</p>
          </header>

          <div className="job-info">
            <p><strong>📍 Location:</strong> {job.city}, {job.country}</p>
            <p><strong>🏢 Workplace:</strong> {job.location}</p>
            <p><strong>📝 Description:</strong> {job.description}</p>
            <p><strong>📅 Posted On:</strong> {job.jobPostedOn}</p>
            <p>
              <strong>💰 Salary:</strong>{" "}
              {job.fixedSalary
                ? job.fixedSalary
                : `${job.salaryFrom} - ${job.salaryTo}`}
            </p>
          </div>

          {user?.role !== "Employer" && (
            <div className="apply-btn-wrapper">
              <Link to={`/application/${job._id}`} className="apply-btn">
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Inline styles for demo purposes */}
      <style jsx>{`
        .job-card {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          max-width: 700px;
          margin: auto;
        }
        .job-header {
          border-bottom: 1px solid #eee;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
        }
        .job-title {
          font-size: 1.8rem;
          margin: 0;
          color: #222;
        }
        .job-category {
          color: #666;
          font-size: 1rem;
          margin-top: 0.3rem;
        }
        .job-info p {
          margin: 0.6rem 0;
          font-size: 1rem;
          color: #444;
        }
        .apply-btn-wrapper {
          margin-top: 1.5rem;
          text-align: right;
        }
        .apply-btn {
          background: #007bff;
          color: #fff;
          padding: 0.7rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.3s;
        }
        .apply-btn:hover {
          background: #0056b3;
        }
        .loading-text {
          text-align: center;
          color: #666;
          padding: 2rem 0;
        }
      `}</style>
    </section>
  );
};

export default JobDetails;
