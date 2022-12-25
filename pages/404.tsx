import Router from "next/router"
import classes from '../styles/error/error.module.scss'


export default function Error () {
    return (
        <>
            <div className={classes.error}> 
                <h1 className={classes.header}>Error 404(</h1>
                <button onClick={() => Router.push('/')} className={classes.button}>Пора вернуться на главную страницу...</button>
            </div>
        </>
    )
}