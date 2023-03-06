import React from 'react';
import styles from '../styles/Home.module.css'
import common from "probe-image-size/lib/common"

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}><a href="https://nextjs.org">next.js</a> / <a href={"https://www.npmjs.com/package/probe-image-size"}>probe-image-size</a> issue</h1>
                <p>This example attempts an import from <code>probe-image-size</code>, that seems to cause issues importing plotly.js in <a href={"./to-image"}>/to-image</a>:</p>
                <pre>{`import common from "probe-image-size/lib/common"`}</pre>
                <p>The same error is hit on initial page load here (even though the import is unused):</p>
            </main>
        </div>
    )
}
