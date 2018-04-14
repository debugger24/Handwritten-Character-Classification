import React from 'react';
import PropTypes from 'prop-types';
import './result.css';
import ResultRow from './ResultRow/ResultRow';

const Result = props => (
  <div className="Result-container">
    {props.result.map(element => (<ResultRow
      resultLabel={element[0]}
      resultValue={element[1]}
    />))}
  </div>
);

Result.propTypes = {
  result: PropTypes.string.isRequired,
};

export default Result;
