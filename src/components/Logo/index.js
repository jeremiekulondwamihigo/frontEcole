import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import config from 'config';
import { activeItem } from 'store/reducers/menu';
import { useEffect, useState } from 'react';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const annee = useSelector((state) => state.annee);
  const [curent, setCurent] = useState('');

  useEffect(() => {
    if (annee && _.filter(annee.annee, { active: true }).length > 0) {
      let year = _.filter(annee.annee, { active: true })[0].annee;
      setCurent(year);
    } else {
      setCurent('Loading...');
    }
  }, [annee]);

  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      {curent}
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
