import React, { useState } from 'react';
import Data from './Data';
import { makeDataObjectFrom } from '../data';

function OneCard({ isLoading, data, keyPrefix, keySuffixPrepend }) {
  const [expand, setExpand] = useState(false);

  let basicData = makeDataObjectFrom.makeBasicData({});
  let perMillionData = makeDataObjectFrom.makePerMillionData({});
  let perPersonData = makeDataObjectFrom.makePerPersonData({});

  if (!isLoading) {
    basicData = makeDataObjectFrom.makeBasicData(data);
    perMillionData = makeDataObjectFrom.makePerMillionData(data);
    perPersonData = makeDataObjectFrom.makePerPersonData(data);
  }

  const handleExpandClick = event => {
    const button = event.target;
    setExpand(prev => !prev);
    !expand ? (button.innerText = 'Less') : (button.innerText = 'More');
  };

  return (
    <>
      <Data
        isLoading={isLoading}
        data={basicData?.dataObject}
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
            data={perMillionData?.dataObject}
            title="per million"
            keyPrefix={keyPrefix}
            keySuffix={`${keySuffixPrepend}-per-million`}
          />
          <Data
            isLoading={isLoading}
            data={perPersonData?.dataObject}
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
