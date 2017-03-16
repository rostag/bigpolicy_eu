declare namespace gapi.client.drive.files {
  export function list(any): any;
  export function get(any, callback): any;
  export function create(any, callback): any;
  export function save(metadata: any, content: any): any;
  export function update(metadata: any, content: any): any;
}

declare namespace gapi.client {
  export function init(any): PromiseLike<void>;
}
