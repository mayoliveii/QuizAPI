import React from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';

interface CardProps {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestion: number;
}

// const CardAsk = (question, answer, callback, userAnswer, questionNr, totalQuestion) => {
const CardAsk: React.FC<CardProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion
}) => (
  <Box color={'#FFFFFF'} >
    <Center>
      <Text fontSize={'18px'}>
        Question: {questionNr} / {totalQuestion}
      </Text>
    </Center>
    <Center>
      <Text dangerouslySetInnerHTML={{ __html: question }} mx={'10px'} fontSize={['25px', '40px']}></Text>
    </Center >
    <Box>
      {answers.map((answer) => (
        <Box>
          <Center>
            <Button
              disabled={userAnswer}
              onClick={callback}
              bg={'#0D96B4'}
              m={'5px'}
              _hover={{ bg: '#529FCB' }}
              _active={{
                bg: '#52B5CB',
                transform: 'scale(0.96)',
              }}>
              <Text dangerouslySetInnerHTML={{ __html: answer }}></Text>
            </Button>
          </Center>
        </Box>
      ))}
    </Box>
  </Box >
);
;

export default CardAsk;