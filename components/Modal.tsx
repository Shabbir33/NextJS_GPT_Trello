"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FormEvent, Fragment, useRef, useState } from "react";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

const Modal = () => {
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const [newTaskInput, setNewTaskInput, image, setImage, addTask, newTaskType] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
      state.addTask,
      state.newTaskType,
    ]);

  const [isOpen, openModal, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.openModal,
    state.closeModal,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    // Add Task
    addTask(newTaskInput, newTaskType, image);

    setImage(null);
    closeModal();
  };

  return (
    <>
      {/* <button onClick={openModal}>Open dialog</button> */}
      {/* Use the `Transition` component at the root level */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="form"
          onSubmit={handleSubmit}
          onClose={closeModal}
          className="relative z-50"
        >
          {/*
            Use one `TransitionChild` to apply one transition
            to the backdrop...
          */}

          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </TransitionChild>

          {/*
            ...and another `TransitionChild` to apply a separate
            transition to the contents.
            */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 pb-2"
                    >
                      Add a Task
                    </DialogTitle>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={newTaskInput}
                        onChange={(e) => setNewTaskInput(e.target.value)}
                        placeholder="Enter a task here ..."
                        className="w-full border border-gray-300 rounded-md outline-none p-5"
                      />
                    </div>

                    {/* Radio Group */}
                    <TaskTypeRadioGroup />

                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          imagePickerRef.current?.click();
                        }}
                        className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                        Upload Image
                      </button>

                      {image && (
                        <Image
                          alt="Uploaded Image"
                          width={200}
                          height={200}
                          className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                          src={URL.createObjectURL(image)}
                          onClick={() => {
                            setImage(null);
                          }}
                        />
                      )}
                      <input
                        type="file"
                        ref={imagePickerRef}
                        hidden
                        onChange={(e) => {
                          // check e is an Image
                          if (!e.target.files![0].type.startsWith("image/"))
                            return;
                          setImage(e.target.files![0]);
                        }}
                      />

                      <div>
                        <button
                          type="submit"
                          disabled={!newTaskInput}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed mt-2"
                        >
                          Add Task
                        </button>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
