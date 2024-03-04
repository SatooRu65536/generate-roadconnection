import { ReactElement } from 'react';
import Map from '../components/map/Map';
import styled from 'styled-components';
import Export from '@/components/export/Export';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
`;

const Home = (): ReactElement => {
  return (
    <Main>
      <Export />
      <Map />
    </Main>
  );
};

export default Home;
