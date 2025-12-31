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
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Frame-3.png',
    title: 'We ensure ROI',
    description: 'Everything we do will come back to you as business growth, which means we grow our client\'s revenue by a minimum of 20% year on year. Our talented team makes sure you produce amazing quantifiable results.',
    highlightWords: ['ROI']
  },
  {
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Frame-4.png',
    title: 'Your happiness is ours',
    description: 'Your happiness matters to us! That\'s why if you\'re creating a business, brand, or service, our team takes care of not only building satisfactory experiences but also making you part of our community.',
    highlightWords: ['happiness']
  },
  {
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Frame-5.png',
    title: 'We dare to be different',
    description: 'Innovation is the keyword for our work, we are not afraid of taking risks in order to provide the best solutions for you. Best of all, our clients have been spectators of our growth and success, we are passionate about what we do!',
    highlightWords: ['different']
  },
  {
    icon: 'https://newdesign.grossiweb.com/wp-content/uploads/2023/10/Frame-6.png',
    title: 'We keep you company in your process',
    description: 'We\'ll be with you through thick and thin, constantly guiding you into new strategies and processes that are ideally suited to your business. So we\'ll keep you company at every step to obtain the best results.',
    highlightWords: ['process']
  }
];

export default function TrustSection() {
  const { data, loading, error } = useQuery(GET_TRUST_FEATURES);

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
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-14">
          <h2 
            className="text-3xl md:text-4xl font-bold text-blue-900 border-l-4 border-blue-500 pl-6 inline-block"
            style={{fontFamily: 'Poppins, sans-serif', color: '#191e4e'}}
          >
            Trust is our foundation
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {trustFeatures.slice(0, 2).map((feature: TrustFeatureCard, index: number) => (
            <div 
              key={index}
              className="bg-gray-100 rounded-lg p-8"
              style={{backgroundColor: '#ebebeb'}}
            >
              <img 
                src={feature.icon}
                alt={feature.title}
                className="w-20 h-20 mb-6"
              />
              <h5 
                className="text-xl font-bold mb-4 text-blue-900"
                style={{fontFamily: 'Poppins, sans-serif', color: '#191e4f'}}
              >
                {renderTitle(feature.title, feature.highlightWords)}
              </h5>
              <p className="text-base leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trustFeatures.slice(2).map((feature: TrustFeatureCard, index: number) => (
            <div 
              key={index + 2}
              className="bg-gray-100 rounded-lg p-8"
              style={{backgroundColor: '#ebebeb'}}
            >
              <img 
                src={feature.icon}
                alt={feature.title}
                className="w-20 h-20 mb-6"
              />
              <h5 
                className="text-xl font-bold mb-4 text-blue-900"
                style={{fontFamily: 'Poppins, sans-serif', color: '#191e4f'}}
              >
                {renderTitle(feature.title, feature.highlightWords)}
              </h5>
              <p className="text-base leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}