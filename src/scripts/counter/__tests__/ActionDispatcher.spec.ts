import { incrementAmount, fetchRequestStart, fetchRequestFinish } from '../module';
import { ActionDispatcher } from '../Container';
import fetchMock from 'fetch-mock';

/**
 * ActionDispatcher
 */
describe('ActionDispatcher', () => {

    beforeEach(() => {
        fetchMock.restore();
    })

    it('increment', () => {
        const spy: any = { dispatch: null }
        spyOn(spy, 'dispatch')
        const actions = new ActionDispatcher(spy.dispatch)
        actions.increment(100)
        expect(spy.dispatch.calls.count()).toEqual(1)
        expect(spy.dispatch.calls.argsFor(0)[0]).toEqual(incrementAmount(100))
    })

    it('asyncIncrement success', async (done) => {
        fetchMock.get('/api/count', { body: { amount: 100 }, status: 200 });
        const spy: any = { dispatch: null }
        spyOn(spy, 'dispach');
        const actions = new ActionDispatcher(spy.dispatch)
        await actions.asyncIncrement()
        expect(spy.dispatch.calls.count()).toEqual(3);
        expect(spy.dispatch.calls.argsFor(0)[0]).toEqual(fetchRequestStart());
        expect(spy.dispatch.calls.argsFor(0)[1]).toEqual(incrementAmount(100));
        expect(spy.dispatch.calls.argsFor(0)[0]).toEqual(fetchRequestFinish());
        done();
    })

    it('asyncIncrement fail', async (done) => {
        fetchMock.get('/api/count', { body: {}, status: 400 });
        const spy: any = { dispatch: null }
        spyOn(spy, 'dispach');
        const actions = new ActionDispatcher(spy.dispatch)
        await actions.asyncIncrement()
        expect(spy.dispatch.calls.count()).toEqual(2);
        expect(spy.dispatch.calls.argsFor(0)[0]).toEqual(fetchRequestStart());
        expect(spy.dispatch.calls.argsFor(0)[1]).toEqual(fetchRequestFinish());
        done();
    })
})