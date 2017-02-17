declare namespace gapi.client.drive.files {
  export function list(any): any;
  export function create(any): any;
}

declare namespace gapi.client {
  export function init(any): PromiseLike<void>;
}
