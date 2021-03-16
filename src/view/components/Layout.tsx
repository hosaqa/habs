import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Container, Flex, Box } from '@chakra-ui/react';
import AddHabitForm from './AddHabitForm';
import HabitsList from './HabitsList';

const theme = {
  styles: {
    global: {
      root: {
        height: '100vh',
      },
    },
  },
};

export default function Layout() {
  return (
    <ChakraProvider>
      <Flex height="100vh" align="center" paddingBottom="148px">
        <Container maxW="668px">
          <Box mt="32px">
            <HabitsList />
          </Box>
        </Container>
      </Flex>
    </ChakraProvider>
  );
}
