"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// TODO(josephperrott): Benchpress tests.
/** A single degree in radians. */
var DEGREE_IN_RADIANS = Math.PI / 180;
/** Duration of the indeterminate animation. */
var DURATION_INDETERMINATE = 667;
/** Duration of the indeterminate animation. */
var DURATION_DETERMINATE = 225;
/** Start animation value of the indeterminate animation */
var startIndeterminate = 3;
/** End animation value of the indeterminate animation */
var endIndeterminate = 80;
/**
 * <md-progress-circle> component.
 */
var MdProgressCircle = (function () {
    function MdProgressCircle(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        /** The id of the last requested animation. */
        this._lastAnimationId = 0;
        /**
         * Value of the progress circle.
         *
         * Input:number, defaults to 0.
         * _value is bound to the host as the attribute aria-valuenow.
         */
        this._value = 0;
        this._mode = 'determinate';
    }
    Object.defineProperty(MdProgressCircle.prototype, "currentPath", {
        get: function () {
            return this._currentPath;
        },
        set: function (path) {
            this._currentPath = path;
            // Mark for check as our ChangeDetectionStrategy is OnPush, when changes come from within the
            // component, change detection must be called for.
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressCircle.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v) {
                var newValue = clamp(v);
                this._animateCircle(this.value, newValue, linearEase, DURATION_DETERMINATE, 0);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressCircle.prototype, "mode", {
        /**
         * Mode of the progress circle
         *
         * Input must be one of the values from ProgressMode, defaults to 'determinate'.
         * mode is bound to the host as the attribute host.
         */
        get: function () {
            return this._mode;
        },
        set: function (m) {
            if (m == 'indeterminate') {
                this._startIndeterminateAnimation();
            }
            else {
                this._cleanupIndeterminateAnimation();
            }
            this._mode = m;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Animates the circle from one percentage value to another.
     *
     * @param animateFrom The percentage of the circle filled starting the animation.
     * @param animateTo The percentage of the circle filled ending the animation.
     * @param ease The easing function to manage the pace of change in the animation.
     * @param duration The length of time to show the animation, in milliseconds.
     * @param rotation The starting angle of the circle fill, with 0° represented at the top center
     *    of the circle.
     */
    MdProgressCircle.prototype._animateCircle = function (animateFrom, animateTo, ease, duration, rotation) {
        var _this = this;
        var id = ++this._lastAnimationId;
        var startTime = now();
        var changeInValue = animateTo - animateFrom;
        // No need to animate it if the values are the same
        if (animateTo === animateFrom) {
            this.currentPath = getSvgArc(animateTo, rotation);
        }
        else {
            var animation_1 = function (currentTime) {
                var elapsedTime = Math.max(0, Math.min((currentTime || now()) - startTime, duration));
                _this.currentPath = getSvgArc(ease(elapsedTime, animateFrom, changeInValue, duration), rotation);
                // Prevent overlapping animations by checking if a new animation has been called for and
                // if the animation has lasted long than the animation duration.
                if (id === _this._lastAnimationId && elapsedTime < duration) {
                    requestAnimationFrame(animation_1);
                }
            };
            requestAnimationFrame(animation_1);
        }
    };
    /**
     * Starts the indeterminate animation interval, if it is not already running.
     */
    MdProgressCircle.prototype._startIndeterminateAnimation = function () {
        var _this = this;
        var rotationStartPoint = 0;
        var start = startIndeterminate;
        var end = endIndeterminate;
        var duration = DURATION_INDETERMINATE;
        var animate = function () {
            _this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
            // Prevent rotation from reaching Number.MAX_SAFE_INTEGER.
            rotationStartPoint = (rotationStartPoint + end) % 100;
            var temp = start;
            start = -end;
            end = -temp;
        };
        if (!this._interdeterminateInterval) {
            this._interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
            animate();
        }
    };
    /**
     * Removes interval, ending the animation.
     */
    MdProgressCircle.prototype._cleanupIndeterminateAnimation = function () {
        if (this._interdeterminateInterval) {
            clearInterval(this._interdeterminateInterval);
            this._interdeterminateInterval = null;
        }
    };
    __decorate([
        core_1.Input(),
        core_1.HostBinding('attr.aria-valuenow'), 
        __metadata('design:type', Object)
    ], MdProgressCircle.prototype, "value", null);
    __decorate([
        core_1.HostBinding('attr.mode'),
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdProgressCircle.prototype, "mode", null);
    MdProgressCircle = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'md-progress-circle',
            host: {
                'role': 'progressbar',
                'aria-valuemin': '0',
                'aria-valuemax': '100',
            },
            template: "<!-- preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's center.  The center of the circle with remain at the center of the md-progress-circle element containing the SVG. --> <svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"> <path [attr.d]=\"currentPath\"></path> </svg> ",
            styles: ["/* Animation Durations */ /** Component sizing */ :host { display: block; /** Height and width are provided for md-progress-circle to act as a default. The height and width are expected to be overwritten by application css. */ height: 100px; width: 100px; /** SVG's viewBox is defined as 0 0 100 100, this means that all SVG children will placed based on a 100px by 100px box.  Additionally all SVG sizes and locations are in reference to this viewBox. */ } :host svg { height: 100%; width: 100%; -webkit-transform-origin: center; transform-origin: center; } :host path { fill: transparent; stroke: #00897b; /** Stroke width of 10px defines stroke as 10% of the viewBox */ stroke-width: 10px; } :host[color=\"accent\"] path { stroke: #8e24aa; } :host[color=\"warn\"] path { stroke: #e53935; } :host[mode=\"indeterminate\"] { -webkit-animation-duration: 5.25s, 2.8875s; animation-duration: 5.25s, 2.8875s; -webkit-animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate; animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate; -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear; animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite; -webkit-transition: none; transition: none; } /** Animations for indeterminate mode */ @-webkit-keyframes md-progress-circle-linear-rotate { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } } @keyframes md-progress-circle-linear-rotate { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } } @-webkit-keyframes md-progress-circle-sporadic-rotate { 12.5% { -webkit-transform: rotate(135deg); transform: rotate(135deg); } 25% { -webkit-transform: rotate(270deg); transform: rotate(270deg); } 37.5% { -webkit-transform: rotate(405deg); transform: rotate(405deg); } 50% { -webkit-transform: rotate(540deg); transform: rotate(540deg); } 62.5% { -webkit-transform: rotate(675deg); transform: rotate(675deg); } 75% { -webkit-transform: rotate(810deg); transform: rotate(810deg); } 87.5% { -webkit-transform: rotate(945deg); transform: rotate(945deg); } 100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg); } } @keyframes md-progress-circle-sporadic-rotate { 12.5% { -webkit-transform: rotate(135deg); transform: rotate(135deg); } 25% { -webkit-transform: rotate(270deg); transform: rotate(270deg); } 37.5% { -webkit-transform: rotate(405deg); transform: rotate(405deg); } 50% { -webkit-transform: rotate(540deg); transform: rotate(540deg); } 62.5% { -webkit-transform: rotate(675deg); transform: rotate(675deg); } 75% { -webkit-transform: rotate(810deg); transform: rotate(810deg); } 87.5% { -webkit-transform: rotate(945deg); transform: rotate(945deg); } 100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg); } } "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], MdProgressCircle);
    return MdProgressCircle;
}());
exports.MdProgressCircle = MdProgressCircle;
/**
 * <md-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <md-progress-circle> instance.
 */
var MdSpinner = (function (_super) {
    __extends(MdSpinner, _super);
    function MdSpinner(changeDetectorRef) {
        _super.call(this, changeDetectorRef);
        this.mode = 'indeterminate';
    }
    MdSpinner = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'md-spinner',
            host: {
                'role': 'progressbar',
            },
            template: "<!-- preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's center.  The center of the circle with remain at the center of the md-progress-circle element containing the SVG. --> <svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"> <path [attr.d]=\"currentPath\"></path> </svg> ",
            styles: ["/* Animation Durations */ /** Component sizing */ :host { display: block; /** Height and width are provided for md-progress-circle to act as a default. The height and width are expected to be overwritten by application css. */ height: 100px; width: 100px; /** SVG's viewBox is defined as 0 0 100 100, this means that all SVG children will placed based on a 100px by 100px box.  Additionally all SVG sizes and locations are in reference to this viewBox. */ } :host svg { height: 100%; width: 100%; -webkit-transform-origin: center; transform-origin: center; } :host path { fill: transparent; stroke: #00897b; /** Stroke width of 10px defines stroke as 10% of the viewBox */ stroke-width: 10px; } :host[color=\"accent\"] path { stroke: #8e24aa; } :host[color=\"warn\"] path { stroke: #e53935; } :host[mode=\"indeterminate\"] { -webkit-animation-duration: 5.25s, 2.8875s; animation-duration: 5.25s, 2.8875s; -webkit-animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate; animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate; -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear; animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite; -webkit-transition: none; transition: none; } /** Animations for indeterminate mode */ @-webkit-keyframes md-progress-circle-linear-rotate { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } } @keyframes md-progress-circle-linear-rotate { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } } @-webkit-keyframes md-progress-circle-sporadic-rotate { 12.5% { -webkit-transform: rotate(135deg); transform: rotate(135deg); } 25% { -webkit-transform: rotate(270deg); transform: rotate(270deg); } 37.5% { -webkit-transform: rotate(405deg); transform: rotate(405deg); } 50% { -webkit-transform: rotate(540deg); transform: rotate(540deg); } 62.5% { -webkit-transform: rotate(675deg); transform: rotate(675deg); } 75% { -webkit-transform: rotate(810deg); transform: rotate(810deg); } 87.5% { -webkit-transform: rotate(945deg); transform: rotate(945deg); } 100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg); } } @keyframes md-progress-circle-sporadic-rotate { 12.5% { -webkit-transform: rotate(135deg); transform: rotate(135deg); } 25% { -webkit-transform: rotate(270deg); transform: rotate(270deg); } 37.5% { -webkit-transform: rotate(405deg); transform: rotate(405deg); } 50% { -webkit-transform: rotate(540deg); transform: rotate(540deg); } 62.5% { -webkit-transform: rotate(675deg); transform: rotate(675deg); } 75% { -webkit-transform: rotate(810deg); transform: rotate(810deg); } 87.5% { -webkit-transform: rotate(945deg); transform: rotate(945deg); } 100% { -webkit-transform: rotate(1080deg); transform: rotate(1080deg); } } "],
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], MdSpinner);
    return MdSpinner;
}(MdProgressCircle));
exports.MdSpinner = MdSpinner;
/**
 * Module functions.
 */
/** Clamps a value to be between 0 and 100. */
function clamp(v) {
    return Math.max(0, Math.min(100, v));
}
/**
 * Returns the current timestamp either based on the performance global or a date object.
 */
function now() {
    if (typeof performance !== 'undefined') {
        return performance.now();
    }
    return Date.now();
}
/**
 * Converts Polar coordinates to Cartesian.
 */
function polarToCartesian(radius, pathRadius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
    return (radius + (pathRadius * Math.cos(angleInRadians))) +
        ',' + (radius + (pathRadius * Math.sin(angleInRadians)));
}
/**
 * Easing function for linear animation.
 */
function linearEase(currentTime, startValue, changeInValue, duration) {
    return changeInValue * currentTime / duration + startValue;
}
/**
 * Easing function to match material design indeterminate animation.
 */
function materialEase(currentTime, startValue, changeInValue, duration) {
    var time = currentTime / duration;
    var timeCubed = Math.pow(time, 3);
    var timeQuad = Math.pow(time, 4);
    var timeQuint = Math.pow(time, 5);
    return startValue + changeInValue * ((6 * timeQuint) + (-15 * timeQuad) + (10 * timeCubed));
}
/**
 * Determines the path value to define the arc.  Converting percentage values to to polar
 * coordinates on the circle, and then to cartesian coordinates in the viewport.
 *
 * @param currentValue The current percentage value of the progress circle, the percentage of the
 *    circle to fill.
 * @param rotation The starting point of the circle with 0 being the 0 degree point.
 * @return A string for an SVG path representing a circle filled from the starting point to the
 *    percentage value provided.
 */
function getSvgArc(currentValue, rotation) {
    // The angle can't be exactly 360, because the arc becomes hidden.
    var maximumAngle = 359.99 / 100;
    var startPoint = rotation || 0;
    var radius = 50;
    var pathRadius = 40;
    var startAngle = startPoint * maximumAngle;
    var endAngle = currentValue * maximumAngle;
    var start = polarToCartesian(radius, pathRadius, startAngle);
    var end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
    var arcSweep = endAngle < 0 ? 0 : 1;
    var largeArcFlag;
    if (endAngle < 0) {
        largeArcFlag = endAngle >= -180 ? 0 : 1;
    }
    else {
        largeArcFlag = endAngle <= 180 ? 0 : 1;
    }
    return "M" + start + "A" + pathRadius + "," + pathRadius + " 0 " + largeArcFlag + "," + arcSweep + " " + end;
}
exports.MD_PROGRESS_CIRCLE_DIRECTIVES = [MdProgressCircle, MdSpinner];
//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/components/progress-circle/progress-circle.js.map