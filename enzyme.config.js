import React from 'react'
import { configure, shallow, mount, render } from 'enzyme'
import { renderHook, act, addClear, cleanup } from '@testing-library/react-hooks'
import { createSerializer, toJson } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

global.React = React
global.shallow = shallow
global.mount = mount
global.render = render
global.renderer = renderer
global.renderHook = renderHook
global.act = act
global.addClear = addClear
global.cleanup = cleanup
global.createSerializer = createSerializer
global.toJson = toJson
