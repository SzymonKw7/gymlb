import {motion} from "framer-motion";

function AnimatedMain({children, ...props}) {
    return <motion.main {...props} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        {children}
    </motion.main>
}

export default AnimatedMain;