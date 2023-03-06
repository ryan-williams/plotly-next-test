import React, {useState} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
import common from "probe-image-size/lib/common"
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Plotly.js / Next.js Issue</title>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}><a href="https://nextjs.org">Next.js</a> / <a href={"https://plotly.com/javascript/"}>Plotly.js</a> issue</h1>
                <Plot
                    onInitialized={async (figure, graphDiv) => {
                        console.log("Initialized:", figure, graphDiv, /*"common:", common*/)
                        const Plotly = (await import("plotly.js")).default
                        console.log("imported plotly.js!")
                    }}
                    data={[{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]}]}
                    layout={ {width: 600, height: 400, title: 'A simple plot'} }
                />
                <p>This example attempts to import plotly.js in a next.js app (e.g. in order to use <a href={"https://plotly.com/javascript/static-image-export/"} target={"_blank"}>the Plotly.toImage function</a>).</p>
                <p>plotly.js is imported asynchronously inside an event handler:</p>
                <pre>{`<Plot
    onInitialized={async (figure, graphDiv) => {
        console.log("Initialized:", figure, graphDiv)
        const Plotly = (await import("plotly.js")).default
        console.log("imported plotly.js!")
    }}
    data={[{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]}]}
    layout={ {width: 600, height: 400, title: 'A simple plot'} }
/>`}</pre>
                <p>following <a href={"https://nextjs.org/docs/advanced-features/dynamic-import#with-external-libraries"} target={"_blank"} >the &quot;external libraries&quot; example in the Next.js dynamic-imports documentation</a>.</p>
                <p>However, during the import, a <code>TypeError: str2arr is not a function</code> error is raised:</p>
                <p style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "854 / 716",
                }}>
                    <Image src={"/error.png"} alt={"Error screenshot"} fill />
                </p>
                <details><summary>Stack trace</summary>
                    <pre className={"code"}>{`
Uncaught (in promise) TypeError: str2arr is not a function
at eval (VM1676 avif.js:20:16)
at ./node_modules/probe-image-size/lib/parse_stream/avif.js (node_modules_plotly_js_lib_index_js.js:15212:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1675 parsers_stream.js:4:9)
at ./node_modules/probe-image-size/lib/parsers_stream.js (node_modules_plotly_js_lib_index_js.js:15432:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1674 stream.js:5:19)
at ./node_modules/probe-image-size/stream.js (node_modules_plotly_js_lib_index_js.js:15454:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1673 common.js:4:21)
at ./node_modules/probe-image-size/lib/common.js (node_modules_plotly_js_lib_index_js.js:15179:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1672 avif.js:13:21)
at ./node_modules/probe-image-size/lib/parse_sync/avif.js (node_modules_plotly_js_lib_index_js.js:15322:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1671 parsers_sync.js:5:9)
at ./node_modules/probe-image-size/lib/parsers_sync.js (node_modules_plotly_js_lib_index_js.js:15443:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1670 sync.js:4:15)
at ./node_modules/probe-image-size/sync.js (node_modules_plotly_js_lib_index_js.js:15465:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1669 helpers.js:3:17)
at ./node_modules/plotly.js/src/traces/image/helpers.js (node_modules_plotly_js_lib_index_js.js:12032:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1668 calc.js:8:21)
at ./node_modules/plotly.js/src/traces/image/calc.js (node_modules_plotly_js_lib_index_js.js:11988:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
at eval (VM1664 index.js:6:11)
at ./node_modules/plotly.js/src/traces/image/index.js (node_modules_plotly_js_lib_index_js.js:12054:1)
at options.factory (webpack.js?ts=1678066002993:713:31)
at __webpack_require__ (webpack.js?ts=1678066002993:37:33)
at fn (webpack.js?ts=1678066002993:368:21)
eval @ VM1676 avif.js:20
./node_modules/probe-image-size/lib/parse_stream/avif.js @ node_modules_plotly_js_lib_index_js.js:15212
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1675 parsers_stream.js:4
./node_modules/probe-image-size/lib/parsers_stream.js @ node_modules_plotly_js_lib_index_js.js:15432
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1674 stream.js:5
./node_modules/probe-image-size/stream.js @ node_modules_plotly_js_lib_index_js.js:15454
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1673 common.js:4
./node_modules/probe-image-size/lib/common.js @ node_modules_plotly_js_lib_index_js.js:15179
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1672 avif.js:13
./node_modules/probe-image-size/lib/parse_sync/avif.js @ node_modules_plotly_js_lib_index_js.js:15322
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1671 parsers_sync.js:5
./node_modules/probe-image-size/lib/parsers_sync.js @ node_modules_plotly_js_lib_index_js.js:15443
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1670 sync.js:4
./node_modules/probe-image-size/sync.js @ node_modules_plotly_js_lib_index_js.js:15465
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1669 helpers.js:3
./node_modules/plotly.js/src/traces/image/helpers.js @ node_modules_plotly_js_lib_index_js.js:12032
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1668 calc.js:8
./node_modules/plotly.js/src/traces/image/calc.js @ node_modules_plotly_js_lib_index_js.js:11988
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1664 index.js:6
./node_modules/plotly.js/src/traces/image/index.js @ node_modules_plotly_js_lib_index_js.js:12054
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1663 image.js:3
./node_modules/plotly.js/lib/image.js @ node_modules_plotly_js_lib_index_js.js:6092
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
eval @ VM1136 index.js:18
./node_modules/plotly.js/lib/index.js @ node_modules_plotly_js_lib_index_js.js:6103
options.factory @ webpack.js?ts=1678066002993:713
__webpack_require__ @ webpack.js?ts=1678066002993:37
fn @ webpack.js?ts=1678066002993:368
__webpack_require__.t @ webpack.js?ts=1678066002993:117
await in __webpack_require__.t (async)
figureCallback @ factory.js?0867:196
eval @ factory.js?0867:104
Promise.then (async)
updatePlotly @ factory.js?0867:95
componentDidMount @ factory.js?0867:119
commitLayoutEffectOnFiber @ react-dom.development.js?ac89:23305
commitLayoutMountEffects_complete @ react-dom.development.js?ac89:24688
commitLayoutEffects_begin @ react-dom.development.js?ac89:24674
commitLayoutEffects @ react-dom.development.js?ac89:24612
commitRootImpl @ react-dom.development.js?ac89:26823
commitRoot @ react-dom.development.js?ac89:26682
performSyncWorkOnRoot @ react-dom.development.js?ac89:26117
flushSyncCallbacks @ react-dom.development.js?ac89:12042
eval @ react-dom.development.js?ac89:25651`}</pre>
                </details>
                <p>Clicking through on the error shows this, from avif.js:</p>
                <p style={{ position: "relative", width: "100%", aspectRatio: "519 / 314", }}><Image src={"/avif.js.png"} alt={"avif.js imports and error line"} fill /></p>
                <details>
                    <summary>Excerpted code</summary>
                    <pre className={"code"}>{`// Utils used to parse miaf-based files (avif/heic/heif)
//
//  - image collections are not supported (only last size is reported)
//  - images with metadata encoded after image data are not supported
//  - images without any \`ispe\` box are not supported
//

'use strict';

/* eslint-disable consistent-return */


var ParserStream = require('../common').ParserStream;
var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;
var readUInt32BE = require('../common').readUInt32BE;
var miaf         = require('../miaf_utils');
var exif         = require('../exif_utils');

var SIG_FTYP = str2arr('ftyp');
`}</pre>
                </details>
                <p>This code appears to come from <a href={"https://github.com/nodeca/probe-image-size/blob/7.2.3/lib/parse_stream/avif.js#L1-L18"} target={"_blank"}><code>lib/parse_stream/avif.js</code> in nodeca/probe-image-size@7.2.3</a>.</p>
                <p>{`Why is this error occurring? Is something in the build/minification/code-splitting pipeline not including code that plotly.js needs (because it doesn't know it's being imported)?`}</p>
            </main>
        </div>
    )
}
