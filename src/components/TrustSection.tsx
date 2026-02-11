'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_TRUST_FEATURES = gql`
  query GetTrustFeatures {
    trustFeatures {
      nodes {
        id
        title
        content
        customFields {
          icon
          highlightWords
        }
      }
    }
  }
`;

type TrustFeatureCard = {
  icon: string
  title: string
  description: string
  highlightWords: string[]
}

// Fallback trust features
const fallbackFeatures: TrustFeatureCard[] = [
  {
    icon: '/images/icons/Frame-3.png',
    title: 'Revenue Growth You Can Count On',
    description: 'Your investment should multiply, not just maintain. That\'s why our clients see a minimum 20% year-over-year revenue increase. We don\'t just build websites, we build profit engines that compound your success quarter after quarter.',
    highlightWords: ['Revenue', 'Growth']
  },
  {
    icon: '/images/icons/Frame-4.png',
    title: 'Your Vision, Fully Realized',
    description: 'You didn\'t start your business to settle for \'satisfactory.\' You have a vision that deserves to come to life exactly as you imagined, or better. We become an extension of your team, ensuring every decision moves you closer to the future you\'re building.',
    highlightWords: ['Vision']
  },
  {
    icon: '/images/icons/Frame-5.png',
    title: 'Breakthrough Solutions, Not Cookie-Cutter Templates',
    description: 'Your business challenges are unique. Generic solutions get generic results. We take calculated risks to create innovative strategies that give you competitive advantages your competitors can\'t copy. Our clients don\'t just watch us succeed\u2014they succeed alongside us.',
    highlightWords: ['Breakthrough']
  },
  {
    icon: '/images/icons/Frame-6.png',
    title: 'Continuous Growth Partnership',
    description: 'Markets evolve. Customer behaviors shift. Technology advances. You need a partner who anticipates these changes and guides you through them, not one who disappears after launch. We\'re with you at every pivot, expansion, and opportunity\u2014ensuring you\'re always ahead of the curve.',
    highlightWords: ['Growth', 'Partnership']
  }
];

export default function TrustSection() {
  const { data, loading, error } = useQuery(GET_TRUST_FEATURES, {
    errorPolicy: 'ignore', // Gracefully ignore errors and use fallback data
  });

  // Use WordPress data if available, otherwise fallback
  const trustFeatures: TrustFeatureCard[] = data?.trustFeatures?.nodes?.map((feature: any): TrustFeatureCard => ({
    icon: feature.customFields?.icon || fallbackFeatures[0].icon,
    title: feature.title,
    description: feature.content?.replace(/<[^>]*>/g, '') || '', // Strip HTML tags
    highlightWords: (feature.customFields?.highlightWords as string[] | undefined) || []
  })) || fallbackFeatures;

  const renderTitle = (title: string, highlightWords: string[]) => {
    return title.split(' ').map((word, i) => 
      highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase())) ? 
      <span key={i} style={{color: '#287194'}}>{word} </span> : 
      <span key={i}>{word} </span>
    );
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4 inline-block"
            style={{color: '#191e4e'}}
          >
            Your Success Is Our Only Metric
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustFeatures.map((feature: TrustFeatureCard, index: number) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 md:p-8"
              style={{backgroundColor: '#f8f9fa'}}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-14 w-auto mb-4 object-contain"
              />
              <h5
                className="text-2xl font-bold mb-3"
                style={{color: '#191e4f'}}
              >
                {renderTitle(feature.title, feature.highlightWords)}
              </h5>
              <p className="text-base leading-relaxed text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}