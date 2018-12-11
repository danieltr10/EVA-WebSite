import React from 'react';
import PropTypes from 'prop-types';
import ScrollToPrevious from '@components/ScrollToPrevious';
import Challenge from '@components/Challenge';

import './style.scss';

const ChallengePage = (props, context) => {
  const {
    theme: { colorPrimary, colorAlternate, textAlternate, bgPrimary }
  } = context;

  return (
    <div className="challenge-page" style={{ backgroundColor: bgPrimary }}>
      <div className="content-grid">
        <h1 style={{ color: colorPrimary }}>Desafio</h1>
        <div className="challenge-wrapper">
          <Challenge />
        </div>
      </div>
      <ScrollToPrevious pageSelector=".challenge-page" />
    </div>
  );
};

ChallengePage.contextTypes = {
  theme: PropTypes.any
};

export default ChallengePage;
