import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
      color: "#FF6B6B",
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
      color: "#4ECDC4",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
      color: "#45B7D1",
    },
    {
      id: 4,
      title: "MERN Stack Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
      color: "#6C63FF",
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
      color: "#FFA500",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
      color: "#FF8C94",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
      color: "#00BFA6",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
      color: "#FFB347",
    },
  ];

  return (
    <section className="popular-categories">
      <h2 className="section-title">Popular Categories</h2>
      <div className="categories-grid">
        {categories.map(({ id, title, subTitle, icon, color }) => (
          <div className="category-card" key={id}>
            <div
              className="category-icon"
              style={{ backgroundColor: color }}
            >
              {icon}
            </div>
            <div className="category-info">
              <h3>{title}</h3>
              <p>{subTitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .popular-categories {
          padding: 3rem 1.5rem;
          background: #f9fafb;
          text-align: center;
        }

        .section-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2rem;
          color: #333;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .category-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .category-icon {
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .category-info h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .category-info p {
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
    </section>
  );
};

export default PopularCategories;
