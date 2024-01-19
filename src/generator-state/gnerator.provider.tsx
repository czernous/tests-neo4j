import { HTMLAttributes, ReactNode, FC } from 'react';
import { GeneratorContext, useGeneratorReducer } from './generator.base';

export interface IProviderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const GeneratorProvider: FC<IProviderProps> = ({ children }) => {
  const contextValue = useGeneratorReducer();

  return <GeneratorContext.Provider value={contextValue}>{children}</GeneratorContext.Provider>;
};
