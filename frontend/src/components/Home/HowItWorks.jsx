import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const steps = [
  {
    icon: <FaUserPlus size={40} color="#4CAF50" />,
    title: "Create Account",
    description:
      "Sign up in just a few steps and unlock thousands of career opportunities.",
  },
  {
    icon: <MdFindInPage size={40} color="#2196F3" />,
    title: "Find a Career / Post a Job",
    description:
      "Browse career listings or post openings to find the perfect match.",
  },
  {
    icon: <IoMdSend size={40} color="#FF9800" />,
    title: "Apply / Recruit",
    description:
      "Apply instantly for jobs or recruit candidates who fit your needs.",
  },
];

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h2 className="heading">🚀 How this platform Works!</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .howitworks {
          padding: 50px 20px;
          background: linear-gradient(135deg, #f8f9fa, #eef2f3);
          text-align: center;
        }
        .heading {
          font-size: 2rem;
          margin-bottom: 40px;
          color: #333;
          font-weight: bold;
        }
        .steps {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .step-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          width: 300px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }
        .icon {
          margin-bottom: 15px;
        }
        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #444;
        }
        p {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .steps {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
