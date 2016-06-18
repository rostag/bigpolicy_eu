"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var grid_list_1 = require('./grid-list');
var grid_tile_1 = require('./grid-tile');
testing_1.describe('MdGridList', function () {
    var builder;
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    testing_1.it('should throw error if cols is not defined', function () {
        var template = "<md-grid-list></md-grid-list>";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            testing_1.expect(function () {
                fixture.detectChanges();
            }).toThrowError(/must pass in number of columns/);
        });
    });
    testing_1.it('should throw error if rowHeight ratio is invalid', function () {
        var template = "\n      <md-grid-list cols=\"4\" rowHeight=\"4:3:2\"></md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            testing_1.expect(function () {
                fixture.detectChanges();
            }).toThrowError(/invalid ratio given for row-height/);
        });
    });
    testing_1.it('should throw error if tile colspan is wider than total cols', function () {
        var template = "\n      <md-grid-list cols=\"4\">\n        <md-grid-tile colspan=\"5\"></md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            testing_1.expect(function () {
                fixture.detectChanges();
            }).toThrowError(/tile with colspan 5 is wider than grid/);
        });
    });
    testing_1.it('should default to 1:1 row height if undefined ', function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"1\">\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            // in ratio mode, heights are set using the padding-top property
            testing_1.expect(getProp(tile, 'padding-top')).toBe('200px');
        });
    });
    testing_1.it('should use a ratio row height if passed in', function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"1\" [rowHeight]=\"height\">\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.height = '4:1';
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            testing_1.expect(getProp(tile, 'padding-top')).toBe('100px');
            fixture.componentInstance.height = '2:1';
            fixture.detectChanges();
            testing_1.expect(getProp(tile, 'padding-top')).toBe('200px');
        });
    });
    testing_1.it('should divide row height evenly in "fit" mode', function () {
        var template = "\n      <md-grid-list cols=\"1\" rowHeight=\"fit\" [style.height.px]=\"height\">\n        <md-grid-tile></md-grid-tile>\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.height = 300;
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            // 149.5 * 2 = 299px + 1px gutter = 300px
            testing_1.expect(getProp(tile, 'height')).toBe('149.5px');
            fixture.componentInstance.height = 200;
            fixture.detectChanges();
            // 99.5 * 2 = 199px + 1px gutter = 200px
            testing_1.expect(getProp(tile, 'height')).toBe('99.5px');
        });
    });
    testing_1.it('should use the fixed row height if passed in', function () {
        var template = "\n      <md-grid-list cols=\"4\" [rowHeight]=\"height\">\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.height = '100px';
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            testing_1.expect(getProp(tile, 'height')).toBe('100px');
            fixture.componentInstance.height = '200px';
            fixture.detectChanges();
            testing_1.expect(getProp(tile, 'height')).toBe('200px');
        });
    });
    testing_1.it('should default to pixels if row height units are missing', function () {
        var template = "\n      <md-grid-list cols=\"4\" rowHeight=\"100\">\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            testing_1.expect(getProp(tile, 'height')).toBe('100px');
        });
    });
    testing_1.it('should default gutter size to 1px', function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"2\" rowHeight=\"100px\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            testing_1.fakeAsync(function () {
                testing_1.tick();
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                // check horizontal gutter
                testing_1.expect(getProp(tiles[0], 'width')).toBe('99.5px');
                testing_1.expect(getProp(tiles[1], 'left')).toBe('100.5px');
                // check vertical gutter
                testing_1.expect(getProp(tiles[0], 'height')).toBe('100px');
                testing_1.expect(getProp(tiles[2], 'top')).toBe('101px');
            });
        });
    });
    testing_1.it('should set the gutter size if passed', function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"2\" gutterSize=\"2px\" rowHeight=\"100px\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            testing_1.fakeAsync(function () {
                testing_1.tick();
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                // check horizontal gutter
                testing_1.expect(getProp(tiles[0], 'width')).toBe('99px');
                testing_1.expect(getProp(tiles[1], 'left')).toBe('101px');
                // check vertical gutter
                testing_1.expect(getProp(tiles[0], 'height')).toBe('100px');
                testing_1.expect(getProp(tiles[2], 'top')).toBe('102px');
            });
        });
    });
    testing_1.it('should use pixels if gutter units are missing', function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"2\" gutterSize=\"2\" rowHeight=\"100px\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            testing_1.fakeAsync(function () {
                testing_1.tick();
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                // check horizontal gutter
                testing_1.expect(getProp(tiles[0], 'width')).toBe('99px');
                testing_1.expect(getProp(tiles[1], 'left')).toBe('101px');
                // check vertical gutter
                testing_1.expect(getProp(tiles[0], 'height')).toBe('100px');
                testing_1.expect(getProp(tiles[2], 'top')).toBe('102px');
            });
        });
    });
    testing_1.it('should set the correct list height in ratio mode', function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"1\" rowHeight=\"4:1\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var list = fixture.debugElement.query(platform_browser_1.By.directive(grid_list_1.MdGridList));
            testing_1.expect(getProp(list, 'padding-bottom')).toBe('201px');
        });
    });
    testing_1.it('should set the correct list height in fixed mode', function () {
        var template = "\n      <md-grid-list cols=\"1\" rowHeight=\"100px\">\n        <md-grid-tile></md-grid-tile>\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var list = fixture.debugElement.query(platform_browser_1.By.directive(grid_list_1.MdGridList));
            testing_1.expect(getProp(list, 'height')).toBe('201px');
        });
    });
    testing_1.it('should allow adjustment of tile colspan', function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"4\">\n          <md-grid-tile [colspan]=\"colspan\"></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.colspan = 2;
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            testing_1.expect(getProp(tile, 'width')).toBe('199.5px');
            fixture.componentInstance.colspan = 3;
            fixture.detectChanges();
            testing_1.expect(getProp(tile, 'width')).toBe('299.75px');
        });
    });
    testing_1.it('should allow adjustment of tile rowspan', function () {
        var template = "\n      <md-grid-list cols=\"1\" rowHeight=\"100px\">\n        <md-grid-tile [rowspan]=\"rowspan\"></md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.rowspan = 2;
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            testing_1.expect(getProp(tile, 'height')).toBe('201px');
            fixture.componentInstance.rowspan = 3;
            fixture.detectChanges();
            testing_1.expect(getProp(tile, 'height')).toBe('302px');
        });
    });
    testing_1.it('should lay out tiles correctly for a complex layout', function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"4\" rowHeight=\"100px\">\n          <md-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\"\n                        [style.background]=\"tile.color\">\n            {{tile.text}}\n          </md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.tiles = [
                { cols: 3, rows: 1 },
                { cols: 1, rows: 2 },
                { cols: 1, rows: 1 },
                { cols: 2, rows: 1 }
            ];
            fixture.detectChanges();
            testing_1.fakeAsync(function () {
                testing_1.tick();
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                testing_1.expect(getProp(tiles[0], 'width')).toBe('299.75px');
                testing_1.expect(getProp(tiles[0], 'height')).toBe('100px');
                testing_1.expect(getProp(tiles[0], 'left')).toBe('0px');
                testing_1.expect(getProp(tiles[0], 'top')).toBe('0px');
                testing_1.expect(getProp(tiles[1], 'width')).toBe('99.25px');
                testing_1.expect(getProp(tiles[1], 'height')).toBe('201px');
                testing_1.expect(getProp(tiles[1], 'left')).toBe('300.75px');
                testing_1.expect(getProp(tiles[1], 'top')).toBe('0px');
                testing_1.expect(getProp(tiles[2], 'width')).toBe('99.25px');
                testing_1.expect(getProp(tiles[2], 'height')).toBe('100px');
                testing_1.expect(getProp(tiles[2], 'left')).toBe('0px');
                testing_1.expect(getProp(tiles[2], 'top')).toBe('101px');
                testing_1.expect(getProp(tiles[3], 'width')).toBe('199.5px');
                testing_1.expect(getProp(tiles[3], 'height')).toBe('100px');
                testing_1.expect(getProp(tiles[3], 'left')).toBe('100.25px');
                testing_1.expect(getProp(tiles[3], 'top')).toBe('101px');
            });
        });
    });
    testing_1.it('should add not add any classes to footers without lines', function () {
        var template = "\n      <md-grid-list cols=\"1\">\n        <md-grid-tile>\n          <md-grid-tile-footer>\n            I'm a footer!\n          </md-grid-tile-footer>\n        </md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTileText));
            testing_1.expect(footer.nativeElement.classList.contains('md-2-line')).toBe(false);
        });
    });
    testing_1.it('should add class to footers with two lines', function () {
        var template = "\n      <md-grid-list cols=\"1\">\n        <md-grid-tile>\n          <md-grid-tile-footer>\n            <h3 md-line>First line</h3>\n            <span md-line>Second line</span>\n          </md-grid-tile-footer>\n        </md-grid-tile>\n      </md-grid-list>\n    ";
        return builder.overrideTemplate(TestGridList, template)
            .createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTileText));
            testing_1.expect(footer.nativeElement.classList.contains('md-2-line')).toBe(true);
        });
    });
});
var TestGridList = (function () {
    function TestGridList() {
    }
    TestGridList = __decorate([
        core_1.Component({
            selector: 'test-grid-list',
            template: "",
            directives: [grid_list_1.MD_GRID_LIST_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TestGridList);
    return TestGridList;
}());
function getProp(el, prop) {
    return getComputedStyle(el.nativeElement).getPropertyValue(prop);
}
//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/components/grid-list/grid-list.spec.js.map