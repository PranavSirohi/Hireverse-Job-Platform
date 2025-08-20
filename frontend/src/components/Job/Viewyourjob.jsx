import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => setEditingMode(jobId);
  const handleDisableEdit = () => setEditingMode(null);

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Your Posted Jobs
        </h1>

        {myJobs.length > 0 ? (
          <div
            className="banner"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {myJobs.map((element) => (
              <div
                key={element._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  flex: "1 1 calc(50% - 20px)",
                  minWidth: "300px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div>
                    <label>Title:</label>
                    <input
                      type="text"
                      value={element.title}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(element._id, "title", e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <div>
                    <label>Country:</label>
                    <input
                      type="text"
                      value={element.country}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(element._id, "country", e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <div>
                    <label>City:</label>
                    <input
                      type="text"
                      value={element.city}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(element._id, "city", e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <div>
                    <label>Category:</label>
                    <select
                      value={element.category}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "category",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="Graphics & Design">Graphics & Design</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Frontend Web Development">Frontend Web Development</option>
                      <option value="MERN Stack Development">MERN STACK Development</option>
                      <option value="Account & Finance">Account & Finance</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Video Animation">Video Animation</option>
                      <option value="MEAN Stack Development">MEAN STACK Development</option>
                      <option value="MEVN Stack Development">MEVN STACK Development</option>
                      <option value="Data Entry Operator">Data Entry Operator</option>
                    </select>
                  </div>

                  <div>
                    <label>Salary:</label>
                    {element.fixedSalary ? (
                      <input
                        type="number"
                        value={element.fixedSalary}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "fixedSalary",
                            e.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "6px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="number"
                          value={element.salaryFrom}
                          disabled={editingMode !== element._id}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "salaryFrom",
                              e.target.value
                            )
                          }
                          style={{
                            flex: 1,
                            padding: "6px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                        <input
                          type="number"
                          value={element.salaryTo}
                          disabled={editingMode !== element._id}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "salaryTo",
                              e.target.value
                            )
                          }
                          style={{
                            flex: 1,
                            padding: "6px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label>Expired:</label>
                    <select
                      value={element.expired}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "expired",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>

                  <div>
                    <label>Description:</label>
                    <textarea
                      rows={4}
                      value={element.description}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "description",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <div>
                    <label>Location:</label>
                    <textarea
                      rows={3}
                      value={element.location}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "location",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  {editingMode === element._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateJob(element._id)}
                        style={{
                          background: "#28a745",
                          color: "#fff",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleDisableEdit()}
                        style={{
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <RxCross2 />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(element._id)}
                      style={{
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    style={{
                      background: "#6c757d",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            You haven't posted any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
