export const idlFactory = ({ IDL }) => {
  const Data = IDL.Record({
    'valid' : IDL.Bool,
    'link' : IDL.Text,
    'address' : IDL.Text,
    'genesis' : IDL.Bool,
  });
  return IDL.Service({ 'getData' : IDL.Func([IDL.Text], [Data], ['query']) });
};
export const init = ({ IDL }) => { return []; };
