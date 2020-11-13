import React from 'react'
import App from './App'

test('react match text paragraph value', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('.App-link').text()).toEqual('Learn React')
})
