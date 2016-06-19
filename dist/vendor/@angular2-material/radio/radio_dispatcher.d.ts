export declare type MdRadioDispatcherListener = (id: string, name: string) => void;
/**
 * Class for radio buttons to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
export declare class MdRadioDispatcher {
    private _listeners;
    /** Notify other radio buttons that selection for the given name has been set. */
    notify(id: string, name: string): void;
    /** Listen for future changes to radio button selection. */
    listen(listener: MdRadioDispatcherListener): void;
}
