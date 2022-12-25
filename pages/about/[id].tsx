import {useRouter} from 'next/router'
import Router from 'next/router'
import {MainLayout} from '../../components/MainLayout'
import classes from '../../styles/postsIndex/index.module.scss'



export default function About () {
    const router = useRouter()
    console.log(router)
    return (
        <MainLayout title={'about/about page'}>

            <div className={classes.div}>
                <p>text {router.query.id}</p>
                <div className={classes.div_two}>
                    <button onClick={() => Router.push('/')} className={classes.button}>go to home page</button>
                    <button onClick={() => Router.push('/post')} className={classes.button}>go to post page</button>
                </div>
            </div>

        </MainLayout>
    )
}