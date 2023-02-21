import SpinnerBox from './Spinner.styled';
import { MutatingDots } from 'react-loader-spinner';
import theme from 'theme';

const Spinner = () => {
  return (
    <SpinnerBox>
      <MutatingDots
        height="100"
        width="100"
        color={theme.colors.accent}
        secondaryColor={theme.colors.muted}
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        visible={true}
      />
    </SpinnerBox>
  );
};

export default Spinner;
