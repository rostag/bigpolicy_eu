import { NgZone } from '@angular/core';
import { MdTabLabel } from './tab-label';
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
export declare class MdTabGroup {
    private _zone;
    private _labelWrappers;
    private _inkBar;
    selectedIndex: number;
    private _focusIndex;
    private _groupId;
    constructor(_zone: NgZone);
    /**
     * Waits one frame for the view to update, then upates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop
     * TODO: internal
     */
    ngAfterViewChecked(): void;
    /** Tells the ink-bar to align itself to the current label wrapper */
    private _updateInkBar();
    /**
     * Reference to the current label wrapper; defaults to null for initial render before the
     * ViewChildren references are ready.
     */
    private _currentLabelWrapper;
    /** Tracks which element has focus; used for keyboard navigation */
    /** When the focus index is set, we must manually send focus to the correct label */
    focusIndex: number;
    /** Increment the focus index by 1; prevent going over the number of tabs */
    focusNextTab(): void;
    /** Decrement the focus index by 1; prevent going below 0 */
    focusPreviousTab(): void;
}
export declare const MD_TABS_DIRECTIVES: (typeof MdTabGroup | typeof MdTabLabel)[];
