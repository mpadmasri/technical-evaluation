import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';
import App from '../../../src/components/App';

describe("App Component", () => {
    it("should render", () => {
      const wrapper = shallow(<App />);
      expect(wrapper).toExist();
    });

    it("should render div as root element", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.type()).toEqual("div");

    });
});
