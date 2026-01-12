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
  'https://newdesign.grossiweb.com/wp-content/uploads/2025/03/logo_-buckhead.png',
  'https://newdesign.grossiweb.com/wp-content/uploads/2025/03/logo_-eastman.png',
  'https://newdesign.grossiweb.com/wp-content/uploads/2025/03/logo_-ebay.png',
  'https://newdesign.grossiweb.com/wp-content/uploads/2025/03/logo_-jj.png',
  'https://newdesign.grossiweb.com/wp-content/uploads/2025/03/logo_-reviewsright.png',
  'https://newdesign.grossiweb.com/wp-content/uploads/2025/03/logo_-sugercoat.png',
  'https://newdesign.grossiweb.com/wp-content/uploads/2025/05/logo_-ultramet.png'
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
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-2 border-l-4 border-blue-500 pl-4 inline-block"
          style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
        >
          Our Clients
        </h2>
        <p className="text-sm md:text-base mb-8 text-gray-600" style={{fontFamily: 'Poppins, sans-serif'}}>
          From world leading brands to local super stars.
        </p>
        
        {/* Client Logos */}
        <div className="bg-white py-10 md:py-12">
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-16 items-center justify-center">
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
        
        <div className="mt-4">
          <button
            className="text-sm font-semibold hover:underline transition-colors"
            style={{fontFamily: 'Poppins, sans-serif', color: '#287194'}}
          >
            Explore our work
          </button>
        </div>
      </div>
    </section>
  );
}