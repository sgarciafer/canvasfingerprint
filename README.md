# canvas fingerprint
====================

This JS code is done reversing and cleaning the really good canvas fingerprint demo from https://browserleaks.com/canvas#how-does-it-work

You can just clone and open index.html on your browser to test it out.

It should be converted into a plugin and remove jQuery if possible.

Dependencies:
============

md5 : https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.7.0/js/md5.min.js

pngtoy : https://gitcdn.link/repo/sgarciafer/pngtoy/master/pngtoy.js


How to use:
===========

Include the dependencies on your html as well as the main script file. canvasfingerprint.js
You can then access the visitor finger print accessing the following variables:

window.fingerprint <- The canvas fingerprint of the current visitor.
window.fingerprintImage <- The base64 encoded image used to generate the fingerprint
