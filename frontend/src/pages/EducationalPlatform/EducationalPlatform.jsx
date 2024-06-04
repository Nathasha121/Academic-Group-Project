import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import Rating from 'react-rating-stars-component';
import './post.css';
import ChatApp from './chatbot/chatApp';
import YearSelector from './yearSelector/YearSelector'; 
import blogContent from './blogContent';
import fuji1 from './images/fuji1.jpg';
import red from './images/red.jpg';
import fuji4 from './images/macoun.jpg';
import fuji5 from './images/fuji5.jpg';
import fuji6 from './images/fuji6.jpg';
import fuji7 from './images/fuji4.jpg'; 
import fuji8 from './images/weather.jpeg';
import fuji9 from './images/water.jpeg';
import fuji10 from './images/weather1.jpeg';

// Functional component named EducationalPlatform
const EducationalPlatform = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogRatings, setBlogRatings] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  // Refs for DOM elements

  const blogRef = useRef(null); 
  const yearSelectorRef = useRef(null); 
 
  // State variables using useState hook

  useEffect(() => {
    blogs.forEach(blog => {
      fetch(`/post/${blog.id}/average_rating`)
        .then(response => response.json())
        .then(data => setBlogRatings(prevState => ({
          ...prevState,
          [blog.id]: data.average_rating
        })))
        .catch(error => console.error('Error fetching average rating:', error));
    });
  }, []);
 
  // useEffect hook for handling search results on category or search key change
  useEffect(() => {
    handleSearchResults();
  }, [selectedCategory, searchKey]);
 
  // Function to scroll to selected blog
  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    const contentElement = blogRef.current;
    contentElement.scrollIntoView({ behavior: 'smooth' });
  }; 

  // Function to handle rating change

  const handleRatingChange = (newRating, blogId) => {
    setBlogRatings(prevState => ({
      ...prevState,
      [blogId]: newRating
    }));
  };

  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  const handleSearchResults = () => {
    const filteredBlogs = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setFilteredBlogs(filteredBlogs); // Updated from setBlogs(filteredBlogs)
  };
  
  const handleClearSearch = () => {
    setFilteredBlogs(blogs); // Updated from setBlogs(blogList)
    setSearchKey('');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Functional component for rendering horizontal line

  const HorizontalLine = () => {
    return <hr />;
  };

   // SearchBar component
  const SearchBar = ({ formSubmit, clearSearch }) => (
    <div className='ED-searchBar-wrap'>
      <form onSubmit={formSubmit}>
        <input
          autoFocus

          type='text'
          placeholder='Search By Each Blogs '
          value={searchKey}
          onChange={(e)=>setSearchKey(e.target.value)}
        />
        {searchKey && <span onClick={clearSearch}>X</span>}
        <button>Go</button>
      </form>
    </div>
  );

  // BlogItem component for rendering individual blog items
  
  const BlogItem = ({ blog }) => {
    const { id, title, cover, descrip,category} = blog;
    const rating = blogRatings[id] || 0;

    const handleReadMoreClick = (event) => {
      event.stopPropagation(); 
      handleReadMore(blog);
    };

    return (
      <div className='ED-blogpost-wrap'>
        <img className='ED-blogItem-cover' src={cover} alt='cover' />
        <div className='ED-card-bottom'>
          <h3>{title}</h3>
          <p className='ED-introduction'>{descrip}</p>
          <p className='ED-chip'>{category}</p>
          <Rating
            count={5}
            size={24}
            value={rating}
            onChange={(newRating) => handleRatingChange(newRating, id)}
            emptyIcon={<i className="far fa-star"></i>}
            fullIcon={<i className="fas fa-star"></i>}
            halfIcon={<i className="fas fa-star-half-alt"></i>}
            activeColor="#ffd700"
          />
          <button className="ED-read-more" onClick={handleReadMoreClick}>Read More</button>
        </div>
      </div>
    );
  };

  // Function to scroll to YearSelector component

  const scrollToYearSelector = () => {
    const yearSelectorElement = yearSelectorRef.current;
    yearSelectorElement.scrollIntoView({ behavior: 'smooth' });
  };

    // Array of blog data

  const blogs = [

    // Blog objects with id, title, description, category, and cover image

    { id: 1, title: 'Gala Apple',descrip:'Gala apples are a small to medium-sized varietal, averaging........', category: 'gala,Apple Varities ', cover: fuji1 },
    { id: 2, title: 'Granny Smith Apple',descrip:'Granny Smith apples are an excellent source of vitamin C......', category: 'green,Apple Varities ', cover: fuji6 },
    { id: 8, title: 'Weather-Wise Farming',descrip:'Navigating Weather Conditions for Agricultural Success......', category: 'Agronomy', cover: fuji9 },
    { id: 3, title: 'Golden Delicious Apple',descrip:'Golden Delicious apples are harvested in the fall and can be .......', category: 'yellow ,Apple Varities ', cover: fuji5 },
    { id: 4, title: 'Macoun Apple',descrip:'Macoun apples are a source of magnesium to control nerve functioning........', category: 'pink ,Apple Varities ', cover: fuji4 },
    { id: 5, title: 'Red Delicious Apple',descrip:'Red Delicious apples have a mild,neutral, and subtly sweet taste suited......', category: 'red, Apple Varities ', cover: red },
    { id: 6, title: 'Fuji Apple', descrip:'Fuji apples are moderately sized fruits, averaging 6 to ......',category: 'fuji,Apple Varities ', cover: fuji7 },
    { id: 7, title: 'Managing Apple Diseases:',descrip:'Strategies for a Healthy Orchard.....', category: 'Agronomy ', cover: fuji8 },
    
    { id: 9, title: 'Addressing Agricultural Pollution:',descrip:'Preserving the Environment for Sustainable Farming....', category: 'Agronomy ', cover: fuji10 }
  ];

  const filteredBlogItems = filteredBlogs.length > 0 ? filteredBlogs : blogs;


  // Rendering JSX

  return (
    <div className="ED-main-container">
      <div className="ED-overlay"></div>
      
      <div className="ED-Main">
      <div className="morphing-text-container">
      <svg viewBox="0 0 1320 100" className="morphing-svg">
        <text x="50%" y="50%" dy=".35em" textAnchor="middle" className="morphing-text">
       Educational Blog
          </text>
      </svg>
      </div>
          <header className='ED-home-header'>
          <h3>Welcome to Our Educational Blog Platform</h3>
            <p>Here, we delve into the fascinating world of apples, exploring their rich history, nutritional benefits, and practical uses in culinary arts and beyond.Join us on a <br></br>journey of discovery as we unlock the secrets of this iconic fruit, from orchard to table</p>
          </header>
          </div>

        
        <div className="ED-left-section">
          <SearchBar
            value={searchKey}
            clearSearch={handleClearSearch}
            formSubmit={handleSearchBar}
            handleSearchKey={(e) => setSearchKey(e.target.value)}
          />
        </div>
        
        <div className="ED-right-section">
          <button className='ED-soil-button' onClick={scrollToYearSelector}>Plantingtime</button>
        
          <div className='ED-soil-button-container'>
            <Link to={`/Educational-Platform/quiz`} className='ED-soil-button'>
              Quiz
            </Link>
           
           <Link to={`/Educational-Platform/Soil`} className='ED-soil-button'>
              Soil type
            </Link>
          </div>
          
          <div className="ED-chatbot">
            <ChatApp />
          </div>
        </div>
      

      <div className="ED-category-buttons">
      
            <button onClick={() => handleCategoryChange('all')} className='ED-category'>All</button>
            <button onClick={() => handleCategoryChange('Apple Varities')}  className='ED-category'>Apple Varities (6)</button>
            <button onClick={() => handleCategoryChange('Agronomy')} className='ED-category'>Agronomy (3)</button>
      </div>
  
      <div className="ED-line"><HorizontalLine /></div>


      <div className='ED-blog-container'>
        {filteredBlogItems.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
      
      <div ref={blogRef} className="ED-popup-content">
        {selectedBlog && (
          <>
            <button onClick={() => setSelectedBlog(null)} className="ED-close-content">X</button>
            <h3>{selectedBlog.title}</h3>
            <img className='ED-blogItem-cover' src={selectedBlog.cover} alt='cover' />
            {blogContent[selectedBlog.id].map((section, index) => (
              <div key={index}>
                <h3>{section.title}</h3>
                <p>{section.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <div className='ED-cropbox'>
      <div className='ED-Crop' ref={yearSelectorRef}>
        <h2 className='ED-cropTitle  '>Apple Planting Time Information Collection </h2>
        <p className='ED-cropinfo'> Gather data on optimal planting times for apple trees to inform your decision-making process. Choose the best time for planting to maximize growth and yield.</p>
        <YearSelector />
      </div>
      </div>
    </div>
  );
};

export default EducationalPlatform;