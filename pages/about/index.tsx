import Router from "next/router"
import { MainLayout } from "../../components/MainLayout"
import classes from '../../styles/aboutIndex/index.module.scss'

export default function About () {

    const linkClickHandler = () => {
        Router.push('/')
    }
    return (
        <MainLayout title={"about page"}>

            <div className={classes.div}>
                <h1>Warning</h1>
                <h3>this page is a "page about..."</h3>
                <div className={classes.div_two}>
                    <button onClick={linkClickHandler} className={classes.button}>go back to home</button>
                    <button onClick={() => Router.push('/about/about')} className={classes.button}>go back to about/about</button>
                </div>
            </div>

        </MainLayout>
    )
}

// export async function RickAndMorty() {
//     const res = await fetch('https://rickandmortyapi.com/api/character')
//     const RiM = await res.json()
//     console.log(RiM, 'res rick and morty');
// }

About.getInitialProps = async () => {
    const response = await fetch('http://localhost:4200/about')
    const data = await response.json()

    return {
        title: data.title,
    }
}