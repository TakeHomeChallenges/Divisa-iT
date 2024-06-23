import React from 'react';
import { Paper } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code }) => {
  return (
    <Paper style={{ margin: '20px', padding: '15px' }}>
      <SyntaxHighlighter language="javascript" style={dark}>
        {code}
      </SyntaxHighlighter>
    </Paper>
  );
};

export default CodeBlock;
