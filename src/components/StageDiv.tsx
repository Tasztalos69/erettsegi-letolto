import { motion } from "framer-motion";

const StageDiv = (props: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0, duration: 0.2 }}
    {...props}
  />
);

export default StageDiv;
