import { ReactElement } from 'react';
import Map from '../components/map/Map';
import styled from 'styled-components';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
`;

const Home = (): ReactElement => {
  return (
    <Main>
      <Map />
    </Main>
  );
};

export default Home;
