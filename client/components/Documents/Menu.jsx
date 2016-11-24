import React, {PropTypes} from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const Menu = (props) => {
  return (
    <DropDownMenu value={props.docFilter} onChange={props.onChange} stlye={{width: 200, autoWidth: false}}>
      <MenuItem value='all' primaryText="All Documents" />
      <MenuItem value='public' primaryText="Public Documents" />
      <MenuItem value='private' primaryText="Private Documents" />
    </DropDownMenu>
  );

};

Menu.propTypes = {
  docFilter: PropTypes.string,
  onChange: PropTypes.func
};
export default Menu;
