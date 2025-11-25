import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Collection.css';

export default function CollectionComponent() {
  const collections = [
    {
      title: "MEN",
      image: "/Images/men.jpg",
      link: "/Men"
    },
    {
      title: "WOMEN",
      image: "/Images/shopping.webp",
      link: "/Women"
    },
    {
      title: "KIDS",
      image: "/Images/childern in yellow.jpg",
      link: "/kids"
    },
    {
      title: "FAMILY",
      image: "/Images/family with2 kids.jpeg",
      link: "/family"
    }
  ];

  return (
    <div className="collection-container">
  <main className="collection-grid">
    {collections.map((collection, index) => (
      <div key={index} className="collection-card">
        
        <div className="collection-header">
          <h2 className="collection-title">{collection.title}</h2>
          <a href={collection.link} className="collection-link">View All</a>
        </div>

        <div className="collection-image-wrapper">
          <img 
            src={collection.image}
            alt={collection.title}
            className="collection-image"
          />
        </div>

      </div>
    ))}
  </main>
</div>
  );
}