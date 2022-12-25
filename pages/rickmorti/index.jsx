import { useEffect } from 'react'
import { useState } from 'react'
import {motion} from 'framer-motion'
import {MainLayout} from '../../components/MainLayout'
import classes from '../../styles/rickmorti/index.module.scss'
import Link from 'next/link'


const defaultEndpoint = "https://rickandmortyapi.com/api/character"

export async function getServerSideProps () {
    const res = await fetch(defaultEndpoint)
    const data = await res.json()
    return{
        props: {
            data
        }
    }
}

export default function RickAndMorty ({data}) {
    const {info, results: defaultResults = []} = data;
    const [results, updateResults] = useState(defaultResults)
    const [page, updatePage] = useState({
        ...info,
        current: defaultEndpoint
    })

    const {current} = page
    useEffect(() => {
        if (current === defaultEndpoint) return;

        async function request() {
            const res = await fetch (current)
            const nextData = await res.json()


            updatePage({
                current,
                ...nextData.info
            })
            console.log(!nextData.info?.prev)

            if ( !nextData.info?.prev) {
                updateResults(nextData.results)
                return;
            }

            updateResults(prev => {
                return [
                    ...prev,
                    ...nextData.results
                ]
            })

        }
        request();
    },[current])
    // подгружает контент с других страниц
    function handleLoadMore() {
        updatePage(prev => {
            return {
                ...prev,
                current: page?.next
            }
        })
    }
    // поиск по имени персонажа
    function handleOnSubmitSearch(e) {
        e.preventDefault();

        const { currentTarget = {} } = e;
        const fields = Array.from(currentTarget?.elements)
        const fieldQuery =  fields.find(field => field.name === "query")
        
        const value = fieldQuery.value || ''
        const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

        updatePage ({
            current: endpoint 
        })
    }

    return (
        <MainLayout title="Rick and Morty">
            <div className={classes.full}>
                <motion.div initial="hidden" animate="visible" variants={{
                    hidden: {
                        scale: .4,
                        opaciti: 0
                    },
                    visible: {
                        scale: 1.4,
                        opacity: 1,
                        transition: {
                            delay: .6
                        }
                    }
                }}>
                <h1>Rick and Morty</h1>
                <h3>Wubba Lubba Dub dub!</h3>
                </motion.div>
            <div>

                <form className={classes.search} onSubmit={handleOnSubmitSearch}>
                    <input name='query' type="search" placeholder='поиск персонажей' className={classes.input}/>
                    <button className={classes.button}>Search</button>
                </form>

                    <ul className={classes.grid}>
                        {results.map(result =>{
                            const {id, name, image} = result

                            return (
                                <motion.li key={id} className={classes.card} whileHover={{
                                    scale: 1.1,
                                    transition: {
                                        duration: .2
                                    },
                                    rotate: [0, 10, -10, 0],
                                    // ! вращаем оттенки 
                                    filter: [
                                        'hue-rotate(0) contrast(100%)',
                                        'hue-rotate(360deg) contrast(200%)',
                                        'hue-rotate(45deg) contrast(300%)',
                                        'hue-rotate(0) contrast(100%)'
                                    ],
                                }}>
                                    <motion.div 
                                    initial = {{x: '-100vw'}}
                                    animate = {{x:0}}
                                    transition = {{type: 'spring', duration: 1, bounce: 0.6}}
                                    >
                                        <Link href="/rickmorti/[id]" as={`/rickmorti/${id}`}><a>
                                            <img src={image} alt={`${name} Thumb`}/>
                                            <h3>{name}</h3>
                                        </a></Link>
                                    </motion.div>
                                </motion.li>
                            )
                        })}
                    </ul>

                    <p className={classes.buttonCentr}>
                        <button onClick={() => handleLoadMore()} className={classes.loading}>Load More</button>
                    </p>

                </div>
            </div>
        </MainLayout>
    )
}