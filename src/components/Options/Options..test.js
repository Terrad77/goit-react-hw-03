// встановлюємо бібліотеку тестуваання як залежність на проєкт
// npm install --save - dev jest
// Додаємо в файл package.json у розділ "scripts": {"test": "jest",}
// npm install --save-dev @testing-library/react @testing-library/jest-dom

// імпорт бібліотеки тестування react
import { render, fireEvent } from '@testing-library/react';
import Options from './Options';

// Mocking функцій, переданих як пропс
const mockUpdateFeedback = jest.fn();
const mockResetFeedback = jest.fn();

const setup = () => {
  const { getByText } = render(
    <Options
      updateFeedback={mockUpdateFeedback}
      resetFeedback={mockResetFeedback}
      totalFeedback={3} // встановлюємо зразок значення totalFeedback
    />
  );

  return { getByText };
};

describe('Options component', () => {
  it('має викликати updateFeedback із "good", коли натиснуто кнопку «Good»', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('Good'));
    expect(mockUpdateFeedback).toHaveBeenCalledWith('good');
  });

  it('має викликати updateFeedback із "neutral", коли натиснуто кнопку «Neutral»', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('Neutral'));
    expect(mockUpdateFeedback).toHaveBeenCalledWith('neutral');
  });

  it('має викликати updateFeedback із "bad", коли натиснуто кнопку «Bad»', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('Bad'));
    expect(mockUpdateFeedback).toHaveBeenCalledWith('bad');
  });

  it('має викликати resetFeedback коли натиснуто кнопу «Reset button»', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('Reset'));
    expect(mockResetFeedback).toHaveBeenCalled();
  });

  it('не має робити render кнопка Reset button, коли totalFeedback дорінює 0', () => {
    const { queryByText } = render(
      <Options
        updateFeedback={mockUpdateFeedback}
        resetFeedback={mockResetFeedback}
        totalFeedback={0}
      />
    );
    expect(queryByText('Reset')).toBeNull();
  });
});
