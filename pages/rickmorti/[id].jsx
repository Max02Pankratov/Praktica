import Link from 'next/link'
import {MainLayout} from '../../components/MainLayout'
import classes from '../../styles/rickmorti/index.module.scss'
import {motion} from 'framer-motion'




const defaultEndpoint = "https://rickandmortyapi.com/api/character"

export async function getServerSideProps ({query}) {
    const {id} = query
    const res = await fetch(`${defaultEndpoint}/${id}`)
    const data = await res.json()
    return{
        props: {
            data
        }
    }
}

export default function Character ({data}) {
    const {name, image, gender, location, origin, species, status} = data
    return (
        <MainLayout title="Rick and Morty">
            <h3 className={classes.centr}>Wubba Lubba Dub dub!</h3>
            <div className={classes.centrT}><h1>Детали персонажа:</h1></div>
            <div className={classes.fullSecond}>

                <motion.div className={classes.left} whileHover={{
                                    scale: 1.3,
                                    transition: {
                                        duration: .2
                                    },
                                    rotate: [0, 20, -20, 0],
                                    // ! вращаем оттенки 
                                    filter: [
                                        'hue-rotate(0) contrast(100%)',
                                        'hue-rotate(360deg) contrast(200%)',
                                        'hue-rotate(45deg) contrast(300%)',
                                        'hue-rotate(0) contrast(100%)'
                                    ]
                                }}>
                    <img src={image}/>
                </motion.div>

                <div className={classes.right}>
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
                        },
                        color: 'red'
                    }
                }}>
                        <h1>
                            <strong>
                                {name}
                            </strong>
                        </h1>
                    </motion.div>
                    <div>
                        <strong className={classes.strong}>Status:</strong> {status}
                    </div>
                    <div>
                        <strong className={classes.strong}>Gender:</strong> {gender}
                    </div>
                    <div>
                        <strong className={classes.strong}>Species:</strong> {species}
                    </div>
                    <div>
                        <strong className={classes.strong}>Location:</strong> {location?.name}
                    </div>
                    <div>
                        <strong className={classes.strong}>Origin:</strong> {origin?.name}
                    </div>
                </div>
            </div>
            <div className={classes.bottom}>
                <Link href="/rickmorti"><a className={classes.buttonBottom}>Вернуться к персонажам</a></Link>
            </div>
        </MainLayout>
    )
}