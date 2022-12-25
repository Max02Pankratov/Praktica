import '../styles/_app/_app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NextNprogress from 'nextjs-progressbar'
import Navbar from '../components/Navbar'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import {motion, AnimatePresence} from 'framer-motion'

const noAuthRequired = ['/', '/auth/login', '/auth/signup']

function MyApp({ Component, pageProps, router }: AppProps) {
    const Router = useRouter()

    return ( 
        <AuthContextProvider>
            <Navbar />
            {noAuthRequired.includes(Router.pathname) ? (
                <Component {...pageProps} />
            ) : (
                <ProtectedRoute>

            <NextNprogress
                color="red"
                startPosition={0.9}
                stopDelayMs={200}
            />

                <AnimatePresence>
                    <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
                        pageInitial: {
                            opacity: 0
                        },
                        pageAnimate: {
                            opacity: 1
                        },
                        pageExit: {
                            backgroundColor: 'white',
                            filter: `invert()`,
                            opacity: 0
                        }
                    }}>
                        <Component {...pageProps}/>
                    </motion.div>
                </AnimatePresence>
                </ProtectedRoute>
            )}
        </AuthContextProvider>
    )
}

export default MyApp
