import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteExperience } from "../../actions/profile";
import "./dashboardstyles.css"

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td className="lead italic-text">{exp.company}</td>
      <td className='hide-sm italic-text'>{exp.title}</td>
      <td className='hide-sm italic-text'>
        <Moment format={"YYYY/MM/DD"}>{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format={"YYYY/MM/DD"}>{exp.to}</Moment>
        )}{" "}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='lead italic-text'>Experience Credentials</h2>
      {experience.length < 1 || experience === null ? (
        <h4>Experience not added yet.</h4>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th className="lead italic-text">Company</th>
              <th className='hide-sm lead italic-text'>Title</th>
              <th className='hide-sm lead italic-text'>Years</th>
              <th className='hide-sm lead italic-text'>Action</th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      )}
    </Fragment>
  );
};

Experience.protoTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
