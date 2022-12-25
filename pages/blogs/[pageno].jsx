import React from 'react'
import { MainLayout } from '../../components/MainLayout'
import classes from '../../styles/blogs/index.module.scss'

export async function getStaticPaths () {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    const paths = data.map((curElem) => {
        return {
            params: {pageno: curElem.id.toString()}
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.pageno
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json()
    console.log(data, 'data_data_api')
    return {
        props: {
            data 
        }
    }
}

const myData = ({data}) => {
    const {id, title, body} = data
    return (
            <MainLayout>
            <h3>
                <div key={id} className={classes.divTwo}>
                    <h3 className={classes.hp3}>{id}</h3>
                    <h2>{title}</h2>
                    <p className={classes.pp}>{body}</p>
                </div>
            </h3>
        </MainLayout>
    )
}

export default myData
