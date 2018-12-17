import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Emotions from './Emotions';

import './style.scss';

const Sound = require('react-sound').default;

const GAME_STATES = {
  STAND_BY: 'STAND_BY',
  PLAYING_AUDIO: 'PLAYING_AUDIO',
  WAITING_FOR_RESPONSE: 'WAITING_FOR_RESPONSE',
  FINISHED: 'FINISHED',
};

const random = (max, min) => Math.floor(Math.random() * (max - min)) + min;

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.getCurrentStep = this.getCurrentStep.bind(this);
    this.handleEmotionClick = this.handleEmotionClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleAudioFinishedPlaying = this.handleAudioFinishedPlaying.bind(
      this
    );
    this.state = {
      gameState: GAME_STATES.STAND_BY,
      currentAudioPath: null,
      currentAudioEmotionNumber: null,
      playerScore: 0,
      computerScore: 0,
      computerGuessEmotionNumber: null,
      selectedEmotionNumber: null,
      askComputer: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.gameState !== GAME_STATES.PLAYING_AUDIO &&
      nextState.gameState === GAME_STATES.PLAYING_AUDIO
    ) {
      let audioPath = 'Actor_';
      const actorNumber = random(1, 25);
      const emotionNumber = random(1, 9);
      const intensity = random(1, 3);
      const phrase = random(1, 3);
      const repetition = random(1, 3);
      if (actorNumber <= 9) {
        audioPath = `${audioPath}0${actorNumber}/03-01-0${emotionNumber}-0${intensity}-0${phrase}-0${repetition}-0${actorNumber}.wav`;
      } else {
        audioPath = `${audioPath}${actorNumber}/03-01-0${emotionNumber}-0${intensity}-0${phrase}-0${repetition}-${actorNumber}.wav`;
      }

      this.setState({
        currentAudioPath: audioPath,
        currentAudioEmotionNumber: emotionNumber,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {askComputer, currentAudioEmotionNumber, computerScore, currentAudioPath} = this.state

    const correctEmotionNumber = currentAudioEmotionNumber;
    console.log(correctEmotionNumber)
    if (!prevState.askComputer && askComputer) {
      this.getEmotionGuess().then(response => {
        const isComputerCorrect = true ||
          correctEmotionNumber === response.emotion;
        console.log(isComputerCorrect);
        const newComputerScore = isComputerCorrect ? computerScore + 1 : computerScore
        this.setState({ askComputer: false, computerScore: newComputerScore, gameState: newComputerScore === 5 ?  GAME_STATES.FINISHED : this.state.gameState})})
    }
  }

  componentWillReceive

  getFinishText(playerScore, computerScore) {
    if (playerScore > computerScore) {
      return 'Parabéns!! Você ganhou 🎉';
    }

    if (playerScore === computerScore) {
      return 'Empatou!';
    }

    return 'Você perdeu! Tente outra vez 😞';
  }

  handleAudioFinishedPlaying() {
    this.setState({ gameState: GAME_STATES.WAITING_FOR_RESPONSE, askComputer: true });
  }

  handleEmotionClick(emotionNumber) {
    this.setState({ selectedEmotionNumber: emotionNumber + 1 });
  }

  getEmotionGuess() {
    this.setState({isLoading: true})
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState({isLoading: false})
        resolve({emotion: 2})
      }, 3000)
    })
  }

  handleNextClick() {
    this.setState((state, props) => {
      const {
        selectedEmotionNumber,
        currentAudioEmotionNumber,
        computerScore,
        playerScore,
      } = state;
      // const response = await fetch('https://mywebsite.com/endpoint/', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     firstParam: 'yourValue',
      //     secondParam: 'yourOtherValue',
      //   })
      // })

      const playerGuessEmotionNumber = selectedEmotionNumber;
      const correctEmotionNumber = currentAudioEmotionNumber;
      const isPlayerCorrect = correctEmotionNumber === playerGuessEmotionNumber;
      const newState = {};
      if (isPlayerCorrect) {
        newState.playerScore = playerScore + 1;
      }

      if (newState.playerScore === 5) {
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
      currentAudioPath,
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
        return currentAudioPath ? (
          <div className="placeholder-content">
            <h2 className="playing-placeholder"> Executando um áudio... </h2>
            <Sound
              url={`https://s3-sa-east-1.amazonaws.com/audios-tcc/${currentAudioPath}`}
              playStatus={Sound.status.PLAYING}
              playFromPosition={0 /* in milliseconds */}
              onFinishedPlaying={this.handleAudioFinishedPlaying}
            />
          </div>
        ) : (
          <div className="placeholder-content">
            <h2 className="playing-placeholder"> Carregando o áudio... </h2>
          </div>
        );
      case WAITING_FOR_RESPONSE:
        return (
          <div className="emotions-content">
            <h2 className="guess-placeholder">Qual é o seu palpite?</h2>
            <Emotions
              handleEmotionClick={this.handleEmotionClick}
              selectedEmotionNumber={selectedEmotionNumber-1}
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
