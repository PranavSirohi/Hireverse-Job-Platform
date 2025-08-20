import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft size={35} color="#0f4de9ff" />,
      gradient: "linear-gradient(135deg, #f0f0f0, #d6d6d6)",
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla size={35} color="#111010ff" />,
      gradient: "linear-gradient(135deg, #f0f0f0, #d6d6d6)",
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple size={35} color="#0a0a0aff" />,
      gradient: "linear-gradient(135deg, #f0f0f0, #f8f3f3ff)",
    },
  ];

  return (
    <div className="companies" style={{ padding: "50px 0", background: "#f9fafb" }}>
      <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h3 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "40px", color: "#333" }}>
          🚀 Top Recruiters
        </h3>
        <div
          className="banner"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            alignItems: "stretch", // Makes all cards equal height
          }}
        >
          {companies.map((element) => (
            <div
              className="card"
              key={element.id}
              style={{
                background: element.gradient,
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%", // Ensures all cards stretch equally
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              {/* Top Content */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div className="icon">{element.icon}</div>
                <div className="text">
                  <p style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "0" }}>{element.title}</p>
                  <p style={{ fontSize: "0.9rem", color: "#555", margin: "5px 0 0" }}>
                    {element.location}
                  </p>
                </div>
              </div>

              {/* Bottom Button */}
              <button
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#62607aff",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
