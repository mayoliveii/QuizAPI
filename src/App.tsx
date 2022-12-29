import React, { useState } from 'react';
import { Alert, AlertIcon, Box, Button, Center, ChakraProvider } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { fetchQuizQuestions } from './API';
import CardAsk from './components/CardAsk';
// Types
import { QuestionsState, Difficulty } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 8;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuestionsApi = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {

    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <ChakraProvider>
      <Box w={'100%'} h={['800', '900']} bgGradient='linear(to-l, #0D96B4, #192166)' >
        <Box >
          <Text
            pt={['50px', '100px']}
            color='#FFFFFF'
            fontSize={['2.5em', '5em']}
            fontWeight='extrabold' >
            <Center >
              {'Mythology Quiz'}
            </Center>
          </Text>
          <Box mt={'20px'}>
            <Center >
              {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <Button
                  onClick={startQuestionsApi}
                  _hover={{ bg: '#529FCB' }}
                  _active={{
                    bg: '#52B5CB',
                    transform: 'scale(0.96)',
                  }}
                >{'Start'}</Button>
              ) : null}
            </Center>
          </Box>
        </Box>
        <Box color={'#FFFFFF'} fontSize={'2xl'}>
          <Center>
            {!gameOver ? <Text> Score: {score}</Text> : null}
          </Center>
          <Center>
            {loading ?
              <Alert w={'280px'} status='success' variant='solid' bg={'#0D3947'}>
                <AlertIcon />
                {'Loading questions'}
              </Alert> : null}
          </Center>
        </Box>
        {!loading && !gameOver && (
          <CardAsk
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTIONS}
          />
        )}
        <Box mt={'15px'}>
          <Center>
            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (

              <Button onClick={nextQuestion}
                _hover={{ bg: '#192166', color: '#FFFFFF' }}
                _active={{
                  bg: '#000637',
                  color: '#FFFFFF',
                  transform: 'scale(0.96)',
                }}>{'Next Question'}</Button>
            ) : null}
          </Center>
        </Box>
      </Box>
    </ChakraProvider >
  );
}

export default App;