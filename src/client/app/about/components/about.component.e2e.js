describe('About', function () {
    beforeEach(function () {
        browser.get('/');
        browser.waitForAngular();
        element.all(by.css('nav > a')).get(1).click();
    });
    it('should have correct feature heading', function () {
        var el = element(by.css('sd-app sd-about h2'));
        expect(el.getText()).toEqual('Features');
    });
});
//# sourceMappingURL=about.component.e2e.js.map