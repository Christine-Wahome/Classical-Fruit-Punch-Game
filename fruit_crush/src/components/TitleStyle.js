import React from 'react';
import { Box } from '@mui/material';

const TitleStyle = () => {
    //new TitleStyle().print(document.body)
  return (
    <Box>
      <ul className="c-rainbow">
       <li className="c-rainbow__layer c-rainbow__layer--white">FRUIT</li>
       <li className="c-rainbow__layer c-rainbow__layer--orange">FRUIT PUNCH</li>
       <li className="c-rainbow__layer c-rainbow__layer--red">FRUIT PUNCH</li>
       <li className="c-rainbow__layer c-rainbow__layer--violet">FRUIT PUNCH</li>
       <li className="c-rainbow__layer c-rainbow__layer--blue">FRUIT PUNCH</li>
       <li className="c-rainbow__layer c-rainbow__layer--green">FRUIT PUNCH</li>
       <li className="c-rainbow__layer c-rainbow__layer--yellow">FRUIT PUNCH</li>
     </ul>
    </Box>
  )
}

export default TitleStyle