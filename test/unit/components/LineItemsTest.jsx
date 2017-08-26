import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';
import LineItems from '../../../src/components/LineItems';

describe("LineItems Component", () => {
    it("should render", () => {
      const wrapper = shallow(<LineItems />);
      expect(wrapper).toExist();
    });

    it("should render div as root element", () => {
        const wrapper = shallow(<LineItems />);
        expect(wrapper.type()).toEqual("div");

    });
});
