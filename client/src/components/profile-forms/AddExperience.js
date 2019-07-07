import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      {/* <small>* = required field</small> */}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            className="form-control"
            placeholder='* Job Title'
            value={title}
            onChange={e => onChange(e)}
            name='title'
            required
          />
        </div>
        <div className='form-group'>
          <input
          className="form-control"
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className="form-control"
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            className="form-control"
            name='from'
            value={from}
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
            value={to}
            className="form-control"
            disabled={toDateDisabled ? "disabled" : ""}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            className="form-control"
            value={description}
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience));
