'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Define a proper type for user instead of using 'any'
interface User {
  id?: string
  name?: string
  email?: string
  // Add other user properties as needed
}

interface SiderbarProps {
  user: User
}

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar" style={{
      background: '#040136'
      
    }}>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image 
            src="/icons/linara.png"
            width={34}
            height={34}
            alt="Colfi logo"
            className="size-[24px] max-xl:size-14"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <h1 className="sidebar-logo" style={{ 
            color: 'white',
            fontWeight: '700',
            fontSize: '24px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Colfi
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
          
          return (
            <Link 
              href={item.route} 
              key={item.label}
              className={cn('sidebar-link', {
                'bg-white bg-opacity-20 backdrop-blur-sm border-l-4 border-white': isActive
              })}
              style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                color: isActive ? '#1e293b' : 'white',
                borderRadius: '12px',
                margin: '4px 8px',
                padding: '12px 16px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translateX(0px)'
                }
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '4px',
                  backgroundColor: 'white',
                  borderRadius: '0 4px 4px 0'
                }}></div>
              )}
              
              <div className="relative size-6">
                <Image 
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  style={{
                    filter: isActive 
                      ? 'brightness(0) saturate(100%) invert(19%) sepia(17%) saturate(1796%) hue-rotate(186deg) brightness(94%) contrast(89%)'
                      : 'brightness(0) invert(1)',
                    transition: 'filter 0.3s ease'
                  }}
                />
              </div>
              
              <p style={{
                color: isActive ? '#1e293b' : 'white',
                fontWeight: isActive ? '600' : '500',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                textShadow: isActive ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}>
                {item.label}
              </p>
              
              {/* Subtle shine effect on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                transition: 'left 0.6s ease'
              }} className="shine-effect"></div>
            </Link>
          )
        })}
        
      </nav>

      <style jsx>{`
        .sidebar-link:hover .shine-effect {
          left: 100%;
        }
        
        .sidebar {
          position: relative;
        }
        
        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }
      `}</style>
    </section>
  )
}

export default Sidebar