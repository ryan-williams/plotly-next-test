import React from 'react';
import styles from '../styles/Home.module.css'
import Image from "next/image";
import common from "probe-image-size/lib/common"

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1><a href="https://nextjs.org">next.js</a> / <a href={"https://www.npmjs.com/package/probe-image-size"}>probe-image-size</a> issue</h1>
                <p>This example attempts an import from <code>probe-image-size</code>:</p>
                <pre>{`import common from "probe-image-size/lib/common"`}</pre>
                <p>This throws a <code>TypeError: str2arr is not a function</code> error from <a href={"https://github.com/nodeca/probe-image-size/blob/7.2.3/lib/parse_stream/avif.js#L20"} target={"_blank"}>this line in <code>nodeca/probe-image-size@7.2.3/lib/parse_stream/avif.js</code></a>.</p>
                <p style={{ position: "relative", width: "100%", aspectRatio: "735 / 378", }}>
                    <Image src={"/probe-image-import-error.png"} alt={"Error screenshot"} fill />
                </p>
                <p>This is also the cause of the error importing plotly.js in <a href={"./to-image"}>/to-image</a>.</p>
            </main>
        </div>
    )
}
