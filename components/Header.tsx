"use client"

import { useState } from 'react'
import { MessageCircle, Crown, User, HelpCircle,Menu } from 'lucide-react'
import ModeToggle from './light-switch'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import  Image  from 'next/image';


export default function SideNav() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const navIcons = [
    { icon: <MessageCircle className="h-6 w-6" />, label: 'Chat' },
    { icon: <Crown className="h-6 w-6" />, label: 'Premium' },
    { icon: <User className="h-6 w-6" />, label: 'Profile' },
    { icon: <HelpCircle className="h-6 w-6" />, label: 'Help' },
  ]

  return (
    <>
    <nav
      className="
        fixed left-0 top-0 z-50
        h-full w-[68px]
        bg-background
        border-r border-border/40
        md:flex flex-col items-center
        justify-between
        py-4
        hidden
        "
    >
      {/* Top Logo/Flower */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="h-8 w-8 bg-gradient-to-br rounded-full from-primary to-primary/60 flex items-center justify-center mb-2">
        <Image src="/logo.png" alt="logo-img" width={500} height={500} className='rounded-full object-contain'/>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-4 items-center">
        {navIcons.map((nav, idx) => (
          <button
            key={nav.label}
            onClick={() => setActiveIndex(idx)}
            className={`
              flex items-center justify-center w-10 h-10 rounded-lg
              ${activeIndex === idx ? 'bg-primary/20 text-primary' : 'text-primary/80'}
              hover:bg-primary/10 transition-colors
            `}
            aria-label={nav.label}
          >
            {nav.icon}
          </button>
        ))}
      </div>

      {/* Switch and Avatar Bottom */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <ModeToggle />
        <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
          {/* Replace src with your avatar */}
          <Image
            src="/logo.png"
            alt="User avatar"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </div>
    </nav>
    <div className="absolute top-0 right-0 p-4 hidden">
      {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-12 w-12 text-border" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              
              <div className="pt-4 border-t border-border space-y-3">
              </div>
            </div>
          </SheetContent>
        </Sheet> */}
               <ModeToggle/>
    </div>
        </>
  )
}