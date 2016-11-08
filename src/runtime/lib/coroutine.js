import { default as LuaYieldError } from '../LuaYieldError';

let theCoroutine = null;

export function hackCreateAndResume (funman) {
  theCoroutine = funman;
  try {
    funman();
  } catch (e) {
    if (e instanceof LuaYieldError) {
      console.info('stop yield');
      console.log('REACHED ROOT!');
      window.theYield = e;
      console.log('EXAMINE window.theYield AT WILL... (coroutine resumer was window.theCoroutine)');
      return true;
    } else {
      // Not a yield? Rethrow!
      throw e;
    }
  }
}

export function yield () {
  console.info('start yield');
  throw new LuaYieldError('y i e l d i n g...');
}
