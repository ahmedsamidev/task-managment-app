"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-gray-600">{children}</div>
        <DialogFooter className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
