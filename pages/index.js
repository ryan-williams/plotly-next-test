import React, {useState} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export default function Home() {
    const [ firstRenderTime, _ ] = useState(new Date())
    const [ plotInitializedTime, setPlotInitializedTime ] = useState(null)
    const delayMs = firstRenderTime && plotInitializedTime && (plotInitializedTime - firstRenderTime)
    return (
        <div className={styles.container}>
            <Head><title>next.js + react-plotly.js example</title></Head>
            <main className={styles.main}>
                <h1 className={styles.title}><a href="https://nextjs.org" target={"_blank"}>next.js</a> + <a href={"https://plotly.com/javascript/react/"} target={"_blank"}>react-plotly.js</a> example</h1>
                <Plot
                    onInitialized={(figure, graphDiv) => {
                        setPlotInitializedTime(new Date())
                        console.log("Initialized:", figure, graphDiv)
                    }}
                    data={[
                        { type: 'scatter', x: [1, 2, 3], y: [2, 6, 3], mode: 'lines+markers', marker: {color: 'red'} },
                        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width: 600, height: 400, title: 'A react-plotly.js plot'} }
                />
                {delayMs && <p>Time from first render to plot initialized: <strong>{delayMs}ms</strong></p>}
                <p>
                    plotly.js (and therefore react-plotly.js) can't render server-side (<a href={"https://github.com/plotly/plotly.js/issues/5361"} target={"_blank"}>plotly.js#5361</a>, <a href={"https://github.com/plotly/react-plotly.js/issues/21"} target={"_blank"}>react-plotly.js#21</a>), so the above uses <a href={"https://nextjs.org/docs/advanced-features/dynamic-import"} target={"_blank"}>next/dynamic</a> to disable importing <code>react-plotly.js</code> on the server:
                </p>
                <pre className={"code"}>{`const Plot = dynamic(() => import("react-plotly.js"), {ssr: false,})`}</pre>
                <p>This works, but it means the plot appeared on the page ≈{delayMs ? delayMs / 1000 : `…`}s after the initial page render, which is not ideal.</p>
                <p>Furthermore, importing plotly.js this way doesn't work (e.g. for accessing <a href={"https://plotly.com/javascript/static-image-export/"} target={"_blank"}>static image export functionality</a>); see <a href={"./to-image"}>/to-image</a>.</p>
            </main>
        </div>
    )
}
