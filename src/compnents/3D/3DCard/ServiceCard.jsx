// 可翻转卡片
import { fadeIn } from "../../../utils/motion.js";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

const ServiceCard = ({ index, title, icon, bg, className, size, ...rest }) => {
    let cardClass = ''
    let topClass = ''
    let iconClass = ''
    let fontClass = ''

    switch (size) {
        case 'lg':
            cardClass += ' min-h-[420px] py-8 px-14'
            topClass += ' w-[360px] '
            iconClass += '  w-24 h-24 '
            fontClass += ' text-[24px] '
            break
        case 'md':
            cardClass += ' min-h-[280px] py-5 px-12'
            topClass += ' w-[240px] '
            iconClass += '  w-20 h-20 '
            fontClass += ' text-[20px] '
            break
        case 'sm':
            cardClass += ' min-h-[140px] py-3 px-8'
            topClass += 'w-[120px]'
            iconClass += '  w-16 h-16 '
            fontClass += ' text-[16px] '
            break
        default:
            cardClass += ' min-h-[280px] py-5 px-12'
            topClass += 'w-full xs:w-[250px]'
            iconClass += '  w-16 h-16 '
            fontClass += ' text-[20px] '
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
                    className={`${bg ? bg : "bg-tertiary"} ${cardClass} ${className} rounded-[20px] flex justify-evenly items-center flex-col`}
                >
                    <img src={icon} alt="title" className={`${iconClass} object-contain`} />
                    <h3 className={`text-white ${fontClass} font-bold text-center`}>
                        {title}
                    </h3>
                </div>
            </motion.div>
        </Tilt>
    );
};

export default ServiceCard