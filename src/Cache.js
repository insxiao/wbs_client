class Node {
	constructor (value) {
		this.value = value
		this.count = 0
	}

	hit () {
		this.count++
	}

	compare (other) {
		return this.count - other.count
	}
}

function compare (a, b) {
	if ((typeof a) === (typeof b)) {
		switch (typeof a) {
			case 'undefined': return 0
			case 'number': return a - b
			case 'string': a.localeCompare(b)
			case 'object': if (a === null && b === null) {
				return 0
			} else if (a.compare) {
				return a.compare(b)
			}
			default: throw new Error('cannot compare')
		}
	} else {
		throw new Error (`typof ${a} & typof ${b} not equal`)
	}
}

function swap(arr, a, b) {
	let temp = arr[a]
	arr[a] = arr[b]
	arr[b] = temp
}

function percolateUp (arr, i) {
	let current = i
	let parent = Math.floor(i / 2)

	while (current != 1 && arr[parent].compare(arr[current]) > 0) {
		swap(arr, parent, current)
		current = parent
		parent = Math.floor(current / 2)
	}
}

function percolateDown(arr, size) {
	let current = 1
	let larger
	function smaller (current) {
		let left = current * 2
		let right = left + 1

		if (left <= size && right <= size) {
			if (arr[left].compare(arr[right]) < 0) {
				return left
			} else {
				return right
			}
		} else if (left <= size && right > size) {
			return left
		} else {
			return current
		}
	}

	let smallerChild = smaller(current)
	while (arr[current].compare(arr[smallerChild]) > 0) {
		swap(arr, current, smallerChild)
		current = smallerChild
		smallerChild = smaller(current)
	}
}

/**
* Min Heap
*/
class BinaryHeap {
	constructor () {
		this._root_idx = 1
		this._data = new Array()
		this._data[0] = 0
	}

	top () {
		if (this.size > 0) {
			return this._data[this._root_idx]
		}
	}

	deleteTop () {
		const top = this._data[1]
		this._data[1] = this._data[this.size]
		this._data[this.size] = undefined
		this.size--
		if (this.size > 0) {
			percolateDown(this._data, this.size)
		}
		return top
	}

	insert (node) {
		this._data[this.size + 1] = node
		this.size ++
		percolateUp(this._data, this.size)
	}

	get size () {
		return this._data[0]
	}

	set size (newVal) {
		this._data[0] = newVal
		return this._data[0]
	}

	get empty () {
		return this.size === 0
	}
}

class Cache {
  constructor (limit) {
    this.limit = limit
    this._data = new Array(limit)
    this.size = 0
    this._map = {}
  }

  set (key, value) {

  }

  get (key) {

  }

  delete (key) {

  }

  isEmpty () {
  	return this.size === 0
  }
}

function test() {
	function num (v) {
		return {
			value: v,
			compare (o) {
				return this.value - o.value
			}
		}
	}
	heap = new BinaryHeap

	console.log(heap._data)

	while(!heap.empty) {
		console.log(heap.deleteTop())
	}
}

function main() {
	test()
}

main()