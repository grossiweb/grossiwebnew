'use client';

import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      nodes {
        id
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        customFields {
          clientLogo
          clientUrl
        }
      }
    }
  }
`;

// Fallback client logos (keeping existing ones as backup)
const fallbackLogos = [
  '/images/logos/buckhead.png',
  '/images/logos/eastman.png',
  '/images/logos/ebay.png',
  '/images/logos/jj.png',
  '/images/logos/reviewsright.png',
  '/images/logos/sugercoat.png',
  '/images/logos/ultramet.png'
];

const SCROLL_SPEED = 0.5; // pixels per frame (~30px/s at 60fps)

export default function ClientsSection() {
  const { data } = useQuery(GET_CLIENTS, {
    errorPolicy: 'ignore',
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  const clientLogos: string[] = data?.clients?.nodes?.map((client: any) =>
    client.customFields?.clientLogo || client.featuredImage?.node?.sourceUrl
  ).filter(Boolean) || fallbackLogos;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId: number;

    const step = () => {
      const halfWidth = el.scrollWidth / 2;
      offsetRef.current += SCROLL_SPEED;
      if (offsetRef.current >= halfWidth) {
        offsetRef.current -= halfWidth;
      }
      el.style.transform = `translateX(-${offsetRef.current}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [clientLogos]);

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-4 inline-block"
          style={{color: '#191e4e'}}
        >
          Our Clients
        </h2>
        <p className="text-sm md:text-base mb-12 text-gray-600">
          From world leading brands to local super stars.
        </p>

        {/* Client Logos */}
        <div className="bg-white">
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex space-x-8 md:space-x-16 items-center will-change-transform"
            >
              {clientLogos.concat(clientLogos).map((logo: string, index: number) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center h-24">
                  <img
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="max-h-20 w-auto opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}