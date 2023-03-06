(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[405],{

/***/ 75557:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__(53678);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 90638:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = dynamic;
exports.noSSR = noSSR;
var _extends = (__webpack_require__(6495)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(92648)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(67294));
var _loadable = _interop_require_default(__webpack_require__(14302));
function dynamic(dynamicOptions, options) {
    let loadableFn = _loadable.default;
    let loadableOptions = {
        // A loading component is not required, so we default it
        loading: (param)=>{
            let { error , isLoading , pastDelay  } = param;
            if (!pastDelay) return null;
            if (false) {}
            return null;
        }
    };
    // Support for direct import(), eg: dynamic(import('../hello-world'))
    // Note that this is only kept for the edge case where someone is passing in a promise as first argument
    // The react-loadable babel plugin will turn dynamic(import('../hello-world')) into dynamic(() => import('../hello-world'))
    // To make sure we don't execute the import without rendering first
    if (dynamicOptions instanceof Promise) {
        loadableOptions.loader = ()=>dynamicOptions;
    // Support for having import as a function, eg: dynamic(() => import('../hello-world'))
    } else if (typeof dynamicOptions === "function") {
        loadableOptions.loader = dynamicOptions;
    // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})
    } else if (typeof dynamicOptions === "object") {
        loadableOptions = _extends({}, loadableOptions, dynamicOptions);
    }
    // Support for passing options, eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})
    loadableOptions = _extends({}, loadableOptions, options);
    const loaderFn = loadableOptions.loader;
    const loader = ()=>loaderFn != null ? loaderFn().then(convertModule) : Promise.resolve(convertModule(()=>null));
    // coming from build/babel/plugins/react-loadable-plugin.js
    if (loadableOptions.loadableGenerated) {
        loadableOptions = _extends({}, loadableOptions, loadableOptions.loadableGenerated);
        delete loadableOptions.loadableGenerated;
    }
    // support for disabling server side rendering, eg: dynamic(() => import('../hello-world'), {ssr: false}).
    if (typeof loadableOptions.ssr === "boolean" && !loadableOptions.ssr) {
        delete loadableOptions.webpack;
        delete loadableOptions.modules;
        return noSSR(loadableFn, loadableOptions);
    }
    return loadableFn(_extends({}, loadableOptions, {
        loader: loader
    }));
}
const isServerSide = "object" === "undefined";
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    var ref;
    return {
        default: ((ref = mod) == null ? void 0 : ref.default) || mod
    };
}
function noSSR(LoadableInitializer, loadableOptions) {
    // Removing webpack and modules means react-loadable won't try preloading
    delete loadableOptions.webpack;
    delete loadableOptions.modules;
    // This check is necessary to prevent react-loadable from initializing on the server
    if (!isServerSide) {
        return LoadableInitializer(loadableOptions);
    }
    const Loading = loadableOptions.loading;
    // This will only be rendered on the server side
    return ()=>/*#__PURE__*/ _react.default.createElement(Loading, {
            error: null,
            isLoading: true,
            pastDelay: false,
            timedOut: false
        });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=dynamic.js.map


/***/ }),

/***/ 16319:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

"use client";
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.LoadableContext = void 0;
var _interop_require_default = (__webpack_require__(92648)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(67294));
const LoadableContext = _react.default.createContext(null);
exports.LoadableContext = LoadableContext;
if (false) {} //# sourceMappingURL=loadable-context.js.map


/***/ }),

/***/ 14302:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
var _extends = (__webpack_require__(6495)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(92648)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(67294));
var _loadableContext = __webpack_require__(16319);
function resolve(obj) {
    return obj && obj.default ? obj.default : obj;
}
const ALL_INITIALIZERS = [];
const READY_INITIALIZERS = [];
let initialized = false;
function load(loader) {
    let promise = loader();
    let state = {
        loading: true,
        loaded: null,
        error: null
    };
    state.promise = promise.then((loaded)=>{
        state.loading = false;
        state.loaded = loaded;
        return loaded;
    }).catch((err)=>{
        state.loading = false;
        state.error = err;
        throw err;
    });
    return state;
}
function createLoadableComponent(loadFn, options) {
    let opts = Object.assign({
        loader: null,
        loading: null,
        delay: 200,
        timeout: null,
        webpack: null,
        modules: null
    }, options);
    /** @type LoadableSubscription */ let subscription = null;
    function init() {
        if (!subscription) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const sub = new LoadableSubscription(loadFn, opts);
            subscription = {
                getCurrentValue: sub.getCurrentValue.bind(sub),
                subscribe: sub.subscribe.bind(sub),
                retry: sub.retry.bind(sub),
                promise: sub.promise.bind(sub)
            };
        }
        return subscription.promise();
    }
    // Server only
    if (false) {}
    // Client only
    if (!initialized && "object" !== "undefined") {
        // require.resolveWeak check is needed for environments that don't have it available like Jest
        const moduleIds = opts.webpack && "function" === "function" ? opts.webpack() : opts.modules;
        if (moduleIds) {
            READY_INITIALIZERS.push((ids)=>{
                for (const moduleId of moduleIds){
                    if (ids.indexOf(moduleId) !== -1) {
                        return init();
                    }
                }
            });
        }
    }
    function useLoadableModule() {
        init();
        const context = _react.default.useContext(_loadableContext.LoadableContext);
        if (context && Array.isArray(opts.modules)) {
            opts.modules.forEach((moduleName)=>{
                context(moduleName);
            });
        }
    }
    function LoadableComponent(props, ref) {
        useLoadableModule();
        const state = _react.default.useSyncExternalStore(subscription.subscribe, subscription.getCurrentValue, subscription.getCurrentValue);
        _react.default.useImperativeHandle(ref, ()=>({
                retry: subscription.retry
            }), []);
        return _react.default.useMemo(()=>{
            if (state.loading || state.error) {
                return /*#__PURE__*/ _react.default.createElement(opts.loading, {
                    isLoading: state.loading,
                    pastDelay: state.pastDelay,
                    timedOut: state.timedOut,
                    error: state.error,
                    retry: subscription.retry
                });
            } else if (state.loaded) {
                return /*#__PURE__*/ _react.default.createElement(resolve(state.loaded), props);
            } else {
                return null;
            }
        }, [
            props,
            state
        ]);
    }
    LoadableComponent.preload = ()=>init();
    LoadableComponent.displayName = "LoadableComponent";
    return /*#__PURE__*/ _react.default.forwardRef(LoadableComponent);
}
class LoadableSubscription {
    promise() {
        return this._res.promise;
    }
    retry() {
        this._clearTimeouts();
        this._res = this._loadFn(this._opts.loader);
        this._state = {
            pastDelay: false,
            timedOut: false
        };
        const { _res: res , _opts: opts  } = this;
        if (res.loading) {
            if (typeof opts.delay === "number") {
                if (opts.delay === 0) {
                    this._state.pastDelay = true;
                } else {
                    this._delay = setTimeout(()=>{
                        this._update({
                            pastDelay: true
                        });
                    }, opts.delay);
                }
            }
            if (typeof opts.timeout === "number") {
                this._timeout = setTimeout(()=>{
                    this._update({
                        timedOut: true
                    });
                }, opts.timeout);
            }
        }
        this._res.promise.then(()=>{
            this._update({});
            this._clearTimeouts();
        }).catch((_err)=>{
            this._update({});
            this._clearTimeouts();
        });
        this._update({});
    }
    _update(partial) {
        this._state = _extends({}, this._state, {
            error: this._res.error,
            loaded: this._res.loaded,
            loading: this._res.loading
        }, partial);
        this._callbacks.forEach((callback)=>callback());
    }
    _clearTimeouts() {
        clearTimeout(this._delay);
        clearTimeout(this._timeout);
    }
    getCurrentValue() {
        return this._state;
    }
    subscribe(callback) {
        this._callbacks.add(callback);
        return ()=>{
            this._callbacks.delete(callback);
        };
    }
    constructor(loadFn, opts){
        this._loadFn = loadFn;
        this._opts = opts;
        this._callbacks = new Set();
        this._delay = null;
        this._timeout = null;
        this.retry();
    }
}
function Loadable(opts) {
    return createLoadableComponent(load, opts);
}
function flushInitializers(initializers, ids) {
    let promises = [];
    while(initializers.length){
        let init = initializers.pop();
        promises.push(init(ids));
    }
    return Promise.all(promises).then(()=>{
        if (initializers.length) {
            return flushInitializers(initializers, ids);
        }
    });
}
Loadable.preloadAll = ()=>{
    return new Promise((resolveInitializers, reject)=>{
        flushInitializers(ALL_INITIALIZERS).then(resolveInitializers, reject);
    });
};
Loadable.preloadReady = function() {
    let ids = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return new Promise((resolvePreload)=>{
        const res = ()=>{
            initialized = true;
            return resolvePreload();
        };
        // We always will resolve, errors should be handled within loading UIs.
        flushInitializers(READY_INITIALIZERS, ids).then(res, res);
    });
};
if (true) {
    window.__NEXT_PRELOADREADY = Loadable.preloadReady;
}
var _default = Loadable;
exports["default"] = _default; //# sourceMappingURL=loadable.js.map


/***/ }),

/***/ 53678:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9008);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28122);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5152);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_3__);





const Plot = next_dynamic__WEBPACK_IMPORTED_MODULE_3___default()(()=>__webpack_require__.e(/* import() */ 660).then(__webpack_require__.bind(__webpack_require__, 58660)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(58660)
            ]
    },
    ssr: false
});
function Home() {
    const [firstRenderTime, _] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date());
    const [plotInitializedTime, setPlotInitializedTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const delayMs = firstRenderTime && plotInitializedTime && plotInitializedTime - firstRenderTime;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("title", {
                    children: "next.js + react-plotly.js example"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default().main),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default().title),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "https://nextjs.org",
                                target: "_blank",
                                children: "next.js"
                            }),
                            " + ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "https://plotly.com/javascript/react/",
                                target: "_blank",
                                children: "react-plotly.js"
                            }),
                            " example"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Plot, {
                        onInitialized: (figure, graphDiv)=>{
                            setPlotInitializedTime(new Date());
                            console.log("Initialized:", figure, graphDiv);
                        },
                        data: [
                            {
                                type: "scatter",
                                x: [
                                    1,
                                    2,
                                    3
                                ],
                                y: [
                                    2,
                                    6,
                                    3
                                ],
                                mode: "lines+markers",
                                marker: {
                                    color: "red"
                                }
                            },
                            {
                                type: "bar",
                                x: [
                                    1,
                                    2,
                                    3
                                ],
                                y: [
                                    2,
                                    5,
                                    3
                                ]
                            }
                        ],
                        layout: {
                            width: 600,
                            height: 400,
                            title: "A react-plotly.js plot"
                        }
                    }),
                    delayMs && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            "Time from first render to plot initialized: ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                children: [
                                    delayMs,
                                    "ms"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            "plotly.js (and therefore react-plotly.js) can't render server-side (",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "https://github.com/plotly/plotly.js/issues/5361",
                                target: "_blank",
                                children: "plotly.js#5361"
                            }),
                            ", ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "https://github.com/plotly/react-plotly.js/issues/21",
                                target: "_blank",
                                children: "react-plotly.js#21"
                            }),
                            "), so the above uses ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "https://nextjs.org/docs/advanced-features/dynamic-import",
                                target: "_blank",
                                children: "next/dynamic"
                            }),
                            " to disable importing ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                children: "react-plotly.js"
                            }),
                            " on the server:"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                        className: "code",
                        children: 'const Plot = dynamic(() => import("react-plotly.js"), {ssr: false,})'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            "This works, but it means the plot appeared on the page ≈",
                            delayMs ? delayMs / 1000 : "…",
                            "s after the initial page render, which is not ideal."
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            "Furthermore, importing plotly.js this way doesn't work (e.g. for accessing ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "https://plotly.com/javascript/static-image-export/",
                                target: "_blank",
                                children: "static image export functionality"
                            }),
                            "); see ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "./to-image",
                                children: "/to-image"
                            }),
                            "."
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 28122:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"container":"Home_container__bCOhY","main":"Home_main__nLjiQ","title":"Home_title__T09hD","description":"Home_description__41Owk","code":"Home_code__suPER","grid":"Home_grid__GxQ85","card":"Home_card___LpL1","footer":"Home_footer____T7K","logo":"Home_logo__27_tb"};

/***/ }),

/***/ 5152:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(90638)


/***/ }),

/***/ 9008:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(5443)


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [888], function() { return __webpack_exec__(75557); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);