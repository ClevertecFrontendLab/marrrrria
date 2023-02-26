import React from 'react';
import { useAppSelector } from '../hooks/redux';

interface HighlightedTextProps {
	text: string,
}

export const HighlightedText = ({text}: HighlightedTextProps) => {
  const { searchValue } = useAppSelector(state => state.library)
  const regex = new RegExp(searchValue, 'gi');
  const parts = text.split(regex);
  const matches = text.match(regex);

  return (
    <React.Fragment>
      {parts.length <= 1 && text}
      {parts.length > 1 && parts.map((part, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {part}
          {index !== parts.length - 1 &&
            matches?.[index] && (
              <span data-test-id='highlight-matches' style={{color: '#FF5253'}}>{matches[index]}</span>
            )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
