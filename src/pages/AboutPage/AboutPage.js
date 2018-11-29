import React from 'react';
import PropTypes from 'prop-types';
import ScrollToNext from '@components/ScrollToNext';
import './style.scss';

const AboutPage = (props, context) => {
  const {
    theme: { colorPrimary, colorHighlight, bgPrimary, textPrimary }
  } = context;

  return (
    <div className="about-page" style={{ backgroundColor: bgPrimary }}>
      <style jsx="true">
        {`
          .highlight {
            background-color: ${colorHighlight};
          }
          ::selection {
            background-color: ${colorHighlight};
          }
        `}
      </style>
      <div className="content-grid">
        <h1 style={{ color: colorPrimary }}>Sobre</h1>
        <div className="about-wrapper">
          <div className="about-content" style={{ color: textPrimary }}>
            <p>
              A linguagem verbal (linguagem falada) é a forma de expressão que acompanha a humanidade desde a pré-história. Ela, como a humanidade, passou por uma série de modificações e aperfeiçoamentos para chegar ao patamar que está atualmente. Diferente da pré-história, tempo em que a comunicação oral era feita principalmente por gemidos e grunhidos. Hoje, a fala é complexa e carrega muito mais informações do que uma simples mensagem de texto. Com ela, é possível extrair várias informações que um texto por si só não contém.
            </p>
            <p>
              A partir de um dialogo, é possível obter várias informações, tais como: variações no volume, variações no timbre, oscilações e falhas (gagueira). Esses dados depois de processados se tornam muito valiosos para diversas aplicações.
            </p>
            <p>
              Tratando essas informações, pode-se detectar a emoção presente na voz do interlocutor. Uma empresa de <span className="highlight">call centers e telemarketings</span>, por exemplo, poderia se beneficiar do uso desses dados extraídos dos telefonemas realizados para traçar perfis e padrões de comportamento de seus clientes e assim otimizar o atendimento. Tendo em mãos o estado emocional do cliente do outro lado da linha, o operador consegue conduzir o telefonema de uma forma mais empática e coerente com o emocional do interlocutor.
            </p>
          </div>
        </div>
      </div>
      <ScrollToNext pageSelector=".portfolio-page" />
    </div>
  );
};

AboutPage.contextTypes = {
  theme: PropTypes.any
};

export default AboutPage;
