import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <Moment format={"YYYY/MM/DD"}>{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format={"YYYY/MM/DD"}>{edu.to}</Moment>
        )}{" "}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2  className='lead italic-text'>Education Credentials</h2>
      {education.length < 1 || education === null ? (
        <h4>Education details not added yet</h4>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th className='hide-sm'>Action</th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      )}
    </Fragment>
  );
};

Education.protoTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
