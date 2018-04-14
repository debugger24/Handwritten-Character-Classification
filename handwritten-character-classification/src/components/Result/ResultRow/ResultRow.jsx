import React from 'react';
import PropTypes from 'prop-types';
import './resultRow.css';

const ResultRow = props => (
  <div className="Result-ResultRow-container">
    <p>{props.resultLabel}</p>
    <p>{props.resultValue}</p>
  </div>
);

ResultRow.propTypes = {
  resultLabel: PropTypes.string.isRequired,
  resultValue: PropTypes.number.isRequired,
};

export default ResultRow;
