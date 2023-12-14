/* eslint-disable react/prop-types */
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectOption(props) {
  const { option, value, setValue, title, recherche } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function displayItems(data) {
    let item = data.map((index, key) => {
      return (
        <MenuItem key={key} value={index}>
          {index['' + recherche]}
        </MenuItem>
      );
    });
    return item;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} label={title} onChange={(e) => handleChange(e)}>
        {displayItems(option)}
      </Select>
    </FormControl>
  );
}
export default React.memo(SelectOption);
