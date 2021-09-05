// Generated by ReScript, PLEASE EDIT WITH CARE

import * as JsArray from "./JsArray.mjs";
import * as Pervasives from "@rescript/std/lib/es6/pervasives.js";

function cloneNode(x) {
  if (x.TAG === /* Node */0) {
    return {
            TAG: /* Node */0,
            _0: x._0.slice()
          };
  }
  
}

function setNode(node, idx, v) {
  if (node.TAG === /* Node */0) {
    node._0[idx] = v;
    return ;
  }
  
}

function getNode(node, idx) {
  if (node.TAG === /* Node */0) {
    return node._0[idx];
  }
  
}

var Tree = {
  cloneNode: cloneNode,
  setNode: setNode,
  getNode: getNode
};

function make(param) {
  return {
          size: 0,
          shift: 5,
          root: {
            TAG: /* Node */0,
            _0: []
          },
          tail: []
        };
}

function tailOffset(param) {
  var size = param.size;
  if (size < 32) {
    return 0;
  } else {
    return (((size - 1 | 0) >>> 5) << 5);
  }
}

function newPath(_level, _node) {
  while(true) {
    var node = _node;
    var level = _level;
    if (level === 0) {
      return node;
    }
    _node = {
      TAG: /* Node */0,
      _0: [node]
    };
    _level = level - 5 | 0;
    continue ;
  };
}

function pushTail(size, level, parent, tail) {
  var ret = cloneNode(parent);
  var subIdx = ((size - 1 | 0) >>> level) & 31;
  if (level === 5) {
    setNode(ret, subIdx, tail);
    return ret;
  }
  if (parent.TAG !== /* Node */0) {
    return ;
  }
  var ar = parent._0;
  var newChild = subIdx < ar.length ? pushTail(size, level - 5 | 0, ar[subIdx], tail) : newPath(level - 5 | 0, tail);
  setNode(ret, subIdx, newChild);
  return ret;
}

function push(vec, x) {
  var tail = vec.tail;
  var root = vec.root;
  var shift = vec.shift;
  var size = vec.size;
  if (tail.length < 32) {
    var newTail = JsArray.cloneAndAdd(tail, x);
    return {
            size: size + 1 | 0,
            shift: vec.shift,
            root: vec.root,
            tail: newTail
          };
  }
  var isRootOverflow = (size >>> 5) > (1 << shift);
  if (isRootOverflow) {
    var newRoot = {
      TAG: /* Node */0,
      _0: [
        root,
        newPath(shift, {
              TAG: /* Leaf */1,
              _0: tail
            })
      ]
    };
    return {
            size: size + 1 | 0,
            shift: vec.shift + 5 | 0,
            root: newRoot,
            tail: [x]
          };
  }
  var newRoot$1 = pushTail(size, shift, root, {
        TAG: /* Leaf */1,
        _0: tail
      });
  return {
          size: size + 1 | 0,
          shift: vec.shift,
          root: newRoot$1,
          tail: [x]
        };
}

function getArrayUnsafe(vec, idx) {
  if (idx >= tailOffset(vec)) {
    return vec.tail;
  }
  var node = vec.root;
  var level = vec.shift;
  while(level > 0) {
    var subIdx = (idx >>> level) & 31;
    node = getNode(node, subIdx);
    level = level - 5 | 0;
  };
  var ar = node;
  if (ar.TAG === /* Node */0) {
    return ;
  } else {
    return ar._0;
  }
}

function popTail(size, level, parent) {
  if (level <= 0) {
    return ;
  }
  var subIdx = ((size - 2 | 0) >>> level) & 31;
  if (parent.TAG !== /* Node */0) {
    return ;
  }
  var ar = parent._0;
  var child = popTail(size, level - 5 | 0, ar[subIdx]);
  if (child !== undefined) {
    var newAr = JsArray.cloneAndSet(ar, subIdx, child);
    return {
            TAG: /* Node */0,
            _0: newAr
          };
  }
  if (subIdx === 0) {
    return ;
  }
  var newAr$1 = JsArray.slice(ar, 0, ar.length - 1 | 0);
  return {
          TAG: /* Node */0,
          _0: newAr$1
        };
}

function pop(vec) {
  var tail = vec.tail;
  var shift = vec.shift;
  var size = vec.size;
  if (size <= 1) {
    return {
            size: 0,
            shift: 5,
            root: {
              TAG: /* Node */0,
              _0: []
            },
            tail: []
          };
  }
  if (tail.length > 1) {
    var newTail = JsArray.slice(tail, 0, tail.length - 1 | 0);
    return {
            size: size - 1 | 0,
            shift: vec.shift,
            root: vec.root,
            tail: newTail
          };
  }
  var newTail$1 = getArrayUnsafe(vec, size - 2 | 0);
  var nr = popTail(size, shift, vec.root);
  var newRoot = nr !== undefined ? nr : ({
        TAG: /* Node */0,
        _0: []
      });
  if (newRoot.TAG !== /* Node */0) {
    return ;
  }
  var ar = newRoot._0;
  var isRootUnderflow = shift > 5 && ar.length === 1;
  if (isRootUnderflow) {
    return {
            size: size - 1 | 0,
            shift: shift - 5 | 0,
            root: ar[0],
            tail: newTail$1
          };
  } else {
    return {
            size: size - 1 | 0,
            shift: vec.shift,
            root: newRoot,
            tail: newTail$1
          };
  }
}

function getUnsafe(vec, i) {
  return getArrayUnsafe(vec, i)[i & 31];
}

function updatedPath(node, level, i, x) {
  if (node.TAG === /* Node */0) {
    var ar = node._0;
    var subIdx = (i >>> level) & 31;
    var m = JsArray.cloneAndSet(ar, subIdx, updatedPath(ar[subIdx], level - 5 | 0, i, x));
    return {
            TAG: /* Node */0,
            _0: m
          };
  }
  var m$1 = JsArray.cloneAndSet(node._0, i % 32, x);
  return {
          TAG: /* Leaf */1,
          _0: m$1
        };
}

function setUnsafe(vec, i, x) {
  var offset = tailOffset(vec);
  if (i < offset) {
    return {
            size: vec.size,
            shift: vec.shift,
            root: updatedPath(vec.root, vec.shift, i, x),
            tail: vec.tail
          };
  }
  var newTail = JsArray.cloneAndSet(vec.tail, i & 31, x);
  return {
          size: vec.size,
          shift: vec.shift,
          root: vec.root,
          tail: newTail
        };
}

function fromArray(ar) {
  var len = ar.length;
  if (len === 0) {
    return {
            size: 0,
            shift: 5,
            root: {
              TAG: /* Node */0,
              _0: []
            },
            tail: []
          };
  }
  var tailSize = (len & 31) === 0 ? 32 : len & 31;
  var tailOffset = len - tailSize | 0;
  var tail = JsArray.slice(ar, tailOffset, tailSize);
  var i = 0;
  var init_root = {
    TAG: /* Node */0,
    _0: []
  };
  var init_tail = [];
  var state = {
    size: tailSize,
    shift: 5,
    root: init_root,
    tail: tail
  };
  while(i < tailOffset) {
    var offset = i;
    var vec = state;
    var root = vec.root;
    var shift = vec.shift;
    var size = vec.size;
    var leaf = {
      TAG: /* Leaf */1,
      _0: JsArray.slice(ar, offset, 32)
    };
    var isRootOverflow = offset === (1 << (shift + 5 | 0));
    var tmp;
    if (isRootOverflow) {
      var newRoot = {
        TAG: /* Node */0,
        _0: [
          root,
          newPath(shift, leaf)
        ]
      };
      tmp = {
        size: size + 32 | 0,
        shift: shift + 5 | 0,
        root: newRoot,
        tail: vec.tail
      };
    } else {
      var newRoot$1 = pushTail(offset + 1 | 0, shift, root, leaf);
      tmp = {
        size: size + 32 | 0,
        shift: vec.shift,
        root: newRoot$1,
        tail: vec.tail
      };
    }
    state = tmp;
    i = offset + 32 | 0;
  };
  return state;
}

function toArray(param) {
  var tail = param.tail;
  var data = Array(param.size);
  var idx = {
    contents: 0
  };
  var fromTree = function (node) {
    if (node.TAG === /* Node */0) {
      node._0.forEach(fromTree);
      return ;
    }
    var ar = node._0;
    var len = ar.length;
    JsArray.blit(ar, 0, data, idx.contents, len);
    idx.contents = idx.contents + len | 0;
    
  };
  fromTree(param.root);
  JsArray.blit(tail, 0, data, idx.contents, tail.length);
  return data;
}

function makeByU(len, f) {
  if (len === 0) {
    return {
            size: 0,
            shift: 5,
            root: {
              TAG: /* Node */0,
              _0: []
            },
            tail: []
          };
  }
  var tailSize = (len & 31) === 0 ? 32 : len & 31;
  var tailOffset = len - tailSize | 0;
  var tail = Array(tailSize);
  var i = 0;
  var init_root = {
    TAG: /* Node */0,
    _0: []
  };
  var init_tail = [];
  var state = {
    size: tailSize,
    shift: 5,
    root: init_root,
    tail: tail
  };
  while(i < tailOffset) {
    var offset = i;
    var vec = state;
    var root = vec.root;
    var shift = vec.shift;
    var size = vec.size;
    var ar = Array(32);
    for(var j = 0; j <= 31; ++j){
      ar[j] = f(offset + j | 0);
    }
    var leaf = {
      TAG: /* Leaf */1,
      _0: ar
    };
    var isRootOverflow = offset === (1 << (shift + 5 | 0));
    var tmp;
    if (isRootOverflow) {
      var newRoot = {
        TAG: /* Node */0,
        _0: [
          root,
          newPath(shift, leaf)
        ]
      };
      tmp = {
        size: size + 32 | 0,
        shift: shift + 5 | 0,
        root: newRoot,
        tail: vec.tail
      };
    } else {
      var newRoot$1 = pushTail(offset + 1 | 0, shift, root, leaf);
      tmp = {
        size: size + 32 | 0,
        shift: vec.shift,
        root: newRoot$1,
        tail: vec.tail
      };
    }
    state = tmp;
    i = offset + 32 | 0;
  };
  for(var j$1 = 0; j$1 < tailSize; ++j$1){
    tail[j$1] = f(tailOffset + j$1 | 0);
  }
  return state;
}

function make$1(v) {
  return {
          size: v.size,
          shift: v.shift,
          root: v.root,
          tail: v.tail
        };
}

function toPersistent(v) {
  return {
          size: v.size,
          shift: v.shift,
          root: v.root,
          tail: v.tail
        };
}

function pushU(_v, _x) {
  return Pervasives.failwith("not implemented yet");
}

function push$1(_v, _x) {
  return Pervasives.failwith("not implemented yet");
}

var Transient = {
  make: make$1,
  toPersistent: toPersistent,
  pushU: pushU,
  push: push$1
};

var A;

var absurd;

export {
  A ,
  absurd ,
  Tree ,
  make ,
  tailOffset ,
  newPath ,
  pushTail ,
  push ,
  getArrayUnsafe ,
  popTail ,
  pop ,
  getUnsafe ,
  updatedPath ,
  setUnsafe ,
  fromArray ,
  toArray ,
  makeByU ,
  Transient ,
  
}
/* No side effect */
