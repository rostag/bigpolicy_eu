describe('Leader', function () {
    beforeEach(function () {
        browser.get('/');
        browser.waitForAngular();
        element.all(by.css('nav > a')).get(1).click();
    });
    it('should have correct feature heading', function () {
        var el = element(by.css('sd-app sd-leader h2'));
        expect(el.getText()).toEqual('Leader');
    });
});
//# sourceMappingURL=leader.component.e2e.js.map