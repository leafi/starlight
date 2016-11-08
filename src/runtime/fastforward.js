// how to resume a coroutine:

// 1. take LuaYieldError
// 2. feed through https://github.com/stacktracejs/stacktrace.js to get Array of StackFrames
//     (^ DO NOT LET IT USE SOURCE MAPS!)
// 3. do on each translated lua function: (the fun).prototype.toString() to get source code
// 4. hope fervently that stack trace line num & col num corresponds exactly with returned source code
// 5. step forward through each function's source code, counting '}'s & dealing with for & while loops somehow
// 6. produce new function, with injection of scopes as necessary from LuaYieldError
// 7. run it
// 8. cache this stuff so we don't have to do this every .resume()
// 9. ???????
// 10. fix 10 million edge cases
