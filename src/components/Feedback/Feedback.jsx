import css from './Feedback.module.css';
//1. встановлюємо як пакет залежності проєкту бібліотеку prop-types
//npm install--save - dev prop - types
//2. імпорт бібліотеки
import PropTypes from 'prop-types';

// Підрахунок відсотка позитивних відгуків перенесено з App у компонент
// Розрахунок positiveFeedback можна було б винести у окрему функцію для кращої зручності читання та потенційного повторного використання.
const calcPositiveFeedback = (good, neutral, total) => {
  if (total === 0) {
    return 0;
  }

  return Math.round(((good + neutral) / total) * 100);
};

const Feedback = ({ feedback, totalFeedback }) => {
  const positiveFeedback = calcPositiveFeedback(
    feedback.good,
    feedback.neutral,
    totalFeedback
  );

  return (
    <ul className={css.feedbackList}>
      <li className={css.feedbackItem}>Good: {feedback.good}</li>
      <li className={css.feedbackItem}>Neutral: {feedback.neutral}</li>
      <li className={css.feedbackItem}>Bad: {feedback.bad}</li>
      <li className={css.feedbackItem}>Total: {totalFeedback}</li>
      <li className={css.feedbackItem}>Positive: {positiveFeedback + '%'}</li>
    </ul>
  );
};

// додавання PropTypes для перевірки переданих пропсів компоненту з метою збільшення надійності та полегшення подальшої підтримки.
// Опис типів пропсів компонента
// shape— это валидатор PropTypes, который позволяет указать форму объекта, используется для более детального определения ожидаемой структуры свойства объекта.   shapeв валидатор принимает объект, где каждый ключ = имени свойства, а соответствующее значение является валидатором PropTypes для этого свойства.
Feedback.propTypes = {
  feedback: PropTypes.shape({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }).isRequired,
  totalFeedback: PropTypes.number.isRequired,
};

//згідно ТЗ для компонентів використовується експорт за замовчуванням (export default).
//але використання іменованих експортів ( export const Feedback = ()=>{}; ) забезпечить кращу послідовність та передбачуваність при імпорті компоненту в іншому місці.
export default Feedback;
