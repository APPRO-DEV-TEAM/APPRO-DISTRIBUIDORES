import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalRoot: React.FC<ModalRootProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-[90vw] relative "
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
              onClick={onClose}
            >
              <XIcon />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};