import React from 'react';
import { Button } from 'antd';

// eslint-disable-next-line react/prop-types
function ButtonLoading({ title, loading, fonction }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <Button type="primary" loading={loading} onClick={(e) => fonction(e)}>
        {title}
      </Button>
    </div>
  );
}

export default ButtonLoading;
