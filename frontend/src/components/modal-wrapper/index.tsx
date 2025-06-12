"use client";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export function ModalWrapper({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="z-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute backdrop-blur-sm bg-black/20 w-full h-full"
          />
          <motion.div
            className={`rounded-xl z-10 p-[24px] bg-white shadow-lg max-h-screen overflow-y-auto overflow-x-hidden`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
