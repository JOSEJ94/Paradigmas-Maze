let myPush = (a, n) => a.concat(n);
let copyArray = (a) => a.slice(0, a.length);
let reverse = (a) => a.map((c, i) => a[a.length - (i + 1)]);
let myPop = (a) => new Array(a.slice(0, a.length-1), a[a.length-1]);

module.exports = {
	myPush : myPush,
	copyArray : copyArray,
	reverse : reverse,
	myPop : myPop
}