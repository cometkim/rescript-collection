// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Belt_Array from "@rescript/std/lib/es6/belt_Array.js";
import * as Belt_Option from "@rescript/std/lib/es6/belt_Option.js";
import * as Caml_option from "@rescript/std/lib/es6/caml_option.js";
import * as RescriptReactRouter from "@rescript/react/src/RescriptReactRouter.js";
import * as Suite_Vector$Benchmark from "./Suite_Vector.js";
import * as Suite_Hashmap$Benchmark from "./Suite_Hashmap.js";

function toString(x) {
  if (typeof x === "number") {
    return "";
  } else if (x.TAG === /* VectorSuite */0) {
    return Suite_Vector$Benchmark.Routes.map(x._0).url;
  } else {
    return "hashmap/" + Suite_Hashmap$Benchmark.Routes.map(x._0).url;
  }
}

function fromString(s) {
  var match = s.split("/");
  var tmp;
  var exit = 0;
  if (match.length !== 2) {
    exit = 1;
  } else {
    var match$1 = match[0];
    if (match$1 === "hashmap") {
      var path = match[1];
      tmp = Belt_Option.map(Suite_Hashmap$Benchmark.Routes.fromUrl(path), (function (x) {
              return {
                      TAG: /* HashmapSuite */1,
                      _0: x
                    };
            }));
    } else {
      exit = 1;
    }
  }
  if (exit === 1) {
    tmp = Belt_Option.map(Suite_Vector$Benchmark.Routes.fromUrl(s), (function (x) {
            return {
                    TAG: /* VectorSuite */0,
                    _0: x
                  };
          }));
  }
  return Belt_Option.getWithDefault(tmp, /* Index */0);
}

function name(x) {
  if (typeof x === "number") {
    return "Index";
  } else if (x.TAG === /* VectorSuite */0) {
    return Suite_Vector$Benchmark.Routes.map(x._0).suite.name;
  } else {
    return Suite_Hashmap$Benchmark.Routes.map(x._0).suite.name;
  }
}

var vectorMenu = Belt_Array.map(Suite_Vector$Benchmark.Routes.routes, (function (a) {
        return {
                TAG: /* VectorSuite */0,
                _0: a
              };
      }));

var hashmapMenu = Belt_Array.map(Suite_Hashmap$Benchmark.Routes.routes, (function (a) {
        return {
                TAG: /* HashmapSuite */1,
                _0: a
              };
      }));

function useUrl(param) {
  return fromString(RescriptReactRouter.useUrl(undefined, undefined).hash);
}

function Router$HashLink(Props) {
  var children = Props.children;
  var to_ = Props.to_;
  var className = Props.className;
  var href = toString(to_);
  var tmp = {
    href: "#" + href
  };
  if (className !== undefined) {
    tmp.className = Caml_option.valFromOption(className);
  }
  return React.createElement("a", tmp, children);
}

var HashLink = {
  make: Router$HashLink
};

export {
  toString ,
  fromString ,
  name ,
  vectorMenu ,
  hashmapMenu ,
  useUrl ,
  HashLink ,
  
}
/* vectorMenu Not a pure module */
