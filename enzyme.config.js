import { configure, shallow, mount, render } from 'enzyme'
import { renderHook, act, addClear, cleanup } from '@testing-library/react-hooks'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

global.shallow = shallow
global.mount = mount
global.render = render
global.renderer = renderer
global.renderHook = renderHook
global.act = act
global.addClear = addClear
global.cleanup = cleanup
