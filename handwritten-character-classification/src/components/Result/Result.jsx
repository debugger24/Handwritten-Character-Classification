import React from 'react';
import PropTypes from 'prop-types';
import './result.css';
import ResultRow from './ResultRow/ResultRow';

const Result = props => (
  <div className="Result-container">
    {Object.keys(props.resultJSON).map(key => (<ResultRow
      resultLabel={key}
      resultValue={props.resultJSON[key]}
    />))}
  </div>
);

Result.propTypes = {
  resultJSON: PropTypes.string.isRequired,
};

export default Result;
