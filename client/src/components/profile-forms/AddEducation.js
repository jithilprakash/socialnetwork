import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Schooling!
      </p>
      {/* <small>* = required field</small> */}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School Name'
            value={school}
            onChange={e => onChange(e)}
            name='school'
            className="form-control"
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            value={degree}
            className="form-control"
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='fieldofstudy'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
            className="form-control"
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            className="form-control"
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              // className="form-control"
              value={current}
              checked={current}
              onChange={e => {
                setFormData(
                  { ...formData, current: !current },
                  toggleDisabled(!toDateDisabled)
                );
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            className="form-control"
            value={to}
            disabled={toDateDisabled ? "disabled" : ""}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            value={description}
            className="form-control"
            onChange={e => onChange(e)}
            placeholder='Job Description'
          />
        </div>
        <input type='submit' className="form-control" className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
