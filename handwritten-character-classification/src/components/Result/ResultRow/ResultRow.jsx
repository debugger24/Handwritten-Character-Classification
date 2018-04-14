import React from 'react';
import PropTypes from 'prop-types';
import './resultRow.css';

const ResultRow = props => (
  <div className="Result-ResultRow-container">
    <p>{props.resultLabel}</p>
    <p>{props.resultLabelValue}</p>
  </div>
);

ResultRow.propTypes = {
  resultLabel: PropTypes.string.isRequired,
  resultLabelValue: PropTypes.number.isRequired,
};

export default ResultRow;
