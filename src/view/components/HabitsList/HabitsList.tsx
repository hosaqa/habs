import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Checkbox,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useStores } from 'view/hooks';
import { getCurrentWeek } from 'utils';
import AddHabitForm from '../AddHabitForm';

const AddHabitPopup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //TODO: replace any by corrent type
  const initialRef = useRef<any>();

  return (
    <>
      <IconButton onClick={onOpen} aria-label="add habit" size="xs" icon={<AddIcon />} />
      <Modal initialFocusRef={initialRef!} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add you new habit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AddHabitForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

function HabitsList() {
  const { habitsStore } = useStores();

  if (!habitsStore.list || !habitsStore.list.length) return null;

  const currentWeek = getCurrentWeek();

  const caption = `${currentWeek[0].toDateString()} - ${currentWeek[currentWeek.length - 1].toDateString()}`;

  return (
    <Table variant="simple" size="sm">
      <TableCaption>{caption}</TableCaption>
      <Thead>
        <Tr>
          <Th minWidth="124px">
            Name <AddHabitPopup />
          </Th>
          <Th>Mon</Th>
          <Th>Tue</Th>
          <Th>Wed</Th>
          <Th>Thu</Th>
          <Th>Fri</Th>
          <Th>Sat</Th>
          <Th>Sun</Th>
        </Tr>
      </Thead>
      <Tbody>
        {habitsStore.list.map(({ name, dates = {} }) => (
          <Tr key={name}>
            <HabNameCell>
              <Text fontSize="sm" marginRight={2}>
                {name}
              </Text>
              <IconButton
                onClick={() => habitsStore.removeHabit(name)}
                aria-label="remove habit"
                size="xs"
                icon={<DeleteIcon />}
                variant="ghost"
              />
            </HabNameCell>
            {currentWeek.map((day) => {
              const key = `${name}/${day}`;

              const isChecked = !!dates[day.getTime()];
              const onChange = isChecked ? habitsStore.removeDate : habitsStore.addDate;

              return (
                <Td key={key}>
                  <Checkbox
                    isChecked={isChecked}
                    onChange={() => {
                      onChange(name, day);
                    }}
                  />
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

const HabNameCell = styled(Td)`
  display: flex;
  align-items: center;
`;

export default observer(HabitsList);
