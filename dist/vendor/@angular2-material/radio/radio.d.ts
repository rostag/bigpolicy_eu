import { AfterContentInit, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
import { MdRadioDispatcher } from './radio_dispatcher';
export { MdRadioDispatcher } from './radio_dispatcher';
/** A simple change event emitted by either MdRadioButton or MdRadioGroup. */
export declare class MdRadioChange {
    source: MdRadioButton;
    value: any;
}
export declare class MdRadioGroup implements AfterContentInit, ControlValueAccessor {
    /**
     * Selected value for group. Should equal the value of the selected radio button if there *is*
     * a corresponding radio button with a matching value. If there is *not* such a corresponding
     * radio button, this value persists to be applied in case a new radio button is added with a
     * matching value.
     */
    private _value;
    /** The HTML name attribute applied to radio buttons in this group. */
    private _name;
    /** Disables all individual radio buttons assigned to this group. */
    private _disabled;
    /** The currently selected radio button. Should match value. */
    private _selected;
    /** Whether the `value` has been set to its initial value. */
    private _isInitialized;
    /** The method to be called in order to update ngModel */
    private _controlValueAccessorChangeFn;
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    onTouched: () => any;
    /** Event emitted when the group value changes. */
    change: EventEmitter<MdRadioChange>;
    /** Child radio buttons. */
    private _radios;
    name: string;
    disabled: boolean;
    value: any;
    selected: MdRadioButton;
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     * TODO: internal
     */
    ngAfterContentInit(): void;
    private _updateRadioButtonNames();
    /** Updates the `selected` radio button from the internal _value state. */
    private _updateSelectedRadioFromValue();
    /** Dispatch change event with current selection and group value. */
    private _emitChangeEvent();
    /**
      * Implemented as part of ControlValueAccessor.
      * TODO: internal
      */
    writeValue(value: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any): void;
}
export declare class MdRadioButton implements OnInit {
    radioDispatcher: MdRadioDispatcher;
    private _isFocused;
    /** Whether this radio is checked. */
    private _checked;
    /** The unique ID for the radio button. */
    id: string;
    /** Analog to HTML 'name' attribute used to group radios for unique selection. */
    name: string;
    /** Whether this radio is disabled. */
    private _disabled;
    /** Value assigned to this radio.*/
    private _value;
    /** The parent radio group. May or may not be present. */
    radioGroup: MdRadioGroup;
    /** Event emitted when the group value changes. */
    change: EventEmitter<MdRadioChange>;
    constructor(radioGroup: MdRadioGroup, radioDispatcher: MdRadioDispatcher);
    inputId: string;
    checked: boolean;
    /** MdRadioGroup reads this to assign its own value. */
    value: any;
    disabled: boolean;
    /** TODO: internal */
    ngOnInit(): void;
    /** Dispatch change event with current value. */
    private _emitChangeEvent();
}
export declare const MD_RADIO_DIRECTIVES: (typeof MdRadioGroup | typeof MdRadioButton)[];
