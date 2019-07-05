import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ getGithubRepos, repos, username }) => {
  // console.log(username);
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, index) => (
          <div key={index} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars : {repo.stargazers_count}
                </li>
                <li className='badge badge-primary'>
                  Watcher : {repo.watchers_count}
                </li>
                <li className='badge badge-primary'>
                  Forks : {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);
