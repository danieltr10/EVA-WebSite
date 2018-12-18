import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const EMOTIONS = [
  'Neutro',
  'Calma',
  'Felicidade',
  'Tristeza',
  'Raiva',
  'Medo',
  'Nojo',
  'Surpresa',
];

class Emotions extends Component {
  constructor(props) {
    super(props);
  }

  renderEmotion(emotion) {
    return (
      <div
        className={`emotion-container ${
          EMOTIONS[this.props.selectedEmotionNumber - 1] === emotion
            ? `selected ${this.props.shouldShowCorrection && this.props.selectedEmotionNumber !== this.props.correction && 'wrong'}`
            : ''
        }  ${
          EMOTIONS[this.props.correction - 1] === emotion && this.props.shouldShowCorrection
            ? 'selected-previous'
            : ''
        }`}
        key={emotion}
        onClick={() => this.props.handleEmotionClick(EMOTIONS.indexOf(emotion))}
      >
        <span className="emotion-name"> {emotion} </span>
      </div>
    );
  }

  render() {
    return (
      <div className="all-emotions-container">
        <div className="emotions-row">
          {EMOTIONS.slice(4, 8).map(emotion => this.renderEmotion(emotion))}
        </div>
        <div className="emotions-row">
          {EMOTIONS.slice(0, 4).map(emotion => this.renderEmotion(emotion))}
        </div>
      </div>
    );
  }
}

Emotions.contextTypes = {
  theme: PropTypes.any,
};

export default Emotions;
