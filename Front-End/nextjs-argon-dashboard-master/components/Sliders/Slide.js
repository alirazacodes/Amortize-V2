import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

function Slide({set}) {
  const [value, setValue] = React.useState(5);

  const marks = [
      {
          value: 5,
          label: '',
      },
      {
          value: 7,
          label: '',
      },
      {
          value: 10,
          label: '',
      }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    set(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider aria-label="Volume" value={value} onChange={handleChange} step={null} marks={marks} min={5} max={10} />
        <p>{value}</p>
      </Stack>
    </Box>
  );
}

export default Slide;