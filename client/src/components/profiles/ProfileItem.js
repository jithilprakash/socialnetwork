import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./profilestyles.css"

const ProfileItem = ({
  profile: { user, status, company, location, skills }
}) => {
  console.log("profile item", user);
  return (
    <div>
      {user && (
        <Fragment>
          <div className='profile bg-light'>
            <img src={user.avatar} alt='' className='round-img' />
            <div>
              <h6>{user.name}</h6>
              <p>
                {status} {company && <span> at {company}</span>}
              </p>
              <p className='my-1'>{location && <span>{location}</span>}</p>
              <Link to={`/profile/${user._id}`} className='btn btn-primary'>
                View Profile
              </Link>
            </div>
            <ul>
              {skills.slice(0, 4).map((skill, index) => (
                <li key={index} className='text-primary'>
                  <i className='fas fa-check' />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Fragment>
      )}
    </div>
  );
};
ProfileItem.protoTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
