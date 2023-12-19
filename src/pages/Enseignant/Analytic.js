import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Stack } from '@mui/material';

// project import

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, percentage, isLoss }) => (
  <Stack spacing={0.5}>
    <Grid container alignItems="center">
      {percentage && (
        <Grid item>
          <Chip
            variant="combined"
            color={color}
            icon={
              <>
                {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
              </>
            }
            label={`${percentage}%`}
            sx={{ ml: 1.25, pl: 1 }}
            size="small"
          />
        </Grid>
      )}
    </Grid>
  </Stack>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
