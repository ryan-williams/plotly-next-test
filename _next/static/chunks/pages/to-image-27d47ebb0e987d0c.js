(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[361],{

/***/ 31329:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/to-image",
      function () {
        return __webpack_require__(37211);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 28045:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use client";
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
var _extends = (__webpack_require__(6495)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(92648)/* ["default"] */ .Z);
var _interop_require_wildcard = (__webpack_require__(91598)/* ["default"] */ .Z);
var _object_without_properties_loose = (__webpack_require__(17273)/* ["default"] */ .Z);
var _react = _interop_require_wildcard(__webpack_require__(67294));
var _head = _interop_require_default(__webpack_require__(5443));
var _imageBlurSvg = __webpack_require__(42730);
var _imageConfig = __webpack_require__(99309);
var _imageConfigContext = __webpack_require__(59977);
var _warnOnce = __webpack_require__(35086);
var _imageLoader = _interop_require_default(__webpack_require__(61479));
const configEnv = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","dangerouslyAllowSVG":false,"unoptimized":true};
const allImgs = new Map();
let perfObserver;
if (false) {}
const VALID_LOADING_VALUES = (/* unused pure expression or super */ null && ([
    "lazy",
    "eager",
    undefined
]));
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return typeof src === "object" && (isStaticRequire(src) || isStaticImageData(src));
}
function getWidths(param, width, sizes) {
    let { deviceSizes , allSizes  } = param;
    if (sizes) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
                kind: "w"
            };
        }
        return {
            widths: allSizes,
            kind: "w"
        };
    }
    if (typeof width !== "number") {
        return {
            widths: deviceSizes,
            kind: "w"
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
    ];
    return {
        widths,
        kind: "x"
    };
}
function generateImgAttrs(param) {
    let { config , src , unoptimized , width , quality , sizes , loader  } = param;
    if (unoptimized) {
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths , kind  } = getWidths(config, width, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === "w" ? "100vw" : sizes,
        srcSet: widths.map((w, i)=>"".concat(loader({
                config,
                src,
                quality,
                width: w
            }), " ").concat(kind === "w" ? w : i + 1).concat(kind)).join(", "),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getInt(x) {
    if (typeof x === "number" || typeof x === "undefined") {
        return x;
    }
    if (typeof x === "string" && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, src, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized) {
    if (!img || img["data-loaded-src"] === src) {
        return;
    }
    img["data-loaded-src"] = src;
    const p = "decode" in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentElement || !img.isConnected) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        if (placeholder === "blur") {
            setBlurComplete(true);
        }
        if (onLoadRef == null ? void 0 : onLoadRef.current) {
            // Since we don't have the SyntheticEvent here,
            // we must create one with the same shape.
            // See https://reactjs.org/docs/events.html
            const event = new Event("load");
            Object.defineProperty(event, "target", {
                writable: false,
                value: img
            });
            let prevented = false;
            let stopped = false;
            onLoadRef.current(_extends({}, event, {
                nativeEvent: event,
                currentTarget: img,
                target: img,
                isDefaultPrevented: ()=>prevented,
                isPropagationStopped: ()=>stopped,
                persist: ()=>{},
                preventDefault: ()=>{
                    prevented = true;
                    event.preventDefault();
                },
                stopPropagation: ()=>{
                    stopped = true;
                    event.stopPropagation();
                }
            }));
        }
        if (onLoadingCompleteRef == null ? void 0 : onLoadingCompleteRef.current) {
            onLoadingCompleteRef.current(img);
        }
        if (false) {}
    });
}
const ImageElement = /*#__PURE__*/ (0, _react).forwardRef((_param, forwardedRef)=>{
    var { imgAttributes , heightInt , widthInt , qualityInt , className , imgStyle , blurStyle , isLazy , fill , placeholder , loading , srcString , config , unoptimized , loader , onLoadRef , onLoadingCompleteRef , setBlurComplete , setShowAltText , onLoad , onError  } = _param, rest = _object_without_properties_loose(_param, [
        "imgAttributes",
        "heightInt",
        "widthInt",
        "qualityInt",
        "className",
        "imgStyle",
        "blurStyle",
        "isLazy",
        "fill",
        "placeholder",
        "loading",
        "srcString",
        "config",
        "unoptimized",
        "loader",
        "onLoadRef",
        "onLoadingCompleteRef",
        "setBlurComplete",
        "setShowAltText",
        "onLoad",
        "onError"
    ]);
    loading = isLazy ? "lazy" : loading;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("img", Object.assign({}, rest, {
        // @ts-ignore - TODO: upgrade to `@types/react@17`
        loading: loading,
        width: widthInt,
        height: heightInt,
        decoding: "async",
        "data-nimg": fill ? "fill" : "1",
        className: className,
        style: _extends({}, imgStyle, blurStyle)
    }, imgAttributes, {
        ref: (0, _react).useCallback((img)=>{
            if (forwardedRef) {
                if (typeof forwardedRef === "function") forwardedRef(img);
                else if (typeof forwardedRef === "object") {
                    // @ts-ignore - .current is read only it's usually assigned by react internally
                    forwardedRef.current = img;
                }
            }
            if (!img) {
                return;
            }
            if (onError) {
                // If the image has an error before react hydrates, then the error is lost.
                // The workaround is to wait until the image is mounted which is after hydration,
                // then we set the src again to trigger the error handler (if there was an error).
                // eslint-disable-next-line no-self-assign
                img.src = img.src;
            }
            if (false) {}
            if (img.complete) {
                handleLoading(img, srcString, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized);
            }
        }, [
            srcString,
            placeholder,
            onLoadRef,
            onLoadingCompleteRef,
            setBlurComplete,
            onError,
            unoptimized,
            forwardedRef
        ]),
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, srcString, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized);
        },
        onError: (event)=>{
            // if the real image fails to load, this will ensure "alt" is visible
            setShowAltText(true);
            if (placeholder === "blur") {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    })));
});
const Image = /*#__PURE__*/ (0, _react).forwardRef((_param, forwardedRef)=>{
    var { src , sizes , unoptimized =false , priority =false , loading , className , quality , width , height , fill , style , onLoad , onLoadingComplete , placeholder ="empty" , blurDataURL , layout , objectFit , objectPosition , lazyBoundary , lazyRoot  } = _param, all = _object_without_properties_loose(_param, [
        "src",
        "sizes",
        "unoptimized",
        "priority",
        "loading",
        "className",
        "quality",
        "width",
        "height",
        "fill",
        "style",
        "onLoad",
        "onLoadingComplete",
        "placeholder",
        "blurDataURL",
        "layout",
        "objectFit",
        "objectPosition",
        "lazyBoundary",
        "lazyRoot"
    ]);
    const configContext = (0, _react).useContext(_imageConfigContext.ImageConfigContext);
    const config = (0, _react).useMemo(()=>{
        const c = configEnv || configContext || _imageConfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        return _extends({}, c, {
            allSizes,
            deviceSizes
        });
    }, [
        configContext
    ]);
    let rest = all;
    let loader = rest.loader || _imageLoader.default;
    // Remove property so it's not spread on <img> element
    delete rest.loader;
    // This special value indicates that the user
    // didn't define a "loader" prop or "loader" config.
    const isDefaultLoader = "__next_img_default" in loader;
    if (isDefaultLoader) {
        if (config.loader === "custom") {
            throw new Error('Image with src "'.concat(src, '" is missing "loader" prop.') + "\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader");
        }
    } else {
        // The user defined a "loader" prop or config.
        // Since the config object is internal only, we
        // must not pass it to the user-defined "loader".
        const customImageLoader = loader;
        var _tmp;
        _tmp = (obj)=>{
            const { config: _  } = obj, opts = _object_without_properties_loose(obj, [
                "config"
            ]);
            return customImageLoader(opts);
        }, loader = _tmp, _tmp;
    }
    if (layout) {
        if (layout === "fill") {
            fill = true;
        }
        const layoutToStyle = {
            intrinsic: {
                maxWidth: "100%",
                height: "auto"
            },
            responsive: {
                width: "100%",
                height: "auto"
            }
        };
        const layoutToSizes = {
            responsive: "100vw",
            fill: "100vw"
        };
        const layoutStyle = layoutToStyle[layout];
        if (layoutStyle) {
            style = _extends({}, style, layoutStyle);
        }
        const layoutSizes = layoutToSizes[layout];
        if (layoutSizes && !sizes) {
            sizes = layoutSizes;
        }
    }
    let staticSrc = "";
    let widthInt = getInt(width);
    let heightInt = getInt(height);
    let blurWidth;
    let blurHeight;
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(staticImageData)));
        }
        if (!staticImageData.height || !staticImageData.width) {
            throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(staticImageData)));
        }
        blurWidth = staticImageData.blurWidth;
        blurHeight = staticImageData.blurHeight;
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!fill) {
            if (!widthInt && !heightInt) {
                widthInt = staticImageData.width;
                heightInt = staticImageData.height;
            } else if (widthInt && !heightInt) {
                const ratio = widthInt / staticImageData.width;
                heightInt = Math.round(staticImageData.height * ratio);
            } else if (!widthInt && heightInt) {
                const ratio = heightInt / staticImageData.height;
                widthInt = Math.round(staticImageData.width * ratio);
            }
        }
    }
    src = typeof src === "string" ? src : staticSrc;
    let isLazy = !priority && (loading === "lazy" || typeof loading === "undefined");
    if (src.startsWith("data:") || src.startsWith("blob:")) {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    if (isDefaultLoader && src.endsWith(".svg") && !config.dangerouslyAllowSVG) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        unoptimized = true;
    }
    const [blurComplete, setBlurComplete] = (0, _react).useState(false);
    const [showAltText, setShowAltText] = (0, _react).useState(false);
    const qualityInt = getInt(quality);
    if (false) {}
    const imgStyle = Object.assign(fill ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: "transparent"
    }, style);
    const blurStyle = placeholder === "blur" && blurDataURL && !blurComplete ? {
        backgroundSize: imgStyle.objectFit || "cover",
        backgroundPosition: imgStyle.objectPosition || "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundImage: 'url("data:image/svg+xml;charset=utf-8,'.concat((0, _imageBlurSvg).getImageBlurSvg({
            widthInt,
            heightInt,
            blurWidth,
            blurHeight,
            blurDataURL,
            objectFit: imgStyle.objectFit
        }), '")')
    } : {};
    if (false) {}
    const imgAttributes = generateImgAttrs({
        config,
        src,
        unoptimized,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
    });
    let srcString = src;
    if (false) {}
    const linkProps = {
        // @ts-expect-error upgrade react types to react 18
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: rest.crossOrigin
    };
    const onLoadRef = (0, _react).useRef(onLoad);
    (0, _react).useEffect(()=>{
        onLoadRef.current = onLoad;
    }, [
        onLoad
    ]);
    const onLoadingCompleteRef = (0, _react).useRef(onLoadingComplete);
    (0, _react).useEffect(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    const imgElementArgs = _extends({
        isLazy,
        imgAttributes,
        heightInt,
        widthInt,
        qualityInt,
        className,
        imgStyle,
        blurStyle,
        loading,
        config,
        fill,
        unoptimized,
        placeholder,
        loader,
        srcString,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        setShowAltText
    }, rest);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(ImageElement, Object.assign({}, imgElementArgs, {
        ref: forwardedRef
    })), priority ? // for browsers that do not support `imagesrcset`, and in those cases
    // it would likely cause the incorrect image to be preloaded.
    //
    // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
    /*#__PURE__*/ _react.default.createElement(_head.default, null, /*#__PURE__*/ _react.default.createElement("link", Object.assign({
        key: "__nimg-" + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
        rel: "preload",
        as: "image",
        href: imgAttributes.srcSet ? undefined : imgAttributes.src
    }, linkProps))) : null);
});
var _default = Image;
exports["default"] = _default;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image.js.map


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

/***/ 42730:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getImageBlurSvg = getImageBlurSvg;
function getImageBlurSvg(param) {
    let { widthInt , heightInt , blurWidth , blurHeight , blurDataURL , objectFit  } = param;
    const std = blurWidth && blurHeight ? "1" : "20";
    const svgWidth = blurWidth || widthInt;
    const svgHeight = blurHeight || heightInt;
    const feComponentTransfer = blurDataURL.startsWith("data:image/jpeg") ? "%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%" : "";
    if (svgWidth && svgHeight) {
        return "%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(svgWidth, " ").concat(svgHeight, "'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(std, "'/%3E").concat(feComponentTransfer, "%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(blurDataURL, "'/%3E%3C/svg%3E");
    }
    const preserveAspectRatio = objectFit === "contain" ? "xMidYMid" : objectFit === "cover" ? "xMidYMid slice" : "none";
    return "%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='".concat(preserveAspectRatio, "' x='0' y='0' height='100%25' width='100%25' href='").concat(blurDataURL, "'/%3E%3C/svg%3E");
} //# sourceMappingURL=image-blur-svg.js.map


/***/ }),

/***/ 61479:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
function defaultLoader(param) {
    let { config , src , width , quality  } = param;
    if (false) {}
    return "".concat(config.path, "?url=").concat(encodeURIComponent(src), "&w=").concat(width, "&q=").concat(quality || 75);
}
// We use this to determine if the import is the default loader
// or a custom loader defined by the user in next.config.js
defaultLoader.__next_img_default = true;
var _default = defaultLoader;
exports["default"] = _default; //# sourceMappingURL=image-loader.js.map


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

/***/ 37211:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
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
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default().main),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default().title),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "https://nextjs.org",
                            children: "Next.js"
                        }),
                        " / ",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "https://plotly.com/javascript/",
                            children: "Plotly.js"
                        }),
                        " issue"
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Plot, {
                    onInitialized: async (figure, graphDiv)=>{
                        console.log("Initialized:", figure, graphDiv);
                        const Plotly = (await __webpack_require__.e(/* import() */ 332).then(__webpack_require__.t.bind(__webpack_require__, 55332, 23))).default;
                        console.log("imported plotly.js!");
                    },
                    data: [
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
                        title: "A simple plot"
                    }
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    children: [
                        "This example attempts to import plotly.js in a next.js app (e.g. in order to use ",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "https://plotly.com/javascript/static-image-export/",
                            target: "_blank",
                            children: "the Plotly.toImage function"
                        }),
                        ")."
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    children: "plotly.js is imported asynchronously inside an event handler:"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                    children: '<Plot\n    onInitialized={async (figure, graphDiv) => {\n        console.log("Initialized:", figure, graphDiv)\n        const Plotly = (await import("plotly.js")).default\n        console.log("imported plotly.js!")\n    }}\n    data={[{type: \'bar\', x: [1, 2, 3], y: [2, 5, 3]}]}\n    layout={ {width: 600, height: 400, title: \'A simple plot\'} }\n/>'
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    children: [
                        "following ",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "https://nextjs.org/docs/advanced-features/dynamic-import#with-external-libraries",
                            target: "_blank",
                            children: 'the "external libraries" example in the Next.js dynamic-imports documentation'
                        }),
                        "."
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    children: [
                        "However, during the import, a ",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                            children: "TypeError: str2arr is not a function"
                        }),
                        " error is raised:"
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    style: {
                        position: "relative",
                        width: "100%",
                        aspectRatio: "854 / 716"
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                        src: "/error.png",
                        alt: "Error screenshot",
                        fill: true
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("details", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("summary", {
                            children: "Stack trace"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                            className: "code",
                            children: "\nUncaught (in promise) TypeError: str2arr is not a function\nat eval (VM1676 avif.js:20:16)\nat ./node_modules/probe-image-size/lib/parse_stream/avif.js (node_modules_plotly_js_lib_index_js.js:15212:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1675 parsers_stream.js:4:9)\nat ./node_modules/probe-image-size/lib/parsers_stream.js (node_modules_plotly_js_lib_index_js.js:15432:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1674 stream.js:5:19)\nat ./node_modules/probe-image-size/stream.js (node_modules_plotly_js_lib_index_js.js:15454:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1673 common.js:4:21)\nat ./node_modules/probe-image-size/lib/common.js (node_modules_plotly_js_lib_index_js.js:15179:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1672 avif.js:13:21)\nat ./node_modules/probe-image-size/lib/parse_sync/avif.js (node_modules_plotly_js_lib_index_js.js:15322:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1671 parsers_sync.js:5:9)\nat ./node_modules/probe-image-size/lib/parsers_sync.js (node_modules_plotly_js_lib_index_js.js:15443:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1670 sync.js:4:15)\nat ./node_modules/probe-image-size/sync.js (node_modules_plotly_js_lib_index_js.js:15465:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1669 helpers.js:3:17)\nat ./node_modules/plotly.js/src/traces/image/helpers.js (node_modules_plotly_js_lib_index_js.js:12032:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1668 calc.js:8:21)\nat ./node_modules/plotly.js/src/traces/image/calc.js (node_modules_plotly_js_lib_index_js.js:11988:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\nat eval (VM1664 index.js:6:11)\nat ./node_modules/plotly.js/src/traces/image/index.js (node_modules_plotly_js_lib_index_js.js:12054:1)\nat options.factory (webpack.js?ts=1678066002993:713:31)\nat __webpack_require__ (webpack.js?ts=1678066002993:37:33)\nat fn (webpack.js?ts=1678066002993:368:21)\neval @ VM1676 avif.js:20\n./node_modules/probe-image-size/lib/parse_stream/avif.js @ node_modules_plotly_js_lib_index_js.js:15212\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1675 parsers_stream.js:4\n./node_modules/probe-image-size/lib/parsers_stream.js @ node_modules_plotly_js_lib_index_js.js:15432\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1674 stream.js:5\n./node_modules/probe-image-size/stream.js @ node_modules_plotly_js_lib_index_js.js:15454\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1673 common.js:4\n./node_modules/probe-image-size/lib/common.js @ node_modules_plotly_js_lib_index_js.js:15179\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1672 avif.js:13\n./node_modules/probe-image-size/lib/parse_sync/avif.js @ node_modules_plotly_js_lib_index_js.js:15322\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1671 parsers_sync.js:5\n./node_modules/probe-image-size/lib/parsers_sync.js @ node_modules_plotly_js_lib_index_js.js:15443\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1670 sync.js:4\n./node_modules/probe-image-size/sync.js @ node_modules_plotly_js_lib_index_js.js:15465\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1669 helpers.js:3\n./node_modules/plotly.js/src/traces/image/helpers.js @ node_modules_plotly_js_lib_index_js.js:12032\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1668 calc.js:8\n./node_modules/plotly.js/src/traces/image/calc.js @ node_modules_plotly_js_lib_index_js.js:11988\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1664 index.js:6\n./node_modules/plotly.js/src/traces/image/index.js @ node_modules_plotly_js_lib_index_js.js:12054\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1663 image.js:3\n./node_modules/plotly.js/lib/image.js @ node_modules_plotly_js_lib_index_js.js:6092\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\neval @ VM1136 index.js:18\n./node_modules/plotly.js/lib/index.js @ node_modules_plotly_js_lib_index_js.js:6103\noptions.factory @ webpack.js?ts=1678066002993:713\n__webpack_require__ @ webpack.js?ts=1678066002993:37\nfn @ webpack.js?ts=1678066002993:368\n__webpack_require__.t @ webpack.js?ts=1678066002993:117\nawait in __webpack_require__.t (async)\nfigureCallback @ factory.js?0867:196\neval @ factory.js?0867:104\nPromise.then (async)\nupdatePlotly @ factory.js?0867:95\ncomponentDidMount @ factory.js?0867:119\ncommitLayoutEffectOnFiber @ react-dom.development.js?ac89:23305\ncommitLayoutMountEffects_complete @ react-dom.development.js?ac89:24688\ncommitLayoutEffects_begin @ react-dom.development.js?ac89:24674\ncommitLayoutEffects @ react-dom.development.js?ac89:24612\ncommitRootImpl @ react-dom.development.js?ac89:26823\ncommitRoot @ react-dom.development.js?ac89:26682\nperformSyncWorkOnRoot @ react-dom.development.js?ac89:26117\nflushSyncCallbacks @ react-dom.development.js?ac89:12042\neval @ react-dom.development.js?ac89:25651"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    children: "Clicking through on the error shows this, from avif.js:"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    style: {
                        position: "relative",
                        width: "100%",
                        aspectRatio: "519 / 314"
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                        src: "/avif.js.png",
                        alt: "avif.js imports and error line",
                        fill: true
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("details", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("summary", {
                            children: "Excerpted code"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                            className: "code",
                            children: "// Utils used to parse miaf-based files (avif/heic/heif)\n//\n//  - image collections are not supported (only last size is reported)\n//  - images with metadata encoded after image data are not supported\n//  - images without any `ispe` box are not supported\n//\n\n'use strict';\n\n/* eslint-disable consistent-return */\n\n\nvar ParserStream = require('../common').ParserStream;\nvar str2arr      = require('../common').str2arr;\nvar sliceEq      = require('../common').sliceEq;\nvar readUInt32BE = require('../common').readUInt32BE;\nvar miaf         = require('../miaf_utils');\nvar exif         = require('../exif_utils');\n\nvar SIG_FTYP = str2arr('ftyp');\n"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    children: [
                        "This code appears to come from ",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            href: "https://github.com/nodeca/probe-image-size/blob/7.2.3/lib/parse_stream/avif.js#L1-L18",
                            target: "_blank",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                    children: "lib/parse_stream/avif.js"
                                }),
                                " in nodeca/probe-image-size@7.2.3"
                            ]
                        }),
                        "."
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    children: "Why is this error occurring? Is something in the build/minification/code-splitting pipeline not including code that plotly.js needs (because it doesn't know it's being imported)?"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    children: [
                        "See ",
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "./probe-image-size-import",
                            children: "/probe-image-size-import"
                        }),
                        " for an even simpler demonstration that importing probe-image-size is broken in Next.js."
                    ]
                })
            ]
        })
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

/***/ 25675:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(28045)


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [888], function() { return __webpack_exec__(31329); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);