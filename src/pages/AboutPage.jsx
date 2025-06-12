import React from 'react'
import './AboutPage.css'

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>Our Story</h1>
          <p className="subtitle">From the Middle East to the Heart of Champaign</p>
        </div>
        
        <div className="owner-image-container">
          {/* Placeholder for owner image */}
          <div className="owner-image" style={{ height: '300px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#888' }}>Owner's Image</span>
          </div>
        </div>
        
        <div className="story-section">
          <h2>A Journey of Flavors</h2>
          <p>
            The story of Tasty Wings & Sandwiches begins over 6,000 miles away in the vibrant culinary landscape of the Middle East. Born and raised in a family where cooking was not just a necessity but an expression of love and heritage, our founder, Ahmad, grew up surrounded by the rich aromas of traditional spices and the warmth of family gatherings centered around food.
          </p>
          <p>
            In 2005, with nothing but dreams and determination, Ahmad arrived in the United States seeking new opportunities and a chance to share his passion for food with a new community. The early years were challenging—working long hours in various restaurants, learning English, and adapting to a new culture while holding onto the flavors of home.
          </p>
          
          <div className="quote-block">
            "I came to America with two suitcases and my grandmother's recipes memorized by heart. Those recipes were my most valuable possession—they connected me to my roots while I planted new ones here."
          </div>
          
          <p>
            After years of saving every penny and refining his culinary skills in local kitchens, Ahmad's dream began to take shape. In 2012, he opened his first small sandwich shop, Fat Sandwich & Company, introducing Champaign to the bold flavors of his homeland while embracing American classics. The unique combination resonated with the community, and the restaurant quickly became a local favorite.
          </p>
          <p>
            Success didn't change Ahmad's hands-on approach to his business. Even today, you'll find him in the kitchen at dawn, preparing marinades and sauces from scratch, insisting that some things simply cannot be rushed or delegated. His commitment to quality and authenticity has remained unwavering.
          </p>
          <p>
            In 2018, inspired by the community's enthusiastic response and encouraged by loyal customers, Ahmad expanded his culinary vision by opening Tasty Wings & Sandwiches. This second restaurant celebrates the perfect marriage of Middle Eastern spice profiles with American comfort food, creating wing flavors and sandwich combinations that can't be found anywhere else in Illinois.
          </p>
          <p>
            Today, Ahmad proudly operates both restaurants, creating jobs for over 30 local residents and mentoring young immigrants who remind him of his own journey. He remains deeply grateful to the Champaign community that embraced him and his food, allowing a distant dream to become a thriving reality.
          </p>
        </div>
        
        <div className="restaurants-section">
          <h2>Our Restaurants</h2>
          <div className="restaurants-grid">
            <div className="restaurant-card">
              <h3>Tasty Wings & Sandwiches</h3>
              <p>Experience our signature wings with unique spice blends and handcrafted sandwiches that bring together the best of Middle Eastern and American flavors.</p>
              <p>1702 W Bradley Ave, Champaign, IL 61821</p>
              <a href="/" className="btn">Visit Website</a>
            </div>
            
            <div className="restaurant-card">
              <h3>Fat Sandwich & Company</h3>
              <p>Our original restaurant featuring oversized sandwiches with bold flavors and fresh ingredients that have made us a Champaign favorite since 2012.</p>
              <a href="https://fatsandwichchampaign.com/" target="_blank" rel="noopener noreferrer" className="btn">Visit Website</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage