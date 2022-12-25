import React, {useEffect, useState} from "react";
import { MainLayout } from "../../components/MainLayout";
import axios from "axios";
import classes from '../../styles/article/index.module.scss'


export default function Article() {

    const [photos, setPhotos] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    // принимает true, когда загружаются данные (от запроса, до ответа)
    const [fetching, setFetching] = useState(true)

    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {

        if (fetching) {
            console.log('fetching отрабатывается и данные подгружаются')
            axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=30&_page=${currentPage}`)
                .then(response => {
                    setPhotos([...photos, ...response.data])
                    setCurrentPage(prevState => prevState + 1)
                    setTotalCount(response.headers[`x-total-count`])
                })
            .finally(() => setFetching(false))
        }
    }, [fetching])
    console.log(photos, 'res')

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        // вызовется при демонтаже компоненты, в ней очищается слушатель события
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    })

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)<100 && photos.length < totalCount) 
        {
            setFetching(true)
        }
    }

    return (
        <MainLayout title={'infynite scroll'}>
            <div className={classes.div}>
                {photos.map(photo => 
                    <div className={classes.divTwo} key={photo.id} >
                        <div className={classes.text}>{photo.id}. {photo.title}</div>
                        <div><img src={photo.thumbnailUrl} width={100} alt="icons" className={classes.image} /></div>
                    </div>
                )}
            </div>
        </MainLayout>)
}