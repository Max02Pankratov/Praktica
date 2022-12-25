import Router, { useRouter } from 'next/router'
import {MainLayout} from '../../components/MainLayout'
import { useEffect, useState } from 'react'
import { NextPageContext } from '../../node_modules/next/dist/shared/lib/utils'
import { MyPost } from '../../interfaces/post'
import { async } from '@firebase/util'


interface PostPageProps {
    post: MyPost
}

export default function Post ({post: serverPost}: PostPageProps) {

    const [post, setPost] = useState(serverPost)
    // подгружаем данные через фронтенд
    const router = useRouter()

    useEffect( () => {
        async function load() {
            const response = await fetch(`http://localhost:4200/posts/${router.query.id}`)
            const data = await response.json()
            setPost(data)
        }

        // если с сервера прилетел null, то делаем загрузку на фронтенде
        if (!serverPost) {
            load()
        }

    }, [])

    if (!post) {
        return <MainLayout title={'id post page'}>
            <p>Loading...</p>
        </MainLayout>
    }

    return (
        <MainLayout title={'id post page'}>
            <div>
                <h1>{post.title}</h1>
                <hr/>
                <p>{post.body}</p>
                <br/>
                <button onClick={() => Router.push('/')}>go to home page</button>
                <button onClick={() => Router.push('/post')}>go to post page</button>
            </div>
            <style jsx>{`
                button {
                    background-color: black;
                    color: white;
                    padding: 15px;
                    margin: 5px;
                    border-radius: 10px;
                    cursor: pointer;
                }
                button:hover {
                    transform: scale(1.2);
                    transition: 0.5s;
                }
                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: lightgray;
                }
            `}</style>
        </MainLayout>
    )
}
// ! метод номер один (устаревший) | используется для комбинации фронта и бэка
// Post.getInitialProps = async ({query, req}) => {
//     if (!req) {
//         return {post:null}
//     }
//     const response = await fetch(`http://localhost:4200/posts/${query.id}`)
//     const post = await response.json()
//     // возвращаем объект
//     return {
//         post
//     }
// }

interface PostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

// ! метод номер два (современный) | лучше подходит для SSR
// ! главное отличие: функция вызывается на серверной составляющей

export async function getServerSideProps ({query}: NextPageContext) {
    const response = await fetch(`http://localhost:4200/posts/${query.id}`)
    const post: MyPost = await response.json()
    return {props: {post}}
}







// export async function getStaticPaths({query}: NextPageContext) {
//     const response = await fetch(`http://localhost:4200/posts/${query.id}`)
//     const id: MyPost = await response.json()
//     console.log(id,'id');
    
//     return {
//         paths: [
//             {
//                 params: {id: '1'}
//             },
//             {
//                 params: {id: '2'}
//             },
//             {
//                 params: {id: '3'}
//             },
//             {
//                 params: {id: '4'}
//             },
//             {
//                 params: {id: '5'}
//             },
//             {
//                 params: {id: '6'}
//             }
//         ],
//         follback: true
//     }
// }