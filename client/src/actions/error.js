export function Error(error){
  return {
    type: 'ERROR',
    payload: error
  }
};