import React, { useState, useEffect } from 'react';
import Data from './Data';
import { makeDataObjectFrom } from '../data';
import { isNull } from '../utils/utilities';

function OneCard({ isLoading, data, keyPrefix, keySuffixPrepend }) {
  const [myData, setMyData] = useState({
    basicData: {},
    perMillionData: {},
    perPersonData: {},
  });
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (isLoading || isNull(data)) {
      let basicData = makeDataObjectFrom.makeBasicData({});
      let perMillionData = makeDataObjectFrom.makePerMillionData({});
      let perPersonData = makeDataObjectFrom.makePerPersonData({});
      setMyData(prev => ({
        ...prev,
        basicData,
        perMillionData,
        perPersonData,
      }));
    }

    if (!isLoading && !isNull(data)) {
      let basicData = makeDataObjectFrom.makeBasicData(data);
      let perMillionData = makeDataObjectFrom.makePerMillionData(data);
      let perPersonData = makeDataObjectFrom.makePerPersonData(data);
      setMyData(prev => ({
        ...prev,
        basicData,
        perMillionData,
        perPersonData,
      }));
    }
  }, [isLoading, data]);

  const handleExpandClick = event => {
    const button = event.target;
    setExpand(prev => !prev);
    !expand ? (button.innerText = 'Less') : (button.innerText = 'More');
  };

  return (
    <>
      <Data
        isLoading={isLoading}
        data={myData.basicData?.dataObject}
        title="basic"
        keyPrefix={keyPrefix}
        keySuffix={`${keySuffixPrepend}-basic`}
      />
      <footer>
        <button onClick={handleExpandClick}>More</button>
      </footer>
      {expand ? (
        <>
          <Data
            isLoading={isLoading}
            data={myData.perMillionData?.dataObject}
            title="per million"
            keyPrefix={keyPrefix}
            keySuffix={`${keySuffixPrepend}-per-million`}
          />
          <Data
            isLoading={isLoading}
            data={myData.perPersonData?.dataObject}
            title="per people"
            keyPrefix={keyPrefix}
            keySuffix={`${keySuffixPrepend}-per-people`}
          />
        </>
      ) : null}
    </>
  );
}

export default OneCard;
