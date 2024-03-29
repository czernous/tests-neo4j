import { Dispatch, createContext, useCallback, useMemo, useReducer } from 'react';

interface IGeneratorState {
  password: string | null;
  charLength: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeSymbols: boolean;
  setCharLength: (length: number) => void;
  generatePassword: () => void;
  copyToClipboard: () => void;
  toggleUppercase: () => void;
  toggleLowercase: () => void;
  toggleSymbols: () => void;
}

enum GeneratorActions {
  GENERATE_PASSWORD = 'GENERATE_PASSWORD',
  COPY_PASSWORD = 'COPY_PASSWORD',
  SET_CHAR_LENGTH = 'SET_CHAR_LENGTH',
  TOGGLE_UPPERCASE = 'TOGGLE_UPPERCASE',
  TOGGLE_LOWERCASE = 'TOGGLE_LOWERCASE',
  TOGGLE_SYMBOLS = 'TOGGLE_SYMBOLS',
}

const initialState = {
  password: null,
  charLength: 0,
  includeUppercase: false,
  includeLowercase: false,
  includeSymbols: false,
} as IGeneratorState;

export type IGeneratorAction = {
  type: GeneratorActions;
  payload: IGeneratorState;
};

export const GeneratorContext = createContext(initialState);

const reducer = (state: IGeneratorState, action: IGeneratorAction) => {
  switch (action.type) {
    case GeneratorActions.GENERATE_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };
    case GeneratorActions.COPY_PASSWORD:
      return state;
    case GeneratorActions.SET_CHAR_LENGTH:
      return {
        ...state,
        charLength: action.payload.charLength,
      };
    case GeneratorActions.TOGGLE_LOWERCASE:
      return {
        ...state,
        includeLowercase: !state.includeLowercase,
      };
    case GeneratorActions.TOGGLE_UPPERCASE:
      return {
        ...state,
        includeUppercase: !state.includeUppercase,
      };
    case GeneratorActions.TOGGLE_SYMBOLS:
      return {
        ...state,
        includeSymbols: !state.includeSymbols,
      };
  }
};

export const useGeneratorReducer = () => {
  const [generator, dispatch]: [IGeneratorState, Dispatch<IGeneratorAction>] = useReducer(reducer, initialState);

  const digits = '0123456789';
  const symbols = '!@#$%^&*(){}+=?<>';
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  const generatePassword = useCallback(() => {
    const seed = `${digits}${generator.includeLowercase ? letters.toLowerCase() : ''}${
      generator.includeUppercase ? letters.toUpperCase() : ''
    }${generator.includeSymbols ? symbols : ''}`;

    const password = Array.from(crypto.getRandomValues(new Uint32Array(generator.charLength)))
      .map((x) => seed[x % seed.length])
      .join('');

    dispatch({
      type: GeneratorActions.GENERATE_PASSWORD,
      payload: {
        ...generator,
        password,
      },
    });
  }, [generator]);

  const copyToClipboard = useCallback(async () => {
    if (!generator.password) return;
    try {
      await navigator.clipboard.writeText(generator.password!);
      alert('Password copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

    dispatch({
      type: GeneratorActions.COPY_PASSWORD,
      payload: generator,
    });
  }, [generator]);

  const toggleLowercase = useCallback(() => {
    dispatch({
      type: GeneratorActions.TOGGLE_LOWERCASE,
      payload: generator,
    });
  }, [generator]);

  const toggleUppercase = useCallback(() => {
    dispatch({
      type: GeneratorActions.TOGGLE_UPPERCASE,
      payload: generator,
    });
  }, [generator]);

  const toggleSymbols = useCallback(() => {
    dispatch({
      type: GeneratorActions.TOGGLE_SYMBOLS,
      payload: generator,
    });
  }, [generator]);

  const setCharLength = useCallback(
    (length: number) => {
      dispatch({
        type: GeneratorActions.SET_CHAR_LENGTH,
        payload: {
          ...generator,
          charLength: length,
        },
      });
    },
    [generator],
  );

  return useMemo(
    () => ({
      password: generator.password,
      charLength: generator.charLength,
      includeUppercase: generator.includeUppercase,
      includeLowercase: generator.includeLowercase,
      includeSymbols: generator.includeSymbols,
      generatePassword,
      setCharLength,
      copyToClipboard,
      toggleLowercase,
      toggleUppercase,
      toggleSymbols,
    }),
    [
      generator.password,
      generator.charLength,
      generator.includeUppercase,
      generator.includeLowercase,
      generator.includeSymbols,
      generatePassword,
      setCharLength,
      copyToClipboard,
      toggleLowercase,
      toggleUppercase,
      toggleSymbols,
    ],
  );
};
