/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

function AutoComplementEleveInscrit(props) {
  const { value, setValue, options, title } = props;

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="autocomplateEleveInscrit"
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.eleve.nom + ' ' + option.eleve.postnom + '' + option.eleve.prenom;
      }}
      renderOption={(props, option) => <li {...props}>{option.eleve.nom + ' ' + option.eleve.postnom + '' + option.eleve.prenom}</li>}
      sx={{ width: '100%' }}
      freeSolo
      renderInput={(params) => <TextField {...params} label={title || 'Titre'} />}
    />
  );
}
export default AutoComplementEleveInscrit;
