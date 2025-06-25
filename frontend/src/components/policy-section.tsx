import { TPolicySection } from '@/types'
import { FC } from 'react'

export const PolicySection: FC<{ section: TPolicySection }> = ({ section }) => (
  <div className="mb-8">
    <h2 className="mb-2 text-xl">{section.title}</h2>
    {section.subtitle && <p className="mb-2 font-light">{section.subtitle}</p>}
    {section.items && (
      <ul className="list-disc space-y-1 pl-6">
        {section.items.map((item, idx) =>
          typeof item === 'string' ? (
            <li key={idx} className="font-light">
              {item}
            </li>
          ) : (
            <li key={idx} className="mb-2">
              <PolicySection section={item} />
            </li>
          ),
        )}
      </ul>
    )}
  </div>
)
