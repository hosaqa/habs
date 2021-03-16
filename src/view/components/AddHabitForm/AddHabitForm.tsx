import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { Input, Button, Stack, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import { useStores } from 'view/hooks';

const InputNameWrapper = styled.div`
  position: relative;
`;

const InputName = styled(Input)`
  padding-right: 3em;
`;

const EmojiPicker = styled(Picker)`
  width: 100%;
`;

const EmojiButton = styled.div`
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
`;

type AddHabitFormValues = {
  name: string;
};

interface AddHabitFormState {
  values: AddHabitFormValues;
}

const initialState = {
  values: {
    name: '',
  },
};

function AddHabitForm() {
  const stores = useStores();

  const [state, setState] = useState<AddHabitFormState>(initialState);
  const resetState = () => setState(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await stores.habitsStore.addHabit(state.values.name);
      resetState();
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setState({
      ...state,
      values: {
        ...state.values,
        [name]: value,
      },
    });
  };

  const handleEmojiClick = (event: MouseEvent, data: IEmojiData) => {
    setState({
      ...state,
      values: {
        ...state.values,
        name: state.values.name + data.emoji,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <InputNameWrapper>
          <InputName
            onChange={handleChangeInput}
            value={state.values.name}
            name="name"
            placeholder="Enter your new habit"
            required
          />
          <Popover>
            <PopoverTrigger>
              <EmojiButton role="button">🤠</EmojiButton>
            </PopoverTrigger>
            <PopoverContent>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </PopoverContent>
          </Popover>
        </InputNameWrapper>
        <Button type="submit" colorScheme="blue">
          Add
        </Button>
      </Stack>
    </form>
  );
}

export default observer(AddHabitForm);
