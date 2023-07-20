import React, { ReactNode } from "react";
import "./Card.scss";

interface CardProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  type?: "plan" | "courses";
  children?: ReactNode;
  title?: string;
  price?: string;
  titleColor?:string
  description?: string;
  image?: string;
  instructor?: string;
}

const Card: React.FC<CardProps> = ({
  width = "100%",
  height = "auto",
  borderRadius = "22px",
  type = "plan",
  children,
  title,
  price="FREE",
  titleColor ="teal",
  description,
  image,
  instructor,
}) => {
  const cardClass = `card ${type}`;

  const cardStyle = {
    width,
    height,
    borderRadius,
  };

  if (type === "plan") {
    return (
      <div className={cardClass} style={cardStyle}>
        <div className="title" style={{ background: titleColor }}>
          {title}
        </div>
        <div className="body">{children}</div>
        <div className="footer" style={{ color: titleColor }}>
          {price}
        </div>
        <div className="hover-text">Susbscribe</div>
      </div>
    );
  }

  return (
    <div className="course_card">
      <div className="course_image">
        <img src={image} alt="Course" />
      </div>
      <div className="course_details">
          <h2 className="course_title">{title}</h2>
          <p className="course_description">{description}</p>
          <p className="course_instructor">Instructor: {instructor}</p>
          <button className="course_button">Enroll Now</button>
        
      </div>
    </div>
  );
};

export default Card;
