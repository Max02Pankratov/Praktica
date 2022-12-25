import React from "react"
import Router from "next/router"
import {MainLayout} from '../../components/MainLayout'
import { useState, useEffect } from "react"
import Link from "next/link"
import {MyPost} from '../../interfaces/post'
import { NextPageContext } from "../../node_modules/next/dist/shared/lib/utils"
import classes from '../../styles/postsIndex/index.module.scss'




interface PostsPageProps {
    posts: MyPost []
}

export default function Posts ({posts: serverPosts}: PostsPageProps) {

    const [posts, setPosts] = useState(serverPosts)
    useEffect( () => {
        async function load() {
            const response = await fetch('http://localhost:4200/posts')
            // парсим объект
            const json = await response.json()
            // передаем объект
            setPosts(json)
        }
        if (!serverPosts) {
            load()
        }
    }, [])

    if (!posts) {
        return <MainLayout title={'post page'}>
            <p className="ellips">Loading...</p>
            <style jsx>{`
                .ellips {
                    background-color: lightgray;
                    text-align: center;
                    font-size: 32px;
                }
            `}</style>
        </MainLayout>
    }

    return <MainLayout title={'Posts page'}>
        <div className={classes.div}>
            <h1>Post page</h1>
            <button onClick={() => Router.push("/")} className={classes.button}>go to home page</button>
            <ul>
                {posts.map(post => (
                    <div>
                        {/* // ${post.id} */}
                        <li key={post.id} className={classes.li}>
                            <Link href={`/post/[id]`} as={`/post/${post.id}`}><a>{post.title}</a></Link>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    </MainLayout>
}

Posts.getInitialProps = async ({req}: NextPageContext) => {
    if (!req) {
        return {posts: null}
    }
    const response = await fetch('http://localhost:4200/posts')
    const posts: MyPost[] = await response.json()
    // возвращаем объект
    return {
        posts
    }
}