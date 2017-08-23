function stringInslice(str, slice) {
	var isExit = false
	slice.forEach(function(item) {
		if (str == item) {
			isExit = true
		}
	})
	return isExit
}
stringInslice('a', ['b', 'a', 'c']) => true
stringInslice('d', ['b', 'a', 'c']) => false