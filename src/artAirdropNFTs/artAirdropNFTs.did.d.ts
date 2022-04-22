import type { Principal } from '@dfinity/principal';
export interface Data {
  'valid' : boolean,
  'link' : string,
  'address' : string,
  'genesis' : boolean,
}
export interface _SERVICE { 'getData' : (arg_0: string) => Promise<Data> }
