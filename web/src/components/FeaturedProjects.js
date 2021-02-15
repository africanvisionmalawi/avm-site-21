import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import projectLinkStyles from "./projects.module.css";

const projects = [
  {
    id: "village",
    name: "Sam's Village",
    src: "/sams-village/",
  },
  {
    id: "water",
    name: "Water",
    src: "/water/",
  },
  {
    id: "health",
    name: "Health",
    src: "/health/",
  },
  {
    id: "education",
    name: "Education",
    src: "/education/",
  },
  {
    id: "environment",
    name: "Environment",
    src: "/environment/",
  },
  {
    id: "celebrate",
    name: "Celebrate & Give",
    src: "/celebrate-and-give/",
  },
];

const FeaturedProjects = ({ currentProject, displayHeading }) => (
  <div className={projectLinkStyles.featuredProjectsCont}>
    {displayHeading === true ? <h3>Our work</h3> : ""}
    <ul className={projectLinkStyles.featuredProjects}>
      {projects.map((project) => (
        <li
          className={
            project.id === currentProject ? projectLinkStyles.active : ``
          }
          key={project.id}
        >
          <Link to={project.src}>{project.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

FeaturedProjects.propTypes = {
  currentProject: PropTypes.string,
  displayHeading: PropTypes.bool,
};

export default FeaturedProjects;
