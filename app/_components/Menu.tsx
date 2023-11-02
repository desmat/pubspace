'use client'

// adapted from https://tailwindui.com/components/application-ui/elements/dropdowns

import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { BsClipboardFill, BsFillPlusCircleFill, BsLightningFill } from 'react-icons/bs'
import classNames from '@/utils/classNames'
import NavLink from './NavLink'
import PostNavLink from './PostNavLink'

export default function Nav() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full -ml-8 text-slate-300 hover:text-slate-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -left-12 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" >
            <Menu.Item>
              {({ active, close }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <NavLink href="/feed" className="_bg-pink-300" menu={true} onClick={close}>
                    <BsLightningFill className="my-auto text-right" />
                    <div className="my-auto">Feed</div>
                  </NavLink>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active, close }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <NavLink href="/posts" className="_bg-pink-300" menu={true} onClick={close}>
                    <BsClipboardFill className="my-auto" />
                    <div className="my-auto">Board</div>
                  </NavLink>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active, close }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <PostNavLink className="_bg-pink-300" menu={true} onClick={close}>
                    <BsFillPlusCircleFill className="my-auto" />
                    <div className="my-auto">Post</div>
                  </PostNavLink>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
