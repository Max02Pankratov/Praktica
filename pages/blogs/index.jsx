import {MainLayout} from '../../components/MainLayout'
import Link from 'next/link'
import classes from '../../styles/blogs/index.module.scss'

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    console.log(data, 'data_data_api')
    return {
        props: {
            data, 
        }
    }
}

const blogs = ({data}) => {
    return (
        <MainLayout title={'blog page'}>
            {data.slice(0.5).map((data) => {
                return (
                    <div className={classes.div}>
                        <div key={data.id} >
                            <div className={classes.link}>
                            <span id={classes.span}>{data.id}</span>
                                <Link href={`/blogs/${data.id}`}>
                                    <p className={module.p}>{data.title}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </MainLayout>
    )
}

export default blogs