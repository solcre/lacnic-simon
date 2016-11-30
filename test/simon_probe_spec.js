describe('Init', function () {
  beforeEach(function () {
    // Set spies to detect if one of this two functions are called.
    spyOn(SIMON, 'before_start')
    spyOn(SIMON, 'getCountry')
  })
  it('should always initialize when percentage is 100%', function () {
    SIMON.params.percentage = 1.0
    SIMON.init()

    expect(SIMON.before_start).toHaveBeenCalled()
    expect(SIMON.getCountry).toHaveBeenCalled()
  })

  it('should never initialize when percentage is 0%', function () {
    SIMON.params.percentage = 0
    SIMON.running = false
    SIMON.init()

    expect(SIMON.before_start).not.toHaveBeenCalled()
    expect(SIMON.getCountry).not.toHaveBeenCalled()
  })

  it('should never be initialized twice', function () {
    SIMON.params.percentage = 1
    SIMON.running = false
    SIMON.init()
    SIMON.init()
    expect(SIMON.before_start).toHaveBeenCalledTimes(1)
    expect(SIMON.getCountry).toHaveBeenCalledTimes(1)
  })
})
describe('Stop', function () {
  it('should set running flag to false', function () {
    SIMON.stop()

    expect(SIMON.running).toBe(false)
  })
})
describe('Get Country', function () {
  it('should make a GET cross-domain request that returns a jsonp response', function () {
    spyOn($, 'ajax')
    SIMON.getCountry()
    expect($.ajax).toHaveBeenCalled()
    expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET')
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(SIMON.urls.country)
    expect($.ajax.calls.mostRecent().args[0].crossDomain).toEqual(true)
    expect($.ajax.calls.mostRecent().args[0].dataType).toEqual('jsonp')
    expect($.ajax.calls.mostRecent().args[0].success).toEqual(jasmine.any(Function))
  })
  it('should set countryCode if request succeed', function () {
    spyOn($, 'ajax')
    expect(SIMON.countryCode).toBe('')

    SIMON.getCountry()
        /* grab the succcess callback to execute it manually since
         * jasmine won't wait till requests get response.
         * Note that we can't use jasmine-ajax plugin here since
         * the requests are jsonp and they rely on the "script tag hack". */
    var successCallback = $.ajax.calls.mostRecent().args[0].success

    successCallback({ cc: 'UY'})

    expect(SIMON.countryCode).toBe('UY')
  })
  it('should call getMyIPAddress if request succeed', function () {
    spyOn($, 'ajax')
    spyOn(SIMON, 'getMyIPAddress')

    SIMON.getCountry()
        // grab the succcess callback again
    var successCallback = $.ajax.calls.mostRecent().args[0].success

    successCallback({ cc: 'UY'})

    expect(SIMON.getMyIPAddress).toHaveBeenCalled()
  })
})
