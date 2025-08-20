import React from "react";
import {
  FaBuilding,
  FaSuitcase,
  FaUsers,
  FaUserPlus,
  FaGlobe,
  FaLaptopCode,
} from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = () => {
  const details = [
    { id: 1, title: "91,220", subTitle: "Companies", icon: <FaBuilding />, color: "#6a5acd" },
    { id: 2, title: "2,34,200", subTitle: "Career Seekers", icon: <FaUsers />, color: "#20b2aa" },
    { id: 3, title: "1,03,761", subTitle: "Employers", icon: <FaUserPlus />, color: "#ffb400" },
    { id: 4, title: "75+", subTitle: "Countries Reached", icon: <FaGlobe />, color: "#3cb371" },
    { id: 5, title: "8,900+", subTitle: "Remote Opportunities", icon: <FaLaptopCode />, color: "#ff69b4" },
  ];

  return (
    <div className="heroSection">
      {/* Main Hero Content */}
      <div className="container">
        {/* Left Content */}
        <div className="left-content">
          <h1>Choose a career that matches your passions and abilities</h1>
          <h1></h1>
          <p>
            Match your skills and passions with the right opportunities.
            Connect with employers ready to offer you a career that inspires.
          </p>
        </div>

        {/* Right Image */}
        <div className="right-image">
          <img src="/homepageimgg.png" alt="hero" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="details">
        {details.map((item) => (
          <div
            className="card"
            key={item.id}
            style={{
              background: `linear-gradient(135deg, ${item.color}20, ${item.color}50)`,
              "--hover-shadow": `${item.color}40`,
            }}
          >
            <div className="icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <div className="content">
              <p className="title-num">{item.title}</p>
              <p>{item.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
