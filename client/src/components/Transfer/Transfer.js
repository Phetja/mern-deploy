import React from 'react';
import Toggle from '../Toggle/Toggle';
import { useGlobalContext } from '../../context/GlobalContext';
import Loading from '../Loading/Loading';

const Transfer = () => {
  const { dataLoaded } = useGlobalContext();
  return <div>{!dataLoaded ? <Loading /> : <Toggle />}</div>;
};

export default Transfer;
