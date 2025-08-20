import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer
      className={
        isAuthorized
          ? "footerShow"
          : "footerHide"
      }
      style={{
        background: "linear-gradient(135deg, #000000ff, #2c2c2c)",
        color: "#fff",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        borderTop: "2px solid #444",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ fontSize: "14px" }}>
        &copy; {new Date().getFullYear()} Designed & Developed by{" "}
        <strong style={{ color: "#f39c12" }}>Pranav</strong>.
      </div>

      <div style={{ display: "flex", gap: "15px", fontSize: "1.5rem" }}>
        <Link
          to={"https://github.com/PranavSirohi"}
          target="_blank"
          style={{ color: "#fff", transition: "0.3s" }}
          onMouseOver={(e) => (e.target.style.color = "#f39c12")}
          onMouseOut={(e) => (e.target.style.color = "#fff")}
        >
          <FaGithub />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/pranav-sirohi-31a32b255/"}
          target="_blank"
          style={{ color: "#fff", transition: "0.3s" }}
          onMouseOver={(e) => (e.target.style.color = "#f39c12")}
          onMouseOut={(e) => (e.target.style.color = "#fff")}
        >
          <FaLinkedin />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
