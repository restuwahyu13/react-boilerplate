import App from './App'

test('react match text paragraph value', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('code').first().text()).toEqual('Minimalize Modern React Boilerplate 2020')
})
