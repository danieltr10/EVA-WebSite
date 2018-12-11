import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Emotions from './Emotions';

import './style.scss';

const GAME_STATES = {
  STAND_BY: 'STAND_BY',
  PLAYING_AUDIO: 'PLAYING_AUDIO',
  WAITING_FOR_RESPONSE: 'WAITING_FOR_RESPONSE',
  FINISHED: 'FINISHED',
};

const getEmotionNumberFromPath = audioPath => {};

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.getCurrentStep = this.getCurrentStep.bind(this);
    this.handleEmotionClick = this.handleEmotionClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.state = {
      gameState: GAME_STATES.STAND_BY,
      currentAudioPath: null,
      playerScore: 0,
      computerScore: 0,
      computerGuessEmotionNumber: null,
      selectedEmotionNumber: null,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.gameState !== GAME_STATES.PLAYING_AUDIO &&
      nextState.gameState === GAME_STATES.PLAYING_AUDIO
    ) {
      setTimeout(() => {
        this.setState({ gameState: GAME_STATES.WAITING_FOR_RESPONSE });
      }, 2000);
    }
  }

  getFinishText(playerScore, computerScore) {
    if (playerScore > computerScore) {
      return 'Parabéns!! Você ganhou 🎉';
    }

    if (playerScore === computerScore) {
      return 'Empatou!';
    }

    return 'Você perdeu! Tente outra vez 😞';
  }

  handleEmotionClick(emotionNumber) {
    this.setState({ selectedEmotionNumber: emotionNumber });
  }

  handleNextClick() {
    this.setState((state, props) => {
      const {
        selectedEmotionNumber,
        computerGuessEmotionNumber,
        currentAudioPath,
        computerScore,
        playerScore,
      } = state;
      const playerGuessEmotionNumber = selectedEmotionNumber;
      const correctEmotionNumber = getEmotionNumberFromPath(currentAudioPath);
      const isComputerCorrect =
        correctEmotionNumber === computerGuessEmotionNumber;
      const isPlayerCorrect = correctEmotionNumber === playerGuessEmotionNumber;
      const newState = {};
      if (isPlayerCorrect) {
        newState.playerScore = playerScore + 1;
      }

      if (isComputerCorrect) {
        newState.computerScore = computerScore + 1;
      }

      if (newState.computerScore === 5 || newState.playerScore === 5) {
        newState.gameState = GAME_STATES.FINISHED;
      } else {
        newState.gameState = GAME_STATES.PLAYING_AUDIO;
      }

      newState.selectedEmotionNumber = null;

      return newState;
    });
  }

  getCurrentStep() {
    const {
      gameState,
      playerScore,
      computerScore,
      selectedEmotionNumber,
    } = this.state;
    const {
      STAND_BY,
      PLAYING_AUDIO,
      WAITING_FOR_RESPONSE,
      FINISHED,
    } = GAME_STATES;

    switch (gameState) {
      case STAND_BY:
        return (
          <div className="play-content">
            <h1 className="game-title">Você consegue vencer a máquina?</h1>
            <div
              className="play-button"
              onClick={() =>
                this.setState({ gameState: GAME_STATES.PLAYING_AUDIO })
              }
            >
              <button className="fas fa-play" />
            </div>
          </div>
        );
      case PLAYING_AUDIO:
        return (
          <div className="placeholder-content">
            <h2 className="playing-placeholder"> Executando um áudio... </h2>
          </div>
        );
      case WAITING_FOR_RESPONSE:
        return (
          <div className="emotions-content">
            <h2 className="guess-placeholder">Qual é o seu palpite?</h2>
            <Emotions
              handleEmotionClick={this.handleEmotionClick}
              selectedEmotionNumber={selectedEmotionNumber}
            />

            {selectedEmotionNumber !== null && (
              <div className="next-button" onClick={this.handleNextClick}>
                Próxima
              </div>
            )}
          </div>
        );
      case FINISHED:
        return (
          <div className="finished-content">
            <h2 className="playing-placeholder">
              {this.getFinishText(playerScore, computerScore)}
            </h2>
          </div>
        );
      default:
    }
  }

  render() {
    const { gameState, playerScore, computerScore } = this.state;
    return (
      <div className="challenge-container">
        {gameState !== GAME_STATES.STAND_BY && (
          <div className="scores">
            <span>
              {`Humano ${playerScore} x ${computerScore} Computador`}{' '}
            </span>
          </div>
        )}

        <div className="content">{this.getCurrentStep()}</div>
      </div>
    );
  }
}

Challenge.contextTypes = {
  theme: PropTypes.any,
};

export default Challenge;