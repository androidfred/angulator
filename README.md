I have a trading calculator for fixed percent risk position sizing running on positioncalculator.bedobi.com. That app is written in Java. (source code at github.com/androidfred/positionweb)

This is a JavaScript/Angular port of that app. This port is running on angulator.bedobi.com.

Important improvements yet to be made on this port include:
* More test coverage
* Browserification to enable use of node modules in the front end (currently the code from existing node module github.com/androidfred/positioncalculatorjs is simply copy-pasted into a service)
* More use of directives to minimize duplication.

As such, current users of http://positioncalculator.bedobi.com will not be moved to this port yet.

## Unlicense
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to http://unlicense.org
