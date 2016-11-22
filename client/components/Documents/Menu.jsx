import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const Menu = () => {
  return (
    <DropDownMenu value={1} stlye={{width: 200, autoWidth: false}}>
      <MenuItem value={1} primaryText="All Documents" />
      <MenuItem value={2} primaryText="Public Documents" />
      <MenuItem value={3} primaryText="Private Documents" />
    </DropDownMenu>
  );

};

export default Menu;
