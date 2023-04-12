import { useError } from 'hooks/useError';

import ErrorMessage from 'components/molecules/ErrorMessage/ErrorMessage';
import Navigation from 'components/organisms/Navigation/Navigation';

import { ChildrenWrapper, Wrapper } from 'components/templates/MainTemplate/MainTemplate.styles';

const MainTemplate = ({ children }: React.PropsWithChildren) => {
  const { error } = useError();

  return (
    <Wrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <Navigation />
      {error ? <ErrorMessage /> : null}
    </Wrapper>
  );
};

export default MainTemplate;
