import {motion} from "framer-motion";

const StepWrapper = ({children, stepKey}) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: .3}}
            key={stepKey}
        >
            {children}
        </motion.div>
    )
}

export default StepWrapper