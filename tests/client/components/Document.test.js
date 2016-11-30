import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Document from '../../../client/components/Documents/Document';
import Gravatar from 'react-gravatar';
import IconMenu from 'material-ui/IconMenu';

import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

describe('Document Card Test', () => {
  const props = {
    document: {
      _id: '1',
      title: 'Hey',
      content: 'Test document content',
      role: '938',
      ownerId: '78',
      ownerEmail: 'joy.warugu@gmail.com',
      ownerName: 'joy warugu',
      roleTitle: 'user',
      accessLevel: 'public'
    },
    auth: {
      user: {
        _id: '78'
      }
    },
    showEditMenu: true,
    onUpdate: () => Promise.resolve(),
    onDelete: () => Promise.resolve()
  };

  it('shows document card', () => {
    const wrapper = shallow(<Document {...props} />);
    expect(wrapper.find(Card)).to.be.defined;
  });

  it('shows card header contents', () => {
    const wrapper = shallow(<Document {...props} />);
    expect(wrapper.find(CardHeader).props().title).to.eql('joy warugu');
    expect(wrapper.find(CardHeader).props().subtitle).to.eql('user');

  });

  it('displays a gravatar', () => {
    const wrapper = shallow(<Document {...props} />);
    expect(wrapper.find(Gravatar)).to.be.defined;
  });

  it('displays document title', () => {
    const wrapper = shallow(<Document {...props} />);
    expect(wrapper.find(CardTitle)).to.be.defined;
    expect(wrapper.find(CardTitle).props().title).to.eql('Hey');
  });

  it('displays document content', () => {
    const wrapper = shallow(<Document {...props} />);
    expect(wrapper.find(CardText)).to.be.defined;
  });
  it('shows icon menu if user is able to edit', () => {
    const wrapper = shallow(<Document {...props} />);
    expect(wrapper.find(IconMenu)).to.be.defined;
  });

  it('does not show icon menu if user is able to edit', () => {
    const wrapper = shallow(<Document document={props.document}
                                      showEditMenu={false}
    />);
    expect(wrapper.find(IconMenu)).to.not.be.defined;
  });
});
