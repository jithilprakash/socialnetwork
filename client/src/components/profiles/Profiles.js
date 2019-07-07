import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import "./profilestyles.css"

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading && profiles === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>People connected</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles !== null && profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>
                No Profiles found
                <Spinner />
              </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profile);
