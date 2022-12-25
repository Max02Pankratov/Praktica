import Head from "next/head"
import Router from "next/router"

export function MainLayout ({children, title}) {
    return(
        <>
        <Head>
            <title> {title} | Next</title>
            <meta name='keywords' content='next, javaScript, react'/>
            <meta name='description' content='this is youtube tutorial about Next.js'/>
            <meta charSet='utf-8'/>
        </Head>
            <nav>
                <button onClick={() => Router.push("/")}>HOME</button>
                <button onClick={() => Router.push("/about")}>ABOUT</button>
                <button onClick={() => Router.push("/post")}>POST</button>
                <button onClick={() => Router.push("/rickmorti")}>Rick And Morty</button>
                <button onClick={() => Router.push("/article")}>ARTICLE</button>
                <button onClick={() => Router.push("/blogs")}>BLOGS</button>
                <button onClick={() => Router.push("/account")}>ACCOUNT</button>
                <button onClick={() => Router.push("/lending")}>TEST CSS</button>
            </nav>

            <main>
                {children}
            </main>

        <footer>
            <div className="footer">
                <div className="footer__grid">
                    <p>FOOTER NEXT</p>
                    <p>FOOTER NEXT</p>
                    <p>FOOTER NEXT</p>
                    <p>FOOTER NEXT</p>
                    <p>FOOTER NEXT</p>
                    <p>FOOTER NEXT</p>
                    <p>FOOTER NEXT</p>
                    <p>FOOTER NEXT</p>  
                </div>
            </div>
        </footer>

            <style jsx>{`
                nav {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    background: black;
                    padding: 10px;
                }
                nav button {
                    background: red;
                    border: none;
                    padding: 20px;
                    cursor: pointer;
                    border: 1px solid black;
                    border-radius: 10px;
                    margin: 10px;
                    font-size: 24px;
                }
                nav button:hover {
                    transform: scale(1.2);
                    transition: 0.3s;
                }
                .footer {
                    display: flex;
                    justify-content: center;
                    background-color: black;
                }
                .footer__grid {
                    color: white;
                    font-size: 22px;
                    display: grid; 
                    grid-template-columns: 1fr 1fr 1fr 1fr; 
                    grid-template-rows: 1fr 1fr; 
                    gap: 1em 1em; 
                    grid-template-areas: 
                        ". . . ."
                        ". . . ."; 
                }
            `}</style>
        </>
    )
}