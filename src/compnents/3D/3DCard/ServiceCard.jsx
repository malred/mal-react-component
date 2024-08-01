// 可翻转卡片
import {fadeIn} from "../../../utils/motion.js";
import Tilt from "react-tilt";
import {motion} from "framer-motion";

const ServiceCard = ({index, title, icon, bg, className, size, ...rest}) => {
    let cardClass = ''
    let topClass = ''

    switch (size) {
        case 'lg':
            cardClass += 'min-h-[420px]'
            topClass += 'w-[360px]'
            break
        case 'md':
            cardClass += 'min-h-[280px]'
            topClass += 'w-[240px]'
            break
        case 'sm':
            cardClass += 'min-h-[140px]'
            topClass += 'w-[120px]'
            break
        default:
            cardClass += 'min-h-[280px]'
            topClass += 'w-full'
            break
    }

    return (
        <Tilt className={`${topClass}`}>
            <motion.div
                variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
                className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
            >
                <div
                    options={{
                        max: 45,
                        scale: 1,
                        speed: 450,
                    }}
                    className={`${bg ? bg : "bg-tertiary"} ${cardClass} ${className} rounded-[20px] py-5 px-12 flex justify-evenly items-center flex-col`}
                >
                    <img src={icon} alt="title" className="w-16 h-16 object-contain"/>
                    <h3 className="text-white text-[20px] font-bold text-center">
                        {title}
                    </h3>
                </div>
            </motion.div>
        </Tilt>
    );
};

export default ServiceCard