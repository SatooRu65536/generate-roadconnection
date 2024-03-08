import { ReactElement } from 'react';
import Map from '../components/map/Map';
import styled from 'styled-components';
import Export from '@/components/export/Export';
import {
  useDefaultDescMutators,
  useDefaultDescState,
} from '@/store/defaultDesc';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
`;

const DefaultDescInput = styled.input`
  position: fixed;
  top: 50px;
  right: 20px;
  z-index: 1000;
`;

const Home = (): ReactElement => {
  const setDefaultDesc = useDefaultDescMutators();
  const defaultDesc = useDefaultDescState();

  return (
    <Main>
      <Export />
      <DefaultDescInput
        type="text"
        value={defaultDesc}
        placeholder="デフォルトのdesc"
        onChange={(e) => setDefaultDesc(e.target.value)}
      />
      <Map />
    </Main>
  );
};

export default Home;
