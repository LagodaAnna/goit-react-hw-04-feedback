import { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import Box from './Box';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const marks = { good, neutral, bad };
  const options = Object.keys(marks);
  const total = countTotalFeedback(Object.values(marks));
  const positivePercentage = countPositiveFeedbackPercentage(total, good);

  const handleChosenOption = evt => {
    const option = evt.currentTarget.textContent;
    switch (option) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  function countTotalFeedback(feedbacksValue) {
    return feedbacksValue.reduce((total, feedback) => {
      return (total += feedback);
    }, 0);
  }

  function countPositiveFeedbackPercentage(total, positive) {
    return total === 0 ? 0 : ((positive / total) * 100).toFixed() + '%';
  }

  return (
    <Box
      bg="mainBg"
      width="50%"
      my={0}
      mx="auto"
      minHeight="400px"
      borderRadius="normal"
      as="main"
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleChosenOption}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </Box>
  );
};
