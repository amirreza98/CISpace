import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import LayoutView from '../components/LayoutView';


function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-12">
      {/* Left Section */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight md:mb-24">
          LET'S <br />  HAVE A <span className=' text-emerald-900'>COFFEE. </span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-md">
          discover your perfect area to boost your creativity.{" "}
          <span className="font-semibold text-gray-800"> <br />have fun</span> and define
          your own style.
        </p>
        <button className="mt-8 bg-emerald-900 hover:bg-yellow-500 text-ray-900 px-6 py-3 rounded-xl font-semibold shadow-md transition">
          Book A Space
        </button>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="p-6 max-w-96 drop-shadow-2xl rounded-xl transition hover:scale-105 duration-500 drop-shadow-emerald-800 hover:bg-white/15 backdrop-blur-lg">
            <LayoutView />
        </div>
      </motion.div>
    </div>
  )
}

export default Home