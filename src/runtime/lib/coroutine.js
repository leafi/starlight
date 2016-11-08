import { default as T } from '../Table';
import { default as LuaYieldError } from '../LuaYieldError';

window.theCoroutine = null;

export function hackCreateAndResume (funman) {
  window.theCoroutine = funman;
  try {
    funman();
  } catch (e) {
    if (e instanceof LuaYieldError) {
      console.info('stop yield');
      console.log('REACHED ROOT!');
      window.theYield = e;
      console.log('EXAMINE window.theYield AT WILL... (coroutine resumer was global.starlight.theCoroutine)');
      return true;
    } else {
      // Not a yield? Rethrow!
      throw e;
    }
  }
}

function _yield () {
  console.info('start yield');
  throw new LuaYieldError('y i e l d i n g...');
}

export { _yield as yield };

export default new T({
  hackCreateAndResume,
  yield: _yield
});
