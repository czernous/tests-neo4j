import { TextInput, Flex, Typography, Checkbox, Button } from '@neo4j-ndl/react';
import { Square2StackIconOutline } from '@neo4j-ndl/react/icons';
import Slider from './components/slider';
import { StyledPasswordGenerator } from './App.styles';
import { useContext } from 'react';
import { GeneratorContext } from './generator-state/generator.base';

function App() {
  const ctx = useContext(GeneratorContext);
  return (
    <StyledPasswordGenerator>
      <Flex
        className="generator-wrapper n-bg-neutral-10 n-border-2 n-border-palette-neutral-border-strong"
        borderRadius="lg"
        gap="7"
      >
        <Typography variant="subheading-large" className="generator-heading">
          Password Generator
        </Typography>
        <Flex gap="7">
          <TextInput
            defaultValue={ctx.password ?? undefined}
            disabled={!ctx.password?.length}
            label="Generated password"
            fluid
            rightIcon={<Square2StackIconOutline onClick={ctx.copyToClipboard} cursor={'pointer'} />}
          />
          <Slider
            min={0}
            max={20}
            label={'Character Length'}
            name={'password'}
            id={'password-slider'}
            onValueUpdate={ctx.setCharLength}
          />
        </Flex>
        <Flex gap="5">
          <Checkbox label="Include Uppercase Letters" checked={ctx.includeUppercase} onChange={ctx.toggleUppercase} />
          <Checkbox label="Include Lowercase Letters" checked={ctx.includeLowercase} onChange={ctx.toggleLowercase} />
          <Checkbox label="Include Symbols" checked={ctx.includeSymbols} onChange={ctx.toggleSymbols} />
        </Flex>
        <Button onClick={ctx.generatePassword} disabled={!ctx.charLength}>
          Generate
        </Button>
      </Flex>
    </StyledPasswordGenerator>
  );
}

export default App;
