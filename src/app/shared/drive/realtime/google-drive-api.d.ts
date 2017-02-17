declare namespace gapi.client.drive.files {
  export function list(any): any;
  export function create(any): any;
  export function save(metadata, content): any;
}

declare namespace gapi.client {
  export function init(any): PromiseLike<void>;
}
