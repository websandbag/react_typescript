import * as React from 'react';
import { Counter } from '../Counter';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { CounterState } from '../module'
import { ActionDispatcher } from '../Container'

configure({ adapter: new Adapter() })

describe('Counter', () => {

    it('rendering', () => {
        const actions: any = {}
        const state: CounterState = { num: 1 }
        const wrapper = shallow(<Counter value={state} actions={actions} />)
        expect(wrapper.find('p').at(0).prop('children')).toBe('score: 1')
    })

    it('click', () => {
        const actionSpy = new ActionDispatcher(null!)
        spyOn(actionSpy, 'increment')
        const state: CounterState = { num: 0 }
        const wrapper = shallow(<Counter value={state} actions={actionSpy} />)
        wrapper.find('button').at(0).simulate('click')
        expect(actionSpy.increment).toHaveBeenCalledWith(3)
    })
})