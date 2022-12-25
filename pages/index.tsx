import Link from 'next/link'
import classes from '../styles/index/index.module.scss'
import { MainLayout } from '../components/MainLayout'


export default function Index () {
    return <MainLayout title={'Home page'}>
        <div className={classes.div}>
            <h1>hello, Next.js</h1>
            <h2>Royal page</h2>
            <p className={classes.page}>Next.js это полнофункциональный фреймворк на основе React. В отличие от традиционного приложения react, которое загружает и отображает все приложение на клиенте, Next.js позволяет серверу отображать загрузку первой страницы, что отлично подходит для SEO и повышения производительности. <br/>
                Некоторые из ключевых особенностей Next.js являются:<br/><br/>
                🖤 Рендеринг на стороне сервера<br/>
                🖤 Оптимизация изображения<br/>
                🖤 Статическая генерация сайта<br/>
                🖤 Постепенная регенерация сайта.</p>
            <div className={classes.div_two}>
            <Link href="about"><a className={classes.a}>page about</a></Link><br/>
            <Link href="post"><a className={classes.a}>post page</a></Link>
            </div>
        </div>
    </MainLayout> 
// гет статик пас для каталога
// гет статик пропс для странмцы
}