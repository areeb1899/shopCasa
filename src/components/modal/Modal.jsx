import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Modal({ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="text-center rounded-lg font-bold">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-[#B3997F] py-2 text-center rounded-lg text-white font-bold hover:bg-[#86735f]"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment} className="mt-5">
                <Dialog as="div" className="relative z-10 mt-4" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left mt-10 align-middle shadow-xl transition-all bg-white">
                                    <section className="bg-[#F8F4F1] p-6 rounded-lg shadow-md">
                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-2xl font-bold mb-6 text-[#746353]">Complete Your Order</h2>
                                            <form className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                                                    <input
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        type="text" name="name" id="name"
                                                        className="border border-gray-300 rounded-lg p-2 w-52 bg-gray-100 focus:outline-none focus:ring-[#B3997F] focus:border-[#B3997F]"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                                                    <input
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        type="text" name="address" id="address"
                                                        className="border border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-[#B3997F] focus:border-[#B3997F]"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-700">Pincode</label>
                                                    <input
                                                        value={pincode}
                                                        onChange={(e) => setPincode(e.target.value)}
                                                        type="text" name="pincode" id="pincode"
                                                        className="border border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-[#B3997F] focus:border-[#B3997F]"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                                                    <input
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        type="text" name="phoneNumber" id="phoneNumber"
                                                        className="border border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-[#B3997F] focus:border-[#B3997F]"
                                                        required
                                                    />
                                                </div>
                                            </form>
                                            <button
                                                onClick={() => { buyNow(); closeModal() }}
                                                type="button"
                                                className="mt-4 w-full bg-[#B3997F] text-white font-bold py-2 rounded-lg hover:bg-[#86735f] focus:outline-none focus:ring-2 focus:ring-[#B3997F]"
                                            >
                                                Order Now
                                            </button>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
