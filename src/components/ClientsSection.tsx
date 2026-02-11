'use client';

import React from 'react';
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

export default function ClientsSection() {
  const { data, loading, error } = useQuery(GET_CLIENTS, {
    errorPolicy: 'ignore', // Gracefully ignore errors and use fallback data
  });

  // Use WordPress data if available, otherwise fallback to hardcoded logos
  const clientLogos: string[] = data?.clients?.nodes?.map((client: any) => 
    client.customFields?.clientLogo || client.featuredImage?.node?.sourceUrl
  ).filter(Boolean) || fallbackLogos;

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-2 border-l-4 border-blue-500 pl-4 inline-block"
          style={{color: '#191e4e'}}
        >
          Our Clients
        </h2>
        <p className="text-sm md:text-base mb-8 text-gray-600">
          From world leading brands to local super stars.
        </p>
        
        {/* Client Logos */}
        <div className="bg-white py-10 md:py-12">
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8 md:space-x-16 items-center">
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